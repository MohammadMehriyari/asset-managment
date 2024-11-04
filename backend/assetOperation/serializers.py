from account.models import User, Area, Building, Userlocationinbuildingarea
from django.utils import timezone
from rest_framework import serializers
from .models import *


class UserInfo:
    def returnInfo(self, user):
        if user:
            data = {
                "userpersonalid": user.userpersonalid,
                "username": user.username,
                "userlastname": user.userlastname,
                "userphonenumber": user.userphonenumber,
                "userlandlinephonenumber": user.userlandlinephonenumber,
                "usercreatetime": user.usercreatetime,
                "userupdatetime": user.userupdatetime,
                "userroleid": user.userroleid.userroleid,
                "last_login": user.last_login,
            }
            if user.userroleid.userroleid == 3:
                data['supporterid'] = user.usersupportid.userid
            return data
        return None


class OperationSystemSerializer(serializers.ModelSerializer):
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    operationsystemupdatetime = serializers.DateTimeField(read_only=True)
    operationsystemcreatetime = serializers.DateTimeField(read_only=True)
    operationversions = serializers.SerializerMethodField()

    class Meta:
        model = Operationsystem
        fields = (
            'operationsystemid',
            'operationsystemname',
            'createruserid',
            'updateruserid',
            'operationsystemcreatetime',
            'operationsystemupdatetime',
            'operationversions'
        )

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data['createruserid'] = request.user
        validated_data['operationsystemcreatetime'] = timezone.now()
        validated_data['operationsystemupdatetime'] = timezone.now()

        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context.get("request")

        instance.updateruserid = request.user
        instance.operationsystemname = validated_data.get('operationsystemname', instance.operationsystemname)
        instance.operationsystemupdatetime = timezone.now()
        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_operationversions(self, obj):
        return OperationSystemVersionSerializer(obj.operationsystemversion_operationsystemid_set.all(), many=True).data


class OperationSystemVersionSerializer(serializers.ModelSerializer):
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    operationsystemversioncreatetime = serializers.DateTimeField(read_only=True)
    operationsystemversionupdatetime = serializers.DateTimeField(read_only=True)

    osId = serializers.IntegerField(write_only=True)

    class Meta:
        model = Operationsystemversion
        fields = (
            'operationsystemversionid',
            'operationsystemversionname',
            'createruserid',
            'updateruserid',
            'operationsystemversioncreatetime',
            'operationsystemversionupdatetime',
            'osId',
        )

    def create(self, validated_data):
        request = self.context.get("request")
        osId = validated_data.get('osId')

        operation_system = Operationsystem.objects.get(operationsystemid=osId)

        return Operationsystemversion.objects.create(
            operationsystemversionname=validated_data.get('operationsystemversionname'),
            createruserid=request.user,
            operationsystemid=operation_system,
            operationsystemversioncreatetime=timezone.now(),
            operationsystemversionupdatetime=timezone.now(),
        )

    def update(self, instance, validated_data):
        request = self.context.get("request")
        instance.operationsystemversionname = validated_data.get('operationsystemversionname',
                                                                 instance.operationsystemversionname)
        osId = validated_data.get('osId')
        if osId:
            operation_system = Operationsystem.objects.get(operationsystemid=osId)
            instance.operationsystemid = operation_system

        instance.updateruserid = request.user

        instance.operationsystemupdatetime = timezone.now()
        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)


class ComputerSerializer(serializers.ModelSerializer):
    computercreatetime = serializers.DateTimeField(read_only=True)
    computerupdatetime = serializers.DateTimeField(read_only=True)
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    owneruserid = serializers.SerializerMethodField(read_only=True)
    operationsystemversionid = serializers.SerializerMethodField(read_only=True)
    areaid = serializers.SerializerMethodField(read_only=True)
    buildingid = serializers.SerializerMethodField(read_only=True)
    sealing = serializers.SerializerMethodField(read_only=True)
    relateddeliveredgoods = serializers.SerializerMethodField(read_only=True)
    
    osVersionId = serializers.IntegerField(write_only=True)
    isAbortion = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Computer
        fields = (
            'computerpropertynumber',
            'computername',
            'computermodel',
            'computerip',
            'computermacaddress',
            'computerispersonal',
            'osVersionId',
            'computercreatetime',
            'computerupdatetime',
            'createruserid',
            'updateruserid',
            'owneruserid',
            'operationsystemversionid',
            'areaid',
            'buildingid',
            'sealing',
            'relateddeliveredgoods',
            'isAbortion',
        )

    def create(self, validated_data):
        request = self.context.get("request")
        osVersionId = validated_data.get('osVersionId')

        operation_system_version = Operationsystemversion.objects.get(operationsystemversionid=osVersionId)

        date = timezone.now()

        return Computer.objects.create(
            computerpropertynumber=validated_data.get('computerpropertynumber'),
            computername=validated_data.get('computername'),
            computermodel=validated_data.get('computermodel'),
            computerip=validated_data.get('computerip'),
            computermacaddress=validated_data.get('computermacaddress'),
            computerispersonal=validated_data.get('computerispersonal'),
            computercreatetime=date,
            computerupdatetime=date,
            createruserid=request.user,
            operationsystemversionid=operation_system_version,
        )

    def update(self, instance, validated_data):
        request = self.context.get("request")
        instance.updateruserid = request.user

        instance.computerpropertynumber = validated_data.get('computerpropertynumber', instance.computerpropertynumber)
        instance.computername = validated_data.get('computername', instance.computername)
        instance.computermodel = validated_data.get('computermodel', instance.computermodel)
        instance.computerip = validated_data.get('computerip', instance.computerip)
        instance.computermacaddress = validated_data.get('computermacaddress', instance.computermacaddress)
        instance.computerispersonal = validated_data.get('computerispersonal', instance.computerispersonal)

        osVersionId = validated_data.get('osVersionId')

        if osVersionId:
            operation_system_version = Operationsystemversion.objects.get(operationsystemversionid=osVersionId)
            instance.operationsystemversionid = operation_system_version

        instance.computerupdatetime = timezone.now()

        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_owneruserid(self, obj):
        return UserInfo().returnInfo(obj.owneruserid)

    def get_operationsystemversionid(self, obj):
        operationsystemversion = obj.operationsystemversionid

        return {
            'operationsystemversionid': operationsystemversion.operationsystemversionid,
            'operationsystemversionname': operationsystemversion.operationsystemversionname,
            'operationsystemid': operationsystemversion.operationsystemid.operationsystemid,
            'operationsystemname': operationsystemversion.operationsystemid.operationsystemname,
            'operationsystemversioncreatetime': operationsystemversion.operationsystemversioncreatetime,
            'operationsystemversionupdatetime': operationsystemversion.operationsystemversionupdatetime,
        }

    def get_areaid(self, obj):
        try:
            area = obj.areaid

            return {
                'areaid': area.areaid,
                'areaname': area.areaname,
                'areacreatetime': area.areacreatetime,
                'areaupdatetime': area.areaupdatetime,
            }
        except:
            return None
    

    def get_isAbortion(self, obj):
        try:
            computerpropertynumber = obj.computerpropertynumber
            Abortion.objects.get(computerpropertynumber=computerpropertynumber)
            return True
        except:
            return False

    def get_buildingid(self, obj):
        try:
            building = obj.buildingid

            return {
                'buildingid': building.buildingid,
                'buildingname': building.buildingname,
                'buildingabbrivationname': building.buildingabbrivationname,
                'buildingcreatetime': building.buildingcreatetime,
                'buildingupdatetime': building.buildingupdatetime,
                'buildingfloorcount': building.buildingfloorcount,
                'buildingroomcount': building.buildingroomcount,
            }

        except:
            return None


    # def get_sealing(self, obj):
    #     try:
    #         seal = obj.computer_sealings.filter(isexpired=False)
    #         return {
    #             'computerseallingnumber': seal.computerseallingnumber,
    #             'isexpired': seal.isexpired,
    #         }
    #     except:
    #         return None
    def get_sealing(self, obj):
        try:
            seal = obj.computer_sealings.filter(isexpired=False).first()
            if seal:
                return {
                    'computerseallingnumber': seal.computerseallingnumber,
                    'isexpired': seal.isexpired,
                }
            return None
        except Exception as e:
            print(f"Error in get_sealing: {e}")
            return None
    def get_relateddeliveredgoods(self, obj):
        relateddeliveredgoods = Deliveredgoods.objects.filter(relatedcomputerpropertynumber=obj.computerpropertynumber)
        print(relateddeliveredgoods)
        if relateddeliveredgoods:
            lst = []
            for relateddeliveredgood in relateddeliveredgoods:
                lst.append(DeliveredGoodsSerializer(relateddeliveredgood).data)
            return lst
        return None



class AttributeCategorySerializer(serializers.ModelSerializer):
    attributecategorycreatetime = serializers.DateTimeField(read_only=True)
    attributecategoryupdatetime = serializers.DateTimeField(read_only=True)
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Attributecategory
        fields = (
            'attributecategoryid',
            'attributecategoryname',
            'attributecategorycreatetime',
            'attributecategoryupdatetime',
            'createruserid',
            'updateruserid',
        )

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data['createruserid'] = request.user
        validated_data['attributecategorycreatetime'] = timezone.now()
        validated_data['attributecategoryupdatetime'] = timezone.now()

        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context.get("request")

        instance.updateruserid = request.user
        instance.attributecategoryname = validated_data.get('attributecategoryname', instance.attributecategoryname)
        instance.attributecategoryupdatetime = timezone.now()
        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)


class GoodsAttributesSerializer(serializers.ModelSerializer):
    goodsattributescreatetime = serializers.DateTimeField(read_only=True)
    goodsattributesupdatetime = serializers.DateTimeField(read_only=True)
    defaultvalues = serializers.SerializerMethodField(read_only=True)
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Goodsattributes
        fields = (
            'goodsattributesid',
            'goodsattributestitle',
            'goodsattributestype',
            'goodsattributescreatetime',
            'goodsattributesupdatetime',
            'createruserid',
            'updateruserid',
            'defaultvalues',
        )

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data['createruserid'] = request.user
        validated_data['goodsattributescreatetime'] = timezone.now()
        validated_data['goodsattributesupdatetime'] = timezone.now()

        if validated_data.get('goodsattributestype') != 1 and validated_data.get('goodsattributestype') != 2:
            raise serializers.ValidationError("the type of good attribute must be 1 or 2!")

        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context.get("request")

        if validated_data.get('goodsattributestype') != 1 and validated_data.get('goodsattributestype') != 2:
            raise serializers.ValidationError("the type of good attribute must be 1 or 2!")

        instance.updateruserid = request.user
        instance.goodsattributestitle = validated_data.get('goodsattributestitle', instance.goodsattributestitle)
        instance.goodsattributestype = validated_data.get('goodsattributestype', instance.goodsattributestype)
        instance.attributecategoryupdatetime = timezone.now()
        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_defaultvalues(self, obj):
        if obj.goodsattributestype == 1:
            return GoodsAttributesDefaultValueSerializer(
                Goodsattributesdefaultvalue.objects.filter(goodsattributesid=obj.goodsattributesid),
                many=True).data
        else:
            return None


