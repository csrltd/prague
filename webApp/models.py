from django.db import models
from django.utils.text import slugify

# Create your models here.
class Type(models.Model):
    job_type = models.CharField(max_length=30, null=True, blank=True)
    
    def __str__(self):
        return self.job_type

class Category(models.Model):
    job_category = models.CharField(max_length=100, null=True, blank=True)
    
    def __str__(self):
        return self.job_category
    
    

class Job(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=255, blank=True, unique=True)
    description = models.TextField(max_length=200)
    requirement = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    salary = models.FloatField()
    create_at = models.DateField(auto_now_add=True)
    deadline = models.DateField()
    no_of_vacancy = models.IntegerField()
    job_status = models.CharField(
        max_length=20,
        choices=(
            ('active', 'Active'),
            ('inactive', 'Inactive'),
        ),
        default='active'
    )
    job_types = models.ManyToManyField(Type, blank=True)

    def save(self, *args, **kwargs):
        # Automatically set the job_status to 'inactive' when the deadline is reached
        if self.deadline < timezone.now().date():
            self.job_status = 'inactive'
        
        # Automatically create a slug from the title if it's not set
        if not instance.slug:
            self.slug = slugify(self.title)
        
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('slug', args=(str(self.slug)))

    def __str__(self):
        return self.title
       
