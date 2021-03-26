from django.contrib.auth.models import User
from django.db import models


class Question(models.Model):
    title = models.CharField(max_length=150, verbose_name="问题")
    detail = models.TextField(verbose_name="补充描述", blank=True)
    create_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="questions", verbose_name="提问者")
    create_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    modify_at = models.DateTimeField(auto_now=True, verbose_name="最近修改时间")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = verbose_name_plural = "问题"


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="answers", verbose_name="问题")
    answer_text = models.TextField(verbose_name="回答")
    create_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="answers", verbose_name="回答者")
    create_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    modify_at = models.DateTimeField(auto_now=True, verbose_name="最近修改时间")

    def __str__(self):
        return self.answer_text

    class Meta:
        verbose_name = verbose_name_plural = "回答"
