from django.db import models

from core.abstract.models import AbstractModel, AbstractManager
from core.post.models import Post
from core.user.models import User
class CommentManager(AbstractManager):
    pass

class Comment(AbstractModel):
    post = models.ForeignKey(Post, on_delete=models.PROTECT)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    body = models.TextField()
    edited = models.BooleanField(default = False)
    objects = CommentManager()
    
    def __str__(self):
        return self.author.name