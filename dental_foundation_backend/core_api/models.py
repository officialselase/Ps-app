from django.db import models

# Create your models here.

# BlogPost model
# PleromaSpringsWebsite/p-backend/core_api/models.py

from django.db import models

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, help_text="A unique slug for the URL, e.g., 'my-awesome-blog-post'")
    content = models.TextField()
    author = models.CharField(max_length=100)
    published_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    is_active = models.BooleanField(default=True, help_text="Whether the blog post is currently active/visible") # <--- ADD THIS LINE

    class Meta:
        ordering = ['-published_date']

    def __str__(self):
        return self.title

# ... (rest of your models: Event, ContactMessage, NewsletterSubscriber, Resource)

        #Event model
class Event(models.Model):
    title = models.CharField(max_length=200, help_text="Name of the event")
    slug = models.SlugField(max_length=200, unique=True, help_text="A unique slug for the URL, e.g., 'annual-dental-camp'")
    description = models.TextField(help_text="Detailed description of the event")
    event_date = models.DateTimeField(help_text="Date and time of the event")
    location = models.CharField(max_length=255, help_text="Venue or online link for the event")
    image = models.ImageField(upload_to='event_images/', blank=True, null=True, help_text="Optional image for the event")
    is_active = models.BooleanField(default=True, help_text="Whether the event is currently active/visible")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['event_date'] # Order by upcoming events first

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100, help_text="Name of the person sending the message")
    email = models.EmailField(help_text="Email address for reply")
    subject = models.CharField(max_length=200, blank=True, null=True, help_text="Subject of the message (optional)")
    message = models.TextField(help_text="The content of the message")
    submitted_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the message was sent")
    is_read = models.BooleanField(default=False, help_text="Mark if the message has been read by an admin")

    class Meta:
        ordering = ['-submitted_at'] # Most recent messages first

    def __str__(self):
        return f"Message from {self.name} ({self.email})"

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True, help_text="Email address of the subscriber")
    subscribed_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the user subscribed")
    is_active = models.BooleanField(default=True, help_text="Whether the subscription is currently active")

    class Meta:
        ordering = ['-subscribed_at'] # Most recent subscribers first

    def __str__(self):
        return self.email

class Resource(models.Model):
    title = models.CharField(max_length=200, help_text="Title of the downloadable resource")
    description = models.TextField(blank=True, null=True, help_text="Brief description of the resource")
    file = models.FileField(upload_to='resources/', help_text="The actual file for download (PDFs, documents, etc.)")
    uploaded_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the resource was uploaded")
    is_public = models.BooleanField(default=True, help_text="Whether the resource is publicly available")

    class Meta:
        ordering = ['-uploaded_at'] # Most recently uploaded resources first

    def __str__(self):
        return self.title        