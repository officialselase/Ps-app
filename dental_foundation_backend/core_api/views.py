from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from .models import BlogPost, Event, ContactMessage, NewsletterSubscriber, Resource
from .serializers import BlogPostSerializer, EventSerializer, ContactMessageSerializer, NewsletterSubscriberSerializer, ResourceSerializer

# Create your views here.

# ViewSet for read-only access (list, retrieve) - perfect for BlogPosts, Events, Resources for frontend display
class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_active=True) # Assuming you add an 'is_active' field to BlogPost
    serializer_class = BlogPostSerializer
    # You might want to filter active posts, so if you added 'is_active' field, use filter(is_active=True)
    # For now, if no is_active, just use: queryset = BlogPost.objects.all()

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.filter(is_active=True) # Only show active events
    serializer_class = EventSerializer

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.filter(is_public=True) # Only show public resources
    serializer_class = ResourceSerializer

# Specific views for forms (create-only, as frontend only needs to submit)
class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    # Optional: Add custom success message or email sending logic here later
    def perform_create(self, serializer):
        instance = serializer.save()
        # You can add logic here to send an email notification to the foundation
        # For example: send_mail('New Contact Message', instance.message, instance.email, ['your_foundation_email@example.com'])
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