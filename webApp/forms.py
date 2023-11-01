from django.forms import ModelForm, TextInput, EmailInput,Textarea
from .models import ContactMessage


class ContactForm(ModelForm):
    class Meta:
        model= ContactMessage
        fields= {'first_name','last_name', 'phone', 'email', 'message'}

        widgets = {
            'first_name':TextInput(attrs={'placeholder':'Full Name'}),
            'last_name':TextInput(attrs={'placeholder':'Full Name'}),
            'phone':TextInput(attrs={'placeholder':'Phone Number'}),
            'email':EmailInput(attrs={'placeholder':'Email address'}),
            'message':Textarea(attrs={'placeholder':'Your message','row': '5'})
        }