class GoodsAttributesDefaultValueSerializer(serializers.ModelSerializer):
    defaultattributescreatetime = serializers.DateTimeField(read_only=True)
    defaultattributesupdatetime = serializers.DateTimeField(read_only=True)
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    goodsattributesid = serializers.SerializerMethodField(read_only=True)
    goodsAttributesId = serializers.IntegerField(write_only=True)

    class Meta:
        model = Goodsattributesdefaultvalue
        fields = (
            'goodsAttributesId',
            'goodsattributesid',
            'defaultattributes',
            'defaultattributescreatetime',
            'defaultattributesupdatetime',
            'createruserid',
            'updateruserid',
        )

    def create(self, validated_data):
        request = self.context.get("request")
        goodsAttributesId = validated_data.get('goodsAttributesId')

        goods_attribute = Goodsattributes.objects.get(goodsattributesid=goodsAttributesId)
        if goods_attribute.goodsattributestype == 2:
            raise serializers.ValidationError("you can not set the default value for the goods attribute's type with 2")

        return Goodsattributesdefaultvalue.objects.create(
            goodsattributesid=goods_attribute,
            defaultattributes=validated_data.get('defaultattributes'),
            createruserid=request.user,
            defaultattributescreatetime=timezone.now(),
            defaultattributesupdatetime=timezone.now(),
        )

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_goodsattributesid(self, obj):
        return obj.goodsattributesid.goodsattributesid

class GoodsGroupSerializer(serializers.ModelSerializer):
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    gooodsgroupcreatetime = serializers.DateTimeField(read_only=True)
    gooodsgroupupdatetime = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Goodsgroup
        fields = (
            'gooodsgroupid',
            'gooodsgroupname',
            'ispartinsidecomputer',
            'isallowedtosendout',
            'isallowedtobeaborted',
            'isallowedtomove',
            'ispossibletorepair',
            'gooodsgroupcreatetime',
            'gooodsgroupupdatetime',
            'createruserid',
            'updateruserid',
        )

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data['createruserid'] = request.user
        validated_data['gooodsgroupcreatetime'] = timezone.now()
        validated_data['gooodsgroupupdatetime'] = timezone.now()

        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context.get("request")

        instance.updateruserid = request.user
        instance.gooodsgroupname = validated_data.get('gooodsgroupname', instance.gooodsgroupname)
        instance.ispartinsidecomputer = validated_data.get('ispartinsidecomputer', instance.ispartinsidecomputer)
        instance.isallowedtosendout = validated_data.get('isallowedtosendout', instance.isallowedtosendout)
        instance.isallowedtobeaborted = validated_data.get('isallowedtobeaborted', instance.isallowedtobeaborted)
        instance.isallowedtomove = validated_data.get('isallowedtomove', instance.isallowedtomove)
        instance.ispossibletorepair = validated_data.get('ispossibletorepair', instance.ispossibletorepair)
        instance.operationsystemupdatetime = timezone.now()
        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)


class GoodsgroupAttributecategoryGoodsattributesOrderSerializer(serializers.ModelSerializer):
    goodsattributesid = serializers.SerializerMethodField(read_only=True)
    attributecategoryid = serializers.SerializerMethodField(read_only=True)
    gooodsgroupid = serializers.SerializerMethodField(read_only=True)
    GoodsAttributesId = serializers.IntegerField(write_only=True)
    AttributeCategoryId = serializers.IntegerField(write_only=True)
    GooodsGroupId = serializers.IntegerField(write_only=True)

    class Meta:
        model = GoodsgroupAttributecategoryGoodsattributesOrder
        fields = (
            'goodsattributesid',
            'attributecategoryid',
            'gooodsgroupid',
            'GoodsAttributesId',
            'AttributeCategoryId',
            'GooodsGroupId',
            'order',
        )

    def validate_GoodsAttributesId(self, value):
        try:
            self.goodsattributesid = Goodsattributes.objects.get(goodsattributesid=value)
            return value
        except:
            raise serializers.ValidationError("goods attribute with this id not exist!")

    def validate_AttributeCategoryId(self, value):
        try:
            self.attributecategoryid = Attributecategory.objects.get(attributecategoryid=value)
            return value
        except:
            raise serializers.ValidationError("attribute category with this id not exist!")

    def validate_GooodsGroupId(self, value):
        try:
            self.gooodsgroupid = Goodsgroup.objects.get(gooodsgroupid=value)
            return value
        except:
            raise serializers.ValidationError("goods group with this id not exist!")

    def validate(self, attrs):
        if GoodsgroupAttributecategoryGoodsattributesOrder.objects.filter(gooodsgroupid=attrs.get('GooodsGroupId'),
                                                                          goodsattributesid=attrs.get(
                                                                              'GoodsAttributesId')):
            raise serializers.ValidationError("with this goods id and attribute goods id we have entity")
        return attrs

    def create(self, validated_data):

        return GoodsgroupAttributecategoryGoodsattributesOrder.objects.create(
            goodsattributesid=self.goodsattributesid,
            attributecategoryid=self.attributecategoryid,
            gooodsgroupid=self.gooodsgroupid,
            order=validated_data.get('order'),
        )

    def get_goodsattributesid(self, obj):
        return GoodsAttributesSerializer(
            Goodsattributes.objects.get(goodsattributesid=obj.goodsattributesid.goodsattributesid)).data

    def get_attributecategoryid(self, obj):
        return AttributeCategorySerializer(
            Attributecategory.objects.get(attributecategoryid=obj.attributecategoryid.attributecategoryid)).data

    def get_gooodsgroupid(self, obj):
        return GoodsGroupSerializer(Goodsgroup.objects.get(gooodsgroupid=obj.gooodsgroupid.gooodsgroupid)).data


class UpdateGoodsgroupAttributecategoryGoodsattributesOrderSerializer(serializers.Serializer):
    AttributeCategoryId = serializers.IntegerField(required=False)
    order = serializers.IntegerField(required=False)

    def validate(self, attrs):
        self.goodsattributesid = self.context.get('goodsattributesid')
        self.gooodsgroupid = self.context.get('gooodsgroupid')
        self.AttributeCategoryId = attrs.get('AttributeCategoryId')
        self.order = attrs.get('order')
        try:
            self.instance = GoodsgroupAttributecategoryGoodsattributesOrder.objects.get(
                goodsattributesid=self.goodsattributesid,
                gooodsgroupid=self.gooodsgroupid)
        except:
            raise serializers.ValidationError(
                'your entered goodsattributesid and gooodsgroupid was wrong!')
        return attrs

    def validate_AttributeCategoryId(self, value):
        if Attributecategory.objects.filter(attributecategoryid=value):
            return value
        raise serializers.ValidationError('attribute category with this id not exists!')

    def save(self):
        if self.AttributeCategoryId:
            attributecategory = Attributecategory.objects.get(attributecategoryid=self.AttributeCategoryId)
            if self.order:
                self.instance.order = self.order
                self.instance.attributecategoryid = attributecategory
            else:
                self.instance.attributecategoryid = attributecategory
            self.instance.save()
        else:
            if self.order:
                self.instance.order = self.order
                self.instance.save()

        return {
            'goodsattributesid': GoodsAttributesSerializer(
                Goodsattributes.objects.get(goodsattributesid=self.goodsattributesid)).data,
            'attributecategoryid': AttributeCategorySerializer(Attributecategory.objects.get(
                attributecategoryid=self.instance.attributecategoryid.attributecategoryid)).data,
            'gooodsgroupid': GoodsGroupSerializer(Goodsgroup.objects.get(gooodsgroupid=self.gooodsgroupid)).data,
            'order': self.instance.order,
        }


class GoodsSerializer(serializers.ModelSerializer):
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    goodscreatetime = serializers.DateTimeField(read_only=True)
    goodsupdatetime = serializers.DateTimeField(read_only=True)
    gooodsgroupid = serializers.SerializerMethodField(read_only=True)

    GooodsGroupId = serializers.IntegerField(write_only=True)

    class Meta:
        model = Goods
        fields = (
            'goodsid',
            'goodsname',
            'gooodsgroupid',
            'GooodsGroupId',
            'goodscreatetime',
            'goodsupdatetime',
            'createruserid',
            'updateruserid',
        )

    def validate_GooodsGroupId(self, value):
        try:
            self.goods_group = Goodsgroup.objects.get(gooodsgroupid=value)
            return value
        except:
            raise serializers.ValidationError('good group with this id not exists')

    def create(self, validated_data):

        request = self.context.get("request")
        GooodsGroupId = validated_data.get('GooodsGroupId')

        self.goods_group = Goodsgroup.objects.get(gooodsgroupid=GooodsGroupId)

        return Goods.objects.create(
            goodsname=validated_data.get('goodsname'),
            gooodsgroupid=self.goods_group,
            goodscreatetime=timezone.now(),
            goodsupdatetime=timezone.now(),
            createruserid=request.user,
        )

    def update(self, instance, validated_data):
        # we can change the goods group and name of goods instance
        request = self.context.get("request")
        instance.updateruserid = request.user

        instance.goodsname = validated_data.get('goodsname', instance.goodsname)

        GooodsGroupId = validated_data.get('GooodsGroupId')

        if GooodsGroupId:
            self.goods_group = Goodsgroup.objects.get(gooodsgroupid=GooodsGroupId)
            instance.gooodsgroupid = self.goods_group

        instance.goodsupdatetime = timezone.now()

        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_gooodsgroupid(self, obj):
        return GoodsGroupSerializer(obj.gooodsgroupid).data


class AssinedAttributestoGoodsSerializer(serializers.ModelSerializer):
    goodsid = serializers.SerializerMethodField(read_only=True)
    goodsattributesid = serializers.SerializerMethodField(read_only=True)
    GoodsId = serializers.IntegerField(write_only=True)
    GoodsAttributesId = serializers.IntegerField(write_only=True)

    class Meta:
        model = Assinedattributestogoods
        fields = (
            'GoodsId',
            'GoodsAttributesId',
            'goodsid',
            'goodsattributesid',
            'attributevalue',
        )

    def validate_GoodsId(self, value):
        try:
            self.goods = Goods.objects.get(goodsid=value)
            return value
        except:
            raise serializers.ValidationError('good with this id not exists')

    def validate_GoodsAttributesId(self, value):
        try:
            self.goods_attribute = Goodsattributes.objects.get(goodsattributesid=value)
            return value
        except:
            raise serializers.ValidationError('good attribute with this id not exists')

    def get_goodsid(self, obj):
        return GoodsSerializer(obj.goodsid).data

    def get_goodsattributesid(self, obj):
        return GoodsAttributesSerializer(obj.goodsattributesid).data

    def create(self, validated_data):
        return Assinedattributestogoods.objects.create(
            goodsid=self.goods,
            goodsattributesid=self.goods_attribute,
            attributevalue=validated_data.get('attributevalue'),
        )


