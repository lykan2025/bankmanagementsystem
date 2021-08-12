from rest_framework import serializers
from .models import AccountHolder,Account,Sheet
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

class AccountHolderSerializer(serializers.ModelSerializer):
    class Meta:
        model=AccountHolder
        fields=(
            'name',
            'email_address',
            'mobile_number',
            'password',
            'Adhaar_number',
            'pancard_number',
            'manager'
        )

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=(
            'account_number',
            'type',
            'balance',
            'created',
            'accountholder'
        )

class SheetSerializer(serializers.ModelSerializer):
    class Meta:
        model=Sheet
        fields=(
            'description',
            'datetime',
            'credit',
            'debit',
            'total',
            'account'
        )

class AccountLoginSerializer(serializers.ModelSerializer):
    user_accounts=AccountSerializer(many=True)
    class Meta:
        model=AccountHolder
        fields=(
            'id',
            'name',
            'email_address',
            'mobile_number',
            'user_accounts',
        )



