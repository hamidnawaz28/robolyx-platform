# Generated by Django 3.1.7 on 2021-04-28 10:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('basic_config', '0003_auto_20210421_2056'),
        ('vendor_management', '0002_auto_20210424_2027'),
    ]

    operations = [
        migrations.AddField(
            model_name='trades',
            name='trade_status',
            field=models.CharField(choices=[('primary', 'primary'), ('secondary', 'secondary')], default='secondary', max_length=50),
        ),
        migrations.AlterField(
            model_name='vendorbasicinfo',
            name='approval_status',
            field=models.CharField(blank=True, choices=[('approved', 'approved'), ('rejected', 'rejected'), ('pending', 'pending')], default='pending', max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='vendorbasicinfo',
            name='diversity',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='vendorbasic_diversity_rev', to='vendor_management.diversityclassification'),
        ),
        migrations.AlterField(
            model_name='vendorbasicinfo',
            name='payment_term',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='vendorbasic_payterm_rev', to='basic_config.paymentterm'),
        ),
    ]
