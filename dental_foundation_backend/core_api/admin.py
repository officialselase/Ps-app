# PleromaSpringsWebsite/p-backend/core_api/admin.py

from django.contrib import admin
# NEW: Import all your models
from .models import (
    BlogPost, Event, ContactMessage, NewsletterSubscriber, Resource,
    VolunteerApplication, PartnershipInquiry, TeamMember, GalleryItem
)

# Register your existing models here (if they weren't already)
@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date', 'is_active')
    list_filter = ('is_active', 'published_date')
    search_fields = ('title', 'content', 'author')
    prepopulated_fields = {'slug': ('title',)} # Automatically generate slug from title

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_date', 'location', 'is_active')
    list_filter = ('is_active', 'event_date')
    search_fields = ('title', 'description', 'location')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'submitted_at', 'is_read')
    list_filter = ('is_read', 'submitted_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('submitted_at',) # Submitted_at should not be editable

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at', 'is_active')
    list_filter = ('is_active', 'subscribed_at')
    search_fields = ('email',)

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at', 'is_public')
    list_filter = ('is_public', 'uploaded_at')
    search_fields = ('title', 'description')


# --- NEW: Register New Models for Admin Panel ---

@admin.register(VolunteerApplication)
class VolunteerApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'area_of_interest', 'application_date', 'status')
    list_filter = ('status', 'area_of_interest', 'application_date')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('application_date',) # Application date should not be editable
    # Add actions to easily update status, e.g., mark as 'Reviewed', 'Contacted'
    actions = ['mark_reviewed', 'mark_contacted']

    def mark_reviewed(self, request, queryset):
        queryset.update(status='Reviewed')
    mark_reviewed.short_description = "Mark selected applications as Reviewed"

    def mark_contacted(self, request, queryset):
        queryset.update(status='Contacted')
    mark_contacted.short_description = "Mark selected applications as Contacted"


@admin.register(PartnershipInquiry)
class PartnershipInquiryAdmin(admin.ModelAdmin):
    list_display = ('organization_name', 'contact_person', 'email', 'partnership_type', 'inquiry_date', 'status')
    list_filter = ('status', 'partnership_type', 'inquiry_date')
    search_fields = ('organization_name', 'contact_person', 'email', 'message')
    readonly_fields = ('inquiry_date',) # Inquiry date should not be editable
    # Add actions to easily update status
    actions = ['mark_reviewed', 'mark_contacted']

    def mark_reviewed(self, request, queryset):
        queryset.update(status='Reviewed')
    mark_reviewed.short_description = "Mark selected inquiries as Reviewed"

    def mark_contacted(self, request, queryset):
        queryset.update(status='Contacted')
    mark_contacted.short_description = "Mark selected inquiries as Contacted"


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order', 'is_active', 'email')
    list_filter = ('is_active', 'role')
    search_fields = ('name', 'role', 'bio')
    list_editable = ('order', 'is_active') # Allows direct editing from list view


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'upload_date', 'is_published', 'has_image', 'has_video')
    list_filter = ('is_published', 'category', 'upload_date')
    search_fields = ('title', 'description')
    readonly_fields = ('upload_date',)
    list_editable = ('is_published',) # Allows direct editing from list view

    # Custom columns to indicate if image/video is present
    def has_image(self, obj):
        return bool(obj.image)
    has_image.boolean = True
    has_image.short_description = "Image"

    def has_video(self, obj):
        return bool(obj.video)
    has_video.boolean = True
    has_video.short_description = "Video"