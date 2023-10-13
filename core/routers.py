from rest_framework import routers
from core.user.viewsets import UserViewSet
from django.urls import path, include

router = routers.DefaultRouter()

router.register(r'user', UserViewSet, basename = 'user')
'''
    register takes two args where; first is prefix which is string endpoint basically and second is the valid viewset class
    basename is used to set the endpoint name
'''
urlpatterns = [
    path('', include(router.urls)),
]