from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import User
from basic_config.models import PaymentTerm, Sites

# Create your models here.
class VendorTags(models.Model):
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendortag_created_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name

class Categories(models.Model):
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendorcat_created_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name

class Trades(models.Model):
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendortrades_created_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name

class DiversityClassification(models.Model):
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendordiversity_created_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name

class VendorBasicInfo(models.Model):
    vendor_name = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255)
    contact_email = models.EmailField(max_length=255)
    contact_phone = models.CharField(max_length=255, blank=True, null=True)
    designation = models.CharField(max_length=255, blank=True, null=True)
    department = models.CharField(max_length=255, blank=True, null=True)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name="vendor_cat_rev")
    tags = models.ForeignKey(VendorTags, on_delete=models.CASCADE, related_name="vendorbasic_tag_rev")
    trades = models.ForeignKey(Trades, on_delete=models.CASCADE, related_name="vendorbasic_trade")
    diversity = models.ForeignKey(DiversityClassification, on_delete=models.CASCADE, related_name="vendorbasic_diversity_rev")
    payment_term = models.ForeignKey(PaymentTerm, on_delete=models.CASCADE, related_name="vendorbasic_payterm_rev")
    approval_status = models.CharField(max_length=255, blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendorbasic_created_rev")
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.vendor_name

class VendorRequest(models.Model):

    status_options = (
        ('Open', 'Open'),
        ('Expired', 'Expired'),
        ('Closed', 'Closed'),
    )

    company_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone_no = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    language = models.CharField(max_length=255, blank=True, null=True)
    request_contact = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendor_req_created")
    requesting_site = models.ForeignKey(Sites, on_delete=models.CASCADE, related_name="vendor_req_sites", blank=True, null=True)
    extra_comments = models.CharField(max_length=255, blank=True, null=True)
    deadline = models.DateField()
    created_at = models.DateField(default=timezone.now)
    request_status = models.CharField(max_length=50, choices=status_options, default="Open", blank=True, null=True)

    def __str__(self):
        return self.company_name

class VendorFileUpload(models.Model):
    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="vendor_fileupload")
    file_name = models.CharField(max_length=255)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendor_upload_user")
    uploaded_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.file_name


class CertificatesAndLisences(models.Model):
    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="vendor_cert")
    certificate_name = models.CharField(max_length=255)
    registration_no = models.CharField(max_length=255)
    aggregation_body = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendor_cert_user")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.certificate_name

