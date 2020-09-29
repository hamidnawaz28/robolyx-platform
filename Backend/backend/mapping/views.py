from django.shortcuts import render
from mapping.models import AllTempletes,SavedTempletes,invoiceColumns
from django.http import HttpResponse
from django.http import JsonResponse
# from rest_framework import serializers
from rest_framework import generics
from django.core import serializers
import pdb
import json
# from .mappingserielizer import TodoSerializer
def GivenColumns(request):
    # pdb.set_trace()
    if(request.method=="GET"):
        allData = AllTempletes.objects.all()
        savedColmnsJsonData = serializers.serialize("json",allData)
        return HttpResponse(savedColmnsJsonData, content_type="text/json-comment-filtered")
def SavedColumns(request):
    if(request.method=="GET"):
        defaultTempleteReferenceKey = request.GET.get("pk")
        defaultSelectedTempleteRef  = AllTempletes.objects.get(pk=defaultTempleteReferenceKey)
        # pdb.set_trace()
        mySavedTempletesDefaultData = SavedTempletes.objects.filter(defaultTempleteReference=defaultSelectedTempleteRef)
        # savedColumnsGet = SavedTempletes.objects.all()
        mySavedTempletesDefaultDataJSON = serializers.serialize("json",mySavedTempletesDefaultData)
        return HttpResponse(mySavedTempletesDefaultDataJSON, content_type="text/json-comment-filtered")
    if(request.method=="POST"):
        requestBodyParameters       = json.loads(request.body)
        NewTempleteName             =  requestBodyParameters["SavedTempleteName"]
        NewTempleteColumns          =  requestBodyParameters["SavedTempleteColumns"] 
        NewTempleteRef              = requestBodyParameters["pk"]
        defaultSelectedTempleteRef  = AllTempletes.objects.get(pk=NewTempleteRef)
        getTempleteOfDefaultGroup   = SavedTempletes(SavedTempleteName=NewTempleteName, SavedTempleteColumns=NewTempleteColumns,defaultTempleteReference=defaultSelectedTempleteRef)
        getTempleteOfDefaultGroup.save()
        return HttpResponse("Success Fully Added New Templete", content_type="text/json-comment-filtered")