class UpdateAssinedAttributestoGoodsSerializer(serializers.Serializer):
    attributevalue = serializers.CharField(required=False)

    def validate(self, attrs):
        self.goodsattributesid = self.context.get('goodsattributesid')
        self.goodsid = self.context.get('goodsid')
        try:
            self.instance = Assinedattributestogoods.objects.get(goodsid=self.goodsid,
                                                                 goodsattributesid=self.goodsattributesid)
        except:
            raise serializers.ValidationError(
                'your entered attribute value not exists!')

        return attrs

    def save(self):
        self.attributevalue = self.validated_data.get('attributevalue', '')
        print(self.attributevalue)
        if self.attributevalue:
            self.instance.attributevalue = self.attributevalue
            self.instance.save()

        return {
            'goodsid': GoodsSerializer(Goods.objects.get(goodsid=self.instance.goodsid.goodsid)).data,
            'goodsattributesid': GoodsAttributesSerializer(
                Goodsattributes.objects.get(goodsattributesid=self.instance.goodsattributesid.goodsattributesid)).data,
            'attributevalue': self.instance.attributevalue,
        }


class DeliveredGoodsSerializer(serializers.ModelSerializer):
    deliveredgoodscreatetime = serializers.DateTimeField(read_only=True)
    deliveredgoodsupdatetime = serializers.DateTimeField(read_only=True)
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    owneruserid = serializers.SerializerMethodField(read_only=True)
    updaterid = serializers.SerializerMethodField(read_only=True)
    goodsid = serializers.SerializerMethodField(read_only=True)
    areaid = serializers.SerializerMethodField(read_only=True)
    buildingid = serializers.SerializerMethodField(read_only=True)
    GoodsId = serializers.IntegerField(write_only=True)
    isAbortion = serializers.SerializerMethodField(read_only=True)
    relatedcomputerpropertynumber = serializers.PrimaryKeyRelatedField(read_only=True)


    class Meta:
        model = Deliveredgoods
        fields = (
            'deliveredgoodsid',
            'deliveredgoodsserial',
            'deliveredgoodscreatetime',
            'deliveredgoodsupdatetime',
            'createruserid',
            'updateruserid',
            'owneruserid',
            'updaterid',
            'goodsid',
            'areaid',
            'buildingid',
            'isAbortion',
            'GoodsId',
            'relatedcomputerpropertynumber'
        )

    def get_isAbortion(self, obj):
        try:
            deliveredgoodsid = obj.deliveredgoodsid
            Abortion.objects.get(deliveredgoodsid=deliveredgoodsid)
            return True
        except Abortion.DoesNotExist:
            return False
    def validate_deliveredgoodsserial(self, value):
        if Deliveredgoods.objects.filter(deliveredgoodsserial=value):
            raise serializers.ValidationError('delivery exists with this serial')
        return value
    def validate_GoodsId(self, value):
        try:
            self.goods = Goods.objects.get(goodsid=value)
            return value
        except:
            raise serializers.ValidationError('good with this id not exists')

    def create(self, validated_data):
        request = self.context.get("request")

        return Deliveredgoods.objects.create(
            deliveredgoodsserial=validated_data.get('deliveredgoodsserial'),
            deliveredgoodscreatetime=timezone.now(),
            deliveredgoodsupdatetime=timezone.now(),
            createruserid=request.user,
            goodsid=self.goods

        )

    def update(self, instance, validated_data):
        request = self.context.get("request")

        instance.deliveredgoodsserial = validated_data.get('deliveredgoodsserial', instance.deliveredgoodsserial)
        GoodsId = validated_data.get('GoodsId')
        if GoodsId:
            instance.goodsid = self.goods

        instance.updateruserid = request.user

        instance.operationsystemupdatetime = timezone.now()
        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_owneruserid(self, obj):
        return UserInfo().returnInfo(obj.owneruserid)

    def get_updaterid(self, obj):
        try:
            updaterid = obj.updaterid

            return {
                'updaterid': updaterid.updaterid,
                'updatercreatetime': updaterid.updatercreatetime,
                'updaterupdatetime': updaterid.updaterupdatetime,
                'updaterdonetime': updaterid.updaterdonetime,
            }
        except:
            return None

    def get_goodsid(self, obj):
        return GoodsSerializer(obj.goodsid).data

    def get_areaid(self, obj):
        try:
            area = obj.areaid

            return {
                'areaid': area.areaid,
                'areaname': area.areaname,
                'areacreatetime': area.areacreatetime,
                'areaupdatetime': area.areaupdatetime,
            }
        except:
            return None

    def get_buildingid(self, obj):
        try:
            building = obj.buildingid

            return {
                'buildingid': building.buildingid,
                'buildingname': building.buildingname,
                'buildingabbrivationname': building.buildingabbrivationname,
                'buildingcreatetime': building.buildingcreatetime,
                'buildingupdatetime': building.buildingupdatetime,
                'buildingfloorcount': building.buildingfloorcount,
                'buildingroomcount': building.buildingroomcount,
            }

        except:
            return None



class DeliveredGoodsRelatedToComputerSerializer(serializers.Serializer):
    computerpropertynumber = serializers.IntegerField()

    def validate(self, attrs):
        self.user = self.context.get("request").user
        self.pk = self.context.get('pk')
        try:
            self.instance = Deliveredgoods.objects.get(deliveredgoodsid=self.pk)
        except:
            raise serializers.ValidationError('delivery goods with this id not exists!')
        print('here',self.instance.goodsid.gooodsgroupid.ispartinsidecomputer)
        if self.instance.goodsid.gooodsgroupid.ispartinsidecomputer == False:

            raise serializers.ValidationError(
                'delivery goods with this id is not the goods that can be use inside the computer!')

        return attrs

    def validate_computerpropertynumber(self, value):
        try:
            self.computer = Computer.objects.get(computerpropertynumber=value)
            return value
        except:
            raise serializers.ValidationError('computer with this id not exists!')

    def save(self):
        request = self.context.get("request")
        self.instance.relatedcomputerpropertynumber = self.computer
        self.instance.updateruserid = request.user
        self.instance.deliveredgoodsupdatetime = timezone.now()
        self.instance.save()

        return DeliveredGoodsSerializer(self.instance).data


class ComputerSeallingSerializer(serializers.ModelSerializer):
    computerseallingcreatetime = serializers.DateTimeField(read_only=True)
    computerseallingupdatetime = serializers.DateTimeField(read_only=True)
    updaterid = serializers.SerializerMethodField(read_only=True)
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    internalrepairid = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Computersealling
        fields = (
            'computerseallingid',
            'computerseallingnumber',
            'computerseallingcreatetime',
            'computerseallingupdatetime',
            'isexpired',
            'updaterid',
            'createruserid',
            'updateruserid',
            'internalrepairid',
        )

    def validate_ComputerPropertyNumber(self, value):
        try:
            self.computer = Computer.objects.get(computerpropertynumber=value)
            return value
        except:
            raise serializers.ValidationError('computer with this number not exists')

    def create(self, validated_data):
        request = self.context.get("request")
        return Computersealling.objects.create(
            computerseallingnumber=validated_data.get('computerseallingnumber'),
            computerseallingcreatetime=timezone.now(),
            computerseallingupdatetime=timezone.now(),
            isexpired=False,
            createruserid=request.user,
        )

    def update(self, instance, validated_data):
        request = self.context.get("request")

        instance.computerseallingnumber = validated_data.get('computerseallingnumber', instance.computerseallingnumber)
        instance.isexpired = validated_data.get('isexpired', instance.isexpired)
        instance.updateruserid = request.user

        instance.operationsystemupdatetime = timezone.now()
        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_updaterid(self, obj):
        try:
            updaterid = obj.updaterid

            return {
                'updaterid': updaterid.updaterid,
                'updatercreatetime': updaterid.updatercreatetime,
                'updaterupdatetime': updaterid.updaterupdatetime,
                'updaterdonetime': updaterid.updaterdonetime,
            }
        except:
            return None

    def get_internalrepairid(self, obj):
        try:
            internalrepairid = obj.internalrepairid

            return {
                'internalrepairid': internalrepairid.internalrepairid,
                'internalrepairdescription': internalrepairid.internalrepairdescription,
                'internalrepairchangingdescription': internalrepairid.internalrepairchangingdescription,
                'internalrepaircreatetime': internalrepairid.internalrepaircreatetime,
                'internalrepairupdatetime': internalrepairid.internalrepairupdatetime,
                'internalrepairdonetime': internalrepairid.internalrepairdonetime,
            }
        except:
            return None


class AssignSeallToComputerSerializer(serializers.Serializer):
    computerpropertynumber = serializers.IntegerField()

    def validate(self, attrs):
        self.user = self.context.get("request").user
        self.pk = self.context.get('pk')

        # try:
        self.instance = Computersealling.objects.get(computerseallingid=self.pk)
        if self.instance.computerpropertynumber:
            raise serializers.ValidationError('this sealing already assigned!')
        # except:
            # raise serializers.ValidationError('sealling with this id not exists!')

        if self.instance and self.instance.isexpired:
            raise serializers.ValidationError(
                'this sealling id is expired you can not assign it to computer!')

        return attrs

    def validate_computerpropertynumber(self, value):
        try:
            self.computer = Computer.objects.get(computerpropertynumber=value)
            return value
        except:
            raise serializers.ValidationError('computer with this id not exists!')

    def save(self):
        request = self.context.get("request")
        self.instance.computerpropertynumber = self.computer
        self.instance.updateruserid = request.user
        self.instance.deliveredgoodsupdatetime = timezone.now()
        self.instance.save()

        return ComputerSeallingSerializer(self.instance).data


class AssignComputerToUserSerializer(serializers.Serializer):
    ownerUserId = serializers.IntegerField()
    # i consider that what if the owner user work in tow place in that case i consider that the building and area as input
    areaId = serializers.IntegerField()
    buildingId = serializers.IntegerField()

    def validate(self, attrs):
        self.user = self.context.get("request").user
        self.pk = self.context.get('pk')

        try:
            self.instance = Computer.objects.get(computerpropertynumber=self.pk)
        except Computer.DoesNotExist:
            raise serializers.ValidationError('computer with this id not exists!')

        if self.instance.owneruserid:
            raise serializers.ValidationError('this computer already assigned to an user')

        try:
            Computersealling.objects.get(computerpropertynumber=self.instance, isexpired=False)
        except Computersealling.DoesNotExist:
            raise serializers.ValidationError('your computer should have the sealing then you  can assign it!')

        try:
            user = User.objects.get(userid=attrs.get('ownerUserId'))
            area = Area.objects.get(areaid=attrs.get('areaId'))
            building = Building.objects.get(buildingid=attrs.get('buildingId'))

            Userlocationinbuildingarea.objects.filter(buildingid=building, userid=user, areaid=area)
        except:
            raise serializers.ValidationError('this user not working in this area and building!')

        return attrs

    def validate_ownerUserId(self, value):
        try:
            self.owneruser = User.objects.get(userid=value)
            return value
        except:
            raise serializers.ValidationError('user with this id not exists!')

    def validate_areaId(self, value):
        try:
            self.area = Area.objects.get(areaid=value)
            return value
        except:
            raise serializers.ValidationError('area with this id not exists!')

    def validate_buildingId(self, value):
        try:
            self.building = Building.objects.get(buildingid=value)
            return value
        except:
            raise serializers.ValidationError('building with this id not exists!')

    def save(self):
        request = self.context.get("request")
        self.instance.owneruserid = self.owneruser
        self.instance.updateruserid = request.user
        self.instance.computerupdatetime = timezone.now()
        self.instance.areaid = self.area
        self.instance.buildingid = self.building
        self.instance.computername = self.owneruser.username + "  " +self.owneruser.userlastname
        self.instance.save()

        return ComputerSerializer(self.instance).data


