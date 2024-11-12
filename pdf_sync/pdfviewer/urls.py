from django.urls import path
from . import views

urlpatterns = [
    path('api/upload/', views.upload_pdf, name='upload_pdf'),
    path('api/get-latest-pdf/', views.get_latest_pdf, name='get_latest_pdf'),
    path('api/update-page/', views.update_pdf_page, name='update_pdf_page'),  # Endpoint for admin to change pages
]
