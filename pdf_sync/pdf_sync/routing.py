# pdf_sync/routing.py
from django.urls import path
from pdfviewer.consumers import PDFSyncConsumer

websocket_urlpatterns = [
    path('ws/pdf_sync/', PDFSyncConsumer.as_asgi()),
]
