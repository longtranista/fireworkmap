from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^restaurants$', views.restaurants),
    url(r'^$', views.index)
]