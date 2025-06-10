from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password')


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
        @classmethod
        def get_token(cls, user):
            token = super().get_token(user)
            
            token['email'] = user.email
            token['username'] = user.username
            return token
        
        def validate(self, attrs):
            data = super().validate(attrs)

            data['email'] = self.user.email
            data['username'] = self.user.username
            return data
        
        