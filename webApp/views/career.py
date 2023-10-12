import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta


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
    
    context = {"job_list": job_list}
    return render(request, 'career/career.html', context)


def getJobDetail(request, id):
    try:
        api_url = "https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/c3d7ea2b-cf6b-479a-a7f5-79ef063bb61f"
        
        response = requests.get(api_url)

        if response.status_code == 200:
            data = response.json()
            job_list = data.get('jobs', [])

            job_detail = next((job for job in job_list if job['jobId'] == int(id)), None)
            print(job_detail)

            if job_detail:
                return JsonResponse(job_detail)
            else:
                return HttpResponse(f"Job not found (ID: {id})", content_type="text/plain", status=404)
        else:
            return HttpResponse(f"Job not found (Status Code: {response.status_code})", content_type="text/plain", status=404)
    
    except requests.exceptions.RequestException as e:
        return HttpResponse(str(e), content_type="text/plain", status=500)



def filter_jobTypes(request):
    if request.method == 'GET':
        selected_filter = request.GET.getlist('jobTypes[]')
        print(selected_filter)
        
        api_url = "https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/c3d7ea2b-cf6b-479a-a7f5-79ef063bb61f"

        try:
            response = requests.get(api_url)
            if response.status_code == 200:
                all_jobs = response.json().get('jobs', [])
                
                # Check if any checkboxes are selected
                if not selected_filter:
                    # If no checkboxes are selected, return all jobs
                    serialized_jobs = [{'jobId': job['jobId'],'title': job['title'], 'description': job['description'], 'companyName': job['companyName'], 'zip': job['jobLocation']['zip'], 'city': job['jobLocation']['city'], 'state': job['jobLocation']['state']} for job in all_jobs]
                else:
                    # Filter jobs based on selected checkboxes
                    filtered_jobs = [job for job in all_jobs if job.get('jobTypes') in selected_filter]
                    serialized_jobs = [{'jobId': job['jobId'], 'title': job['title'], 'description': job['description'], 'companyName': job['companyName'], 'zip': job['jobLocation']['zip'], 'city': job['jobLocation']['city'], 'state': job['jobLocation']['state']} for job in filtered_jobs]
                
                return JsonResponse({'jobs': serialized_jobs})
            else:
                return JsonResponse({'error': 'API request failed'}, status=500)

        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)


# from datetime import datetime, timedelta

def filter_recent_and_past_jobs(request):
    if request.method == 'GET':
        # Get the values of the recent_jobs and saved_jobs checkboxes
        recent_jobs = request.GET.get('recent_jobs')
        saved_jobs = request.GET.get('saved_jobs')

        api_url = "https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/c3d7ea2b-cf6b-479a-a7f5-79ef063bb61f"

        try:
            response = requests.get(api_url)
            if response.status_code == 200:
                all_jobs = response.json().get('jobs', [])

                if recent_jobs:
                    # Filter jobs for most recent (e.g., published within the last 7 days)
                    threshold_date = datetime.now() - timedelta(days=7)
                    filtered_jobs = [
                        job for job in all_jobs
                        if datetime.fromisoformat(job["publishedDate"].split('.')[0]) >= threshold_date
                    ]
                elif saved_jobs:
                    # Filter jobs for saved (e.g., published more than 7 days ago)
                    threshold_date = datetime.now() - timedelta(days=7)
                    filtered_jobs = [
                        job for job in all_jobs
                        if datetime.fromisoformat(job["publishedDate"].split('.')[0]) <= threshold_date
                    ]
                else:
                    # If neither checkbox is checked, return all jobs
                    filtered_jobs = all_jobs

                serialized_jobs = [
                    {
                        'title': job['title'],
                        'description': job['description'],
                        'companyName': job['companyName'],
                        'zip': job['jobLocation']['zip'],
                        'city': job['jobLocation']['city'],
                        'state': job['jobLocation']['state']
                    } for job in filtered_jobs]

                return JsonResponse({'jobs': serialized_jobs})
            else:
                return JsonResponse({'error': 'API request failed'}, status=500)

        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)







