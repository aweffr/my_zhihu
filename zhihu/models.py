from django.contrib.auth.models import User
from django.db import models


class Question(models.Model):
    title = models.CharField(max_length=150, verbose_name="问题")
    detail = models.TextField(verbose_name="补充描述", blank=True)
    create_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="提问者", editable=False)
    create_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    modify_at = models.DateTimeField(auto_now=True, verbose_name="最近修改时间")


class Answer(models.Model):
    question = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="问题")
    content = models.TextField(verbose_name="回答")
    create_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="回答者", editable=False)
    create_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    modify_at = models.DateTimeField(auto_now=True, verbose_name="最近修改时间")
