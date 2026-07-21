from rest_framework import viewsets, status, filters
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Service, Project, Certification, Facility, CareerListing, ContactInquiry, Document, ClientLogo
from .serializers import (
    ServiceSerializer, ProjectSerializer, CertificationSerializer,
    FacilitySerializer, CareerListingSerializer, ContactInquirySerializer,
    DocumentSerializer, ClientLogoSerializer
)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = self.queryset.filter(is_featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = self.queryset.filter(is_featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.filter(is_active=True)
    serializer_class = CertificationSerializer


class FacilityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer


class CareerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CareerListing.objects.filter(is_active=True)
    serializer_class = CareerListingSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'department', 'description']


class DocumentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Document.objects.filter(is_public=True)
    serializer_class = DocumentSerializer

    @action(detail=True, methods=['post'])
    def download(self, request, pk=None):
        doc = self.get_object()
        doc.download_count += 1
        doc.save()
        return Response({'download_url': request.build_absolute_uri(doc.file.url)})


class ClientLogoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ClientLogo.objects.filter(is_active=True)
    serializer_class = ClientLogoSerializer


from .emails import send_inquiry_emails


@api_view(['POST'])
def submit_contact(request):
    serializer = ContactInquirySerializer(data=request.data)
    if serializer.is_valid():
        inquiry = serializer.save()
        # Dispatch company notification & sender confirmation emails
        send_inquiry_emails(inquiry)
        return Response({'success': True, 'message': 'Your inquiry has been received. We will contact you within 24 hours.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def site_stats(request):
    return Response({
        'facilities': 7,
        'machines': 120,
        'employees': 500,
        'customers': 300,
        'years_experience': 25,
    })
