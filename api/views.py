from django.shortcuts import render
from django.http import JsonResponse
from .models import Shops,Fireworks
from mongoengine import *
import geocoder


# Create your views here.
def sample(request):
  return JsonResponse({ 'foo' : 'bar' })

def index(request):
  return render(request, 'myapp/index.html', {})


# {
#         position: {
#           lat: parseFloat(o.latlng[0]),
#           lng: parseFloat(o.latlng[1])
#         },
#         info_url: o.info_url,
#         ifw: false,
#         ifw2text: o.date,
#         info: {
#           date: o.date,
#           from_now: me.dateDiff(o.date),
#           day: weekday[moment(o.date, 'YYYY/M/D').day()],
#           time_start: o.time_start,
#           time_end: o.time_end,
#           location: o.location,
#           homepage: o.homepage
#         }
#       }
def restaurants(request):
  connect('betonavi', host='localhost', port=27017)
  # for item in data:
  bottom_left = (float(request.GET.get('p1_lng')), float(request.GET.get('p1_lat')))
  upper_right = (float(request.GET.get('p2_lng')), float(request.GET.get('p2_lat')))
  print bottom_left, upper_right


  shops = Shops.objects(loc__geo_within_box=[bottom_left, upper_right])
  data = []
  for shop in shops:
    # print shop.name
    data.append({
      'position': {
        'lat': shop.loc['coordinates'][1],
        'lng': shop.loc['coordinates'][0]
      },
      'ifw': False,
      'name': shop.name
    })


  # print data
  # for shop in  Shops.objects().all():
    # print shop.loc
    # full_address = '%s%s' % (shop.region, shop.locality)
    # print full_address
    # g = geocoder.google(full_address)
    # if len(g.latlng) == 2:
    #   shop.loc = { "type" : "Point" , "coordinates" : [g.latlng[1], g.latlng[0]]}
    #   print shop.loc
    #   # shop.save()

    # shop.save()


  return JsonResponse({'data': data})

def fireworks(request):
  connect('betonavi', host='localhost', port=27017)
  # for item in data:

  # for shop in  Shops.objects().all():
    # print shop.loc
    # full_address = '%s%s' % (shop.region, shop.locality)
    # print full_address
    # g = geocoder.google(full_address)
    # if len(g.latlng) == 2:
    #   shop.loc = { "type" : "Point" , "coordinates" : [g.latlng[1], g.latlng[0]]}
    #   print shop.loc
    #   # shop.save()

    # shop.save()
  return JsonResponse({ 'foo' : 'bar' })

def normalize(string):
  return ' '.join(string.split())
