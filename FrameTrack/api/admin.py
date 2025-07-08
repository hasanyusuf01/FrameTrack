from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Shop)
admin.site.register(Frame)
admin.site.register(LensType)
admin.site.register(Inventory)
admin.site.register(Sale)
admin.site.register(Bill)
admin.site.register(BillItem)
