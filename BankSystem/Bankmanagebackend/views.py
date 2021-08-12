from django.shortcuts import render,get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import authentication_classes
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import viewsets
from .models import AccountHolder,Account,Sheet
from .serializers import AccountHolderSerializer,AccountSerializer,SheetSerializer,AccountLoginSerializer
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.authtoken.models import Token
import random
from datetime import datetime

def account_number_gen():
    account_number=random.randint(1000000000,9999999999)

    while(Account.objects.filter(account_number=account_number)):
        account_number=random.randint(1000000000,9999999999)
        
    return account_number

@csrf_exempt
def accountholder_create(request):
    if request.method=='POST':
        accountholder_data=request.POST.dict()
        obj1=AccountHolder.objects.filter(mobile_number=accountholder_data['mobile_number'])
        if (obj1):
            return JsonResponse({"error":"name already exists"},safe=False,status=500)
        password=accountholder_data['password']
        if not(len(password)>=8 and len(password)<=16 and any(a.islower() for a in password) and any(a.isupper() for a in password) and any(a.isdigit() for a in password)):
            return JsonResponse({"error":"Password not valid"},safe=False,status=500)
        password=make_password(accountholder_data['password'])
        accountholder_data['password']=password
        accountholderserializer=AccountHolderSerializer(data=accountholder_data)
        obj=AccountHolder.objects.filter(mobile_number=accountholder_data['mobile_number'])
        if accountholderserializer.is_valid() and not(obj):
            accountholderserializer.save()
            return JsonResponse({"messege":"Added successfully"},safe=False)
        return JsonResponse({"error":"failed to add"},safe=False,status=500)
    
@csrf_exempt
def accountholder_login(request,id=0):
    if request.method=='POST':
        accountholder_data=request.POST.dict()
        if accountholder_data['username'].isdigit():
            accountholder=AccountHolder.objects.filter(mobile_number=accountholder_data['username'])
        else:
            accountholder=AccountHolder.objects.filter(email_address=accountholder_data['username'])
        if accountholder and check_password(accountholder_data['password'],accountholder[0].password):
            if accountholder[0].manager==True:
                return JsonResponse({"error":"invalid login"},safe=False,status=500) 
            else:
                accountholder_serializer=AccountLoginSerializer(accountholder,many=True)
                return JsonResponse(accountholder_serializer.data,safe=False)
        else:
            return JsonResponse({"error":"invalid login"},safe=False,status=500)    

@csrf_exempt
def manager_login(request):
    if request.method=='POST':
        accountholder_data=request.POST.dict()
        if accountholder_data['username'].isdigit():
            accountholder=AccountHolder.objects.filter(mobile_number=accountholder_data['username'])
        else:
            accountholder=AccountHolder.objects.filter(email_address=accountholder_data['username'])
        if accountholder and check_password(accountholder_data['password'],accountholder[0].password):
            if accountholder[0].manager==True:
                accountholder_data=request.POST.dict()     
                accountholder=AccountHolder.objects.all()
                accountholder_serializer=AccountLoginSerializer(accountholder,many=True)
                print(accountholder_serializer) 
                return JsonResponse(accountholder_serializer.data,safe=False)     
    return JsonResponse({"error":"invalid login"},safe=False,status=500)              

@csrf_exempt
def account_create(request):
    if request.method=="POST":
        account_data=request.POST.dict()
        print(account_data)
        if(Account.objects.filter(type=account_data['type'], accountholder=AccountHolder.objects.filter(id=account_data['accountholder']).first())):
            return JsonResponse({"error":"Already exist account"},safe=False,status=500)
        account_number=account_number_gen()
        account_data['account_number']=account_number
        account_data['balance']=0
        account_data['created']=datetime.now()
        accountserializer=AccountSerializer(data=account_data)
        if accountserializer.is_valid():
            # import ipdb;ipdb.set_trace()
            accountserializer.save()

            accounts=Account.objects.filter(accountholder_id=account_data['accountholder'])
            serialize=AccountSerializer(accounts,many=True)
            return JsonResponse({"data":serialize.data,"messege":"{} account created successfully".format(account_data['type'])},safe=False)

        return JsonResponse({"error":"Failed to add"},safe=False,status=500)

