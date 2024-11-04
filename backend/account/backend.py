from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password

from .models import User


class PersonalBackend(ModelBackend):
    def authenticate(self, request, personalId=None, password=None, **kwargs):
        try:
            user = User.objects.get(userpersonalid=personalId)
        except User.DoesNotExist:
            return None

        if check_password(password, user.userpasword):
            return user
    def get_user(self, personalId):
        try:
            print('user')
            return User.objects.get(userpersonalid=personalId)

        except User.DoesNotExist:
            print('none')
            return None

