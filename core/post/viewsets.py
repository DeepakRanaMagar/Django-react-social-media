from rest_framework.permissions import BasePermission, SAFE_METHODS
from core.abstract.viewsets import AbstractViewSet
from core.post.models import Post
from core.post.serializers import PostSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from core.auth.permissions import UserPermission
from django.core.cache import cache
from django.shortcuts import get_object_or_404

class PostViewSet(AbstractViewSet):
    http_method_names = ('get', 'post', 'put', 'delete')
    permission_classes= (UserPermission, )
    serializer_class = PostSerializer
    filterset_fields = ["author__public_id"]
    
    def get_queryset(self):
        return Post.objects.all()
    
    def get_object(self):
        obj = Post.objects.get_object_by_public_id(self.kwargs['pk'])
        # obj = get_object_or_404(Post, public_id=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    
    def list(self, request, *args, **kwargs):
        post_objects = cache.get("post_objects")
        
        if post_objects is None:
            post_objects = self.filter_queryset(self.get_queryset())
            cache.set("post_objects", post_objects)
            
        page = self.paginate_queryset(post_objects)
        
        if page is None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(post_objects, many=True)
        return Response(serializer.data)
    
    @action(methods=['post'], detail=True)
    def like(self, request, *args, **kwargs):
        post = self.get_object()
        user = self.request.user
        user.like(post)
        serializer = self.serializer_class(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(methods=['post'], detail=True)
    def remove_like(self, request, *args, **kwargs):
        post = self.get_object()
        
        user = self.request.user
        
        user.remove_like(post)
        
        serializer = self.serializer_class(post, context={"request": request})
        
        return Response(serializer.data, status = status.HTTP_200_OK)    
    
