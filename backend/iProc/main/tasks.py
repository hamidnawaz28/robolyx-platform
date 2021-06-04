import logging
from config.celery import app
import pandas as pd
from django.db import IntegrityError,transaction
from main.models import TaxonomyData, InvoiceData, ContractData, GLOrgData, POData, \
    UserProject, DefaultTemplate
import math
@app.task
def add_data(path, file_name, default_template_pk, saved_mapping, project ):
    df_arr=[]
    try:        
        df = pd.read_csv(path+'/media/files/'+file_name, encoding = "ISO-8859-1")
        df_columns = df.columns.tolist()
        out_arr = []
        out_index = []
        for sen_key in saved_mapping:
            for type_key in saved_mapping[sen_key]:
                for item in saved_mapping[sen_key][type_key]:
                    item_value = saved_mapping[sen_key][type_key][item]
                    if item_value in df_columns:
                        index = df_columns.index(item_value)
                        df_columns[index] = item
                        out_index.append(index)
        print("---------3---------")
        
        df.columns = df_columns
        df = df.iloc[:, out_index]
        df_json = list(df.T.to_dict().values())
        table = DefaultTemplate.objects.get(pk=default_template_pk)
        table_name = table.TableName
        with transaction.atomic():
            for payload_index in range(len(df_json)):
                error_row = payload_index+1
                payload =  df_json[payload_index]
                # if(payload_index==len(df_json)-1):
                #     payload['UserProjectReference']=1
                # else:
                payload['UserProjectReference']= UserProject.objects.get(pk=project)
                if table_name == 'invoice' or table_name == 'invoiceWOD':
                    new_object = InvoiceData.objects.create(**payload)
                elif table_name == 'taxonomy':
                    new_object = TaxonomyData.objects.create(**payload)
                elif table_name=='Contract':
                    new_object = ContractData.objects.create(**payload)
                elif table_name=='GLOrg':
                    new_object = GLOrgData.objects.create(**payload)
                elif table_name=='PurchaseOrder':
                    new_object = POData.objects.create(**payload)
    except:
        logging.warning("Error in uploading")
        