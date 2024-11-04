# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
import jwt
from django.db import models, connection
from rest_framework_simplejwt.tokens import RefreshToken

from assetManagementSystem import settings


class User(models.Model):
    userid = models.AutoField(db_column='UserId', primary_key=True)  # Field name made lowercase.
    userpersonalid = models.IntegerField(db_column='UserPersonalId', unique=True)  # Field name made lowercase.
    username = models.CharField(db_column='UserName', max_length=255)  # Field name made lowercase.
    userlastname = models.CharField(db_column='UserLastName', max_length=255)  # Field name made lowercase.
    userphonenumber = models.CharField(db_column='UserPhoneNumber', max_length=11, blank=True,
                                       null=True)  # Field name made lowercase.
    userlandlinephonenumber = models.CharField(db_column='UserLandLinePhoneNumber', max_length=11, blank=True,
                                               null=True)  # Field name made lowercase.
    createruserid = models.ForeignKey('self', models.DO_NOTHING, db_column='CreaterUserId', blank=True,
                                      null=True)  # Field name made lowercase.
    updateruserid = models.ForeignKey('self', models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='user_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    usersupportid = models.ForeignKey(
        'self',
        models.DO_NOTHING,
        db_column='UserSupportId',
        related_name='user_usersupportid_set',
        blank=True,
        null=True,
        limit_choices_to={'userroleid__userroleid': 2}
    )  # Field name made lowercase.
    usercreatetime = models.DateTimeField(db_column='UserCreateTime')  # Field name made lowercase.
    userupdatetime = models.DateTimeField(db_column='UserUpdateTime')  # Field name made lowercase.
    userpasword = models.CharField(db_column='UserPasword', max_length=128)  # Field name made lowercase.
    userroleid = models.ForeignKey('Userrole', models.DO_NOTHING, db_column='UserRoleId')  # Field name made lowercase.
    last_login = models.DateTimeField(blank=True, null=True)
    is_active = models.IntegerField(blank=True, null=True)
    is_anonymous = models.IntegerField(blank=True, null=True)
    is_authenticated = models.IntegerField(blank=True, null=True)

    REQUIRED_FIELDS = [
        'username',
        'userlastname',
        'userpasword',
        'userroleid', ]

    USERNAME_FIELD = 'userpersonalid'

    class Meta:
        managed = False
        db_table = 'user'

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        print(refresh.payload)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


class Area(models.Model):
    areaid = models.AutoField(db_column='AreaId', primary_key=True)  # Field name made lowercase.
    areaname = models.CharField(db_column='AreaName', max_length=255)  # Field name made lowercase.
    createruserid = models.ForeignKey('User', models.DO_NOTHING,
                                      db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey('User', models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='area_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    areacreatetime = models.DateTimeField(db_column='AreaCreateTime')  # Field name made lowercase.
    areaupdatetime = models.DateTimeField(db_column='AreaUpdateTime')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'area'

class Availablefloortousersupport(models.Model):
    buildingid = models.ForeignKey('Building', models.DO_NOTHING, db_column='BuildingId')  # Field name made lowercase.
    usersupportid = models.OneToOneField('User', models.DO_NOTHING, db_column='UserSupportId',
                                         primary_key=True)  # Field name made lowercase. The composite primary key (UserSupportId, BuildingId, AvailableFloor) found, that is not supported. The first column is selected.
    availablefloor = models.IntegerField(db_column='AvailableFloor')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'availablefloortousersupport'
        unique_together = (('usersupportid', 'buildingid', 'availablefloor'),)


class Building(models.Model):
    buildingid = models.AutoField(db_column='BuildingId', primary_key=True)  # Field name made lowercase.
    buildingname = models.CharField(db_column='BuildingName', max_length=255)  # Field name made lowercase.
    buildingabbrivationname = models.CharField(db_column='BuildingAbbrivationName',
                                               max_length=255)  # Field name made lowercase.
    createruserid = models.ForeignKey('User', models.DO_NOTHING,
                                      db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey('User', models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='building_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    buildingcreatetime = models.DateTimeField(db_column='BuildingCreateTime')  # Field name made lowercase.
    buildingupdatetime = models.DateTimeField(db_column='BuildingUpdateTime')  # Field name made lowercase.
    buildingfloorcount = models.IntegerField(db_column='BuildingFloorCount')  # Field name made lowercase.
    buildingroomcount = models.IntegerField(db_column='BuildingRoomCount')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'building'



class Userlocationinbuildingarea(models.Model):
    buildingid = models.ForeignKey(Building, models.DO_NOTHING, db_column='BuildingId')  # Field name made lowercase.
    userid = models.OneToOneField(User, models.DO_NOTHING, db_column='UserId',
                                         primary_key=True)  # Field name made lowercase. The composite primary key (UserSupportId, BuildingId, AreaId) found, that is not supported. The first column is selected.
    areaid = models.ForeignKey(Area, models.DO_NOTHING, db_column='AreaId')  # Field name made lowercase.
    userofficial = models.CharField(db_column='UserOfficial', max_length=255)  # Field name made lowercase.
    roomnumber = models.IntegerField(db_column='RoomNumber')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'userlocationinbuildingarea'
        unique_together = (('userid', 'buildingid', 'areaid'),)


class Userrole(models.Model):
    userroleid = models.AutoField(db_column='UserRoleId', primary_key=True)  # Field name made lowercase.
    userrolename = models.CharField(db_column='UserRoleName', max_length=255)  # Field name made lowercase.
    userroledescription = models.TextField(db_column='UserRoleDescription')  # Field name made lowercase.
    userrolecreatetime = models.DateTimeField(db_column='UserRoleCreateTime')  # Field name made lowercase.
    userroleupdatetime = models.DateTimeField(db_column='UserRoleUpdateTime')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'userrole'


class AuthUser(models.Model):
    userpasword = models.CharField(db_column='UserPasword', max_length=128)  # Field name made lowercase.
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserId')  # Field name made lowercase.
    is_active = models.IntegerField(blank=True, null=True)
    is_authenticated = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auth_user'
