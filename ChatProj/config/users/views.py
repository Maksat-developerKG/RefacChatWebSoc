from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Пользователь создан'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    