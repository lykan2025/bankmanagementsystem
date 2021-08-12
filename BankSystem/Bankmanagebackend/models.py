from django.db import models


# Create your models here.
class AccountHolder(models.Model):
    name=models.CharField(max_length=20)
    email_address=models.EmailField(max_length=254,default="abc@gmail.com")
    mobile_number=models.IntegerField()
    password=models.CharField(max_length=100)
    Adhaar_number=models.IntegerField()
    pancard_number=models.CharField(max_length=20)
    manager=models.BooleanField(default=False)
    

    def __str__(self):
        return self.name

class Account(models.Model):
    account_number=models.IntegerField(default=0)
    type=models.CharField(max_length=10)
    balance=models.IntegerField(default=0)
    created=models.DateTimeField(null=True)
    accountholder=models.ForeignKey(AccountHolder,on_delete=models.CASCADE,related_name="user_accounts")

    def __str__(self):
        return self.type

class Sheet(models.Model):
    description=models.CharField(max_length=50)
    datetime=models.DateTimeField()
    credit=models.IntegerField()
    debit=models.IntegerField()
    total=models.IntegerField()
    account=models.ForeignKey(Account,on_delete=models.CASCADE)



