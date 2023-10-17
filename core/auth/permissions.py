def has_object_permission(self, request, view, obj):
    
    if view.basename in ["post-comment"]:
        if request.method in ['Delete']:
            return bool(request.user.is_superuser or request.user in [obj.author, obj.post.author])
        
    return bool(request.user and request.user.is_authenticated)