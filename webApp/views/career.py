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
        print(job_items)
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


def filter_jobs(request):
    selected_filters = request.GET.getlist('filters[]')

    # Define the API endpoint URL where you are fetching job data
    api_url = "https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/c3d7ea2b-cf6b-479a-a7f5-79ef063bb61f"

    try:
        # Make a GET request to the API with selected filters
        response = requests.get(api_url, params={'filters': selected_filters})

        # Check if the request was successful
        if response.status_code == 200:
            filtered_jobs = response.json().get('jobs', [])
            # Process the filtered job data as needed

            serialized_jobs = [{'title': job['title'], 'description': job['description']} for job in filtered_jobs]

            return JsonResponse({'jobs': serialized_jobs})

        else:
            # Handle API request error here, e.g., return an error JSON response
            return JsonResponse({'error': 'API request failed'}, status=500)

    except requests.exceptions.RequestException as e:
        # Handle request exception, e.g., return an error JSON response
        return JsonResponse({'error': str(e)}, status=500)