class AssignDeliveredgoodsToUserSerializer(serializers.Serializer):
    ownerUserId = serializers.IntegerField()

    # i consider that what if the owner user work in tow place in that case i consider that the building and area as input
    areaId = serializers.IntegerField()
    buildingId = serializers.IntegerField()

    def validate(self, attrs):
        self.user = self.context.get("request").user
        self.pk = self.context.get('pk')
        self.areaId = attrs.get('areaId')
        self.buildingId = attrs.get('buildingId')

        try:
            self.instance = Deliveredgoods.objects.get(deliveredgoodsid=self.pk)

        except:
            raise serializers.ValidationError('delivered goods with this id not exists!')

        if self.instance.owneruserid:
            raise serializers.ValidationError('this delivered goods already assigned to an user')

        if self.instance.goodsid.gooodsgroupid.ispartinsidecomputer:
            raise serializers.ValidationError(
                'you can not assign the delivered good to user that is the goods inside the computer!')

        try:
            user = User.objects.get(userid=attrs.get('ownerUserId'))
            area = Area.objects.get(areaid=attrs.get('areaId'))
            building = Building.objects.get(buildingid=attrs.get('buildingId'))

            Userlocationinbuildingarea.objects.filter(buildingid=building, userid=user, areaid=area)
        except:
            raise serializers.ValidationError('this user not working in this area and building!')

        return attrs

    def validate_ownerUserId(self, value):
        try:
            self.owneruser = User.objects.get(userid=value)
            return value
        except:
            raise serializers.ValidationError('user with this id not exists!')

    def validate_areaId(self, value):
        try:
            self.area = Area.objects.get(areaid=value)
            return value
        except:
            raise serializers.ValidationError('area with this id not exists!')

    def validate_buildingId(self, value):
        try:
            self.building = Building.objects.get(buildingid=value)
            return value
        except:
            raise serializers.ValidationError('building with this id not exists!')

    def save(self):
        request = self.context.get("request")
        self.instance.owneruserid = self.owneruser
        self.instance.updateruserid = request.user
        self.instance.computerupdatetime = timezone.now()
        self.instance.areaid = self.area
        self.instance.buildingid = self.building
        self.instance.save()

        return DeliveredGoodsSerializer(self.instance).data


class TicketSerializer(serializers.ModelSerializer):
    ticketstatusid = serializers.SerializerMethodField(read_only=True)
    ticketsubjectid = serializers.SerializerMethodField(read_only=True)
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    ticketcreatetime = serializers.DateTimeField(read_only=True)
    ticketupdatetime = serializers.DateTimeField(read_only=True)
    deliveredgoodsid = serializers.SerializerMethodField(read_only=True)
    computerpropertynumber = serializers.SerializerMethodField(read_only=True)

    TicketSubjectId = serializers.IntegerField(write_only=True)
    DeliveredGoodsiId = serializers.IntegerField(write_only=True, required=False)
    ComputerPropertyNumber = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Ticket
        fields = (
            'ticketid',
            'ticketstatusid',
            'ticketsubjectid',
            'createruserid',
            'updateruserid',
            'ticketcreatetime',
            'ticketupdatetime',
            'ticketdescription',
            'deliveredgoodsid',
            'computerpropertynumber',

            'TicketSubjectId',
            'DeliveredGoodsiId',
            'ComputerPropertyNumber',
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)

        fields_to_exclude = ['deliveredgoodsid', 'computerpropertynumber']
        for field_name in fields_to_exclude:
            if data.get(field_name) is None:
                data.pop(field_name)

        return data

    def validate(self, attrs):

        self.DeliveredGoodsiId = attrs.get("DeliveredGoodsiId")
        self.ComputerPropertyNumber = attrs.get("ComputerPropertyNumber")

        if not self.ComputerPropertyNumber and not self.DeliveredGoodsiId:
            raise serializers.ValidationError(
                "you have to enter one the DeliveredGoodsId or ComputerPropertyNumber!")

        if self.ComputerPropertyNumber and self.DeliveredGoodsiId:
            raise serializers.ValidationError(
                "you won't be able to enter and DeliveredGoodsiId and ComputerPropertyNumber at the same time!")

        ticketsubject = Ticketsubject.objects.get(ticketsubjectid=attrs.get("TicketSubjectId"))
        self.ticketsubject = ticketsubject

        if self.DeliveredGoodsiId:

            self.deliveredgoods = Deliveredgoods.objects.get(deliveredgoodsid=self.DeliveredGoodsiId,
                                                             relatedcomputerpropertynumber__isnull=True)

            goodGroup = self.deliveredgoods.goodsid.gooodsgroupid

            if ticketsubject.ticketsubjectid == 1 and goodGroup.isallowedtomove == False:
                raise serializers.ValidationError('این کالا قابلیت جابجایی ندارد')

            elif ticketsubject.ticketsubjectid == 2 and goodGroup.isallowedtobeaborted == False:
                raise serializers.ValidationError('این کالا نمی تواند اسقاط شود')

            elif ticketsubject.ticketsubjectid == 3 and goodGroup.ispartinsidecomputer == False:
                raise serializers.ValidationError('این کالا قابلیت برزرسانی ندارد')

            elif ticketsubject.ticketsubjectid == 4 and (
                    goodGroup.ispartinsidecomputer == True or goodGroup.ispossibletorepair == False):
                raise serializers.ValidationError('شما نمی توانید این کالا را تعمیر کنید ')

            elif ticketsubject.ticketsubjectid == 5:
                raise serializers.ValidationError('شما نمی توانید روی کالا تحویلی نصب انجام دهید')

            elif ticketsubject.ticketsubjectid == 6 and goodGroup.isallowedtosendout == False:
                raise serializers.ValidationError('این کالا قابلیت ارسال به بیرون ندارد')

            request = self.context.get("request")
            self.user = User.objects.get(userpersonalid=request.user.userpersonalid)
            owneruser = self.deliveredgoods.owneruserid
            self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.get(userid=self.user)
            self.userlocationinbuildingareaowner = Userlocationinbuildingarea.objects.get(userid=owneruser)

            if self.user.userroleid.userroleid == 2:

                if self.userlocationinbuildingareasuporter.buildingid != self.userlocationinbuildingareaowner.buildingid or self.userlocationinbuildingareasuporter.areaid != self.userlocationinbuildingareaowner.areaid:
                    raise serializers.ValidationError(
                        'نمی توانید برای کاربری که در ساختمان  و یا حوزه شما نیست تیکت ثبت کنید.')

        if self.ComputerPropertyNumber:
            self.computer = Computer.objects.get(computerpropertynumber=self.ComputerPropertyNumber)

            if ticketsubject.ticketsubjectid == 3:
                raise serializers.ValidationError('کامپیوتر قابلیت بروزرسانی ندارد')

            elif ticketsubject.ticketsubjectid == 4:
                raise serializers.ValidationError('کامپیوتر قابلیت تعمیر ندارد')

            elif ticketsubject.ticketsubjectid == 6:
                raise serializers.ValidationError('کامپیوتر قابلیت ارسال به بیرون ندارد.')

            request = self.context.get("request")
            self.user = User.objects.get(userpersonalid=request.user.userpersonalid)
            owneruser = self.computer.owneruserid
            self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.get(userid=self.user)
            self.userlocationinbuildingareaowner = Userlocationinbuildingarea.objects.get(userid=owneruser)

            if self.user.userroleid.userroleid == 2:
                if self.userlocationinbuildingareasuporter.buildingid != self.userlocationinbuildingareaowner.buildingid or self.userlocationinbuildingareasuporter.areaid != self.userlocationinbuildingareaowner.areaid:
                    raise serializers.ValidationError(
                        'نمی توانید برای کاربری که در حوزه یا ساختمان شما حضور ندارد تیکت ثبت کنید')

        return attrs

    def validate_TicketSubjectId(self, value):
        try:
            self.ticketstatus = Ticketsubject.objects.get(ticketsubjectid=value)
            return value
        except:
            raise serializers.ValidationError('ticket subject with this id not exists!')

    def validate_DeliveredGoodsiId(self, value):
        if value:
            try:
                self.deliveredgoods = Deliveredgoods.objects.get(deliveredgoodsid=value,
                                                                 relatedcomputerpropertynumber__isnull=True)
                return value
            except:
                raise serializers.ValidationError(
                    'کالایی با این کد وجود ندارد و یا کالا داخل کیس است ')
        return value

    def validate_ComputerPropertyNumber(self, value):
        if value:
            try:
                self.computer = Computer.objects.get(computerpropertynumber=value)
                return value
            except:
                raise serializers.ValidationError('کامپیوتر با این شماره اموال وجود ندارد')
        return value

    def get_ticketstatusid(self, obj):
        ticketstat = obj.ticketstatusid
        if ticketstat:
            return ticketstat.ticketstatusname
        return None

    def get_ticketsubjectid(self, obj):
        ticketsubject = obj.ticketsubjectid
        if ticketsubject:
            return ticketsubject.ticketsubjectname
        return None

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_deliveredgoodsid(self, obj):
        deli = obj.deliveredgoodsid
        if deli:
            return {
                'deliveredgoodsserial': deli.deliveredgoodsserial,
                'deliveredgoodsserial': deli.goodsid.goodsname,
                'areaid': deli.areaid.areaname,
                'buildingid': deli.buildingid.buildingname,
            }
        return None

    def get_computerpropertynumber(self, obj):
        com = obj.computerpropertynumber
        if com:
            return {
                'computername': com.computername,
                'computermodel': com.computermodel,
                'computerip': com.computerip,
                'computermacaddress': com.computermacaddress,
                'computerispersonal': com.computerispersonal,
                'operationsystem': com.operationsystemversionid.operationsystemid.operationsystemname,
                'operationsystemversion': com.operationsystemversionid.operationsystemversionname,
                'areaid': com.areaid.areaname,
                'buildingid': com.buildingid.buildingname,
            }
        return None

    def save(self, **kwargs):
        request = self.context.get("request")
        validated_data = self.validated_data

        if validated_data.get('DeliveredGoodsiId'):
            self.ticket = Ticket.objects.create(
                ticketstatusid=Ticketstatus.objects.get(ticketstatusid=1),
                ticketsubjectid=Ticketsubject.objects.get(ticketsubjectid=validated_data['TicketSubjectId']),
                createruserid=request.user,
                ticketcreatetime=timezone.now(),
                ticketupdatetime=timezone.now(),
                ticketdescription=validated_data.get("ticketdescription"),
                deliveredgoodsid=Deliveredgoods.objects.get(deliveredgoodsid=validated_data['DeliveredGoodsiId']),
            )

        elif validated_data.get('ComputerPropertyNumber'):
            self.ticket = Ticket.objects.create(
                ticketstatusid=Ticketstatus.objects.get(ticketstatusid=1),
                ticketsubjectid=Ticketsubject.objects.get(ticketsubjectid=validated_data['TicketSubjectId']),
                createruserid=request.user,
                ticketcreatetime=timezone.now(),
                ticketupdatetime=timezone.now(),
                ticketdescription=validated_data.get("ticketdescription"),
                computerpropertynumber=Computer.objects.get(
                    computerpropertynumber=validated_data['ComputerPropertyNumber']),
            )

        if self.user.userroleid.userroleid == 2:
            Usersrefferdedticket.objects.create(
                reffereduserid=User.objects.get(userpersonalid=1),
                ticketid=self.ticket,
                refferedticketdate=timezone.now(),
                refferedticketdescription=validated_data.get("ticketdescription"),
            )
        else:
            refferuser = User.objects.filter(userroleid_id=2)
            for userref in refferuser:
                if Userlocationinbuildingarea.objects.filter(userid=userref, buildingid=self.userlocationinbuildingareasuporter.buildingid, areaid=self.userlocationinbuildingareasuporter.areaid):

                    Usersrefferdedticket.objects.create(
                        reffereduserid=userref,
                        ticketid=self.ticket,
                        refferedticketdate=timezone.now(),
                        refferedticketdescription=validated_data.get("ticketdescription"),
                    )
        return TicketSerializer(self.ticket).data


class Ticketserializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "__all__"


class AnswerOrReferTicketToUpperUserSerializer(serializers.Serializer):
    ticketid = serializers.IntegerField()
    refferedticketdescription = serializers.CharField()
    isReply = serializers.BooleanField(write_only=True, required=False)
    isForward = serializers.BooleanField(write_only=True, required=False)

    def validate_ticketid(self, value):
        if value:
            try:
                self.ticket = Ticket.objects.get(ticketid=value)
                return value
            except:
                raise serializers.ValidationError('ticket with this id not exists!')
        return value

    def validate(self, attrs):
        self.user = self.context.get("request").user

        self.userrole = User.objects.filter(userpersonalid=self.user.userpersonalid).first().userroleid.userroleid

        self.isReply = attrs.get("isReply")
        self.isForward = attrs.get("isForward")

        if self.isReply and self.isForward:
            raise serializers.ValidationError('your refer must be for owner user or for another user!')
        elif not self.isReply and not self.isForward:
            raise serializers.ValidationError('you have to choose the reply or forward item!')
        if self.isForward and (self.userrole == 3 or self.userrole == 1):
            raise serializers.ValidationError('usual user and admin can not forward ticket')

        return attrs

    def save(self):
        self.refferedticketdescription = self.validated_data.get('refferedticketdescription', '')

        print(self.isReply, self.isForward)

        if self.isReply:
            Usersrefferdedticket.objects.create(
                reffereduserid=self.ticket.createruserid,
                ticketid=self.ticket,
                refferedticketdate=timezone.now(),
                refferedticketdescription=self.refferedticketdescription,
            )

        elif self.isForward:
            Usersrefferdedticket.objects.create(
                reffereduserid=User.objects.get(userpersonalid=1),
                ticketid=self.ticket,
                refferedticketdate=timezone.now(),
                refferedticketdescription=self.refferedticketdescription,
            )

        return {
            'refferedticketdescription': self.refferedticketdescription,
        }

class UsersrefferdedticketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usersrefferdedticket
        fields = '__all__'

class TicketHistorySerializer(serializers.ModelSerializer):
    referred_tickets = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = '__all__'

    def get_referred_tickets(self, obj):
        referred_tickets = Usersrefferdedticket.objects.filter(ticketid=obj.ticketid)
        return UsersrefferdedticketSerializer(referred_tickets, many=True).data


class AbortionSerializer(serializers.ModelSerializer):
    abortioncreatetime = serializers.DateTimeField(read_only=True)
    abortionupdatetime = serializers.DateTimeField(read_only=True)
    TicketId = serializers.IntegerField(write_only=True)
    DeliveredGoodsiId = serializers.IntegerField(write_only=True, required=False)
    ComputerPropertyNumber = serializers.IntegerField(write_only=True, required=False)

    owneruserid = serializers.SerializerMethodField(read_only=True)
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    deliveredgoodsid = serializers.SerializerMethodField(read_only=True)
    ticketid = serializers.SerializerMethodField(read_only=True)
    computerpropertynumber = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Abortion
        fields = (
            'abortionid',
            'abortioncreatetime',
            'abortionupdatetime',
            'abortiondonetime',
            'createruserid',
            'owneruserid',
            'updateruserid',
            'deliveredgoodsid',
            'computerpropertynumber',
            'ticketid',

            'TicketId',
            'DeliveredGoodsiId',
            'ComputerPropertyNumber',
        )

    def validate(self, attrs):

        self.DeliveredGoodsiId = attrs.get("DeliveredGoodsiId")
        self.ComputerPropertyNumber = attrs.get("ComputerPropertyNumber")

        if not self.ComputerPropertyNumber and not self.DeliveredGoodsiId:
            raise serializers.ValidationError(
                "you have to enter one the DeliveredGoodsId or ComputerPropertyNumber!")

        if self.ComputerPropertyNumber and self.DeliveredGoodsiId:
            raise serializers.ValidationError(
                "you won't be able to enter and DeliveredGoodsiId and ComputerPropertyNumber at the same time!")

        self.ticket = Ticket.objects.get(ticketid=attrs.get("TicketId"))

        if self.DeliveredGoodsiId:
            if self.deliveredgoods != self.ticket.deliveredgoodsid:
                raise serializers.ValidationError("your entered Ticket not related to this delivered goods!")
        if self.ComputerPropertyNumber:
            if self.computer != self.ticket.computerpropertynumber:
                raise serializers.ValidationError("your entered Ticket not related to this computer!")

        return attrs

    def validate_TicketId(self, value):
        self.ticket = Ticket.objects.filter(ticketid=value)

        if self.ticket.first().ticketsubjectid.ticketsubjectid != 2:
            raise serializers.ValidationError('your ticket not related to the abortion!')
        elif not self.ticket:
            raise serializers.ValidationError('ticket with this id not exists!')
        return value

    def validate_DeliveredGoodsiId(self, value):
        if value:
            try:
                self.deliveredgoods = Deliveredgoods.objects.get(deliveredgoodsid=value,
                                                                 relatedcomputerpropertynumber__isnull=True)

                goodGroup = self.deliveredgoods.goodsid.gooodsgroupid
                if not goodGroup.isallowedtobeaborted:
                    raise serializers.ValidationError('you can not aboration this delivered goods!')

                return value
            except:
                raise serializers.ValidationError(
                    'delivered goods with this id not exists or is the item that inside the computer!!')
        return value

    def validate_ComputerPropertyNumber(self, value):
        if value:
            try:
                self.computer = Computer.objects.get(computerpropertynumber=value)
            except:
                raise serializers.ValidationError('computer with this id not exists!')
        return value

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_owneruserid(self, obj):
        return UserInfo().returnInfo(obj.owneruserid)

    def get_deliveredgoodsid(self, obj):
        self.deli = obj.deliveredgoodsid
        if self.deli:
            return {
                'deliveredgoodsserial': self.deli.deliveredgoodsserial,
                'deliveredgoodsserial': self.deli.goodsid.goodsname,
                'areaid': self.deli.areaid.areaname,
                'buildingid': self.deli.buildingid.buildingname,
            }
        return None

    def get_computerpropertynumber(self, obj):
        com = obj.computerpropertynumber
        if com:
            return {
                'computername': com.computername,
                'computermodel': com.computermodel,
                'computerip': com.computerip,
                'computermacaddress': com.computermacaddress,
                'computerispersonal': com.computerispersonal,
                'operationsystem': com.operationsystemversionid.operationsystemid.operationsystemname,
                'operationsystemversion': com.operationsystemversionid.operationsystemversionname,
                'areaid': com.areaid.areaname,
                'buildingid': com.buildingid.buildingname,
            }
        return None

    def get_ticketid(self, obj):
        tik = obj.ticketid
        if tik:
            return {
                'ticketid': tik.ticketid,
                'ticketdescription': tik.ticketdescription,
            }
        return None

    def save(self):
        request = self.context.get("request")
        validated_data = self.validated_data

        if validated_data.get('DeliveredGoodsiId'):
            self.deli = Deliveredgoods.objects.get(deliveredgoodsid=validated_data['DeliveredGoodsiId'])
            self.abortion = Abortion.objects.create(
                abortioncreatetime=timezone.now(),
                abortionupdatetime=timezone.now(),
                ticketid=self.ticket,
                abortiondonetime=validated_data['abortiondonetime'],
                createruserid=User.objects.get(userid=request.user.userid),
                owneruserid=self.deli.owneruserid,
                deliveredgoodsid=self.deli,
            )

        elif validated_data.get('ComputerPropertyNumber'):
            self.abortion = Abortion.objects.create(
                abortioncreatetime=timezone.now(),
                abortionupdatetime=timezone.now(),
                ticketid=self.ticket,
                abortiondonetime=validated_data['abortiondonetime'],
                createruserid=User.objects.get(userid=request.user.userid),
                owneruserid=self.computer.owneruserid,
                computerpropertynumber=Computer.objects.get(
                    computerpropertynumber=validated_data['ComputerPropertyNumber']),
            )

        return AbortionSerializer(self.abortion).data


class AbortionEditSerializer(serializers.Serializer):
    abortiondonetime = serializers.DateField()

    def save(self):
        request = self.context.get("request")
        validated_data = self.validated_data
        computer_id = self.context.get("computer_id")
        deliveredgoods_id = self.context.get("deliveredgoods_id")

        if computer_id:
            try:
                abortion = Abortion.objects.get(computerpropertynumber=computer_id)
            except Abortion.DoesNotExist:
                raise serializers.ValidationError('abortion for this computer not exist')

        elif deliveredgoods_id:
            try:
                abortion = Abortion.objects.get(deliveredgoodsid=deliveredgoods_id)
            except Abortion.DoesNotExist:
                raise serializers.ValidationError('abortion for this deliveredgoods not exist')

        abortion.abortionupdatetime = timezone.now()
        abortion.abortiondonetime = validated_data.get('abortiondonetime', '')
        abortion.updateruserid = User.objects.get(userid=request.user.userid)
        abortion.save()

        return AbortionSerializer(abortion).data


