# Generated by Django 3.1.7 on 2021-05-04 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor_management', '0005_auto_20210429_1858'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='categories',
            name='id',
        ),
        migrations.RemoveField(
            model_name='diversityclassification',
            name='id',
        ),
        migrations.RemoveField(
            model_name='trades',
            name='id',
        ),
        migrations.AlterField(
            model_name='categories',
            name='name',
            field=models.CharField(max_length=255, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='diversityclassification',
            name='name',
            field=models.CharField(max_length=255, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='trades',
            name='name',
            field=models.CharField(max_length=255, primary_key=True, serialize=False),
        ),
    ]