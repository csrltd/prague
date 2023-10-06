import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


def getJobs(request):
    api_url = "https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/c3d7ea2b-cf6b-479a-a7f5-79ef063bb61f"
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        # print(data['jobs'])
        job_items = data.get('jobs', [])
        # print(job_items)
        return job_items
    else:
        return []
    

def jobList(request):
    job_list = getJobs(request)
    # print(job_list)
    context = {"job_list": job_list}
    return render(request, 'career/career.html', context)


def getJobDetail(request, id):
    try:
        api_url = "https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/c3d7ea2b-cf6b-479a-a7f5-79ef063bb61f"
        
        # Send a GET request to the API
        response = requests.get(api_url)

        # Check the response status code
        if response.status_code == 200:
            data = response.json()
            job_list = data.get('jobs', [])

            job_detail = next((job for job in job_list if job['jobId'] == int(id)), None)

            if job_detail:
                return render(request, 'career/job_detail.html', {'job_detail': job_detail})
            else:
                return HttpResponse(f"Job not found (ID: {id})", content_type="text/plain", status=404)
        else:
            return HttpResponse(f"Job not found (Status Code: {response.status_code})", content_type="text/plain", status=404)
    
    except requests.exceptions.RequestException as e:
        return HttpResponse(str(e), content_type="text/plain", status=500)


# def filter_jobs(request):
#     # if request.method == 'POST':
#         # selected_filter = request.POST.getlist('jobTypes')
#     selected_filter = 'parttime'
#     print(selected_filter)
    
    
#     api_url = "https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/c3d7ea2b-cf6b-479a-a7f5-79ef063bb61f"

#     try:
#         response = requests.get(api_url)
#         if response.status_code == 200:
            
#             all_jobs = response.json().get('jobs', [])
            
#             filtered_jobs = [job for job in all_jobs if job.get('jobTypes') == selected_filter]
            
#             serialized_jobs = [{'title': job['title'], 'description': job['description'], 'companyName': job['companyName'], 'zip': job['jobLocation']['zip'], 'city': job['jobLocation']['city'], 'state': job['jobLocation']['state']} for job in filtered_jobs]
#             # print(serialized_jobs)
            
#             return JsonResponse({'jobs': serialized_jobs})
#         else:
#             return JsonResponse({'error': 'API request failed'}, status=500)

#     except requests.exceptions.RequestException as e:
#         return JsonResponse({'error': str(e)}, status=500)

def filter_jobs(request):
    if request.method == 'GET':
        
        selected_filter = request.GET.getlist('jobTypes[]')
        print(selected_filter)
        # selected_filter = 'parttime'
        
        api_url = "https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/c3d7ea2b-cf6b-479a-a7f5-79ef063bb61f"

        try:
            response = requests.get(api_url)
            if response.status_code == 200:
                all_jobs = response.json().get('jobs', [])
                
                # Check if any checkboxes are selected
                if not selected_filter:
                    # If no checkboxes are selected, return all jobs
                    serialized_jobs = [{'title': job['title'], 'description': job['description'], 'companyName': job['companyName'], 'zip': job['jobLocation']['zip'], 'city': job['jobLocation']['city'], 'state': job['jobLocation']['state']} for job in all_jobs]
                else:
                    # Filter jobs based on selected checkboxes
                    filtered_jobs = [job for job in all_jobs if job.get('jobTypes') in selected_filter]
                    serialized_jobs = [{'title': job['title'], 'description': job['description'], 'companyName': job['companyName'], 'zip': job['jobLocation']['zip'], 'city': job['jobLocation']['city'], 'state': job['jobLocation']['state']} for job in filtered_jobs]
                
                return JsonResponse({'jobs': serialized_jobs})
            else:
                return JsonResponse({'error': 'API request failed'}, status=500)

        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)





