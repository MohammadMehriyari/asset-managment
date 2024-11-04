import json

from django.contrib.auth.hashers import check_password, make_password
from django.db import connection
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from . import permissions
from .serializers import (
    CreatUserSerializer,
    WorkingLoactionSerializer,
    LoginSerializer,
    LogoutSerializer,
    DeactivateUserSerializer,
    ChangePasswordSerializer,
    CreateAreaSerializer,
    UpdateAreaSerializer,
    ListAreaSerializer,
    CreateBuildingSerializer,
    UpdateBuildingSerializer,
    ListBuildingSerializer,
    ChooseTheSupporter,
    UpdateSupporterInfoSerializer,
    DeleteSupporterSerializer,
    UpdateWorkingLocationSerializer,
    DeleteWorkingLocationSerializer,
    ChangeSubUserPasswordSerializer,
    ChangeSubUserInfoSerializer,
    ListUserRoleSerializer,
    DetailWorkingLocationSerializer,
    activateUserSerializer,
)
from .models import Area, Building, Userrole, Userlocationinbuildingarea, User

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        """ we create the refresh and access token"""

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoutView(APIView):
    serializer_class = LogoutSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # {"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNDk3ODgzMCwiaWF0IjoxNzEwNjU4ODMwLCJqdGkiOiI3MzdmZmY0NzExNzg0Y2E1OTRmMzAxMTkwYzQyZGYzMyIsInVzZXJfaWQiOjg4fQ.VjIZ01dgGpaUjvj81XyeDw4l_5Rb9kx7S6bmdN6jaTg"}


    def post(self, request):
        """ we expire the refresh token so our user login again"""
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        """update the user password"""

        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'password update successful'}, status=status.HTTP_200_OK)

