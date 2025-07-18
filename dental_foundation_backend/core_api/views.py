# PleromaSpringsWebsite/p-backend/core_api/views.py

from rest_framework import viewsets, generics, status
from rest_framework.response import Response
# NEW: Import all the new models
from .models import (
    BlogPost, Event, ContactMessage, NewsletterSubscriber, Resource,
    VolunteerApplication, PartnershipInquiry, TeamMember, GalleryItem
)
# NEW: Import all the new serializers
from .serializers import (
    BlogPostSerializer, EventSerializer, ContactMessageSerializer,
    NewsletterSubscriberSerializer, ResourceSerializer,
    VolunteerApplicationSerializer, PartnershipInquirySerializer,
    TeamMemberSerializer, GalleryItemSerializer
)

# Existing ViewSets for read-only access (list, retrieve)
class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_active=True)
    serializer_class = BlogPostSerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.filter(is_active=True) # Only show active events
    serializer_class = EventSerializer

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.filter(is_public=True) # Only show public resources
    serializer_class = ResourceSerializer

# Existing specific views for forms (create-only)
class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        # Optional: Add custom success message or email sending logic here later
        print(f"New contact message from {instance.name} ({instance.email})") # For local dev debugging

class NewsletterSubscriberCreateView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Check if subscriber already exists
        email = serializer.validated_data.get('email')
        if NewsletterSubscriber.objects.filter(email=email).exists():
            return Response({"detail": "Email already subscribed."}, status=status.HTTP_409_CONFLICT)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        instance = serializer.save()
        print(f"New newsletter subscriber: {instance.email}") # For local dev debugging

# --- NEW: Views for Volunteer Application, Partnership Inquiry, Team Member, and Gallery Item ---

class VolunteerApplicationCreateView(generics.CreateAPIView):
    """
    API endpoint for submitting new volunteer applications.
    Handles POST requests to create a new VolunteerApplication instance.
    """
    queryset = VolunteerApplication.objects.all()
    serializer_class = VolunteerApplicationSerializer

    def perform_create(self, serializer):
        instance = serializer.save(status='Pending') # Set default status on creation
        print(f"New volunteer application from {instance.name}")
        # Optional: Add email notification to admin here

class PartnershipInquiryCreateView(generics.CreateAPIView):
    """
    API endpoint for submitting new partnership inquiries.
    Handles POST requests to create a new PartnershipInquiry instance.
    """
    queryset = PartnershipInquiry.objects.all()
    serializer_class = PartnershipInquirySerializer

    def perform_create(self, serializer):
        instance = serializer.save(status='New') # Set default status on creation
        print(f"New partnership inquiry from {instance.organization_name}")
        # Optional: Add email notification to admin here

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows team members to be viewed.
    """
    queryset = TeamMember.objects.filter(is_active=True).order_by('order', 'name') # Only active members, ordered
    serializer_class = TeamMemberSerializer

class GalleryItemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows gallery items (images/videos) to be viewed.
    """
    queryset = GalleryItem.objects.filter(is_published=True).order_by('-upload_date') # Only published items, newest first
    serializer_class = GalleryItemSerializer