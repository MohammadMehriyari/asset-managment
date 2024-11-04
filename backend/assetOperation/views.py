from account import permissions
from .serializers import *
from .models import *
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from account.models import User, Userlocationinbuildingarea
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.db import connection


class OperationSystemListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Operationsystem.objects.all()
    serializer_class = OperationSystemSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class OperationSystemDetailUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Operationsystem.objects.all()
    serializer_class = OperationSystemSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

class OperationSystemVersionListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Operationsystemversion.objects.all()
    serializer_class = OperationSystemVersionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class OperationSystemVersionDetailUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Operationsystemversion.objects.all()
    serializer_class = OperationSystemVersionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

class ComputerListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]
    queryset = Computer.objects.all()
    serializer_class = ComputerSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class ComputerRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]
    queryset = Computer.objects.all()
    serializer_class = ComputerSerializer

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class AttributeCategoryListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Attributecategory.objects.all()
    serializer_class = AttributeCategorySerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class AttributeCategoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Attributecategory.objects.all()
    serializer_class = AttributeCategorySerializer

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class GoodsAttributesListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Goodsattributes.objects.all()
    serializer_class = GoodsAttributesSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class GoodsAttributesRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Goodsattributes.objects.all()
    serializer_class = GoodsAttributesSerializer

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class GoodsAttributesDefaultValueListCreateVeiw(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Goodsattributesdefaultvalue.objects.all()
    serializer_class = GoodsAttributesDefaultValueSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class DeleteAllDefaultValueOfGoodsAttribut(APIView):
    permission_classes = [permissions.IsAdmin]
    def delete(self, request, pk):
        try:
            instances = Goodsattributesdefaultvalue.objects.filter(goodsattributesid=pk)
            instances.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Goodsattributesdefaultvalue.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class GoodsAttributesDefaultValueRetrieveUpdateDestroyPIView(APIView):
    permission_classes = [permissions.IsAdmin]

    def get(self, request, pk, name):
        try:
            instance = Goodsattributesdefaultvalue.objects.get(goodsattributesid=pk, defaultattributes=name)
            return Response(GoodsAttributesDefaultValueSerializer(instance).data, status=status.HTTP_200_OK)
        except Goodsattributesdefaultvalue.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, name):
        try:

            query = "DELETE FROM goodsattributesdefaultvalue WHERE GoodsAttributesId = %s AND DefaultAttributes = %s;"
            with connection.cursor() as cur:
                cur.execute(query, [pk, name])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Goodsattributesdefaultvalue.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class GoodsGroupListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Goodsgroup.objects.all()
    serializer_class = GoodsGroupSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class GoodsGroupDetailUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Goodsgroup.objects.all()
    serializer_class = GoodsGroupSerializer

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class GoodsgroupAttributecategoryGoodsattributesOrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = GoodsgroupAttributecategoryGoodsattributesOrder.objects.all()
    serializer_class = GoodsgroupAttributecategoryGoodsattributesOrderSerializer


