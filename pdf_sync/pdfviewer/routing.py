from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from pdfviewer.consumers import PdfConsumer

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('ws/pdf/', PdfConsumer.as_asgi()),
        ])
    ),
})
