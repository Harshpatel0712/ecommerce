from django.contrib import admin  # type: ignore

from .models import Order

# Register your models here.
admin.site.register(Order)
