from rest_framework import serializers
from core.abstract.serializers import AbstractSerializer
from core.user.models import User
from django.conf import settings

class UserSerializer(AbstractSerializer):
    # id = serializers.UUIDField(source = 'public_id', read_only = True, format ='hex')
    # created = serializers.DateTimeField(read_only = True)
    # updated = serializers.DateTimeField(read_only = True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name','bio','avatar', 'email', 'is_active', 'created', 'updated']
        read_only_fields = ['id', 'created', 'updated']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        if not representation['avatar']:
            representation['avatar'] = settings.DEFAULT_AUTO_FIELD
            return representation
        
        if settings.DEBUG:
            request = self.context.get('request')
            representation['avatar'] = request.build_absolute_uri(representation['avatar'])
    
        return representation