from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('shop', 'Shop'),
        ('distributor', 'Distributor'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='shop')


class Shop(models.Model):
    name = models.CharField(max_length=100)
    contact_email = models.EmailField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Frame(models.Model):
    product_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)

class LensType(models.Model):
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)

class Inventory(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    frame = models.ForeignKey(Frame, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    reserved_quantity = models.IntegerField(default=0)
    last_restocked = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

class Sale(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    frame = models.ForeignKey(Frame, on_delete=models.CASCADE)
    lens_type = models.ForeignKey(LensType, on_delete=models.SET_NULL, null=True)
    frame_price = models.DecimalField(max_digits=10, decimal_places=2)
    lens_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    sold_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    sale_date = models.DateTimeField(auto_now_add=True)
    is_billed = models.BooleanField(default=False)

class Bill(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    bill_number = models.CharField(max_length=50, unique=True)
    billing_period = models.CharField(max_length=10)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_items = models.IntegerField()
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)

class BillItem(models.Model):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE)
    frame_product_id = models.CharField(max_length=100)
    frame_name = models.CharField(max_length=100)
    lens_type_name = models.CharField(max_length=100)
    frame_price = models.DecimalField(max_digits=10, decimal_places=2)
    lens_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    sale_date = models.DateTimeField()