class GoodsgroupAttributecategoryGoodsattributesOrderRetrieveUpdateDestroyPIView(APIView):
    permission_classes = [permissions.IsAdmin]

    def put(self, request, goodsattributesid, gooodsgroupid):
        serializer = UpdateGoodsgroupAttributecategoryGoodsattributesOrderSerializer(data=request.data,
                                                                                     context={
                                                                                         'goodsattributesid': goodsattributesid,
                                                                                         'gooodsgroupid': gooodsgroupid})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def get(self, request, goodsattributesid, gooodsgroupid):
        try:
            instance = GoodsgroupAttributecategoryGoodsattributesOrder.objects.get(goodsattributesid=goodsattributesid,
                                                                                   gooodsgroupid=gooodsgroupid)
            return Response(GoodsgroupAttributecategoryGoodsattributesOrderSerializer(instance).data,
                            status=status.HTTP_200_OK)
        except GoodsgroupAttributecategoryGoodsattributesOrder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, goodsattributesid, gooodsgroupid):
        try:
            instance = GoodsgroupAttributecategoryGoodsattributesOrder.objects.get(goodsattributesid=goodsattributesid,
                                                                                   gooodsgroupid=gooodsgroupid)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except GoodsgroupAttributecategoryGoodsattributesOrder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class GoodsListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class GoodsRetrieveUpdateDestroyPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class AssinedAttributestoGoodsListCreateVeiw(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Assinedattributestogoods.objects.all()
    serializer_class = AssinedAttributestoGoodsSerializer


class AssinedAttributestoGoodsRetrieveUpdateDestroyPIView(APIView):
    permission_classes = [permissions.IsAdmin]

    def put(self, request, goodsattributesid, goodsid):
        serializer = UpdateAssinedAttributestoGoodsSerializer(data=request.data,
                                                              context={'goodsattributesid': goodsattributesid,
                                                                       'goodsid': goodsid})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)

    permission_classes = [permissions.IsAdmin]

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def get(self, request, goodsattributesid, goodsid):
        try:
            instance = Assinedattributestogoods.objects.get(goodsattributesid=goodsattributesid, goodsid=goodsid)
            return Response(AssinedAttributestoGoodsSerializer(instance).data, status=status.HTTP_200_OK)
        except Assinedattributestogoods.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, goodsattributesid, goodsid):
        try:
            instance = Assinedattributestogoods.objects.get(goodsattributesid=goodsattributesid, goodsid=goodsid)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Assinedattributestogoods.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DeliveredGoodsListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]
    queryset = Deliveredgoods.objects.all()
    serializer_class = DeliveredGoodsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class DeliveredGoodsRetrieveUpdateDestroyPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]
    queryset = Deliveredgoods.objects.all()
    serializer_class = DeliveredGoodsSerializer

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class DeliveredGoodsRelatedToComputerApiView(APIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def put(self, request, pk):
        serializer = DeliveredGoodsRelatedToComputerSerializer(data=request.data,
                                                               context={'request': request, 'pk': pk})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def delete(self, request, pk):
        try:
            instance = Deliveredgoods.objects.get(deliveredgoodsid=pk)
            instance.relatedcomputerpropertynumber = None
            instance.updateruserid = request.user
            instance.deliveredgoodsupdatetime = timezone.now()
            instance.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Deliveredgoods.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ComputerSeallingListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Computersealling.objects.all()
    serializer_class = ComputerSeallingSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class ComputerSeallingRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Computersealling.objects.all()
    serializer_class = ComputerSeallingSerializer

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class AssignSeallToComputerApiView(APIView):
    permission_classes = [permissions.IsAdmin]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def put(self, request, pk):
        serializer = AssignSeallToComputerSerializer(data=request.data,
                                                     context={'request': request, 'pk': pk})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def delete(self, request, pk):
        try:
            instance = Computersealling.objects.get(computerseallingid=pk)
            instance.computerpropertynumber = None
            instance.updateruserid = request.user
            instance.computerseallingupdatetime = timezone.now()
            instance.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Computersealling.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class AssignComputerToUserApiView(APIView):
    permission_classes = [permissions.IsAdmin]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def put(self, request, pk):
        serializer = AssignComputerToUserSerializer(data=request.data,
                                                    context={'request': request, 'pk': pk})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def delete(self, request, pk):
        try:
            instance = Computer.objects.get(computerpropertynumber=pk)
            instance.owneruserid = None
            instance.computername = None
            instance.updateruserid = request.user
            instance.computerupdatetime = timezone.now()
            instance.areaid = None
            instance.buildingid = None
            instance.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Computer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class AssignDeliveredGoodsToUser(APIView):
    permission_classes = [permissions.IsAdmin]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def put(self, request, pk):
        serializer = AssignDeliveredgoodsToUserSerializer(data=request.data,
                                                          context={'request': request, 'pk': pk})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def delete(self, request, pk):
        try:
            instance = Deliveredgoods.objects.get(deliveredgoodsid=pk)
            instance.owneruserid = None
            instance.updateruserid = request.user
            instance.deliveredgoodsupdatetime = timezone.now()
            instance.areaid = None
            instance.buildingid = None
            instance.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Deliveredgoods.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UsersOwnedComputerApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        computer = Computer.objects.filter(owneruserid=user)
        return Response(ComputerSerializer(computer, many=True).data, status=status.HTTP_200_OK)


class UserOwnComputerDetailApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, computer_id):
        user = request.user
        try:
            # Ensure the computer belongs to the user
            computer = Computer.objects.get(pk=computer_id, owneruserid=user)
            serializer = ComputerSerializer(computer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Computer.DoesNotExist:
            return Response({'error': 'Computer not found or not accessible'}, status=status.HTTP_404_NOT_FOUND)


class UsersOwnedDeliveredGoodsApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        deliveredgoods = Deliveredgoods.objects.filter(owneruserid=user, relatedcomputerpropertynumber__isnull=True)
        return Response(DeliveredGoodsSerializer(deliveredgoods, many=True).data, status=status.HTTP_200_OK)


class UsersOwnedDeliveredGoodsDetailApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, deliveredgoods_id):
        user = request.user
        try:
            # Ensure the delivered good belongs to the user
            deliveredgoods = Deliveredgoods.objects.get(pk=deliveredgoods_id, owneruserid=user,
                                                        relatedcomputerpropertynumber__isnull=True)
            serializer = DeliveredGoodsSerializer(deliveredgoods)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Deliveredgoods.DoesNotExist:
            return Response({'error': 'Delivered good not found or not accessible'}, status=status.HTTP_404_NOT_FOUND)


class UsersOwnedPropertyApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        deliveredgoods = Deliveredgoods.objects.filter(owneruserid=user, relatedcomputerpropertynumber__isnull=True)
        computer = Computer.objects.filter(owneruserid=user)
        return Response({'computers': ComputerSerializer(computer, many=True).data,
                         'deliveredGoods': DeliveredGoodsSerializer(deliveredgoods, many=True).data},
                        status=status.HTTP_200_OK)


class SubUserUsersOwnedPropertyApiView(APIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]

    def get(self, request):
        user = User.objects.get(userpersonalid=request.user.userpersonalid)
        if user.userroleid.userroleid == 2:
            requestedUserWorkingLocations = Userlocationinbuildingarea.objects.filter(
                userid=User.objects.get(userpersonalid=request.user.userpersonalid))
            computers_lst = []
            deliveredgoods_lst = []
            for requestedUserWorkingLocation in requestedUserWorkingLocations:
                computers_lst += Computer.objects.filter(
                    ~Q(owneruserid=user),  # Exclude data related to the requested user
                    areaid=requestedUserWorkingLocation.areaid,
                    buildingid=requestedUserWorkingLocation.buildingid
                ).exclude(owneruserid=None)  # Exclude computers with null owneruserid

                deliveredgoods_lst += Deliveredgoods.objects.filter(~Q(owneruserid=user)
                                                                    , relatedcomputerpropertynumber__isnull=True,
                                                                    areaid=requestedUserWorkingLocation.areaid,
                                                                    buildingid=requestedUserWorkingLocation.buildingid).exclude(
                    owneruserid=None)
            return Response({'computers': ComputerSerializer(computers_lst, many=True).data,
                             'deliveredGoods': DeliveredGoodsSerializer(deliveredgoods_lst, many=True).data},
                            status=status.HTTP_200_OK)
        else:
            computers = Computer.objects.filter(~Q(owneruserid=user))
            deliveredgoods = Deliveredgoods.objects.filter(~Q(owneruserid=user))

            return Response({'computers': ComputerSerializer(computers, many=True).data,
                             'deliveredGoods': DeliveredGoodsSerializer(deliveredgoods, many=True).data},
                            status=status.HTTP_200_OK)


class SubUserUsersOwnedPropertyDetailApiView(APIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]

    # http://localhost:8000/asset/subuser-owned-property/detail/?computer_id=23
    def get(self, request):
        computer_id = request.GET.get('computer_id')
        deliveredgoods_id = request.GET.get('deliveredgoods_id')
        print(computer_id, deliveredgoods_id)
        user = User.objects.get(userpersonalid=request.user.userpersonalid)

        if user.userroleid.userroleid == 2:
            requestedUserWorkingLocations = Userlocationinbuildingarea.objects.filter(
                userid=User.objects.get(userpersonalid=request.user.userpersonalid))
            if computer_id:
                computers_lst = []
                for requestedUserWorkingLocation in requestedUserWorkingLocations:
                    computers_lst += Computer.objects.filter(
                        ~Q(owneruserid=user),
                        computerpropertynumber=computer_id,
                        areaid=requestedUserWorkingLocation.areaid,
                        buildingid=requestedUserWorkingLocation.buildingid
                    ).exclude(owneruserid=None)  # Exclude computers with null owneruserid

                return Response(ComputerSerializer(computers_lst, many=True).data, status=status.HTTP_200_OK)
            if deliveredgoods_id:
                deliveredgoods_lst = []
                for requestedUserWorkingLocation in requestedUserWorkingLocations:
                    deliveredgoods_lst += Deliveredgoods.objects.filter(~Q(owneruserid=user),
                                                                        deliveredgoodsid=deliveredgoods_id,
                                                                        relatedcomputerpropertynumber__isnull=True,
                                                                        areaid=requestedUserWorkingLocation.areaid,
                                                                        buildingid=requestedUserWorkingLocation.buildingid).exclude(
                        owneruserid=None)
                return Response(DeliveredGoodsSerializer(deliveredgoods_lst, many=True).data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if computer_id:
                computers = Computer.objects.filter(~Q(owneruserid=user), computerpropertynumber=computer_id)
                return Response(ComputerSerializer(computers, many=True).data, status=status.HTTP_200_OK)

            if deliveredgoods_id:
                deliveredgoods = Deliveredgoods.objects.filter(~Q(owneruserid=user), deliveredgoodsid=deliveredgoods_id)
                return Response(DeliveredGoodsSerializer(deliveredgoods, many=True).data, status=status.HTTP_200_OK)

            else:
                return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)