class WorkingPlaceView(generics.GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminOrIsSupporter]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return WorkingLoactionSerializer
        elif self.request.method == 'PUT':
            return UpdateWorkingLocationSerializer
        elif self.request.method == 'DELETE':
            return DeleteWorkingLocationSerializer
        return DetailWorkingLocationSerializer

    def post(self, request, *args, **kwargs):
        """Determine the working place of a user"""
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        queryset = Userlocationinbuildingarea.objects.filter(userid=request.user.userid)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        """Update the working place of a user"""
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        """Delete the working place by user ID, area ID, and building ID"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_204_NO_CONTENT)

class SubUserWorkingLocationDetail(APIView):
    #  get we send the token and the header sub user id
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    permission_classes = [permissions.IsAdminOrIsSupporter]
    serializer_class = DetailWorkingLocationSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        # our user be supporter our users can work more than one place
        # show get all the supporter work place
        # and all the usual user work palce
        # check where the same we append it to the list then return it

        user_wanted = User.objects.get(userid=self.kwargs['pk'])
        if user.userroleid.userroleid == 2 and user_wanted.userroleid.userroleid == 3:
            requesterLocations = Userlocationinbuildingarea.objects.filter(userid=user)
            requestedUserLocations = Userlocationinbuildingarea.objects.filter(userid=self.kwargs['pk'])
            matching_locations = []
            for requester_location in requesterLocations:
                for requested_user_location in requestedUserLocations:
                    if requester_location.buildingid == requested_user_location.buildingid and requester_location.areaid == requested_user_location.areaid:
                        queryset = Userlocationinbuildingarea.objects.filter(userid=self.kwargs['pk'],
                                                                             areaid=requested_user_location.areaid,
                                                                             buildingid=requested_user_location.buildingid)
                        serializer = self.serializer_class(queryset, many=True)
                        matching_locations.append(serializer.data[0])
            return Response(matching_locations, status=status.HTTP_200_OK)
        else:
            queryset = Userlocationinbuildingarea.objects.filter(userid=self.kwargs['pk'])
            print(queryset)
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

class ChangeSubUserPasswordView(generics.UpdateAPIView):
    serializer_class = ChangeSubUserPasswordSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminOrIsSupporter]

    def update(self, request, *args, **kwargs):
        """update the user password"""

        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'password update successful'}, status=status.HTTP_200_OK)

class ChangeSubUserProfileView(generics.UpdateAPIView):
    serializer_class = ChangeSubUserInfoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminOrIsSupporter]

    def update(self, request, *args, **kwargs):
        """update the user password"""

        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'profile update successful'}, status=status.HTTP_200_OK)

class FloorSupporterManagement(APIView):
    permission_classes = [permissions.IsAdmin]

    def post(self, request):
        """
        Select one supporter user for each floor of a building
        """
        serializer = ChooseTheSupporter(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request):
        """
        Update supporter user for each floor of a building
        """
        serializer = UpdateSupporterInfoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        """
        Delete supporter user for each floor of a building
        """
        serializer = DeleteSupporterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request):
        query = """
                    SELECT `user`.userid, `user`.username, `user`.userlastname, `user`.userphonenumber, `user`.userlandlinephonenumber, `user`.userpersonalid, availablefloortousersupport.availablefloor, building.buildingname
                    FROM ((`user`
                    INNER JOIN availablefloortousersupport ON `user`.UserId = availablefloortousersupport.UserSupportId)
                    INNER JOIN building ON availablefloortousersupport.BuildingId = building.BuildingId);
                """
        with connection.cursor() as cursor:
            cursor.execute(query)

        data = cursor.fetchall()

        return Response([dict(zip([col[0] for col in cursor.description], row)) for row in data], status=status.HTTP_200_OK)

class UserApiView(generics.GenericAPIView):
    serializer_class = CreatUserSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreatUserSerializer
        elif self.request.method == 'PUT':
            return activateUserSerializer
        elif self.request.method == 'DELETE':
            return DeactivateUserSerializer
        return

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAdminOrIsSupporter()]
        elif self.request.method == 'GET':
            return [permissions.IsAdminOrIsSupporter()]
        elif self.request.method == 'DELETE':
            return [permissions.IsAdmin()]
        elif self.request.method == 'PATCH':
            return [permissions.IsAdmin()]
        elif self.request.method == 'PUT':
            return [permissions.IsAdmin()]

        return super().get_permissions()


    def post(self, request):
        """ we create the subuser"""
        user = request.data
        serializer = self.serializer_class(data=user, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        return Response(user_data, status=status.HTTP_201_CREATED)

    def get(self, request):
        """return the all subusers"""
        if request.user.userroleid.userroleid == 1:
            query = """select user.userid,
                                user.userpersonalid,
                                user.username,
                                user.userlastname,
                                user.userphonenumber,
                                user.userlandlinephonenumber,
                                user.usersupportid,
                                user.userroleid ,
                                user.is_active,
                                building.buildingname,
                                building.buildingid,
                                area.areaname,
                                area.areaid,
                                userlocationinbuildingarea.userofficial,
    						userlocationinbuildingarea.roomnumber from 
                     (((`user`
                     inner join userlocationinbuildingarea on `user`.UserId = userlocationinbuildingarea.UserId
                     )inner join building on userlocationinbuildingarea.buildingId = building.BuildingId)
                     inner join area on userlocationinbuildingarea.areaId = area.areaId)
                     """

            with connection.cursor() as corsur:
                corsur.execute(query)
            data = corsur.fetchall()
            return Response([dict(zip([col[0] for col in corsur.description], row)) for row in data],
                            status=status.HTTP_200_OK)
        elif request.user.userroleid.userroleid == 2:
            query = """
                            SELECT userlocationinbuildingarea.areaid , userlocationinbuildingarea.buildingid
                            FROM (`user`
                            INNER JOIN userlocationinbuildingarea ON `user`.UserId = userlocationinbuildingarea.UserId)
                            where `user`.UserId  = %s;
                        """
            with connection.cursor() as cursor:
                cursor.execute(query, [request.user.userid])
                data = cursor.fetchall()
            result = []
            for i, j in data:
                # return all the users that work in this supporter area and building and are active
                query = """SELECT user.userid,
                                user.userpersonalid,
                                user.username,
                                user.userlastname,
                                user.userphonenumber,
                                user.userlandlinephonenumber,
                                user.userroleid,
                                building.buildingname,
                                area.areaname,
                                userlocationinbuildingarea.userofficial,
                                userlocationinbuildingarea.roomnumber
                        FROM (((`user`
                        INNER JOIN userlocationinbuildingarea ON `user`.UserId = userlocationinbuildingarea.UserId)
                        INNER JOIN building ON userlocationinbuildingarea.buildingId = building.BuildingId)
                        INNER JOIN area ON userlocationinbuildingarea.areaId = area.areaId)
                        WHERE user.userid != %s
                            AND userlocationinbuildingarea.areaid = %s
                            AND userlocationinbuildingarea.buildingid = %s
                            AND userroleid = %s
                            AND user.is_active = true;
                        """
                with connection.cursor() as cursor_:
                    cursor_.execute(query, [request.user.userid, i, j, 3])
                    data = cursor_.fetchall()
                    result.extend([dict(zip([col[0] for col in cursor_.description], row)) for row in data])

            return Response(result, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        """deactivate user"""

        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        return Response({'message': f'user deactivated'}, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        """activate user"""

        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        return Response({'message': f'user activated'}, status=status.HTTP_200_OK)

class AreaListCreateView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (permissions.IsAdmin,)
    queryset = Area.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateAreaSerializer
        return ListAreaSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new area in the database
        """
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class AreaDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    queryset = Area.objects.all()


    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        elif self.request.method == 'PUT':
            return [permissions.IsAdmin()]
        elif self.request.method == 'PATCH':
            return [permissions.IsAdmin()]
        elif self.request.method == 'DELETE':
            return [permissions.IsAdmin()]
        return super().get_permissions()


    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return UpdateAreaSerializer
        return ListAreaSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        """Update an existing area in the database"""
        serializer = self.get_serializer(data=request.data, context={'request': request, 'areaid': kwargs['pk']})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            query = "DELETE FROM area WHERE areaid = %s"
            with connection.cursor() as cur:
                cur.execute(query, [kwargs['pk']])
            return Response({'message': 'You successfully deleted the area with area id {}'.format(kwargs['pk'])},
                            status=status.HTTP_200_OK)
        except:
            return Response({'error': 'We don\'t have any area with this id {}'.format(kwargs['pk'])},
                            status=status.HTTP_400_BAD_REQUEST)

