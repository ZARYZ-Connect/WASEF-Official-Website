from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceViewSet, ProjectViewSet, CertificationViewSet,
    FacilityViewSet, CareerViewSet, DocumentViewSet,
    ClientLogoViewSet, submit_contact, site_stats
)

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'certifications', CertificationViewSet, basename='certification')
router.register(r'facilities', FacilityViewSet, basename='facility')
router.register(r'careers', CareerViewSet, basename='career')
router.register(r'documents', DocumentViewSet, basename='document')
router.register(r'clients', ClientLogoViewSet, basename='client')

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', submit_contact, name='submit-contact'),
    path('stats/', site_stats, name='site-stats'),
]
