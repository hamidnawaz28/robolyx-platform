# Generated by Django 3.1.7 on 2021-04-18 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0014_ticket_ticket_index'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='status',
            field=models.CharField(choices=[('resolved', 'resolved'), ('open', 'open'), ('in_progress', 'InProgress')], default='open', max_length=20),
        ),
    ]
