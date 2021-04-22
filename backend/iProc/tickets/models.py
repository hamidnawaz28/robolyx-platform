from django.db import models
from django.contrib.auth.models import User
import os


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

    list_options = (
        ('Open_Tickets', 'Open Tickets'),
        ('In_Progress_Tickets', 'In Progress Tickets'),
        ('Resolved_Tickets', 'Resolved Tickets'),
    )

    ticket_title = models.CharField(max_length=255)
    ticket_content = models.TextField()
    ticket_number = models.CharField(max_length=255, unique=True)
    list_tickets = models.CharField(max_length=50, choices=list_options, default="Open Tickets")
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

    display_id = models.IntegerField(default=1)

    def save(self, *args, **kwargs):
        # This means that the model isn't saved to the database yet
        if self._state.adding:
            last_id = Ticket.objects.all().aggregate(largest=models.Max('display_id'))['largest']
            if last_id is not None:
                self.display_id = last_id + 1

        super(Ticket, self).save(*args, **kwargs)

    

    def __str__(self):
        return str(self.ticket_title)


def UploadedTicketPath(instance, filename):
    return os.path.join('static', 'tickets_uploads', str(instance.ticket_id), filename)

class Ticket_upload(models.Model):
    file_title = models.CharField(max_length=255)
    upload_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rev_user_upload')
    ticket_id = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='rev_upload_ticket')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    ticket_file = models.FileField(blank=False, null=False, )

    def __str__(self):
        return str(self.file_title)

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