class InternalRepairSerializer(serializers.ModelSerializer):
    internalrepaircreatetime = serializers.DateTimeField(read_only=True)
    internalrepairupdatetime = serializers.DateTimeField(read_only=True)
    internalrepairdescription = serializers.CharField()

    TicketId = serializers.IntegerField(write_only=True)
    DeliveredGoodsiId = serializers.IntegerField(write_only=True, required=False)

    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    deliveredgoodsid = serializers.SerializerMethodField(read_only=True)
    ticketid = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Internalrepair
        fields = (
            'internalrepairid',
            'internalrepairdescription',
            'internalrepairchangingdescription',
            'internalrepaircreatetime',
            'internalrepairupdatetime',
            'internalrepairdonetime',
            'createruserid',
            'updateruserid',
            'deliveredgoodsid',
            'ticketid',

            'TicketId',
            'DeliveredGoodsiId',
        )

    def validate(self, attrs):

        self.DeliveredGoodsiId = attrs.get("DeliveredGoodsiId")
        self.ticket = Ticket.objects.get(ticketid=attrs.get("TicketId"))

        if self.deliveredgoods != self.ticket.deliveredgoodsid:
            raise serializers.ValidationError("your entered Ticket not related to this delivered goods!")

        return attrs

    def validate_TicketId(self, value):
        try:
            self.ticket = Ticket.objects.get(ticketid=value)
        except:
            raise serializers.ValidationError('ticket with this id not exists!')

        if self.ticket.ticketsubjectid.ticketsubjectid != 4:
            raise serializers.ValidationError('your ticket not related to the internalrepaire!')

        return value

    def validate_DeliveredGoodsiId(self, value):
        if value:
            try:
                self.deliveredgoods = Deliveredgoods.objects.get(deliveredgoodsid=value,
                                                                 relatedcomputerpropertynumber__isnull=True)

                goodGroup = self.deliveredgoods.goodsid.gooodsgroupid
                if not goodGroup.isallowedtoberepaired:
                    raise serializers.ValidationError('you can not repair this delivered goods!')

                return value
            except:
                raise serializers.ValidationError(
                    'delivered goods with this id not exists or is the item that inside the computer!!')
        return value

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_deliveredgoodsid(self, obj):
        self.deli = obj.deliveredgoodsid
        if self.deli:
            return {
                'deliveredgoodsserial': self.deli.deliveredgoodsserial,
                'deliveredgoodsserial': self.deli.goodsid.goodsname,
                'areaid': self.deli.areaid,
                'buildingid': self.deli.buildingid,
            }
        return None

    def get_ticketid(self, obj):
        tik = obj.ticketid
        if tik:
            return {
                'ticketid': tik.ticketid,
                'ticketdescription': tik.ticketdescription,
            }
        return None

    def create(self, validated_data):
        request = self.context.get("request")
        self.deli = Deliveredgoods.objects.get(deliveredgoodsid=validated_data.get('DeliveredGoodsiId'),
                                               relatedcomputerpropertynumber__isnull=False)

        self.internalrepair = Internalrepair.objects.create(
            internalrepairdescription=validated_data['internalrepairdescription'],
            internalrepairchangingdescription=validated_data['internalrepairchangingdescription'],
            internalrepaircreatetime=timezone.now(),
            internalrepairupdatetime=timezone.now(),
            internalrepairdonetime=validated_data['internalrepairdonetime'],
            createruserid=User.objects.get(userid=request.user.userid),
            deliveredgoodsid=self.deli,
            ticketid=self.ticket,
        )

        computersealling = Computersealling.objects.filter(
            computerpropertynumber=self.deli.relatedcomputerpropertynumber.computerpropertynumber).last()
        if computersealling:
            computersealling.isexpired = True
            computersealling.save()
        return self.internalrepair

    def update(self, instance, validated_data):
        request = self.context.get("request")

        instance.internalrepairdescription = validated_data.get('internalrepairdescription', '')
        instance.internalrepairchangingdescription = validated_data.get('internalrepairchangingdescription', '')
        instance.internalrepairupdatetime = timezone.now()
        instance.internalrepairdonetime = validated_data.get('internalrepairdonetime', '')
        instance.updateruserid = User.objects.get(userid=request.user.userid)
        instance.save()

        return instance


class OutboundDocumentSerializer(serializers.ModelSerializer):
    outbounddocumentcreatetime = serializers.DateTimeField(read_only=True)
    outbounddocumentupdatetime = serializers.DateTimeField(read_only=True)

    TicketId = serializers.IntegerField(write_only=True)
    DeliveredGoodsiId = serializers.IntegerField(write_only=True)
    owneruserid = serializers.SerializerMethodField(read_only=True)
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    deliveredgoodsid = serializers.SerializerMethodField(read_only=True)
    ticketid = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Outbounddocument
        fields = (
            'outbounddocumentserial',
            'outbounddocumentdescription',
            'outbounddocumentdonetime',
            'TicketId',
            'DeliveredGoodsiId',

            'outbounddocumentcreatetime',
            'outbounddocumentupdatetime',

            'createruserid',
            'owneruserid',
            'updateruserid',
            'deliveredgoodsid',
            'ticketid',
        )

    def validate(self, attrs):

        self.DeliveredGoodsiId = attrs.get("DeliveredGoodsiId")
        self.ticket = Ticket.objects.get(ticketid=attrs.get("TicketId"))

        if self.deliveredgoods != self.ticket.deliveredgoodsid:
            raise serializers.ValidationError("your entered Ticket not related to this delivered goods!")

        return attrs

    def validate_TicketId(self, value):
        try:
            self.ticket = Ticket.objects.get(ticketid=value)
        except:
            raise serializers.ValidationError('ticket with this id not exists!')

        if self.ticket.ticketsubjectid.ticketsubjectid != 6:
            raise serializers.ValidationError('your ticket not related to the outbound document!')

        return value

    def validate_DeliveredGoodsiId(self, value):
        if value:
            try:
                self.deliveredgoods = Deliveredgoods.objects.get(deliveredgoodsid=value,
                                                                 relatedcomputerpropertynumber__isnull=True)
            except:
                raise serializers.ValidationError(
                    'delivered goods with this id not exists or is the item that inside the computer!!')

            goodGroup = self.deliveredgoods.goodsid.gooodsgroupid
            if not goodGroup.isallowedtosendout:
                raise serializers.ValidationError('you can not isallowedtosendout this delivered goods!')
        return value

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_owneruserid(self, obj):
        return UserInfo().returnInfo(obj.owneruserid)

    def get_deliveredgoodsid(self, obj):
        self.deli = obj.deliveredgoodsid
        if self.deli:
            return {
                'deliveredgoodsserial': self.deli.deliveredgoodsserial,
                'deliveredgoodsserial': self.deli.goodsid.goodsname,
                'areaid': self.deli.areaid.areaid,
                'buildingid': self.deli.buildingid.buildingid,
            }
        return None

    def get_ticketid(self, obj):
        tik = obj.ticketid
        if tik:
            return {
                'ticketid': tik.ticketid,
                'ticketdescription': tik.ticketdescription,
            }
        return None

    def create(self, validated_data):
        request = self.context.get("request")

        self.outbounddocument = Outbounddocument.objects.create(
            outbounddocumentdescription=validated_data['outbounddocumentdescription'],
            outbounddocumentcreatetime=timezone.now(),
            outbounddocumentupdatetime=timezone.now(),
            outbounddocumentdonetime=validated_data['outbounddocumentdonetime'],
            deliveredgoodsid=self.deliveredgoods,
            createruserid=User.objects.get(userid=request.user.userid),
            owneruserid=self.deliveredgoods.owneruserid,
            ticketid=self.ticket,
        )

        return self.outbounddocument

    def update(self, instance, validated_data):
        request = self.context.get("request")

        instance.outbounddocumentdescription = validated_data.get('outbounddocumentdescription', '')
        instance.outbounddocumentdonetime = validated_data.get('outbounddocumentdonetime', '')
        instance.updateruserid = User.objects.get(userid=request.user.userid)
        instance.save()

        return instance


class SoftwareSerializer(serializers.ModelSerializer):
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    softwarecreatetime = serializers.DateTimeField(read_only=True)
    softwareupdatetime = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Softwares
        fields = (
            'softwareid',
            'softwarename',
            'softwarecreatetime',
            'softwareupdatetime',
            'createruserid',
            'updateruserid',
        )

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data['createruserid'] = request.user
        validated_data['softwarecreatetime'] = timezone.now()
        validated_data['softwareupdatetime'] = timezone.now()

        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context.get("request")

        instance.updateruserid = request.user
        instance.softwarename = validated_data.get('softwarename', instance.softwarename)
        instance.softwareupdatetime = timezone.now()
        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)


class InstallationSerializer(serializers.ModelSerializer):
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    installationcreatetime = serializers.DateTimeField(read_only=True)
    installationupdatetime = serializers.DateTimeField(read_only=True)
    installationdonetime = serializers.DateField(write_only=True)
    TicketId = serializers.IntegerField(write_only=True)
    computerpropertynumber = serializers.IntegerField(write_only=True)
    ticketid = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Installation
        fields = (
            'installationid',
            'installationdescription',
            'installationupdatetime',
            'ticketid',
            'createruserid',
            'updateruserid',
            'TicketId',
            'computerpropertynumber',
            'installationcreatetime',
            'installationdonetime',
        )

    def to_representation(self, instance):
        request = self.context.get('request')
        if request and request.method == 'GET':
            instalizationoncomputer = Installizationsoncomputer.objects.filter(installationid=instance)
            softwaresininstallization = Softwaresininstallization.objects.filter(installationid=instance)

            return {
                'installationid': instance.installationid,
                'installationdescription': instance.installationdescription,
                'installationupdatetime': instance.installationupdatetime,
                'ticketid': instance.ticketid.ticketid,
                'createruserid': UserInfo().returnInfo(instance.createruserid),
                'updateruserid': UserInfo().returnInfo(instance.updateruserid) if instance.updateruserid else None,
                'computerpropertynumber': [obj.computerpropertynumber.computerpropertynumber for obj in
                                           instalizationoncomputer],
                'installedsoftwares': [[obj.softwareid.softwareid, obj.usageofsoftwaresininstallization] for obj in
                                       softwaresininstallization],
            }

        return super().to_representation(instance)

    def create(self, validated_data):
        request = self.context.get("request")
        now = timezone.now()
        installation = Installation.objects.create(
            installationdescription=validated_data['installationdescription'],
            installationupdatetime=now,
            createruserid=User.objects.get(userid=request.user.userid),
            ticketid=self.ticket,
        )
        Installizationsoncomputer.objects.create(
            installationid=installation,
            computerpropertynumber=self.computer,
            installationcreatetime=now,
            installationdonetime=validated_data['installationdonetime'],
        )
        return installation

    def update(self, instance, validated_data):

        request = self.context.get("request")
        user = User.objects.get(userid=request.user.userid)
        if instance.createruserid != user and user.userroleid.userroleid == 2:
            raise serializers.ValidationError('you can not edit the initialization that you do not add it!')

        instance.updateruserid = request.user
        instance.installationdescription = validated_data.get('installationdescription',
                                                              instance.installationdescription)
        instance.installationupdatetime = timezone.now()

        instance.save()
        return instance

    def validate_computerpropertynumber(self, value):
        try:
            self.computer = Computer.objects.get(computerpropertynumber=value)
            request = self.context.get("request")
            user = User.objects.get(userid=request.user.userid)
            self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.filter(userid=user,
                                                                                                buildingid=self.computer.buildingid,
                                                                                                areaid=self.computer.areaid)
            if not self.userlocationinbuildingareasuporter:
                raise serializers.ValidationError(
                    'you can not do initialization on computer that not at your area and building!')

        except:
            raise serializers.ValidationError('computer with this id not exists!')

        return value

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def validate_TicketId(self, value):
        try:
            self.ticket = Ticket.objects.get(ticketid=value)
        except:
            raise serializers.ValidationError('ticket with this id not exists!')

        if self.ticket.ticketsubjectid.ticketsubjectid != 5:
            raise serializers.ValidationError('your ticket not related to the installation!')

        return value

    def get_ticketid(self, obj):
        tik = obj.ticketid
        if tik:
            return {
                'ticketid': tik.ticketid,
                'ticketdescription': tik.ticketdescription,
            }
        return None


class InstallizationsOnComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installizationsoncomputer
        fields = (
            "installationid",
            "computerpropertynumber",
            "installationcreatetime",
            "installationdonetime",
        )


