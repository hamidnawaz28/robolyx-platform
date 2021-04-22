from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import User



class BusinessUnit(models.Model):
    buss_name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bunit_rev")
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.buss_name

class Tags(models.Model):
    tag_name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tag_rev")
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.tag_name

class Department(models.Model):
    dep_name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dep_rev")
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.dep_name

class Regions(models.Model):
    region_name=models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="region_rev")
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.region_name

class Divisions(models.Model):
    div_name=models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="div_rev")
    created_at = models.DateField(default=timezone.now)

    def __str__(self):
        return self.div_name

class Sites(models.Model):
    site_name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="site_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.site_name

class PaymentTerm(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    payment_cycle = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="paymentterm_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name

class Diversity(models.Model):
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="diversity_rev")
    created_at = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name