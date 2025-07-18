# PleromaSpringsWebsite/p-backend/core_api/serializers.py

from rest_framework import serializers
# NEW: Import all the models, including Category
from .models import (
    BlogPost, Event, ContactMessage, NewsletterSubscriber, Resource,
    VolunteerApplication, PartnershipInquiry, TeamMember, GalleryItem,
    Category # <--- IMPORTANT: Add Category here if BlogPost uses it
)

# --- Category Serializer (REQUIRED if BlogPost has a Category FK) ---
# Define this first, as BlogPostSerializer will depend on it.
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug'] # Or just '__all__' if you prefer

# --- BlogPost Serializer ---
class BlogPostSerializer(serializers.ModelSerializer):
    # This will serialize the entire Category object when reading (GET requests)
    # The 'category' field in your BlogPost model is a ForeignKey to Category.
    category = CategorySerializer(read_only=True)

    # This 'category_id' field is for writing (POST/PUT requests).
    # It allows you to send just the category's primary key (ID) from the frontend.
    # The 'source='category'' tells DRF to map this field to the actual 'category' ForeignKey.
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category', # Maps this field to the 'category' ForeignKey
        write_only=True,   # Only used for writing (input), not for reading (output)
        required=False,    # Make it optional if a blog post doesn't always need a category
        allow_null=True    # Allow null if the ForeignKey in models.py has null=True
    )

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'content',
            'excerpt', # <--- ADDED: The new excerpt field
            'author', 'published_date', 'updated_date', 'image', 'is_active',
            'category',       # This is for reading (GET) - shows full category object
            'category_id'     # This is for writing (POST/PUT) - takes category ID
        ]
        # 'slug', 'published_date', 'updated_date' are read-only as they are often auto-generated.
        # 'category' is read-only here because we're using CategorySerializer for its representation.
        read_only_fields = ['slug', 'published_date', 'updated_date', 'category']

# --- Event Serializer ---
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'slug', 'description', 'event_date', 'location', 'image', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['slug', 'created_at', 'updated_at']

# --- ContactMessage Serializer ---
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'submitted_at', 'is_read']
        read_only_fields = ['submitted_at', 'is_read']

# --- NewsletterSubscriber Serializer ---
class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'subscribed_at', 'is_active']
        read_only_fields = ['subscribed_at', 'is_active']

# --- Resource Serializer ---
class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'file', 'uploaded_at', 'is_public']
        read_only_fields = ['uploaded_at']

# --- Volunteer Application Serializer ---
class VolunteerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerApplication
        fields = ['id', 'name', 'email', 'phone', 'area_of_interest', 'message', 'application_date', 'status']
        read_only_fields = ['application_date', 'status'] # These are set by the backend/admin

# --- Partnership Inquiry Serializer ---
class PartnershipInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnershipInquiry
        fields = ['id', 'organization_name', 'contact_person', 'email', 'partnership_type', 'message', 'inquiry_date', 'status']
        read_only_fields = ['inquiry_date', 'status'] # These are set by the backend/admin

# --- TeamMember Serializer ---
class TeamMemberSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'bio', 'profile_picture', 'linkedin_url', 'twitter_url', 'email', 'order', 'is_active']
        read_only_fields = ['id'] # ID is automatically assigned

# --- GalleryItem Serializer ---
class GalleryItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    video = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = GalleryItem
        fields = ['id', 'image', 'video', 'title', 'description', 'upload_date', 'category', 'is_published']
        read_only_fields = ['upload_date']