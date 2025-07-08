from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ShopViewSet, FrameViewSet, LensTypeViewSet, InventoryViewSet,
    SaleViewSet, BillViewSet, BillItemViewSet, login,
    sales_metrics, top_frames, register, top_shops
)

router = DefaultRouter()
router.register(r'shops', ShopViewSet)
router.register(r'frames', FrameViewSet)
router.register(r'lens-types', LensTypeViewSet)
router.register(r'inventory', InventoryViewSet)
router.register(r'sales', SaleViewSet)
router.register(r'bills', BillViewSet)
router.register(r'bill-items', BillItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('metrics/', sales_metrics),
    path('top-frames/', top_frames),
        path('register/', register),
    path('login/', login),
     path('top-shops/', top_shops),
]
