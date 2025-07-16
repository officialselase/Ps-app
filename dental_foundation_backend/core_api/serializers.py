from rest_framework import serializers
from .models import BlogPost, Event, ContactMessage, NewsletterSubscriber, Resource

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'content', 'author', 'published_date', 'updated_date', 'image']
        read_only_fields = ['slug', 'published_date', 'updated_date'] # Slug is auto-generated, dates are handled by model

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'slug', 'description', 'event_date', 'location', 'image', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['slug', 'created_at', 'updated_at']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'submitted_at', 'is_read']
        read_only_fields = ['submitted_at', 'is_read'] # These are set by the backend or admin

class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'subscribed_at', 'is_active']
        read_only_fields = ['subscribed_at', 'is_active'] # isActive is default True, can be updated by admin

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'file', 'uploaded_at', 'is_public']
        read_only_fields = ['uploaded_at']