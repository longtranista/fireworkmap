from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def sample(request):
  return JsonResponse({ 'foo' : 'bar' })

def index(request):
  return render(request, 'myapp/index.html', {})
