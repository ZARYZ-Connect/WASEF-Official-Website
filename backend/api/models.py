from django.db import models


class Service(models.Model):
    CATEGORY_CHOICES = [
        ('laser_cutting', 'Laser Cutting'),
        ('laser_welding', 'Laser Welding'),
        ('laser_cladding', 'Laser Cladding'),
        ('laser_drilling', 'Laser Drilling'),
        ('fabrication', 'Fabrication'),
        ('3d_printing', '3D Printing'),
        ('laser_hardening', 'Laser Hardening'),
    ]
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    hero_image = models.ImageField(upload_to='services/heroes/', blank=True, null=True)
    icon_name = models.CharField(max_length=100, blank=True, help_text='Icon identifier for frontend')
    technical_specs = models.JSONField(default=dict, blank=True)
    applications = models.TextField(blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class Project(models.Model):
    INDUSTRY_CHOICES = [
        ('aerospace', 'Aerospace'),
        ('automotive', 'Automotive'),
        ('oil_gas', 'Oil & Gas'),
        ('medical', 'Medical'),
        ('defence', 'Defence'),
        ('power', 'Power & Energy'),
        ('general', 'General Engineering'),
    ]
    title = models.CharField(max_length=300)
    client_name = models.CharField(max_length=200, blank=True)
    industry = models.CharField(max_length=50, choices=INDUSTRY_CHOICES)
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField()
    challenge = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    outcome = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to='projects/thumbnails/', blank=True, null=True)
    gallery = models.JSONField(default=list, blank=True)
    is_featured = models.BooleanField(default=False)
    year = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year', '-created_at']

    def __str__(self):
        return self.title


class Certification(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    issuing_body = models.CharField(max_length=200, blank=True)
    badge_image = models.ImageField(upload_to='certifications/', blank=True, null=True)
    certificate_pdf = models.FileField(upload_to='certificates/', blank=True, null=True)
    valid_until = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.code} - {self.name}"


class Facility(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    is_headquarters = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Facilities'

    def __str__(self):
        return f"{self.name}, {self.city}"


class CareerListing(models.Model):
    EMPLOYMENT_TYPE = [
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
    ]
    DEPARTMENT_CHOICES = [
        ('engineering', 'Engineering'),
        ('quality', 'Quality & Assurance'),
        ('operations', 'Operations'),
        ('sales', 'Sales & Business Development'),
        ('rd', 'Research & Development'),
        ('hr', 'Human Resources'),
        ('finance', 'Finance'),
        ('it', 'IT & Systems'),
    ]
    title = models.CharField(max_length=200)
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
    location = models.ForeignKey(Facility, on_delete=models.SET_NULL, null=True, blank=True)
    employment_type = models.CharField(max_length=20, choices=EMPLOYMENT_TYPE, default='full_time')
    experience_required = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    responsibilities = models.TextField(blank=True)
    requirements = models.TextField(blank=True)
    salary_range = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    posted_on = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-posted_on']

    def __str__(self):
        return f"{self.title} ({self.department})"


class ContactInquiry(models.Model):
    INQUIRY_TYPE = [
        ('quote', 'Request a Quote'),
        ('general', 'General Inquiry'),
        ('career', 'Career'),
        ('partnership', 'Partnership'),
        ('service', 'Service Information'),
    ]
    name = models.CharField(max_length=200)
    company = models.CharField(max_length=200, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_TYPE, default='general')
    service_interest = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Contact Inquiries'

    def __str__(self):
        return f"{self.name} ({self.inquiry_type}) - {self.created_at.strftime('%Y-%m-%d')}"


class Document(models.Model):
    DOC_TYPE = [
        ('brochure', 'Brochure'),
        ('certificate', 'Certificate'),
        ('datasheet', 'Data Sheet'),
        ('case_study', 'Case Study'),
        ('whitepaper', 'White Paper'),
    ]
    title = models.CharField(max_length=200)
    doc_type = models.CharField(max_length=20, choices=DOC_TYPE)
    file = models.FileField(upload_to='documents/')
    thumbnail = models.ImageField(upload_to='documents/thumbnails/', blank=True, null=True)
    description = models.TextField(blank=True)
    is_public = models.BooleanField(default=True)
    download_count = models.PositiveIntegerField(default=0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return self.title


class ClientLogo(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='clients/')
    website = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name
