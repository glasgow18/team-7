from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView




class TestConnection(APIView):

    def get(self,request):
        data = {};
        data["data"] = "Connection Successful";
        return JsonResponse(data)