# Generated by Django 3.1.7 on 2021-05-04 02:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basic_config', '0005_auto_20210504_0607'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paymentterm',
            name='name',
            field=models.TextField(max_length=255, primary_key=True, serialize=False),
        ),
    ]
