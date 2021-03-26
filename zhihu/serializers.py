from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Question, Answer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    create_by = UserSerializer(read_only=True)

    def create(self, validated_data):
        request = self.context["request"]
        validated_data['create_by'] = request.user
        return super().create(validated_data)

    class Meta:
        model = Question
        fields = '__all__'


class AnswerSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    create_by = UserSerializer(read_only=True)

    def create(self, validated_data):
        request = self.context["request"]
        validated_data['create_by'] = request.user
        return super().create(validated_data)

    class Meta:
        model = Answer
        fields = '__all__'
