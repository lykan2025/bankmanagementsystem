from django.conf.urls import url
from Bankmanagebackend import views

urlpatterns=[
    url(r'^accountholdercreate',views.accountholder_create),
    url(r'^accountholderlogin',views.accountholder_login),
    url(r'^accountcreate',views.account_create),
    url(r'^depositmoney',views.DepositMoney),
    url(r'^withdrawmoney',views.Withdrawmoney),
    url(r'^sendmoney',views.Sendmoney),
    url(r'^logsheet',views.Logsheet),
    url(r'^accountdelete',views.account_delete),
    url(r'^managerlogin',views.manager_login)
]