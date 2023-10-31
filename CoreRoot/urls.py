from django.contrib import admin
from django.urls import path
from django.urls import include
from core import routers

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(routers.urlpatterns)),
]
