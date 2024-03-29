from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import User
from basic_config.models import PaymentTerm, Sites

# Create your models here.
class VendorTags(models.Model):
    name = models.TextField(max_length=255, primary_key=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendortag_created_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name

class Categories(models.Model):
    name = models.TextField(max_length=255, primary_key=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendorcat_created_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name

class Trades(models.Model):

    trade_options = (
        ('primary', 'primary'),
        ('secondary', 'secondary'),
    )
    name = models.TextField(max_length=255, primary_key=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendortrades_created_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)
    trade_status = models.CharField(max_length=50, choices=trade_options, default="secondary",)

    def __str__(self):
        return self.name

class DiversityClassification(models.Model):
    name = models.TextField(max_length=255, primary_key=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendordiversity_created_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name

class VendorBasicInfo(models.Model):

    approval_options = (
        ('approved', 'approved'),
        ('rejected', 'rejected'),
        ('pending', 'pending'),
    )

    class ApprovedVendors(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(approval_status="approved")

    class PendingVendors(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(approval_status="pending")

    vendor_name = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255)
    contact_email = models.EmailField(max_length=255)
    contact_phone = models.CharField(max_length=255, blank=True, null=True)
    designation = models.CharField(max_length=255, blank=True, null=True)
    department = models.CharField(max_length=255, blank=True, null=True)
    category = models.ManyToManyField(Categories, related_name="vendorbasic_cats_rev", blank=True)
    tags = models.ManyToManyField(VendorTags, related_name="vendorbasic_tag_rev", blank=True)
    trades = models.ManyToManyField(Trades, related_name="vendorbasic_trade", blank=True)
    diversity = models.ManyToManyField(DiversityClassification,  related_name="vendorbasic_diversity_rev",blank=True )
    payment_term = models.ManyToManyField(PaymentTerm,  related_name="vendorbasic_payterm_rev", blank=True)
    approval_status = models.CharField(max_length=50, choices=approval_options, default="pending", blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendorbasic_created_rev")
    created_at = models.DateField(default=timezone.now)
    objects = models.Manager()
    ApprovedVendors = ApprovedVendors()
    PendingVendors = PendingVendors()

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
    vendor_file = models.FileField(blank=False, null=False, default='settings.MEDIA_ROOT/download.png')
    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="vendor_fileupload")
    file_name = models.CharField(max_length=255)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendor_upload_user")
    uploaded_at = models.DateTimeField(default=timezone.now)

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


class VendorAddress(models.Model):

    address_options = (
        ('HO', 'HO'),
        ('SO', 'SO'),
    )

    billing_options = (
        ('Yes', 'Yes'),
        ('No', 'No'),
    )

    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="vendor_address_rev")
    address_type = models.CharField(max_length=50, choices=address_options, default="HO",)
    street_address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255)
    suburb_name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    billing_status = models.CharField(max_length=50, choices=billing_options, default="No",)
    longitude = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.CharField(max_length=255, blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendor_address_created")
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.city

class Notes(models.Model):

    category_options = (
        ('General', 'General'),
        ('Audits', 'Audits'),
        ('Billing', 'Billing'),
        ('Flags', 'Flags'),
        ('Insurance', 'Insurance'),
        ('Client Changes', 'Client Changes'),
        ('Other', 'Other'),
        ('Client Qualification', 'Client Qualification'),
        ('Employee', 'Employee'),
        ('Risk Ranking', 'Risk Ranking'),
        ('Registration', 'Registration'),
        ('Trades', 'Trades'),
    )

    priority_options = (
        ('low', 'low'),
        ('medium', 'medium'),
        ('high', 'high'),
    )

    notes_file = models.FileField(blank=True, null=True, default='settings.MEDIA_ROOT/download.png')
    category = models.CharField(max_length=50, choices=category_options, default="No",)
    priority = models.CharField(max_length=50, choices=priority_options, default="low",)
    subject = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes_user")
    created_at = models.DateTimeField(default=timezone.now)
    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="vendor_notes_rev")
    
    def __str__(self):
        return self.subject

class VendorHistory(models.Model):

    billing_options = (
        ('create', 'create'),
        ('modification', 'modification'),
    )

    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="vendor_history")
    item_changed = models.CharField(max_length=255, blank=True, null=True, )
    model_changed = models.CharField(max_length=255, blank=True, null=True, )
    change_type = models.CharField(max_length=50, choices=billing_options, default="create",)
    pre_value = models.CharField(max_length=255, blank=True, null=True)
    post_value = models.CharField(max_length=255, blank=True, null=True)
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vendor_history_user")
    modified_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.change_type

class ReviewTemplate(models.Model):

    status_options = (
        ('active', 'active'),
        ('deactivated', 'deactivated'),
    )

    name = models.CharField(max_length=255 )
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="review_template_user")
    created_at = models.DateField(default=timezone.now)
    JSON_fields = models.JSONField()
    status = models.CharField(max_length=50, choices=status_options, default="active",)

    def __str__(self):
        return self.name

class ReviewResponseStatus(models.Model):

    review_status_options = (
        ('pending', 'pending'),
        ('submitted', 'submitted'),
        ('completed', 'completed'),
    )

    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="response_status_vendor")
    review_template = models.JSONField()
    overall_status = models.CharField(max_length=255,choices=review_status_options,default='pending')
    overall_rating = models.CharField(max_length=255,default='0' ) 
    review_name=models.CharField(max_length=255,blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="review_resp_user",blank=True, null=True)
    review_type = models.CharField(max_length=255 ) 

    def __str__(self):
        return self.review_name


