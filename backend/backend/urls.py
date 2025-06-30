from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the PinIt API backend!")

urlpatterns = [
    path('', home),  # Root URL returns a simple welcome message
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/pins/', include('pins.urls')),  # assuming you have a pins app
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
