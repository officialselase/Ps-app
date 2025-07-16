from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, EventViewSet, ResourceViewSet, ContactMessageCreateView, NewsletterSubscriberCreateView

# Create a router for our ViewSets
router = DefaultRouter()
router.register(r'blogposts', BlogPostViewSet, basename='blogpost') # /api/blogposts/
router.register(r'events', EventViewSet, basename='event')         # /api/events/
router.register(r'resources', ResourceViewSet, basename='resource') # /api/resources/

urlpatterns = [
    # Include ViewSet URLs
    path('', include(router.urls)),

    # Specific URLs for CreateAPIViews (forms)
    path('contact/', ContactMessageCreateView.as_view(), name='contact-submit'),      # /api/contact/
    path('subscribe/', NewsletterSubscriberCreateView.as_view(), name='newsletter-subscribe'), # /api/subscribe/
]