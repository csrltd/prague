from django.shortcuts import render
from ..forms import ContactForm
from django.core.mail import send_mail

def contact(request):
    form = ContactForm()
    context= {'form': form}
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            first_name = form.cleaned_data['first_name']

            last_name = form.cleaned_data['last_name']
            phone = form.cleaned_data['phone']
            email= form.cleaned_data['email']
            message= form.cleaned_data['message']
            subject = "Message from Prague"
            message = f'Name: {first_name}\nLast_Name: {last_name}\nPhone : {phone}\nEmail: {email}\nMessage: {message}'
            from_email = email
            recipient_list = ['csr.chmc@gmail.com']
            success_message = 'Message saved but not sent'
            # send_mail(subject=subject, message=message, from_email=from_email, recipient_list=recipient_list, fail_silently=False)
            return render(request, 'contact/contact.html', {'form': ContactForm(), 'success_massage': success_message})
        else:
            success_message = None

    return render(request, 'contact/contact.html',context)

