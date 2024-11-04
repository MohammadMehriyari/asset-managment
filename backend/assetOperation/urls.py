from django.urls import path
from . import views

urlpatterns = [
    path('asset/operation-system/', views.OperationSystemListCreateView.as_view(), name="operation-system-list-add"),
    path('asset/operation-system/<int:pk>/', views.OperationSystemDetailUpdateDestroyView.as_view(),
         name="operation-system-detail-update-destroy"),
    path('asset/operation-system-version/', views.OperationSystemVersionListCreateView.as_view(),
         name="operation-system-version-list-add"),
    path('asset/operation-system-version/<int:pk>/', views.OperationSystemVersionDetailUpdateDestroyView.as_view(),
         name="operation-system-version-detail-update-destroy"),
    path('asset/computer/', views.ComputerListCreateView.as_view(), name="computer-list-add"),
    path('asset/computer/<int:pk>/', views.ComputerRetrieveUpdateDestroyAPIView.as_view(),
         name="computer-detail-update-destroy"),
    path('asset/attribute-categoty/', views.AttributeCategoryListCreateView.as_view(),
         name="attribute-category-list-add"),
    path('asset/attribute-categoty/<int:pk>/', views.AttributeCategoryRetrieveUpdateDestroyAPIView.as_view(),
         name="attribute-category-detail-update-destroy"),
    path('asset/goods-attribute/', views.GoodsAttributesListCreateView.as_view(), name="goods-attribute-list-add"),
    path('asset/goods-attribute/<int:pk>/', views.GoodsAttributesRetrieveUpdateDestroyAPIView.as_view(),
         name="goods-attribute-detail-update-destroy"),
    path('asset/goods-attribute-default-value/', views.GoodsAttributesDefaultValueListCreateVeiw.as_view(),
         name="goods-attribute-default-value-list-add"),
    path('asset/goods-attribute-default-value/<int:pk>/<str:name>/',
         views.GoodsAttributesDefaultValueRetrieveUpdateDestroyPIView.as_view(),
         name='goods-attribute-default-value-detail-destroy'),
    path('asset/goods-attribute-default-value/<int:pk>/', views.DeleteAllDefaultValueOfGoodsAttribut.as_view(),name='delete-all-default-value-of-goods-attribut',),
    path('asset/goods-group/', views.GoodsGroupListCreateView.as_view(), name="goods-group-list-add"),
    path('asset/goods-group/<int:pk>/', views.GoodsGroupDetailUpdateDestroyView.as_view(),
         name="goods-group-detail-update-destroy"),
    path('asset/goods-group-attribut-category-goods-attribut-order/',
         views.GoodsgroupAttributecategoryGoodsattributesOrderListCreateView.as_view(),
         name="goods-group-attribute-category-goods-attribute-order-list-add"),
    path('asset/goods-group-attribut-category-goods-attribut-order/<int:goodsattributesid>/<int:gooodsgroupid>/',
         views.GoodsgroupAttributecategoryGoodsattributesOrderRetrieveUpdateDestroyPIView.as_view(),
         name='goods-group-attribute-category-goods-attribute-order-detail-update-destroy'),
    path('asset/goods/', views.GoodsListCreateView.as_view(),
         name="goods-group-attribute-category-goods-attribute-order-list-add"),
    path('asset/goods/<int:pk>/', views.GoodsRetrieveUpdateDestroyPIView.as_view(),
         name='goods-group-attribute-category-goods-attribute-order-detail-update-destroy'),
    path('asset/assign-attribute-goods/', views.AssinedAttributestoGoodsListCreateVeiw.as_view(),
         name="assign-attribute-goods-list-add"),
    path('asset/assign-attribute-goods/<int:goodsattributesid>/<int:goodsid>/',
         views.AssinedAttributestoGoodsRetrieveUpdateDestroyPIView.as_view(),
         name='assign-attribute-goods-detail-update-destroy'),
    path('asset/delivered-goods/', views.DeliveredGoodsListCreateView.as_view(),
         name="delivered-goods-list-add"),
    path('asset/delivered-goods/<int:pk>/', views.DeliveredGoodsRetrieveUpdateDestroyPIView.as_view(),
         name='delivered-goods-detail-update-destroy'),
    path('asset/delivered-goods-related-to-computer/<int:pk>/', views.DeliveredGoodsRelatedToComputerApiView.as_view(),
         name='delivered-goods-related-to-computer-update-destroy'),
    path('asset/computer-sealling/', views.ComputerSeallingListCreateView.as_view(), name="computer-sealling-list-add"),
    path('asset/computer-sealling/<int:pk>/', views.ComputerSeallingRetrieveUpdateDestroyAPIView.as_view(),
         name="computer-sealling-detail-update-destroy"),
    path('asset/assign-seall-to-computer/<int:pk>/', views.AssignSeallToComputerApiView.as_view(),
         name='assign-seall-to-computer-update-destroy'),
    path('asset/assign-computer-to-user/<int:pk>/', views.AssignComputerToUserApiView.as_view(),
         name="assign-computer-to-user"),
    path('asset/assign-delivered-goods-to-user/<int:pk>/', views.AssignDeliveredGoodsToUser.as_view(),
         name="assign-delivered-goods-to-user"),
    path('asset/owned-computers/', views.UsersOwnedComputerApiView.as_view(), name="owned-computer-list"),
    path('asset/owned-computers/<int:computer_id>/', views.UserOwnComputerDetailApiView.as_view(),
         name="owned-computer-detail"),
    path('asset/owned-delivered-goods/', views.UsersOwnedDeliveredGoodsApiView.as_view(),
         name="owned-delivered-goodsdelivered-goods-list"),
    path('asset/owned-delivered-goods/<int:deliveredgoods_id>/', views.UsersOwnedDeliveredGoodsDetailApiView.as_view(),
         name="owned-delivered-goodsdelivered-goods-detail"),
    path('asset/owned-property/', views.UsersOwnedPropertyApiView.as_view(), name="owned-property-list"),
    path('asset/subuser-owned-properties/', views.SubUserUsersOwnedPropertyApiView.as_view(),
         name="subuser-owned-property"),
    path('asset/subuser-owned-property/detail/', views.SubUserUsersOwnedPropertyDetailApiView.as_view(),
         name="subuser-owned-property-detail"),
    path('ticket/submit/', views.SubmitTicketApiView.as_view(), name="submit-ticket"),
    path('ticket/change-status/<int:ticket_id>/', views.TicketChangeStatus.as_view(), name="change-status-ticket"),
    path('ticket/answer-or-refer-upperuser/', views.AnswerOrReferTicketToUpperUserApiView.as_view(),
         name='answer-or-refer-upper-user-ticket'),
    path('ticket/related/', views.TicketList.as_view(), name='ticket-list'),
    path('ticket/related/<int:ticket_id>/', views.TicketDetailView.as_view(), name='ticket-detail'),
    path('ticket/all/', views.TicketAllApiView.as_view(), name='all-tickets'),
    path('abortion/', views.AbortionApiView.as_view(), name='abortion-update-delete-get-create'),
    path('internal-repair/', views.InternalRepairApiView.as_view(), name='internal-repair-create'),
    path('internal-repair/<int:pk>/', views.InternalRepairDetailUpdateDeleteApiView.as_view(),
         name='internal-repair-update-delete-get'),
    path('internal-repair/related-sealing/<int:sealingid>/<int:internalrepaireid>/',
         views.InternalRepairRelatedSealingApiView.as_view(),
         name='internal-repair-related-sealing'),
    path('outbound-document/', views.OutboundDocumentApiView.as_view(), name='outbound-document-create'),
    path('outbound-document/<int:pk>/', views.OutboundDocumentDetailUpdateDeleteApiView.as_view(),
         name='outbound-document-update-delete-get'),
    path('software/', views.SoftwareListCreateView.as_view(), name="software-list-add"),
    path('software/<int:pk>/', views.SoftwareDetailUpdateDestroyView.as_view(),
         name="software-detail-update-destroy"),
    path('installation/', views.InstallationListCreateView.as_view(), name="installation-list-add"),
    path('installation/<int:pk>/', views.InstallationDetailUpdateDestroyView.as_view(),
         name="installation-detail-update-destroy"),
    path('installation-on-computer/<int:installizations_id>/<int:computerpropertynumber>/',
         views.InstallizatiOnsoncomputerApiView.as_view(), name="installation-on-computer"),
    path('software-usage-in-installization/<int:software_id>/<int:instalation_id>/',
         views.SoftwareUsageInInstallizationApiView.as_view(),
         name='software-usage-in-installization-create-update-delete-get'),
    path('update-delivered-goods/', views.UpdateDeliveredGoodsListCreateView.as_view(),
         name="update-delivered-goods-create-list"),
    path('update-delivered-goods/<int:pk>/', views.UpdateDeliveredGoodsDetailUpdateDestroyView.as_view(),
         name="update-delivered-goods-detail-update-destroy"),
    path('update-delivered-goods/related-sealing/<int:sealingid>/<int:updaterid>/',
         views.UpdaterRelatedSealingApiView.as_view(), name='updater-related-sealing'),
    path('replacement-delivered-goods-in-update/<int:deliveredgoodsid>/<int:updaterid>/',
         views.ReplacementDeliveredGoodsInUpdateApiView.as_view(), name='replacement-delivered-goods-in-update'),
    path('superseded-delivered-goods/<int:deliveredgoodsid>/<int:updaterid>/',
         views.SupersededDeliveredGoodsInUpdateApiView.as_view(), name='superseded-delivered-goods-in-update'),
    path('exchanging/', views.ExchangingListCreateApiView.as_view(), name='exchanging-create-list'),
    path('exchanging/<int:pk>/', views.ExchangingDetailUpdateDestroyApiView.as_view(),
         name='exchanging-detail-update-destroy'),
    path('ticket/subject/', views.TicketSubjectListView.as_view(), name="ticket-subject-list"),
    path('ticket/status/', views.TicketStatusListView.as_view(), name="ticket-subject-list"),     
]    