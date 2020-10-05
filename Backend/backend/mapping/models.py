from django.db import models

# Create your models here.
class InvoiceDefaultTempletes(models.Model):
    templeteName  = models.CharField(max_length =75)
    templeteItems = models.CharField(max_length = 1000)
    # class Meta:
    #     templeteName = "Templete Name"

    def _str_(self):
        return self.templeteName
    # def templeteName_preview(self):
    #     return self.templeteName
class InvoiceSavedTempletes(models.Model): 
    SavedTempleteName  = models.CharField(max_length =75)
    SavedTempleteColumns = models.CharField(max_length = 1500)
    defaultTempleteReference =models.ForeignKey(InvoiceDefaultTempletes, on_delete=models.CASCADE)
class InvoiceDataColumns(models.Model):
    INVOICE_ID = models.CharField(max_length =75, blank=False)
    GL_DATE =models.DateField()
    INV_ORGINE= models.CharField(max_length =75, blank=True)
    INV_DATE=models.DateField()
    INV_SOURCE= models.CharField(max_length =75, blank=False)
    INV_NUMBER= models.CharField(max_length =75, blank=False)
    VENDOR_NUMBER= models.CharField(max_length =75, blank=False)
    VENDOR_NAME= models.CharField(max_length =75, blank=False)
    VENDOR_TYPE= models.CharField(max_length =75, blank=True)
    INV_TERMS= models.CharField(max_length =75, blank=True)
    LINE_NUMBER= models.CharField(max_length =75, blank=True)
    LINE_TYPE= models.CharField(max_length =75, blank=True)
    LINE_DESCRIPTION= models.CharField(max_length =75, blank=False)
    LINE_QUANTITY= models.CharField(max_length =75, blank=False)
    LINE_UNIT_PRICE =models.FloatField(blank=True)
    LINE_UNIT_OF_MEASURE= models.CharField(max_length =75, blank=True)
    LINE_AMOUNT=models.FloatField(blank=False)
    GENERAL_LEDGER= models.CharField(max_length =75, blank=False)
    LOCATION= models.CharField(max_length =75, blank=True)
    DEPARTMENT= models.CharField(max_length =75, blank=True)
    ACCOUNT= models.CharField(max_length =75, blank=True)
    PO_NUMBER= models.CharField(max_length =75, blank=False)
    CREATION_DATE=models.DateField()
    AllTempletesPK = models.ForeignKey(InvoiceDefaultTempletes, on_delete=models.CASCADE)
    SavedTempletesPK = models.ForeignKey(InvoiceSavedTempletes, on_delete=models.CASCADE)
class TaxomyDefaultTempletes(models.Model):
    taxomyDefaulTempleteName= models.CharField(max_length= 75)
    taxomyDefaultTempleteItems = models.CharField(max_length=1500)
class TaxomySavedTempletes(models.Model):
    taxomySavedTempleteName  = models.CharField(max_length =75)
    taxomySavedTempleteItems = models.CharField(max_length = 1500)
    taxomyDefaultTempleteReference =models.ForeignKey(TaxomyDefaultTempletes, on_delete=models.CASCADE)
class TaxomyDataColumns(models.Model):
    PRIORITY= models.CharField(max_length=75)
    MAIN_CATAGORY = models.CharField(max_length=250)
    CATAGORY_LEVEL_ONE = models.CharField(max_length=75)
    CATAGORY_LEVEL_TWO = models.CharField(max_length=75)
    CATAGORY_LEVEL_THREE = models.CharField(max_length=75)
    CATAGORY_LEVEL_FOUR = models.CharField(max_length=75)
    CATAGORY_LEVEL_FIVE = models.CharField(max_length=75)
    SCOPE= models.CharField(max_length=75)
    TaxomyDefaultTempletesPK= models.ForeignKey(TaxomyDefaultTempletes, on_delete=models.CASCADE)
    TaxomySavedTempletesPK = models.ForeignKey(TaxomySavedTempletes, on_delete=models.CASCADE)





    