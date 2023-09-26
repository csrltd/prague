import requests
from django.shortcuts import render


def getJobs(request):
    api_url = "https://recruiting.paylocity.com/recruiting/v2/api/feed/jobs/c3d7ea2b-cf6b-479a-a7f5-79ef063bb61f"
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        # print(data['jobs'])
        job_items = data.get('jobs', [])
        return job_items
    else:
        return []

def jobList(request):
    job_list = getJobs(request)
    # print(job_list)
    context = {"job_list": job_list}
    
    return render(request, 'career.html', context)


