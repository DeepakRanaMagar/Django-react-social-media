from rest_framework.permissions import AllowAny
from rest_framework import viewsets

from core.user.serializers import UserSerializer
from core.user.models import User

class UserViewSet(viewsets.ModelViewSet):
    # PATCH similar to PUT but not completely the same 
    http_method_names = ('patch', 'get') 
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    
    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.exclude(is_superuser=True)
    def get_object(self):
        obj = User.object.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permission(self.request, obj)
        return obj 
    