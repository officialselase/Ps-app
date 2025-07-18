# PleromaSpringsWebsite/p-backend/core_api/serializers.py

from rest_framework import serializers
# NEW: Import all the new models
from .models import (
    BlogPost, Event, ContactMessage, NewsletterSubscriber, Resource,
    VolunteerApplication, PartnershipInquiry, TeamMember, GalleryItem
)

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'content', 'author', 'published_date', 'updated_date', 'image', 'is_active'] # Added 'is_active'
        read_only_fields = ['slug', 'published_date', 'updated_date']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'slug', 'description', 'event_date', 'location', 'image', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['slug', 'created_at', 'updated_at']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'submitted_at', 'is_read']
        read_only_fields = ['submitted_at', 'is_read']

class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'subscribed_at', 'is_active']
        read_only_fields = ['subscribed_at', 'is_active']

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'file', 'uploaded_at', 'is_public']
        read_only_fields = ['uploaded_at']


# --- NEW: Serializers for Volunteer Application, Partnership Inquiry, Team Member, and Gallery Item ---

class VolunteerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerApplication
        fields = ['id', 'name', 'email', 'phone', 'area_of_interest', 'message', 'application_date', 'status']
        read_only_fields = ['application_date', 'status'] # These are set by the backend/admin

class PartnershipInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnershipInquiry
        fields = ['id', 'organization_name', 'contact_person', 'email', 'partnership_type', 'message', 'inquiry_date', 'status']
        read_only_fields = ['inquiry_date', 'status'] # These are set by the backend/admin

class TeamMemberSerializer(serializers.ModelSerializer):
    # For ImageField, Django REST Framework often automatically handles the URL if MEDIA_URL is set up.
    # If you need absolute URLs for images, you might need extra configuration (e.g., serializer method field or request context)
    profile_picture = serializers.ImageField(required=False, allow_null=True) # Ensure it's optional if model allows

    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'bio', 'profile_picture', 'linkedin_url', 'twitter_url', 'email', 'order', 'is_active']
        read_only_fields = ['id'] # ID is automatically assigned

class GalleryItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True) # Ensure optional
    video = serializers.FileField(required=False, allow_null=True) # Ensure optional

    class Meta:
        model = GalleryItem
        fields = ['id', 'image', 'video', 'title', 'description', 'upload_date', 'category', 'is_published']
        read_only_fields = ['upload_date'] # Upload date is automatically set