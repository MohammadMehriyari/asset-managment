from django.db import connection
from rest_framework import permissions


def get_role_number(user):
    query = f" select userroleid from user WHERE userid = %s"
    with connection.cursor() as cursor:
        cursor.execute(query, [user.userid])
        return cursor.fetchone()[0]

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and get_role_number(request.user) == 1

class IsAdminOrIsSupporter(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            get_role_number(request.user) == 1 or get_role_number(request.user) == 2)

class IsSupporterOrIsUsualUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            get_role_number(request.user) == 3 or get_role_number(request.user) == 2)