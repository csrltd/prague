from django.shortcuts import render
from ..forms import ContactForm
from core.email import receive_email
import logging


def contact(request):
    form = ContactForm()
    context = {'form':form}
    
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()  
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            email= form.cleaned_data['email']
            phone= form.cleaned_data['phone']
            message= form.cleaned_data['message']
            recipient_email = "kareraol1@gmail.com"

            receive_email(recipient_email,first_name,last_name, email,phone,message)
            success_message="Message sent successfully!"
            return render(request, 'contact/contact.html', {'form': ContactForm(), 'success_massage': success_message})
        else:
            
            logging.error(form.errors)
    
    return render(request, 'contact/contact.html',context)