class InstallizationsOnComputerEditSerializer(serializers.Serializer):
    installationdonetime = serializers.DateField(write_only=True)

    def validate(self, attrs):
        self.request = self.context.get("request")
        self.computerpropertynumber = self.context.get("computerpropertynumber")
        self.installizations_id = self.context.get("installizations_id")

        try:
            self.computer = Computer.objects.get(computerpropertynumber=self.computerpropertynumber)

            user = User.objects.get(userid=self.request.user.userid)
            if user.userroleid.userroleid == 2:
                self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.filter(userid=user,
                                                                                                    buildingid=self.computer.buildingid,
                                                                                                    areaid=self.computer.areaid)
                if not self.userlocationinbuildingareasuporter:
                    raise serializers.ValidationError('you can not access to this computer')

        except Computer.DoesNotExist:
            raise serializers.ValidationError('not computer exist with this id!')

        try:
            self.installation = Installation.objects.get(installationid=self.installizations_id)
        except Computer.DoesNotExist:
            raise serializers.ValidationError('not installation exist with this id!')

        self.instances = Installizationsoncomputer.objects.filter(installationid=self.installation,
                                                                  computerpropertynumber=self.computer)
        if not self.instances:
            raise serializers.ValidationError('this computer not have any instalization with that id!')

        return attrs

    def save(self):
        validated_data = self.validated_data
        for instance in self.instances:
            instance.installationdonetime = validated_data.get('installationdonetime', '')
            instance.save()

        return InstallizationsOnComputerSerializer(self.instances, many=True).data


class SoftwareUsageInInstallizationSerializer(serializers.ModelSerializer):
    installationid = serializers.SerializerMethodField(read_only=True)
    softwareid = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Softwaresininstallization
        fields = (
            'installationid',
            'softwareid',
            'usageofsoftwaresininstallization',
        )

    def validate(self, attrs):
        self.software_id = self.context.get('software_id')
        self.instalation_id = self.context.get('instalation_id')
        request = self.context.get('request')
        try:
            self.software = Softwares.objects.get(softwareid=self.software_id)
            user = User.objects.get(userid=request.user.userid)
            if user.userroleid.userroleid == 2:
                self.installation = Installation.objects.get(installationid=self.instalation_id, createruserid=user)
            else:
                self.installation = Installation.objects.get(installationid=self.instalation_id)
        except Softwares.DoesNotExist:
            raise serializers.ValidationError('software with that id not exists!')
        except Installation.DoesNotExist:
            raise serializers.ValidationError('installation with that id not exists!')

        return attrs

    def get_installationid(self, obj):
        return obj.installationid.installationid

    def get_softwareid(self, obj):
        return obj.softwareid.softwareid

    def save(self):
        self.instance = Softwaresininstallization.objects.create(
            installationid=Installation.objects.get(installationid=self.instalation_id),
            softwareid=Softwares.objects.get(softwareid=self.software_id),
            usageofsoftwaresininstallization=self.validated_data.get('usageofsoftwaresininstallization')
        )
        return SoftwareUsageInInstallizationSerializer(self.instance).data

    def update(self):
        try:
            instance = Softwaresininstallization.objects.get(
                installationid=Installation.objects.get(installationid=self.instalation_id),
                softwareid=Softwares.objects.get(softwareid=self.software_id), )

            instance.usageofsoftwaresininstallization = self.validated_data.get('usageofsoftwaresininstallization')
            instance.save()
            return SoftwareUsageInInstallizationSerializer(instance).data
        except:
            raise serializers.ValidationError('Replacementdeliveygoodsinupdate matching query does not exist.')

    def destroy(self):
        try:
            instance = Softwaresininstallization.objects.get(
                installationid=Installation.objects.get(installationid=self.instalation_id),
                softwareid=Softwares.objects.get(softwareid=self.software_id),
            )
            instance.delete()
        except:
            raise serializers.ValidationError('Replacementdeliveygoodsinupdate matching query does not exist.')


class UpdateDeliveredGoodsSerializer(serializers.ModelSerializer):
    createruserid = serializers.SerializerMethodField(read_only=True)
    deactivate_replacements = serializers.SerializerMethodField(read_only=True)
    owneruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    ticketid = serializers.SerializerMethodField(read_only=True)
    owneruserid = serializers.SerializerMethodField(read_only=True)
    updatercreatetime = serializers.DateTimeField(read_only=True)
    updaterupdatetime = serializers.DateTimeField(read_only=True)
    delivered_goods = serializers.SerializerMethodField()
    TicketId = serializers.IntegerField(write_only=True)
    Owneruserid = serializers.IntegerField(write_only=True)

    class Meta:
        model = Updater
        fields = (
            'updaterid',
            'updatercreatetime',
            'updaterupdatetime',
            'createruserid',
            'updateruserid',
            'ticketid',
            'updaterdonetime',
            'TicketId',
            'deactivate_replacements',
            'delivered_goods',
            'owneruserid',
            'Owneruserid'
        )

    def create(self, validated_data):
        request = self.context.get("request")
        TicketId = validated_data.get('TicketId')
        Owneruserid = validated_data.get('Owneruserid')

        ticket = Ticket.objects.get(ticketid=TicketId)

        updater = Updater.objects.create(
            updatercreatetime=timezone.now(),
            updaterupdatetime=timezone.now(),
            updaterdonetime=validated_data.get('updaterdonetime'),
            createruserid=User.objects.get(userid=request.user.userid),
            owneruserid=User.objects.get(userpersonalid=Owneruserid),
            ticketid=ticket,
        )

        return updater

    def update(self, instance, validated_data):
        request = self.context.get("request")
        Owneruserid = validated_data.get('Owneruserid')
        if Owneruserid:
            instance.owneruserid = User.objects.get(userpersonalid=Owneruserid)
        instance.updaterdonetime = validated_data.get('updaterdonetime', instance.updaterdonetime)
        instance.updateruserid = request.user
        instance.updaterupdatetime = timezone.now()
        instance.save()
        return instance

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_owneruserid(self, obj):
        return UserInfo().returnInfo(obj.owneruserid) if obj.owneruserid else None

    def validate_TicketId(self, value):
        try:
            self.ticket = Ticket.objects.get(ticketid=value)
        except:
            raise serializers.ValidationError('ticket with this id not exists!')

        if self.ticket.ticketsubjectid.ticketsubjectid != 3:
            raise serializers.ValidationError('your ticket not related to the update!')

        return value

    def validate_Owneruserid(self, value):
        try:
            self.owneruser = User.objects.get(userpersonalid=value)
        except:
            raise serializers.ValidationError('user with this personal id with this id not exists!')

        return value

    def get_ticketid(self, obj):
        tik = obj.ticketid
        if tik:
            return {
                'ticketid': tik.ticketid,
                'ticketdescription': tik.ticketdescription,
            }
        return None

    def get_deactivate_replacements(self, obj):
        replacements = Replacementdeliveygoodsinupdate.objects.filter(updaterid=obj)
        return ReplacementdeliveygoodsinupdateSerializer(replacements, many=True).data

    def get_delivered_goods(self, obj):
        replacements = Replacementdeliveygoodsinupdate.objects.filter(updaterid=obj)
        delivered_goods_ids = replacements.values_list('deliveredgoodsid', flat=True)
        delivered_goods = Deliveredgoods.objects.filter(deliveredgoodsid__in=delivered_goods_ids)
        return DeliveredGoodsSerializer(delivered_goods, many=True).data


class ReplacementdeliveygoodsinupdateSerializer(serializers.ModelSerializer):
    deliveredgoods = DeliveredGoodsSerializer(source='deliveredgoodsid')

    class Meta:
        model = Replacementdeliveygoodsinupdate
        fields = '__all__'


class ReplacementdDeliveredGoodsInUpdateSerializer(serializers.ModelSerializer):
    updaterid = serializers.SerializerMethodField(read_only=True)
    deliveredgoodsid = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Replacementdeliveygoodsinupdate
        fields = (
            'updaterid',
            'deliveredgoodsid',
            'replacementdescription',
        )

    def validate(self, attrs):
        self.deliveredgoodsid = self.context.get('deliveredgoodsid')
        self.updaterid = self.context.get('updaterid')
        try:
            self.deliveredgoods = Deliveredgoods.objects.get(deliveredgoodsid=self.deliveredgoodsid)
            self.updater = Updater.objects.get(updaterid=self.updaterid)
            if not self.deliveredgoods.goodsid.gooodsgroupid.ispartinsidecomputer:
                raise serializers.ValidationError('delivered goods with that id not a peace inside of computer!')


        except Deliveredgoods.DoesNotExist:
            raise serializers.ValidationError('delivered goods with that id not exists!')
        except Updater.DoesNotExist:
            raise serializers.ValidationError('updater with that id not exists!')

        return attrs

    def save(self):
        self.deliveredgoodsid = self.context.get('deliveredgoodsid')

        self.instance = Replacementdeliveygoodsinupdate.objects.create(
            updaterid=Updater.objects.get(updaterid=self.updaterid),
            deliveredgoodsid=Deliveredgoods.objects.get(deliveredgoodsid=self.deliveredgoodsid),
            replacementdescription=self.validated_data.get('replacementdescription')
        )
        computersealling = Computersealling.objects.filter(
            computerpropertynumber=Deliveredgoods.objects.get(
                deliveredgoodsid=self.deliveredgoodsid).relatedcomputerpropertynumber.computerpropertynumber).last()
        if computersealling:
            computersealling.isexpired = True
            computersealling.save()
        return ReplacementdDeliveredGoodsInUpdateSerializer(self.instance).data

    def update(self):
        try:
            instance = Replacementdeliveygoodsinupdate.objects.get(
                updaterid=Updater.objects.get(updaterid=self.updaterid),
                deliveredgoodsid=Deliveredgoods.objects.get(deliveredgoodsid=self.deliveredgoodsid),
            )

            instance.replacementdescription = self.validated_data.get('replacementdescription')
            instance.save()
            return ReplacementdDeliveredGoodsInUpdateSerializer(instance).data
        except:
            raise serializers.ValidationError('Replacementdeliveygoodsinupdate matching query does not exist.')

    def destroy(self):
        try:
            instance = Replacementdeliveygoodsinupdate.objects.get(
                updaterid=Updater.objects.get(updaterid=self.updaterid),
                deliveredgoodsid=Deliveredgoods.objects.get(deliveredgoodsid=self.deliveredgoodsid),
            )

            instance.delete()
        except:
            raise serializers.ValidationError('Replacementdeliveygoodsinupdate matching query does not exist.')

    def get_updaterid(self, obj):
        return obj.updaterid.updaterid

    def get_deliveredgoodsid(self, obj):
        return obj.deliveredgoodsid.deliveredgoodsid


