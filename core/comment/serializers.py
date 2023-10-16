from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.abstract.serializers import AbstractSerializer
from core.user.serializers import UserSerializer
from core.user.models import User
from core.post.models import Post
from core.comment.models import Comment

class CommentSerializer(AbstractSerializer):
    author = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')
    post = serializers.SlugRelatedField(queryset=Post.objects.all(), slug_field='public_id')
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        author = User.objects.get_object_by_public_id(rep["author"])
        rep["author"] = UserSerializer(author).data
        return rep
    
    class Meta:
        model = Comment
        '''
            list of fields that can be included in a request or a response
        '''
        fields = ['id', 'post', 'author', 'body', 'edited', 'created', 'updated']
        read_only_fields = ["edited"]
        