class SubmitTicketApiView(APIView):
    permission_classes = [permissions.IsSupporterOrIsUsualUser]

    def post(self, request):
        serializer = TicketSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)


class AnswerOrReferTicketToUpperUserApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AnswerOrReferTicketToUpperUserSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)


class TicketAllApiView(APIView):
    permission_classes = [permissions.IsAdmin]

    def get(self, request):
        tickets = Ticket.objects.all()
        ticket_serializer = Ticketserializer(tickets, many=True)
        print(ticket_serializer)

        referred_tickets = Usersrefferdedticket.objects.all()
        referred_serializer = UsersrefferdedticketSerializer(referred_tickets, many=True)
        print(referred_serializer)

        ticket_data = []
        for ticket in ticket_serializer.data:
            referred = [rt for rt in referred_serializer.data if rt['ticketid'] == ticket['ticketid']]
            ticket_data.append({
                'ticket': ticket,
                'referred_tickets': referred
            })

        return Response(ticket_data)


class TicketList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        # Get tickets created by the user
        created_tickets = Ticket.objects.filter(createruserid=user)
        # Get tickets referred to the user
        referred_tickets = Usersrefferdedticket.objects.filter(reffereduserid=user).values_list('ticketid', flat=True)
        referred_tickets = Ticket.objects.filter(ticketid__in=referred_tickets)

        # Combine the querysets
        tickets = created_tickets | referred_tickets
        tickets = tickets.distinct()

        serializer = TicketHistorySerializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TicketDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, ticket_id):
        user = request.user
        try:
            # Check if the ticket is created by the user or referred to the user
            ticket = Ticket.objects.filter(ticketid=ticket_id).filter(
                createruserid=user
            ).first() or Ticket.objects.filter(ticketid=ticket_id).filter(
                ticketid__in=Usersrefferdedticket.objects.filter(reffereduserid=user).values_list('ticketid', flat=True)
            ).first()

            if not ticket:
                return Response({'error': 'Ticket not found or not accessible'}, status=status.HTTP_404_NOT_FOUND)

            serializer = TicketHistorySerializer(ticket)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Ticket.DoesNotExist:
            return Response({'error': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)


class TicketChangeStatus(APIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]

    def put(self, request, ticket_id):
        user = request.user
        ticket_status_id = request.GET.get('ticket_status_id')
        if not ticket_status_id:
            return Response({'error': 'you have to enter the id of ticket status'}, status=status.HTTP_400_BAD_REQUEST)
        ticketstatus = Ticketstatus.objects.filter(ticketstatusid=ticket_status_id)
        if not ticketstatus:
            return Response({'error': 'ticket status with this id not exist!'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if the ticket is created by the user or referred to the user
            ticket = Ticket.objects.filter(ticketid=ticket_id).filter(
                createruserid=user
            ).first() or Ticket.objects.filter(ticketid=ticket_id).filter(
                ticketid__in=Usersrefferdedticket.objects.filter(reffereduserid=user).values_list('ticketid', flat=True)
            ).first()

            if not ticket:
                return Response({'error': 'Ticket not found or not accessible'}, status=status.HTTP_404_NOT_FOUND)

            ticket.ticketstatusid = ticketstatus.first()
            ticket.updateruserid = request.user.userid
            ticket.ticketupdatetime = timezone.now()
            ticket.save()
            return Response(Ticketserializer(ticket).data, status=status.HTTP_200_OK)

        except Ticket.DoesNotExist:
            return Response({'error': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)


class AbortionApiView(APIView):
    permission_classes = [permissions.IsAdmin]

    def post(self, request):
        serializer = AbortionSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)

    def put(self, request):
        computer_id = request.GET.get('computer_id')
        deliveredgoods_id = request.GET.get('deliveredgoods_id')

        if computer_id:
            serializer = AbortionEditSerializer(data=request.data,
                                                context={'request': request, 'computer_id': computer_id})
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            return Response(instance, status=status.HTTP_200_OK)

        elif deliveredgoods_id:
            serializer = AbortionEditSerializer(data=request.data,
                                                context={'request': request, 'deliveredgoods_id': deliveredgoods_id})

            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            return Response(instance, status=status.HTTP_200_OK)

        else:
            return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def get(self, request):
        computer_id = request.GET.get('computer_id')
        deliveredgoods_id = request.GET.get('deliveredgoods_id')
        print(computer_id, deliveredgoods_id)
        if computer_id: 
            try:
                abortion = Abortion.objects.get(computerpropertynumber=computer_id)
                return Response({'abortionid': abortion.abortionid,
                                 'abortioncreatetime': abortion.abortioncreatetime,
                                 'abortionupdatetime': abortion.abortionupdatetime,
                                 'computerpropertynumber': abortion.computerpropertynumber.computerpropertynumber,
                                 'ticketid': abortion.ticketid.ticketid}, status=status.HTTP_200_OK)
            except Abortion.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        elif deliveredgoods_id:
            try:
                abortion = Abortion.objects.get(deliveredgoodsid=deliveredgoods_id)
                return Response(
                    {'abortionid': abortion.abortionid,
                     'abortioncreatetime': abortion.abortioncreatetime,
                     'abortionupdatetime': abortion.abortionupdatetime,
                     'deliveredgoodsid': abortion.deliveredgoodsid.deliveredgoodsid,
                     'ticketid': abortion.ticketid.ticketid}, status=status.HTTP_200_OK)
            except Abortion.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        computer_id = request.GET.get('computer_id')
        deliveredgoods_id = request.GET.get('deliveredgoods_id')
        if computer_id:
            abortion = Abortion.objects.get(computerpropertynumber=computer_id)
            abortion.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


        elif deliveredgoods_id:
            abortion = Abortion.objects.get(deliveredgoodsid=deliveredgoods_id)
            abortion.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


        else:
            return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)


class InternalRepairApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Internalrepair.objects.all()
    serializer_class = InternalRepairSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class InternalRepairDetailUpdateDeleteApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Internalrepair.objects.all()
    serializer_class = InternalRepairSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance == self.queryset.last():
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)


class InternalRepairRelatedSealingApiView(APIView):
    permission_classes = [permissions.IsAdmin]

    def put(self, request, sealingid, internalrepaireid):
        try:
            internalrepair = Internalrepair.objects.get(internalrepairid=internalrepaireid)
            sealing = Computersealling.objects.get(computerseallingid=sealingid)

            if sealing.updaterid != None:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            sealing.internalrepairid = internalrepair
            sealing.computerseallingupdatetime = timezone.now()
            sealing.updateruserid = User.objects.get(userid=request.user.userid)
            sealing.save()
            return Response(ComputerSeallingSerializer(sealing).data, status=status.HTTP_200_OK)

        except Internalrepair.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Computersealling.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def delete(self, request, sealingid, internalrepaireid):
        try:
            sealing = Computersealling.objects.get(computerseallingid=sealingid, internalrepairid=internalrepaireid)
            sealing.internalrepairid = None
            sealing.computerseallingupdatetime = timezone.now()
            sealing.updateruserid = User.objects.get(userid=request.user.userid)

            sealing.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Computersealling.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class OutboundDocumentApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Outbounddocument.objects.all()
    serializer_class = OutboundDocumentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class OutboundDocumentDetailUpdateDeleteApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Outbounddocument.objects.all()
    serializer_class = OutboundDocumentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)



class SoftwareListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]
    queryset = Softwares.objects.all()
    serializer_class = SoftwareSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class SoftwareDetailUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]
    queryset = Softwares.objects.all()
    serializer_class = SoftwareSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)



class InstallationListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]
    queryset = Installation.objects.all()
    serializer_class = InstallationSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class InstallationDetailUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]
    queryset = Installation.objects.all()
    serializer_class = InstallationSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)



class InstallizatiOnsoncomputerApiView(APIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]

    def get(self, request, installizations_id, computerpropertynumber):
        user = User.objects.get(userid=request.user.userid)
        try:
            self.computer = Computer.objects.get(computerpropertynumber=computerpropertynumber)
            try:
                self.installation = Installation.objects.get(installationid=installizations_id)

                if user.userroleid.userroleid == 2:

                    self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.filter(userid=user,
                                                                                                        buildingid=self.computer.buildingid,
                                                                                                        areaid=self.computer.areaid)
                    if self.userlocationinbuildingareasuporter:
                        try:
                            installizationoncumputer = Installizationsoncomputer.objects.filter(
                                installationid=Installation.objects.get(installationid=installizations_id),
                                computerpropertynumber=computerpropertynumber
                            )
                            return Response(
                                InstallizationsOnComputerSerializer(installizationoncumputer, many=True).data,
                                status=status.HTTP_200_OK)
                        except Installizationsoncomputer.DoesNotExist:
                            return Response(
                                {
                                    'error': 'you can not access to install software on the computer that not in your building and area'},
                                status=status.HTTP_403_FORBIDDEN)
                installizationoncumputer = Installizationsoncomputer.objects.filter(
                    installationid=self.installation,
                    computerpropertynumber=computerpropertynumber
                )
                print(installizationoncumputer)
                return Response(
                    InstallizationsOnComputerSerializer(installizationoncumputer, many=True).data,
                    status=status.HTTP_200_OK)
            except Installation.DoesNotExist:
                {'error': 'installation with this id not exists!'},
                return Response(status=status.HTTP_404_NOT_FOUND)
        except Computer.DoesNotExist:
            {'error': 'computer with this property number not exists!'},
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, installizations_id, computerpropertynumber):
        user = User.objects.get(userid=request.user.userid)
        try:
            self.computer = Computer.objects.get(computerpropertynumber=computerpropertynumber)
            if user.userroleid.userroleid == 2:
                self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.filter(userid=user,                                                                  areaid=self.computer.areaid)
                if self.userlocationinbuildingareasuporter:
                    try:
                        installizationoncumputer = Installizationsoncomputer.objects.filter(installationid=Installation.objects.get(installationid=installizations_id),computerpropertynumber=computerpropertynumber)
                        installizationoncumputer.delete()
                        return Response(status=status.HTTP_204_NO_CONTENT)
                    except Installizationsoncomputer.DoesNotExist:
                        return Response({
                            'error': 'you can not delete install software on the computer that not in your building and area'},
                            status=status.HTTP_403_FORBIDDEN)
            installizationoncumputer = Installizationsoncomputer.objects.filter(installationid=Installation.objects.get(installationid=installizations_id), computerpropertynumber=computerpropertynumber)
            installizationoncumputer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Computer.DoesNotExist:
            return Response(
                {'error': 'computer with this property number not exists!'},
                status=status.HTTP_404_NOT_FOUND)

    def put(self, request, installizations_id, computerpropertynumber):
        serializer = InstallizationsOnComputerEditSerializer(data=request.data,
                                                             context={'request': request,
                                                                      'installizations_id': installizations_id,
                                                                      'computerpropertynumber': computerpropertynumber})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)