@csrf_exempt
def DepositMoney(request):
    if request.method=='POST':
        data=request.POST.dict()
        # print(data)
        account=Account.objects.filter(account_number=int(data['account_number'])).first()
        if(not(account)):
            return JsonResponse({"error":"Account not available"},safe=False,status=500)
        account.balance+=int(data['amount'])
        account.save()

        accounts=Account.objects.filter(accountholder_id=data['accountholder'])
        serialize=AccountSerializer(accounts,many=True)

        Sheet.objects.create(description="Credited %d" %int(data['amount']),datetime=datetime.now(),credit=data['amount'],debit=0,total=account.balance,account=account)
        return JsonResponse({"data":serialize.data,"messege":"deposited successfully"},safe=False)

@csrf_exempt
def Withdrawmoney(request):
    if request.method=='POST':
        data=request.POST.dict()
        account=Account.objects.filter(account_number=data['account_number']).first()
        if(not(account)):
            return JsonResponse({"error":"account not available"},safe=False,status=500)
        if account.balance<int(data['amount']):
            return JsonResponse({"error":"account balance is low"},safe=False,status=500)
        account.balance-=int(data['amount'])
        account.save()

        accounts=Account.objects.filter(accountholder_id=data['accountholder'])
        serialize=AccountSerializer(accounts,many=True)

        Sheet.objects.create(description="Debited %d" %int(data['amount']),datetime=datetime.now(),credit=0,debit=data['amount'],total=account.balance,account=account)
        return JsonResponse({"data":serialize.data,"messege":"withdraw successfully"},safe=False)

    
@csrf_exempt
def Sendmoney(request):
    if request.method=='POST':
        data=request.POST.dict()
        sender_account=Account.objects.filter(account_number=data['sender_account_number']).first()
        rec_account=Account.objects.filter(account_number=data['rec_account_number']).first()
        if not(sender_account) or not(rec_account):
            return JsonResponse({"error":"account not available"},safe=False,status=500)
        if sender_account.balance<int(data['amount']):
            return JsonResponse({"error":"account balance is low"},safe=False,status=500)
        sender_account.balance-=int(data['amount'])
        rec_account.balance+=int(data['amount'])
        sender_account.save()
        Sheet.objects.create(description="Debited %d" %int(data['amount']),datetime=datetime.now(),debit=int(data['amount']),credit=0,total=sender_account.balance,account=sender_account)
        rec_account.save()

        accounts=Account.objects.filter(accountholder_id=data['accountholder'])
        serialize=AccountSerializer(accounts,many=True)

        print(serialize.data)

        Sheet.objects.create(description="Credited %d" %int(data['amount']),datetime=datetime.now(),debit=0,credit=data['amount'],total=rec_account.balance,account=rec_account)
        
        return JsonResponse({"data":serialize.data,"messege":"transfered successfully"},safe=False)

   
@csrf_exempt
def Logsheet(request):
    if request.method=='POST':
        data=request.POST.dict()
        print(data)
        sheet=Sheet.objects.filter(account__account_number=int(data['account_number']))
        print(sheet)
        sheetserializer=SheetSerializer(sheet,many=True)
        return JsonResponse(sheetserializer.data,safe=False)

@csrf_exempt
def account_delete(request):
    if request.method=='POST':
        data=request.POST.dict()
        print(data)
        account=Account.objects.filter(account_number=data['account_number'])
        accountholder=AccountHolder.objects.filter(mobile_number=data['mobile_number'])
        account.delete()
        accountholder_serializer=AccountLoginSerializer(accountholder,many=True)
        return JsonResponse(accountholder_serializer.data,safe=False)
        
        
        

        
        




    
 











