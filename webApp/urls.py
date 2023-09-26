from django.urls import path
from .views.index import index
from .views.career import jobList
from .views.about import about
from .views.contact import contact
from .views.services import swingbed

urlpatterns = [
    path('', index, name='home'),
    path('about/', about, name='about'),
    path('contact/', contact, name="contact"),
    path('services/swing-bed', swingbed, name='swing-bed'),
    path('jobs/', jobList, name='jobs'),
]

