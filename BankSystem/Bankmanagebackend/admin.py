from django.contrib import admin
from .models import AccountHolder,Account,Sheet

class AccountHolderAdmin(admin.ModelAdmin):
    list_display=('id','name','mobile_number','email_address','password','Adhaar_number','pancard_number','manager')

class AccountAdmin(admin.ModelAdmin):
    list_display=('account_number','type','balance','created','accountholder','id')

class SheetAdmin(admin.ModelAdmin):
    list_display=('description','datetime','credit','debit','total','account','account_id')

admin.site.register(AccountHolder,AccountHolderAdmin)
admin.site.register(Account,AccountAdmin)
admin.site.register(Sheet,SheetAdmin)