class SoftwareUsageInInstallizationApiView(APIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]

    def post(self, request, software_id, instalation_id):
        serializer = SoftwareUsageInInstallizationSerializer(data=request.data, context={'request': request,'software_id': software_id,
                                                                                         'instalation_id': instalation_id, })
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)

    def delete(self, request, software_id, instalation_id):
        serializer = SoftwareUsageInInstallizationSerializer(data=request.data,
                                                             context={'request': request, 'software_id': software_id,
                                                                      'instalation_id': instalation_id, })
        serializer.is_valid(raise_exception=True)
        serializer.destroy()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, software_id, instalation_id):
        try:
            software = Softwares.objects.get(softwareid=software_id)
            user = User.objects.get(userid=request.user.userid)
            if user.userroleid.userroleid == 2:
                installation = Installation.objects.get(installationid=instalation_id, createruserid=user)
            else:
                installation = Installation.objects.get(installationid=instalation_id)
            instance = Softwaresininstallization.objects.get(
                softwareid=software,
                installationid=installation
            )
            return Response(SoftwareUsageInInstallizationSerializer(instance).data, status=status.HTTP_200_OK)
        except Softwares.DoesNotExist:
            return Response({'error': 'software with that id not exists!'}, status=status.HTTP_400_BAD_REQUEST)
        except Installation.DoesNotExist:
            return Response({'error': 'installation with that id not exists!'}, status=status.HTTP_400_BAD_REQUEST)
        except Softwaresininstallization.DoesNotExist:
            return Response({'error': 'Softwaresininstallization with these software_id, instalation_id not exists!'},
                            status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, software_id, instalation_id):
        serializer = SoftwareUsageInInstallizationSerializer(data=request.data, context={'request': request,'software_id': software_id,
                                                                                         'instalation_id': instalation_id, })
        serializer.is_valid(raise_exception=True)
        instance = serializer.update()
        return Response(instance, status=status.HTTP_200_OK)


class UpdateDeliveredGoodsListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Updater.objects.all()
    serializer_class = UpdateDeliveredGoodsSerializer
    lookup_field = 'updaterid'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class UpdateDeliveredGoodsDetailUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdmin]
    queryset = Updater.objects.all()
    serializer_class = UpdateDeliveredGoodsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def put(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class UpdaterRelatedSealingApiView(APIView):
    permission_classes = [permissions.IsAdmin]

    def put(self, request, sealingid, updaterid):
        try:
            updater = Updater.objects.get(updaterid=updaterid)
            sealing = Computersealling.objects.get(computerseallingid=sealingid)

            if sealing.internalrepairid != None:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            sealing.updaterid = updater
            sealing.computerseallingupdatetime = timezone.now()
            sealing.updateruserid = User.objects.get(userid=request.user.userid)
            sealing.save()
            return Response(ComputerSeallingSerializer(sealing).data, status=status.HTTP_200_OK)

        except Updater.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Computersealling.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def delete(self, request, sealingid, updaterid):
        try:
            sealing = Computersealling.objects.get(computerseallingid=sealingid, updaterid=updaterid)
            sealing.updaterid = None
            sealing.computerseallingupdatetime = timezone.now()
            sealing.updateruserid = User.objects.get(userid=request.user.userid)

            sealing.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Computersealling.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ReplacementDeliveredGoodsInUpdateApiView(APIView):
    permission_classes = [permissions.IsAdmin]

    def post(self, request, deliveredgoodsid, updaterid):
        serializer = ReplacementdDeliveredGoodsInUpdateSerializer(data=request.data,
                                                                  context={'deliveredgoodsid': deliveredgoodsid,
                                                                           'updaterid': updaterid, })
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(instance, status=status.HTTP_200_OK)

    def delete(self, request, deliveredgoodsid, updaterid):
        serializer = ReplacementdDeliveredGoodsInUpdateSerializer(data=request.data,
                                                                  context={'deliveredgoodsid': deliveredgoodsid,
                                                                           'updaterid': updaterid, })
        serializer.is_valid(raise_exception=True)
        serializer.destroy()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, deliveredgoodsid, updaterid):
        try:
            self.deliveredgoods = Deliveredgoods.objects.get(deliveredgoodsid=deliveredgoodsid)
            self.updater = Updater.objects.get(updaterid=updaterid)
            instance = Replacementdeliveygoodsinupdate.objects.get(
                updaterid=Updater.objects.get(updaterid=updaterid),
                deliveredgoodsid=Deliveredgoods.objects.get(deliveredgoodsid=deliveredgoodsid),
            )
            return Response(ReplacementdDeliveredGoodsInUpdateSerializer(instance).data, status=status.HTTP_200_OK)
        except Deliveredgoods.DoesNotExist:
            return Response({'error': 'Deliveredgoods with that id not exists!'}, status=status.HTTP_400_BAD_REQUEST)
        except Updater.DoesNotExist:
            return Response({'error': 'Updater with that id not exists!'}, status=status.HTTP_400_BAD_REQUEST)
        except Replacementdeliveygoodsinupdate.DoesNotExist:
            return Response(
                {'error': 'Replacementdeliveygoodsinupdate with these deliveredgoodsid, updaterid not exists!'},
                status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, deliveredgoodsid, updaterid):
        serializer = ReplacementdDeliveredGoodsInUpdateSerializer(data=request.data,
                                                                  context={'deliveredgoodsid': deliveredgoodsid,
                                                                           'updaterid': updaterid, })
        serializer.is_valid(raise_exception=True)
        instance = serializer.update()
        return Response(instance, status=status.HTTP_200_OK)


