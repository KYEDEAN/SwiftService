from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from rest_framework.routers import DefaultRouter

# Create a router for the API endpoints
router = DefaultRouter()
router.register(r'users', views.CustomUserViewSet, basename='user')
router.register(r'profiles', views.UserProfileViewSet, basename='profile')
router.register(r'service-providers', views.ServiceProviderViewSet, basename='service-provider')

urlpatterns = [
    # Existing non-API routes
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('profile/', views.profile, name='profile'),
    path('service_provider_profile/', views.service_provider_profile, name='service_provider_profile'),
    path('password-change/', auth_views.PasswordChangeView.as_view(template_name='users/password_change.html'), name='password_change'),
    path('password-change/done/', auth_views.PasswordChangeDoneView.as_view(template_name='users/password_change_done.html'), name='password_change_done'),
    
    # API endpoints will be included from the router
] + router.urls