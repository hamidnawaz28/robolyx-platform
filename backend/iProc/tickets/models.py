from django.db import models
from django.contrib.auth.models import User
import os


class List(models.Model):
    list_title = models.CharField(max_length=255)
    list_color = models.CharField(max_length=75)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rev_user_list')
    creation_date = models.DateField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.list_title

class Ticket(models.Model):

    type_options = (
        ('New_feature', 'New feature'),
        ('Data_Discrepancy', 'Data Discrepancy'),
        ('Software_bug', 'Software bug'),
        ('Custom_Analytics_request', 'Custom Analytics request'),
        ('Data_import_export_issue', 'Data import/export issue'),
        ('other', 'other'),
    )

    prority_options = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    )

    status_options = (
        ('resolved', 'resolved'),
        ('pending', 'pending'),
        ('in_progress', 'InProgress'),
        
    )

    status_archive = (
        ('Active', 'Active'),
        ('Archive', 'Archive'),
        
    )

    ticket_title = models.CharField(max_length=255)
    ticket_content = models.TextField()
    ticket_number = models.CharField(max_length=255)
    lst_id = models.ForeignKey(List, on_delete=models.CASCADE, related_name='revlisttickets', default=1)
    ticket_color = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rev_user_ticket')
    creation_date = models.DateField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now_add=True)
    priority = models.CharField(max_length=50, choices=prority_options, default="low")
    archive = models.CharField(max_length=50, choices=status_archive, default="Active")
    ticket_types = models.CharField(max_length=50, choices=type_options, default="Other")
    responsible_person = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rev_user_resperson', null=True, blank=True)
    due_date = models.DateField()
    status = models.CharField(max_length=20, choices=status_options, default="pending")


def UploadedTicketPath(instance, filename):
    return os.path.join('static', 'tickets_uploads', str(instance.ticket_id), filename)

class Ticket_upload(models.Model):
    file_title = models.CharField(max_length=255)
    upload_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rev_user_upload')
    ticket_id = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='rev_upload_ticket')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    ticket_file = models.FileField(blank=False, null=False, upload_to=UploadedTicketPath,)

    def __str__(self):
        return str(self.file_title)

class IndexHistory(models.Model):
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE)
    lst_id = models.ForeignKey(List, on_delete=models.CASCADE, related_name='rev_list_history')
    current_index = models.CharField(max_length=255)
    destination_index = models.CharField(max_length=255)
    modified_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.current_index

class ContentHistory(models.Model):
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket_id = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='rev_ticket_history',)
    item_changed = models.CharField(max_length=255, blank=True, null=True)
    change_type = models.CharField(max_length=255, default='modification')
    pre_value = models.CharField(max_length=255, blank=True, null=True)
    post_value = models.CharField(max_length=255, blank=True, null=True)
    modified_at = models.DateTimeField(auto_now_add=True) 
    
    def __str__(self):
        return self.change_type