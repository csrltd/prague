from django.urls import path
from .views.index import index
from .views.career import jobList

urlpatterns = [
    path('', index, name='home'),
    path('jobs/', jobList, name='job_list'),
]

