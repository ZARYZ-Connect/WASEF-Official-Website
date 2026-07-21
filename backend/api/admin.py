from django.contrib import admin
from .models import Service, Project, Certification, Facility, CareerListing, ContactInquiry, Document, ClientLogo


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_featured', 'order']
    list_editable = ['is_featured', 'order']
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ['title', 'description']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'industry', 'service', 'is_featured', 'year']
    list_editable = ['is_featured']
    list_filter = ['industry', 'is_featured']
    search_fields = ['title', 'client_name']


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'issuing_body', 'valid_until', 'is_active']
    list_editable = ['is_active']


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'state', 'is_headquarters', 'order']
    list_editable = ['order']


@admin.register(CareerListing)
class CareerListingAdmin(admin.ModelAdmin):
    list_display = ['title', 'department', 'employment_type', 'is_active', 'posted_on', 'deadline']
    list_editable = ['is_active']
    list_filter = ['department', 'employment_type', 'is_active']
    search_fields = ['title', 'description']


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'email', 'inquiry_type', 'is_read', 'created_at']
    list_editable = ['is_read']
    list_filter = ['inquiry_type', 'is_read']
    readonly_fields = ['name', 'company', 'email', 'phone', 'inquiry_type', 'message', 'created_at']


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['title', 'doc_type', 'download_count', 'is_public', 'uploaded_at']
    list_editable = ['is_public']


@admin.register(ClientLogo)
class ClientLogoAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'is_active']
    list_editable = ['order', 'is_active']