class BuildingListCreateView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (permissions.IsAdmin,)
    queryset = Building.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateBuildingSerializer
        return ListBuildingSerializer

    def create(self, request, *args, **kwargs):
        """Create a new building in the database"""
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class BuildingDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    queryset = Building.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        elif self.request.method == 'PUT':
            return [permissions.IsAdmin()]
        elif self.request.method == 'PATCH':
            return [permissions.IsAdmin()]
        elif self.request.method == 'DELETE':
            return [permissions.IsAdmin()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return UpdateBuildingSerializer
        return ListBuildingSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        """Update an existing building in the database"""
        serializer = self.get_serializer(data=request.data, context={'request': request, 'buildingid': kwargs['pk']})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            query = "DELETE FROM building WHERE buildingid = %s"
            with connection.cursor() as cur:
                cur.execute(query, [kwargs['pk']])
            return Response({'message': 'You successfully deleted the building with building id {}'.format(kwargs['pk'])},
                            status=status.HTTP_200_OK)
        except:
            return Response({'error': 'We don\'t have any building with this id {}'.format(kwargs['pk'])},
                            status=status.HTTP_400_BAD_REQUEST)

class ListOfRoles(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (permissions.IsAdminOrIsSupporter,)
    serializer_class = ListUserRoleSerializer

    #  admin just get supporter and usual user roles and supporter just get the usual

    def get_queryset(self):
        return Userrole.objects.filter(userroleid__gt=self.request.user.userroleid.userroleid)


class UserProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        user = User.objects.get(userid=request.user.userid)
        userLacation = Userlocationinbuildingarea.objects.filter(userid=user)
        lst = []
        for working in userLacation:
            building = Building.objects.get(buildingid=working.buildingid.buildingid)
            area = Area.objects.get(areaid=working.areaid.areaid)
            lst.append({
                "userpersonalid": user.userpersonalid,
                "userid": user.userid,
                "username": user.username,
                "userlastname": user.userlastname,
                "userphonenumber": user.userphonenumber,
                "userlandlinephonenumber": user.userlandlinephonenumber,
                'supporterid': user.usersupportid.userid if user.usersupportid else None,
                'supporterpersonalid': user.usersupportid.userpersonalid if user.usersupportid else None,
                "userofficial": working.userofficial,
                "roomnumber": working.roomnumber,
                "buildingid": building.buildingid,
                "buildingname": building.buildingname,
                "areaid": area.areaid,
                "areaname": area.areaname,
            })
        return Response(lst, status=status.HTTP_200_OK)


