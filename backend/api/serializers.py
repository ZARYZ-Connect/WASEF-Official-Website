from rest_framework import serializers
from .models import Service, Project, Certification, Facility, CareerListing, ContactInquiry, Document, ClientLogo


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    service_title = serializers.CharField(source='service.title', read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'


class CareerListingSerializer(serializers.ModelSerializer):
    location_name = serializers.CharField(source='location.city', read_only=True)

    class Meta:
        model = CareerListing
        fields = '__all__'


class ContactInquirySerializer(serializers.ModelSerializer):
    service_interest = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = ContactInquiry
        fields = ['id', 'name', 'company', 'email', 'phone', 'inquiry_type',
                  'service_interest', 'message', 'created_at']

    def create(self, validated_data):
        service_val = validated_data.pop('service_interest', None)
        service_obj = None
        raw_service_str = ""
        if service_val:
            if isinstance(service_val, int) or (isinstance(service_val, str) and service_val.isdigit()):
                service_obj = Service.objects.filter(pk=int(service_val)).first()
            elif isinstance(service_val, str):
                service_obj = Service.objects.filter(slug=service_val).first() or Service.objects.filter(title__iexact=service_val).first()
                raw_service_str = service_val
        inquiry = ContactInquiry.objects.create(service_interest=service_obj, **validated_data)
        inquiry._raw_service = raw_service_str
        return inquiry



class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


class ClientLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientLogo
        fields = '__all__'
