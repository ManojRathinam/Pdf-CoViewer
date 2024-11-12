"""
ASGI config for pdf_sync project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import pdf_sync.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pdf_sync.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            pdf_sync.routing.websocket_urlpatterns
        )
    ),
})

