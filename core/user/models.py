from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from core.abstract.models import AbstractModel, AbstractManager
from core.post.models import Post

class UserManager(BaseUserManager, AbstractManager):
    def get_object_by_public_id(self, public_id):
        try:
            instance = self.get(public_id = public_id)
            return instance
        except(ObjectDoesNotExist, ValueError, TypeError):
            return Http404
    
    def create_user(self, username, email, password, **kwargs):
        if username is None:
            raise TypeError('Username cannot be empty')
        if email is None:
            raise TypeError('Email cannot be empty')
        if password is None:
            raise TypeError('Password cannot be empty')
        user = self.model(username=username, email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **kwargs):
        if username is None:
            raise TypeError('Username cannot be empty for SuperUser')
        if email is None:
            raise TypeError('Email cannot be empty for SuperUser')
        if password is None:
            raise TypeError('Password cannot be empty for SuperUser')
        user = self.create_user(username, email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
    
    def user_directory_path(instance, filename):
        return 'user_{0}/{1}'.format(instance.public_id, filename)
    
class User( AbstractModel, AbstractBaseUser, PermissionsMixin):
    # public_id = models.UUIDField(db_index=True, unique=True, default=uuid.uuid4, editable = False)
    username = models.CharField(db_index=True, unique=True, max_length=255)
    email = models.EmailField(db_index= True, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    # created = models.DateTimeField(auto_now=True)
    # updated = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='user_directory_path', blank=True, null=True)
    posts_liked = models.ManyToManyField(Post, related_name="liked_by")
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = UserManager()
    
    def like(self, post):
        return self.posts_liked.add(post)
    
    def remove_like(self, post):
        return self.posts_liked.remove(post)
    
    def has_liked(self, post):
        return self.posts_liked.filter(pk = post.pk).exists()
    
    
    def __str__(self):
        return f"{self.email}"
    
    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"


