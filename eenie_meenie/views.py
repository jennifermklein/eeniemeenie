from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from random import sample
import json

from .models import User, Setting
from .serializers import UserSerializer, SettingsSerializer
from .names import nameDict

@api_view(['GET'])
def index(request):
    return JsonResponse({"message": "Hello world."}, status=200)

@api_view(['GET'])
def users(request):
    data = User.objects.all()
    serializer = UserSerializer(data, context={'request': request}, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def settings(request):
    try: 
        token = Token.objects.get(key=request.auth.key)
        user = token.user
        if not user:
            return JsonResponse({"message": "No user to fetch settings."}, status=200)
    except AttributeError:
        return JsonResponse({"message": "No token provided to fetch settings."}, status=200)
    
    if request.method == 'POST':
        data = json.loads(request.body)
        year = str(data.get("year", ""))
        gender = data.get("gender", "")
        min_popularity_percent = data.get("min_popularity_percent", 0)
        max_popularity_percent = data.get("max_popularity_percent", 100)

        # update user's settings
        user.settings = Setting(year=year, gender=gender, min_popularity_percent=min_popularity_percent, max_popularity_percent=max_popularity_percent)
        user.settings.save()

        # Populate name pool from dictionary by year, gender, popularity range
        if (year in nameDict and gender in nameDict[year]):
            names = nameDict[year][gender]
            num_names = len(names)
            minIdx = int(num_names - (max_popularity_percent * num_names / 100))
            maxIdx = int(num_names - (min_popularity_percent * num_names / 100))
            if (maxIdx == minIdx and minIdx < num_names):
                maxIdx = maxIdx + 1
            elif (maxIdx == minIdx and maxIdx > 0):
                minIdx = maxIdx - 1

            names = names[minIdx:maxIdx]
            user.name_pool = names
        else:
            user.name_pool = ['Jenny', 'Ben', 'Leo', 'Jay', 'Mindy', 'Steve', 'Andrew', 'Nicky', "Scott", "Desi", "Raya"]

    user.save()

    serializer = SettingsSerializer(user.settings, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def user(request):
    try: 
        token = Token.objects.get(key=request.auth.key)
        user = token.user
        if not user:
            return JsonResponse({"message": "No user found."}, status=200)
    except AttributeError:
        return JsonResponse({"message": "No token provided."}, status=200)

    user = User.objects.get(pk=request.user.id)
    serializer = UserSerializer(user, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def choices(request):
    # TO DO: create decorator function for all functions that require a token
    try: 
        token = Token.objects.get(key=request.auth.key)
        user = token.user
        if not user:
             return JsonResponse({"message": "No user found."}, status=200)
    except AttributeError:
        return JsonResponse({"message": "No token provided."}, status=200)

    user = User.objects.get(pk=request.user.id)

    return Response(sample(user.name_pool, 2))

@api_view(['POST'])
def rank(request):
    try: 
        token = Token.objects.get(key=request.auth.key)
        user = token.user
        if not user:
            return JsonResponse({"message": "No user found."}, status=200)
    except AttributeError:
        return JsonResponse({"message": "No token provided."}, status=200)

    user = User.objects.get(pk=request.user.id)
    data = json.loads(request.body)
    name1 = data.get("name1")
    name2 = data.get("name2")

    temp_rank = user.name_ranking

    if (name2 not in temp_rank):
        temp_rank.append(name2)
    if (name1 not in temp_rank):
        name2_idx = temp_rank.index(name2)
        temp_rank.insert(name2_idx, name1)
    
    name1_idx = temp_rank.index(name1)
    name2_idx = temp_rank.index(name2)

    if (name2_idx < name1_idx):
        temp_rank.remove(name1)
        temp_rank.insert(name2_idx, name1)
    
    user.name_ranking = temp_rank
    user.save()

    return JsonResponse({"message": "name rank updated"}, status=201)

@api_view(['GET'])
def partner(request):
    try: 
        token = Token.objects.get(key=request.auth.key)
        user = token.user
        if not user:
             return JsonResponse({"message": "No user found."}, status=200)
    except AttributeError:
        return JsonResponse({"message": "No token provided."}, status=200)

    user = User.objects.get(pk=request.user.id)

    return Response(user.partner)

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        data = json.loads(request.body)
        username = data.get("username", "")
        password = data.get("password", "")
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return JsonResponse({"message": "User logged in.", "token": token.key}, status=201)
        else:
            return HttpResponse("Invalid username and/or password.")

    else:
        return JsonResponse({"error": "Post request required."}, status=400)

@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password", "")
        if not password or not email or not username:
            return JsonResponse({"error": "Please provide all requested information."}, status=400)

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return JsonResponse({"error": "Username already taken."}, status=400)
        login(request, user)
        token = Token.objects.create(user=user)
        return JsonResponse({"message": "User successfully registered.", "token": token.key}, status=201)
    else:
        return JsonResponse({"error": "Post request required."}, status=400)