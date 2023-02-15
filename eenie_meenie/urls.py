from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user', views.user, name='user'),
    path('users', views.users, name='users'),
    path('settings', views.settings, name='settings'),
    path('choices', views.choices, name='choices'),
    path('rank', views.rank, name='rank'),
    path('login', views.login_view, name='login'),
    path('register', views.register, name='register'),
    # path("logout", views.logout_view, name="logout"),
]