def InvoiceDataColumns(request):
    if(request.method=="POST"):
        INVOICE_ID=""
        GL_DATE ='2020-02-28'
        INV_ORGINE= ''
        INV_DATE='2020-02-28'
        INV_SOURCE= ''
        INV_NUMBER= ''
        VENDOR_NUMBER= ''
        VENDOR_NAME= ''
        VENDOR_TYPE= ''
        INV_TERMS= ''
        LINE_NUMBER= ''
        LINE_TYPE= ''
        LINE_DESCRIPTION= ''
        LINE_QUANTITY= ''
        LINE_UNIT_PRICE =0
        LINE_UNIT_OF_MEASURE= ''
        LINE_AMOUNT=0
        GENERAL_LEDGER= ''
        LOCATION= ''
        DEPARTMENT=''
        ACCOUNT= ''
        PO_NUMBER= ''
        CREATION_DATE='2020-02-28'
        requestBodyParameters = json.loads(request.body)
        ColumnNames         =requestBodyParameters["ColumnNames"] 
        ColumnsData         =requestBodyParameters["ColumnsData"]
        DefaultTempleteRef   =requestBodyParameters["DefaultTempletePK"]
        SelectedSavedTempleteRef =requestBodyParameters["SelectedSavedTempleteRef"]
        SavedtempleteRef = SavedTempletes.objects.get(pk=SelectedSavedTempleteRef)
        DefaultTempletePK  = AllTempletes.objects.get(pk=DefaultTempleteRef)
        for dataIndex in range(len(ColumnsData[0])):
            for columnIndex in range(len(ColumnNames)):
                if(ColumnNames[columnIndex]=="INVOICE_ID"):
                    INVOICE_ID = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="GL_DATE"):
                    GL_DATE = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="INV_ORGINE"):
                    INV_ORGINE = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="INV_DATE"):
                    INV_DATE = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="INV_SOURCE"):
                    INV_SOURCE = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="INV_NUMBER"):
                    INV_NUMBER = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="VENDOR_NUMBER"):
                    VENDOR_NUMBER = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="VENDOR_NAME"):
                    VENDOR_NAME = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="VENDOR_TYPE"):
                    VENDOR_TYPE = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="INV_TERMS"):
                    INV_TERMS = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="LINE_NUMBER"):
                    LINE_NUMBER = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="LINE_TYPE"):
                    LINE_TYPE = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="LINE_DESCRIPTION"):
                    LINE_DESCRIPTION = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="LINE_QUANTITY"):
                    LINE_QUANTITY = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="LINE_UNIT_PRICE"):
                    LINE_UNIT_PRICE = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="LINE_UNIT_OF_MEASURE"):
                    LINE_UNIT_OF_MEASURE = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="LINE_AMOUNT"):
                    LINE_AMOUNT = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="GENERAL_LEDGER"):
                    GENERAL_LEDGER = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="LOCATION"):
                    LOCATION = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="DEPARTMENT"):
                    DEPARTMENT = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="ACCOUNT"):
                    ACCOUNT = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="PO_NUMBER"):
                    PO_NUMBER = ColumnsData[columnIndex][dataIndex]
                elif(ColumnNames[columnIndex]=="CREATION_DATE"):
                    CREATION_DATE = ColumnsData[columnIndex][dataIndex]
                else :
                    pass
            #print("INVOICE_ID="+INVOICE_ID + "GL_DATE ="+GL_DATE + "INV_ORGINE= "+INV_ORGINE+ "INV_DATE="+INV_DATE+ "INV_SOURCE= "+INV_SOURCE+ "INV_NUMBER=" +INV_NUMBER+ "VENDOR_NUMBER=" +VENDOR_NUMBER+ "VENDOR_NAME=" +VENDOR_NAME+ "VENDOR_TYPE=" +VENDOR_TYPE+ "INV_TERMS=" +INV_TERMS+ "LINE_NUMBER=" +LINE_NUMBER+ "LINE_TYPE=" +LINE_TYPE+ "LINE_DESCRIPTION=" +LINE_DESCRIPTION+ "LINE_QUANTITY= "+LINE_QUANTITY+ "LINE_UNIT_PRICE ="+str(LINE_UNIT_PRICE)+ "LINE_UNIT_OF_MEASURE=" +LINE_UNIT_OF_MEASURE+ "LINE_AMOUNT="+str(LINE_AMOUNT)+ "GENERAL_LEDGER=" +GENERAL_LEDGER+ "LOCATION=" +LOCATION+ "DEPARTMENT="+DEPARTMENT+ "ACCOUNT="+ ACCOUNT+ "PO_NUMBER="+ PO_NUMBER+" CREATION_DATE="+CREATION_DATE+ "AllTempletesPK =")
            newInvoice = invoiceColumns(INVOICE_ID=INVOICE_ID, GL_DATE =GL_DATE, INV_ORGINE= INV_ORGINE, INV_DATE=INV_DATE, INV_SOURCE= INV_SOURCE, INV_NUMBER= INV_NUMBER, VENDOR_NUMBER= VENDOR_NUMBER, VENDOR_NAME= VENDOR_NAME, VENDOR_TYPE= VENDOR_TYPE, INV_TERMS= INV_TERMS, LINE_NUMBER= LINE_NUMBER, LINE_TYPE= LINE_TYPE, LINE_DESCRIPTION= LINE_DESCRIPTION, LINE_QUANTITY= LINE_QUANTITY, LINE_UNIT_PRICE =LINE_UNIT_PRICE, LINE_UNIT_OF_MEASURE= LINE_UNIT_OF_MEASURE, LINE_AMOUNT=LINE_AMOUNT, GENERAL_LEDGER= GENERAL_LEDGER, LOCATION= LOCATION, DEPARTMENT=DEPARTMENT, ACCOUNT= ACCOUNT, PO_NUMBER= PO_NUMBER, CREATION_DATE=CREATION_DATE, AllTempletesPK = DefaultTempletePK, SavedTempletesPK =SavedtempleteRef)
            newInvoice.save()
        return HttpResponse("Success Fully Added"+str(len(ColumnsData[0]))+"Lines", content_type="text/json-comment-filtered")
    if(request.method=="GET"):
        invoiceGetData = invoiceColumns.objects.all()
        invoiceJsonData = serializers.serialize("json",invoiceGetData)
        return HttpResponse(invoiceJsonData, content_type="text/json-comment-filtered")
