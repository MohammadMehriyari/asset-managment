from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path('accounts/login/', views.LoginView.as_view(), name='login'),
    path('accounts/login/refresh/', TokenRefreshView.as_view(), name='login-refresh'),
    path('accounts/logout/', views.LogoutView.as_view(), name='logout'),
    path('accounts/change/password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('user/profile/', views.UserProfileView.as_view(), name="user_profile"),
    path('accounts/user/working/locations/', views.WorkingPlaceView.as_view(),
         name='working-locations_create_update_delete_get'),  # post
    path('accounts/subbuser/detail/working/locations/<int:pk>/', views.SubUserWorkingLocationDetail.as_view(),
         name="sub-user-working-location-detail"),
    path('accounts/change/subuser/password/', views.ChangeSubUserPasswordView.as_view(),
         name='change-subuser-password'),
    path('accounts/change/subuser/profile/', views.ChangeSubUserProfileView.as_view(), name='change-subuser-info'),
    path('accounts/supporter/', views.FloorSupporterManagement.as_view(), name='choose-update-delete-list-supporter'),
    path('accounts/user/', views.UserApiView.as_view(), name='create-list-activate-deactivate-user'),
    path('area/', views.AreaListCreateView.as_view(), name='create_list_area'),
    path('area/<int:pk>/', views.AreaDetailUpdateDeleteView.as_view(), name='detail_update_delete_of_area'),
    path('building/create/', views.BuildingListCreateView.as_view(), name='create_list_building'),
    path('building/<int:pk>/', views.BuildingDetailUpdateDeleteView.as_view(), name='detail_delete_update_of_building'),
    path('roles/list/', views.ListOfRoles.as_view(), name='list_of_roles'),
]