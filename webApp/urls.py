from django.urls import path
from .views.index import index
from .views.career import jobList, getJobDetail
from .views.about import about
from .views.contact import contact
from .views.services import swingbed, rehabService, caseManagement
from .views.financial import financial
from .views.price import price
from .views.career import filter_jobs

urlpatterns = [
    path('', index, name='home'),
    path('about/', about, name='about'),
    path('contact/', contact, name="contact"),
    path('swing-bed/', swingbed, name='swing-bed'),
    path('rehabilitation/', rehabService, name='rehab-servive'),
    path('case-management/', caseManagement, name='case-management'),
    path('financial/', financial, name='financial'),
    path('price/', price, name='price'),
    path('jobs/', jobList, name='jobs'),
    path('job/<int:id>/', getJobDetail, name="job"),
    path('filter-jobs/', filter_jobs, name='filter_jobs'),
]

