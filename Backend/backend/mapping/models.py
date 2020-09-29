from django.db import models

# Create your models here.
class AllTempletes(models.Model):
    templeteName  = models.CharField(max_length =75)
    templeteItems = models.CharField(max_length = 1000)
    # class Meta:
    #     templeteName = "Templete Name"

    def _str_(self):
        return self.templeteName
    # def templeteName_preview(self):
    #     return self.templeteName
class SavedTempletes(models.Model):
    SavedTempleteName  = models.CharField(max_length =75)
    SavedTempleteColumns = models.CharField(max_length = 1000)
    defaultTempleteReference =models.ForeignKey(AllTempletes, on_delete=models.CASCADE)
class invoiceColumns(models.Model):
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
    AllTempletesPK = models.ForeignKey(AllTempletes, on_delete=models.CASCADE)
    SavedTempletesPK = models.ForeignKey(SavedTempletes, on_delete=models.CASCADE)

    