class SupersededDeliveredGoodsInUpdateApiView(APIView):
    permission_classes = [permissions.IsAdmin]

    def put(self, request, deliveredgoodsid, updaterid):
        try:
            updater = Updater.objects.get(updaterid=updaterid)
            deliveredgoods = Deliveredgoods.objects.get(deliveredgoodsid=deliveredgoodsid)
            if not deliveredgoods.goodsid.gooodsgroupid.ispartinsidecomputer:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            deliveredgoods.deliveredgoodsupdatetime = timezone.now()
            deliveredgoods.updateruserid = User.objects.get(userid=request.user.userid)
            deliveredgoods.owneruserid = updater.owneruserid
            deliveredgoods.updaterid = updater
            deliveredgoods.save()
            return Response(DeliveredGoodsSerializer(deliveredgoods).data, status=status.HTTP_200_OK)

        except Updater.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Deliveredgoods.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def delete(self, request, deliveredgoodsid, updaterid):
        try:
            deliveredgoods = Deliveredgoods.objects.get(deliveredgoodsid=deliveredgoodsid, updaterid=updaterid)
            deliveredgoods.deliveredgoodsupdatetime = timezone.now()
            deliveredgoods.updateruserid = User.objects.get(userid=request.user.userid)
            deliveredgoods.owneruserid = None
            deliveredgoods.updaterid = None
            deliveredgoods.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Computersealling.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ExchangingListCreateApiView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.IsAdmin()]
        elif self.request.method == 'POST':
            return [permissions.IsAdminOrIsSupporter()]
        return super().get_permissions()

    def get(self, request):
        instances = Exchanging.objects.all()
        return Response(ExchangingSerializer(instances, many=True).data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ExchangingSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        instance = serializer.create(validated_data=request.data)
        return Response(instance, status=status.HTTP_200_OK)


class ExchangingDetailUpdateDestroyApiView(APIView):
    permission_classes = [permissions.IsAdminOrIsSupporter]
    def get(self, request, pk):
        try:
            instance = Exchanging.objects.get(exchangingid=pk)
            computersexchanging = Computersexchanging.objects.filter(exchangingid=instance.exchangingid).last()
            deliveredgoodsexchanging = Deliveredgoodsexchanging.objects.filter(
                exchangingid=instance.exchangingid).last()
            user = User.objects.get(userid=request.user.userid)
            if user.userroleid.userroleid == 2:
                if instance.createruserid != user:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                if computersexchanging:
                    self.computer = Computer.objects.get(
                        computerpropertynumber=computersexchanging.computerpropertynumber.computerpropertynumber)
                    self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.filter(
                        userid=user,
                        buildingid=self.computer.buildingid,
                        areaid=self.computer.areaid)
                    if not self.userlocationinbuildingareasuporter:
                        return Response(status=status.HTTP_400_BAD_REQUEST)
                elif deliveredgoodsexchanging:
                    self.deliveredgoods = Deliveredgoods.objects.get(
                        deliveredgoodsid=deliveredgoodsexchanging.deliveredgoodsid.deliveredgoodsid,
                        relatedcomputerpropertynumber__isnull=True)
                    self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.filter(
                        userid=user,
                        buildingid=self.deliveredgoods.buildingid,
                        areaid=self.deliveredgoods.areaid)
                    if not self.userlocationinbuildingareasuporter:
                        return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(ExchangingSerializer(instance).data, status=status.HTTP_200_OK)
        except Exchanging.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            instance = Exchanging.objects.get(exchangingid=pk)
            user = User.objects.get(userid=request.user.userid)
            if user.userroleid.userroleid == 2:
                if instance.createruserid != user:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = ExchangingEditSerializer(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            instance = serializer.update(instance, request.data)
            return Response(instance, status=status.HTTP_200_OK)
        except Exchanging.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)

    def delete(self, request, pk):
        try:
            instance = Exchanging.objects.get(exchangingid=pk)
            comex = Computersexchanging.objects.filter(exchangingid=pk)
            delex = Deliveredgoodsexchanging.objects.filter(exchangingid=pk)
            if instance != Exchanging.objects.all().last():
                return Response({"error": 'you can delete only latest exchanging!'},status=status.HTTP_400_BAD_REQUEST)
            computersexchanging = Computersexchanging.objects.filter(exchangingid=instance.exchangingid).last()
            deliveredgoodsexchanging = Deliveredgoodsexchanging.objects.filter(
                exchangingid=instance.exchangingid).last()
            user = User.objects.get(userid=request.user.userid)
            if user.userroleid.userroleid == 2:
                if instance.createruserid != user:
                    return Response({'error': 'you can just delete your created exchanging'},status=status.HTTP_400_BAD_REQUEST)
                if computersexchanging:
                    self.computer = Computer.objects.get(
                        computerpropertynumber=computersexchanging.computerpropertynumber.computerpropertynumber)
                    self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.filter(
                        userid=user,
                        buildingid=self.computer.buildingid,
                        areaid=self.computer.areaid)
                    if not self.userlocationinbuildingareasuporter:
                        return Response({'error': 'you can just delete the exchanging that not related to your area and building'},status=status.HTTP_400_BAD_REQUEST)
                    else:
                        if comex:
                            comex.delete()
                        instance.delete()
                        return Response(status=status.HTTP_204_NO_CONTENT)
                elif deliveredgoodsexchanging:
                    self.deliveredgoods = Deliveredgoods.objects.get(
                        deliveredgoodsid=deliveredgoodsexchanging.deliveredgoodsid.deliveredgoodsid,
                        relatedcomputerpropertynumber__isnull=True)
                    self.userlocationinbuildingareasuporter = Userlocationinbuildingarea.objects.filter(
                        userid=user,
                        buildingid=self.deliveredgoods.buildingid,
                        areaid=self.deliveredgoods.areaid)
                    if not self.userlocationinbuildingareasuporter:
                        return Response(status=status.HTTP_400_BAD_REQUEST)
                    else:
                        if delex:
                            delex.delete()
                        instance.delete()
                        return Response(status=status.HTTP_204_NO_CONTENT)
            if computersexchanging:
                self.computer = Computer.objects.get(
                    computerpropertynumber=computersexchanging.computerpropertynumber.computerpropertynumber)
                self.computer.owneruserid = instance.userexchangerid
                self.computer.save()
                computersexchanging.delete()
            elif deliveredgoodsexchanging:
                self.deliveredgoods = Deliveredgoods.objects.get(
                    deliveredgoodsid=deliveredgoodsexchanging.deliveredgoodsid.deliveredgoodsid,
                    relatedcomputerpropertynumber__isnull=True)
                self.deliveredgoods.owneruserid = instance.userexchangerid
                self.deliveredgoods.save()
                deliveredgoodsexchanging.delete()
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exchanging.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
class TicketSubjectListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Ticketsubject.objects.all()
    serializer_class = TicketSubjectSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class TicketStatusListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Ticketstatus.objects.all()
    serializer_class = TicketStatusSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
