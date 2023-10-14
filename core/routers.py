from rest_framework import routers
from core.user.viewsets import UserViewSet
from django.urls import path, include
from core.auth.viewsets.register import RegisterViewSet
from core.auth.viewsets.login import LoginViewSet
from core.auth.viewsets.refresh import RefreshViewSet
from core.post.viewsets import PostViewSet


router = routers.SimpleRouter()
'''
    register takes two args where; first is prefix which is string endpoint basically and second is the valid viewset class
    basename is used to set the endpoint name
'''
router.register(r'user', UserViewSet, basename = 'user')
router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename = 'auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename = 'auth-refresh')
router.register(r'post', PostViewSet, basename='post')

urlpatterns = [
    *router.urls,
]