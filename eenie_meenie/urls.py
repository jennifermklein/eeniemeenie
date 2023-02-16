from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('curr_user', views.curr_user, name='curr_user'),
    path('users', views.users, name='users'),
    path('user/<int:user_id>', views.user, name='user'),
    path('settings', views.settings, name='settings'),
    path('choices', views.choices, name='choices'),
    path('rank', views.rank, name='rank'),
    path('partner', views.partner, name='partner'),
    path('login', views.login_view, name='login'),
    path('register', views.register, name='register'),
]