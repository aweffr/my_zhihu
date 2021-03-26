from django.urls import path, include
from rest_framework.routers import DefaultRouter

from zhihu.views import QuestionViewSet, AnswerViewSet, UserViewSet

router = DefaultRouter()

router.register(r"questions", QuestionViewSet)
router.register(r"answers", AnswerViewSet)
router.register(r"users", UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
]