class ExchangingSerializer(serializers.ModelSerializer):    # i consider that what if the owner user work in tow place in that case i consider that the building and area as input
    areaId = serializers.IntegerField(write_only=True)
    buildingId = serializers.IntegerField(write_only=True)
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    RecieverUserId = serializers.IntegerField(read_only=True)
    exchangingupdatetime = serializers.DateTimeField(read_only=True)
    ticketid = serializers.SerializerMethodField(read_only=True)
    TicketId = serializers.IntegerField(write_only=True, required=False)
    DeliveredGoodsiId = serializers.IntegerField(write_only=True, required=False)
    ComputerPropertyNumber = serializers.IntegerField(write_only=True, required=False)
    donetime = serializers.DateField(write_only=True)
    userexchangerid = serializers.SerializerMethodField(read_only=True)
    deliveredgoodsid = serializers.SerializerMethodField(read_only=True)
    computerpropertynumber = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Exchanging
        fields = (
            'exchangingid',
            'exchangingdescription',
            'exchangingupdatetime',
            'createruserid',
            'updateruserid',
            'ticketid',
            'userexchangerid',
            'TicketId',
            'donetime',
            'RecieverUserId',
            'DeliveredGoodsiId',
            'ComputerPropertyNumber',
            'areaId',
            'buildingId',
            "deliveredgoodsid",
            "computerpropertynumber",
        )

    def validate(self, attrs):
        self.request = self.context.get("request")
        self.DeliveredGoodsiId = attrs.get("DeliveredGoodsiId")
        self.ComputerPropertyNumber = attrs.get("ComputerPropertyNumber")

        if not self.ComputerPropertyNumber and not self.DeliveredGoodsiId:
            raise serializers.ValidationError(
                "you have to enter one the DeliveredGoodsId or ComputerPropertyNumber!")

        if self.ComputerPropertyNumber and self.DeliveredGoodsiId:
            raise serializers.ValidationError(
                "you won't be able to enter and DeliveredGoodsiId and ComputerPropertyNumber at the same time!")

        ticketid = attrs.get("TicketId")
        if ticketid:
            self.ticket = Ticket.objects.get(ticketid=ticketid)

            if self.DeliveredGoodsiId:
                if self.ticket and self.deliveredgoods != self.ticket.deliveredgoodsid:
                    raise serializers.ValidationError("your entered Ticket not related to this delivered goods!")
            if self.ComputerPropertyNumber:
                if self.ticket and self.computer != self.ticket.computerpropertynumber:
                    raise serializers.ValidationError("your entered Ticket not related to this computer!")
        return attrs
    def validate_areaId(self, value):
        try:
            self.area = Area.objects.get(areaid=value)
            return value
        except:
            raise serializers.ValidationError('area with this id not exists!')

    def validate_buildingId(self, value):
        try:
            self.building = Building.objects.get(buildingid=value)
            return value
        except:
            raise serializers.ValidationError('building with this id not exists!')

    def validate_TicketId(self, value):
        if value:
            self.ticket = Ticket.objects.filter(ticketid=value)

            if self.ticket.first().ticketsubjectid.ticketsubjectid != 1:
                raise serializers.ValidationError('your ticket not related to the exchanging!')
            elif not self.ticket:
                raise serializers.ValidationError('ticket with this id not exists!')
        return value

    def validate_RecieverUserId(self, value):

        try:
            User.objects.get(userid=value)
        except:
            raise serializers.ValidationError('user with this id not exists!')
        return value

    def validate_DeliveredGoodsiId(self, value):
        if value:
            try:
                self.deliveredgoods = Deliveredgoods.objects.get(deliveredgoodsid=value,
                                                                 relatedcomputerpropertynumber__isnull=True,
                                                                 owneruserid__isnull=False)

                goodGroup = self.deliveredgoods.goodsid.gooodsgroupid
                if not goodGroup.isallowedtomove:
                    raise serializers.ValidationError('you can not exchanging this delivered goods!')

                # return value
            except:
                raise serializers.ValidationError(
                    'delivered goods with this id not exists or is the item that inside the computer!!')

            user = User.objects.get(userid=self.context.get('request').user.userid)
            if user.userroleid.userroleid == 2:
                self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.filter(
                    userid=user,
                    buildingid=self.deliveredgoods.buildingid,
                    areaid=self.deliveredgoods.areaid)
                if not self.userlocationinbuildingareasuporter:
                    raise serializers.ValidationError('this delivered goods not is in this area and building!')
        return value

    def validate_ComputerPropertyNumber(self, value):
        if value:
            try:
                self.computer = Computer.objects.get(computerpropertynumber=value, owneruserid__isnull=False)



            except:
                raise serializers.ValidationError('computer with this id not exists!')
            user = User.objects.get(userid=self.context.get('request').user.userid)
            if user.userroleid.userroleid == 2:
                self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.filter(
                    userid=user,
                    buildingid=self.computer.buildingid,
                    areaid=self.computer.areaid)
                if not self.userlocationinbuildingareasuporter:
                    raise serializers.ValidationError('this computer not is in this area and building!')
        return value


    def get_ticketid(self, obj):
        tik = obj.ticketid
        if tik:
            return {
                'ticketid': tik.ticketid,
                'ticketdescription': tik.ticketdescription,
            }
        return None

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_userexchangerid(self, obj):
        return UserInfo().returnInfo(obj.userexchangerid)

    def get_deliveredgoodsid(self, obj):
        deli = obj.ticketid.deliveredgoodsid
        if deli:
            return {
                'deliveredgoodsid': deli.deliveredgoodsid,
                'deliveredgoodsserial': deli.deliveredgoodsserial,
                'goods': GoodsSerializer(deli.goodsid).data ,
            }
        return None
    def get_computerpropertynumber(self, obj):
        com = obj.ticketid.computerpropertynumber
        if com:
            return {
                'computerpropertynumber': com.computerpropertynumber,
                'computername': com.computername,
            }
        return None

    def create(self, validated_data):
        self.request = self.context.get("request")
        now = timezone.now()

        TicketId = validated_data.get('TicketId')
        try:
            ticketid = Ticket.objects.get(ticketid=TicketId)
        except:
            ticketid = None

        deliveredgoodsid = validated_data.get("DeliveredGoodsiId")
        if deliveredgoodsid:
            try:
                reciever = User.objects.get(userid=validated_data.get('RecieverUserId'))
            except:
                raise serializers.ValidationError('reciever user with this id not exist!')

            try:
                area = Area.objects.get(areaid=validated_data.get('areaId'))
                building = Building.objects.get(buildingid=validated_data.get('buildingId'))

                Userlocationinbuildingarea.objects.get(buildingid=building, userid=reciever, areaid=area)

            except:
                raise serializers.ValidationError('this user not working in this area and building!')

            deliv = Deliveredgoods.objects.get(deliveredgoodsid=deliveredgoodsid)


            if reciever == deliv.owneruserid:
                raise serializers.ValidationError('this operation happen betwen tow people!')

            exchanging = Exchanging.objects.create(
                exchangingdescription=validated_data.get('exchangingdescription'),
                exchangingupdatetime=now,
                createruserid=User.objects.get(userid=self.request.user.userid),
                userexchangerid=deliv.owneruserid,
                ticketid=ticketid
            )
            deliv.updateruserid = User.objects.get(userpersonalid=self.request.user.userpersonalid)
            deliv.deliveredgoodsupdatetime = now
            deliv.owneruserid = reciever
            deliv.areaid = area
            deliv.buildingid = building
            deliv.save()

            Deliveredgoodsexchanging.objects.create(
                deliveredgoodsid=deliv,
                exchangingid=exchanging,
                createtime=now,
                donetime=validated_data.get("donetime")
            )
        computerpropertynumber = validated_data.get("ComputerPropertyNumber")
        if computerpropertynumber:
            reciever = User.objects.get(userid=validated_data.get('RecieverUserId'))

            try:
                area = Area.objects.get(areaid=validated_data.get('areaId'))
                building = Building.objects.get(buildingid=validated_data.get('buildingId'))

                Userlocationinbuildingarea.objects.get(buildingid=building, userid=reciever, areaid=area)
            except:
                raise serializers.ValidationError('this user not working in this area and building!')

            comp = Computer.objects.get(computerpropertynumber=computerpropertynumber)
            if reciever == comp.owneruserid:
                raise serializers.ValidationError('this operation happen betwen tow people!')
            exchanging = Exchanging.objects.create(
                exchangingdescription=validated_data.get('exchangingdescription'),
                exchangingupdatetime=now,
                createruserid=User.objects.get(userid=self.request.user.userid),
                userexchangerid=comp.owneruserid,
                ticketid=ticketid
            )
            comp.updateruserid = User.objects.get(userpersonalid=self.request.user.userpersonalid)
            comp.owneruserid = reciever
            comp.computerupdatetime = now
            comp.owneruserid = reciever
            comp.areaid = area
            comp.buildingid = building
            comp.save()


            comp.save()

            Computersexchanging.objects.create(
                computerpropertynumber=comp,
                exchangingid=exchanging,
                createtime=now,
                donetime=validated_data.get("donetime")
            )

        return ExchangingSerializer(exchanging).data


# i consider that what if the owner user work in tow place in that case i consider that the building and area as input
class ExchangingEditSerializer(serializers.ModelSerializer):
    createruserid = serializers.SerializerMethodField(read_only=True)
    updateruserid = serializers.SerializerMethodField(read_only=True)
    exchangingupdatetime = serializers.DateTimeField(read_only=True)
    ticketid = serializers.SerializerMethodField(read_only=True)
    donetime = serializers.DateField(write_only=True)
    userexchangerid = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Exchanging
        fields = (
            'exchangingid',
            'exchangingdescription',
            'exchangingupdatetime',
            'createruserid',
            'updateruserid',
            'ticketid',
            'donetime',
            'userexchangerid'
        )
    def get_ticketid(self, obj):
        tik = obj.ticketid
        if tik:
            return {
                'ticketid': tik.ticketid,
                'ticketdescription': tik.ticketdescription,
            }
        return None

    def get_createruserid(self, obj):
        return UserInfo().returnInfo(obj.createruserid)

    def get_updateruserid(self, obj):
        return UserInfo().returnInfo(obj.updateruserid)

    def get_userexchangerid(self, obj):
        return UserInfo().returnInfo(obj.userexchangerid)

    def update(self, instance, validated_data):
        self.request = self.context.get("request")
        user = User.objects.get(userid=self.request.user.userid)
        if user.userroleid.userroleid == 2 and instance.createruserid != user:
            raise serializers.ValidationError('you can not edit the exchanging which you dont create it!')
        instance.exchangingdescription = validated_data.get('exchangingdescription', instance.exchangingdescription)
        print('****')
        instance.updateruserid = self.request.user
        donetime = validated_data.get('donetime')

        computersexchanging = Computersexchanging.objects.filter(exchangingid=instance.exchangingid)
        if computersexchanging and donetime:
            for comex in computersexchanging:
                comex.donetime = donetime
                comex.save()


        deliveredgoodsexchanging = Deliveredgoodsexchanging.objects.filter(exchangingid=instance.exchangingid)

        if deliveredgoodsexchanging and donetime:
            for delex in deliveredgoodsexchanging:
                delex.donetime = donetime
                delex.save()


      
        instance.save()
        print('hellow')
        return ExchangingEditSerializer(instance).data
class TicketSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticketsubject
        fields = (
            'ticketsubjectid',
            'ticketsubjectname',
            'ticketsubjectcreatetime',
            'ticketsubjectupdatetime',
        )

class TicketStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticketstatus
        fields = (
            'ticketstatusid',
            'ticketstatusname',
            'ticketstatuscreatetime',
            'ticketstatusupdatetime',
        )
