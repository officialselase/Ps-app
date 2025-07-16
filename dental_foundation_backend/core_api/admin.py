from django.contrib import admin
from .models import BlogPost, Event, ContactMessage, NewsletterSubscriber, Resource # Import all new models

# Register your models here.

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date', 'updated_date')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'content', 'author')
    list_filter = ('published_date', 'author')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_date', 'location', 'is_active', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('is_active', 'event_date')
    search_fields = ('title', 'description', 'location')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'submitted_at', 'is_read')
    list_filter = ('is_read', 'submitted_at')
    search_fields = ('name', 'email', 'subject', 'message')
    # Add a custom action to mark messages as read
    actions = ['mark_as_read']

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected messages as read"

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at', 'is_active')
    list_filter = ('is_active', 'subscribed_at')
    search_fields = ('email',)

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'file', 'is_public', 'uploaded_at')
    list_filter = ('is_public', 'uploaded_at')
    search_fields = ('title', 'description')