
from django.contrib import admin
from django.urls import path, include

from kidswithcancer.external.DatabaseManager.PybaseManager import DatabaseManager
from . import views

urlpatterns = [
    path('test/',views.TestConnection.as_view()),
]


DatabaseManager();