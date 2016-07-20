from __future__ import unicode_literals

from django.db import models

from mongoengine import *


class Shops(Document):
  name = StringField(max_length=200)
  region = StringField(max_length=200)
  station = StringField(max_length=200)
  locality = StringField(max_length=200)
  address = StringField(max_length=200)
  loc = PointField()

  tel = StringField(max_length=100)
  operating_hours1 = StringField(max_length=200)
  operating_hours2 = StringField(max_length=200)
  facilities = StringField()
  parking = StringField()
  dishes = StringField()
  shop_holidays = StringField(max_length=200)
  homepage = StringField(max_length=200)
  transport2 = StringField(max_length=200)
  seat_count_full = StringField(max_length=200)
  budget_lunch = StringField(max_length=200)
  drink = StringField(max_length=200)
  private_room = StringField()
  budget_dinner = StringField()
  smoking = StringField()
  room = StringField()
  private_use = StringField()
  seat_count = StringField()
  url = StringField()
  photos = ListField(StringField(max_length=512))
  mobile = StringField()
  transport1 = StringField()
  cards = StringField()


class Fireworks(Document):
  location = StringField()
  date_raw = StringField()
  date = StringField()
  homepage = StringField()
  time_start = StringField()
  time_end = StringField()
  info_url = StringField()
  loc = PointField()
