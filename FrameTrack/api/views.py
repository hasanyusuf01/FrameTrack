from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Count
from rest_framework.authtoken.models import Token
from django.core.exceptions import ValidationError
from .models import Shop, Frame, LensType, Inventory, Sale, Bill, BillItem
from .serializers import *
from django.contrib.auth import authenticate
from .models import User
import random

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class FrameViewSet(viewsets.ModelViewSet):
    queryset = Frame.objects.filter(is_active=True)
    serializer_class = FrameSerializer

    def get_queryset(self):
        q = self.request.query_params.get('q')
        qs = Frame.objects.filter(is_active=True)
        if q:
            qs = qs.filter(name__icontains=q)
        return qs

class LensTypeViewSet(viewsets.ModelViewSet):
    queryset = LensType.objects.all()
    serializer_class = LensTypeSerializer

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        inventory = Inventory.objects.get(shop=instance.shop, frame=instance.frame)
        inventory.quantity -= 1
        inventory.save()

class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

class BillItemViewSet(viewsets.ModelViewSet):
    queryset = BillItem.objects.all()
    serializer_class = BillItemSerializer

@api_view(['GET'])
def sales_metrics(request):
    total_revenue = Sale.objects.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
    total_items = Sale.objects.count()
    total_shops = Shop.objects.count()
    return Response({
        "totalRevenue": total_revenue,
        "itemsSold": total_items,
        "totalShops": total_shops
    })

@api_view(['GET'])
def top_frames(request):
    result = Sale.objects.values('frame__name').annotate(
        sales_count=Count('id'),
        revenue=Sum('total_amount')
    ).order_by('-sales_count')[:5]
    return Response(result)   

@api_view(['POST'])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    role = request.data.get("role", "shop")

    if not username or not password:
        return Response({"error": "Username and password are required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=400)

    try:
        user = User.objects.create_user(username=username, password=password)
        user.role = role
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    except Exception as e:
        print("Registration failed:", e)
        return Response({"error": str(e)}, status=500)


@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Invalid credentials"}, status=401)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key})


@api_view(['GET'])
def top_shops(request):
    result = (
        Sale.objects
        .values('shop__name')
        .annotate(
            sales_count=Count('id'),
            revenue=Sum('total_amount')
        )
        .order_by('-revenue')
    )

    # Add mock growth percentage
    for r in result:
        r['growth'] = round(random.randint(5, 20))  # mock value

    return Response(result)