class ReviewResponse(models.Model):

    question_options = (
        ('Text', 'Text'),
        ('Dropdown', 'Dropdown'),
    )

    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="vendor_review_user")
    template_id = models.ForeignKey(ReviewResponseStatus, on_delete=models.CASCADE, related_name="review_response_template",)
    section_name = models.CharField(max_length=255 )
    question_no = models.CharField(max_length=255 )
    question_text = models.TextField()
    answer = models.TextField()
    question_type = models.CharField(max_length=50, choices=question_options, default="Text",)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="review_response_user")

    def __str__(self):
        return self.section_name


class ComplianceTask(models.Model):

    activation_options = (
        ('active', 'active'),
        ('deactivated', 'deactivated'),
    )

    priority_options = (
        ('high', 'high'),
        ('medium', 'medium'),
        ('low', 'low'),
    )

    req_status_options = (
        ('optional', 'optional'),
        ('compulsory', 'compulsory'),
        ('conditional', 'conditional'),
    )
    form_type_options = (
        ('auto_answer', 'auto_answer'),
        ('to_be_reviewed', 'to_be_reviewed')
    )
    form_questions = models.JSONField()
    form_name = models.CharField(max_length=255)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name="compliance_task_cat")
    form_type = models.CharField(max_length=75, choices=form_type_options, default="auto_answer",)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="compliance_creator_user")
    created_at = models.DateField(default=timezone.now, blank=True, null=True)
    last_modified_date = models.DateField(default=timezone.now)
    activation_status = models.CharField(max_length=50, choices=activation_options, default="active",)
    priority = models.CharField(max_length=50, choices=priority_options, default="low",)
    req_status = models.CharField(max_length=50, choices=req_status_options, default="optional",)

    def __str__(self):
        return self.form_name

class ComplianceVendorTask(models.Model):

    completion_options = (
        ('done', 'done'),
        ('pending', 'pending'),
        ('overdue', 'overdue'),
        ('submitted', 'submitted'),
    )

    priority_options = (
        ('high', 'high'),
        ('medium', 'medium'),
        ('low', 'low'),
    )

    req_status_options = (
        ('optional', 'optional'),
        ('compulsory', 'compulsory'),
        ('conditional', 'conditional'),
    )

    compliance_options = (
        ('compliant', 'compliant'),
        ('non-compliant', 'non-compliant'),
        ('forced-compliant', 'forced-compliant'),
        ('forced-non-compliant', 'forced-non-compliant'),
        ('conditional-compliant', 'conditional-compliant'),
    )

    form_type_options = (
        ('auto_answer', 'auto_answer'),
        ('to_be_reviewed', 'to_be_reviewed')
    )

    compliance_template = models.JSONField()
    compliance_form_name = models.CharField(max_length=255, blank=True, null=True, )
    priority = models.CharField(max_length=50, choices=priority_options, default="low",)
    req_status = models.CharField(max_length=50, choices=req_status_options, default="optional",)
    completion_status = models.CharField(max_length=50, choices=completion_options, default="pending",)
    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="compliance_task_vendor")
    created_at = models.DateField(default=timezone.now)
    deadline = models.DateField()
    last_updated = models.DateField(blank=True, null=True,)
    compliance_status = models.CharField(max_length=50, choices=compliance_options, default="conditional-compliant",)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="compliance_vendor_user",)
    form_type = models.CharField(max_length=255, choices=form_type_options, default="to_be_reviewed",)

    def __str__(self):
        return self.req_status

class ComplianceVendorResponse(models.Model):

    question_options = (
        ('Text', 'Text'),
        ('Date', 'Date'),
        ('Dropdown', 'Dropdown'),
        ('Radio', 'Radio'),
        ('Checkbox', 'Checkbox'),
        ('File Upload', 'File Upload'),
    )

    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="comp_vendor_response")
    compliance_template_id = models.ForeignKey(ComplianceVendorTask, on_delete=models.CASCADE, related_name="comp_vendor_response_template")
    section_name = models.CharField(max_length=255 )
    question_no = models.CharField(max_length=255 )
    question_text = models.TextField()
    answer = models.TextField()
    question_type = models.CharField(max_length=50, choices=question_options, default="Text",)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comp_vendor_response_user")

    def __str__(self):
        return self.section_name

class ComplianceTaskCriteria(models.Model):

    compliance_template_id = models.ForeignKey(ReviewTemplate, on_delete=models.CASCADE, related_name="comp_task_criteria_template")

    def __str__(self):
        return self.compliance_template_id

class VendorComplianceStatus(models.Model):

    compliance_options = (
        ('compliant', 'compliant'),
        ('non-compliant', 'non-compliant'),
        ('forced-compliant', 'forced-compliant'),
        ('forced-non-compliant', 'forced-non-compliant'),
    )

    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="comp_status_vendor") 
    compliance_status = models.CharField(max_length=50, choices=compliance_options, default="non-compliant",)

    def __str__(self):
        return self.compliance_status

class VendorComplianceHistory(models.Model):

    change_options = (
        ('submit', 'submit'),
        ('rating', 'rating'),
    )

    vendor_id = models.ForeignKey(VendorBasicInfo, on_delete=models.CASCADE, related_name="comp_history_vendor")
    compliance_template_id = models.ForeignKey(ReviewTemplate, on_delete=models.CASCADE, related_name="comp_history_template")
    change_type = models.CharField(max_length=50, choices=change_options, default="submit",)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comp_history_user")
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.section_name