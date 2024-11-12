import json
from channels.generic.websocket import AsyncWebsocketConsumer

class PdfConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('pdf_group', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('pdf_group', self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        page = data.get('page')

        # Broadcast page change to all connected clients
        await self.channel_layer.group_send('pdf_group', {
            'type': 'page_update',
            'message': page
        })

    async def page_update(self, event):
        page = event['message']
        await self.send(text_data=json.dumps({'page': page}))
