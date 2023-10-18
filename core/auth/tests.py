import pytest
from rest_framework import status
from core.fixtures.user import user

class TestAuthenticationViewSet:
    endpoint = '/api/auth/'
    
    def test_login(self, client, user):
        data = {
            "username":user.username,
            "password":"test_password"
        }
        response = client.post(self.endpoint + "login/", data)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['access']
        assert response.data['user']['id'] == user.public_id.hex
        assert response.data['user']['username'] == user.username
        assert response.data['user']['email'] == user.email