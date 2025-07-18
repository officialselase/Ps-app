# PleromaSpringsWebsite/p-backend/core_api/views.py

from rest_framework import (
    viewsets,
    generics,
    status, # Trailing comma is allowed here because of parentheses
    filters
)
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import (
    BlogPost, Event, ContactMessage, NewsletterSubscriber, Resource,
    VolunteerApplication, PartnershipInquiry, TeamMember, GalleryItem, Category
)
from .serializers import (
    BlogPostSerializer, EventSerializer, ContactMessageSerializer,
    NewsletterSubscriberSerializer, ResourceSerializer,
    VolunteerApplicationSerializer, PartnershipInquirySerializer,
    TeamMemberSerializer, GalleryItemSerializer, CategorySerializer
)

# Existing ViewSets for read-only access (list, retrieve)
class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_active=True).order_by('-published_date') # Added ordering for the list view
    serializer_class = BlogPostSerializer
    lookup_field = 'slug' # <--- THIS IS THE KEY FIX FOR 404 ON DETAIL VIEW

    # Adding search and filter capabilities
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'content', 'author'] # Allows searching by title, content, and author
    filterset_fields = ['category__slug'] # Allows filtering by category slug

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().order_by('name') # Order categories by name
    # This will allow you to list all categories and retrieve them by slug
    serializer_class = CategorySerializer
    lookup_field = 'slug' # Allows fetching categories by slug

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.filter(is_active=True).order_by('event_date') # Only show active events
    serializer_class = EventSerializer
    lookup_field = 'slug' # Assuming you'll want to fetch events by slug too

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.filter(is_public=True) # Only show public resources
    serializer_class = ResourceSerializer

# Existing specific views for forms (create-only)
class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        print(f"New contact message from {instance.name} ({instance.email})")

class NewsletterSubscriberCreateView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        if NewsletterSubscriber.objects.filter(email=email).exists():
            return Response({"detail": "Email already subscribed."}, status=status.HTTP_409_CONFLICT)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        instance = serializer.save()
        print(f"New newsletter subscriber: {instance.email}")

# --- NEW: Views for Volunteer Application, Partnership Inquiry, Team Member, and Gallery Item ---

class VolunteerApplicationCreateView(generics.CreateAPIView):
    queryset = VolunteerApplication.objects.all()
    serializer_class = VolunteerApplicationSerializer

    def perform_create(self, serializer):
        instance = serializer.save(status='Pending')
        print(f"New volunteer application from {instance.name}")

class PartnershipInquiryCreateView(generics.CreateAPIView):
    queryset = PartnershipInquiry.objects.all()
    serializer_class = PartnershipInquirySerializer

    def perform_create(self, serializer):
        instance = serializer.save(status='New')
        print(f"New partnership inquiry from {instance.organization_name}")

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.filter(is_active=True).order_by('order', 'name')
    serializer_class = TeamMemberSerializer

class GalleryItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryItem.objects.filter(is_published=True).order_by('-upload_date')
    serializer_class = GalleryItemSerializer