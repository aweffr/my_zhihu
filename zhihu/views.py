from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, authentication
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response

from zhihu.models import Question, Answer
from zhihu.serializers import QuestionSerializer, AnswerSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication,]

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(methods=['GET', ], detail=False)
    def current_user(self, request, **kwargs):
        user = request.user
        data = UserSerializer(user).data
        return Response(data)


class QuestionViewSet(viewsets.ModelViewSet):
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    queryset = Question.objects.order_by('-create_at').all()
    serializer_class = QuestionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['question', ]

    queryset = Answer.objects.order_by('-create_at').all()
    serializer_class = AnswerSerializer
