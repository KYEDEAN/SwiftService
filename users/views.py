from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .forms import CustomUserCreationForm, UserProfileForm, ServiceProviderForm
from .models import CustomUser, UserProfile, ServiceProvider
from .serializers import CustomUserSerializer, UserProfileSerializer, ServiceProviderSerializer

# Existing Template Views
class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'users/signup.html'

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('home')

@login_required
def profile(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=user_profile)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = UserProfileForm(instance=user_profile)
    return render(request, 'users/profile.html', {'form': form})

@login_required
def service_provider_profile(request):
    service_provider, created = ServiceProvider.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        form = ServiceProviderForm(request.POST, instance=service_provider)
        if form.is_valid():
            form.save()
            return redirect('service_provider_profile')
    else:
        form = ServiceProviderForm(instance=service_provider)
    return render(request, 'users/service_provider_profile.html', {'form': form})

# API ViewSets
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_profile(self, request):
        profile = UserProfile.objects.get(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

class ServiceProviderViewSet(viewsets.ModelViewSet):
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_service_profile(self, request):
        profile = ServiceProvider.objects.get(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)