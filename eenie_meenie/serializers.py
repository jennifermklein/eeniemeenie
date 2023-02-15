from rest_framework import serializers
from .models import User, Setting

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'partner', 'name_pool', 'name_ranking', 'settings')

class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ('id', 'year', 'gender', 'min_popularity_percent', 'max_popularity_percent', 'set')
