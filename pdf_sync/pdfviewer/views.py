# pdfviewer/views.py
from django.shortcuts import render
from django.http import JsonResponse
from .models import PdfFile
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser

@api_view(['POST'])
def upload_pdf(request):
    if request.method == 'POST':
        pdf_file = request.FILES.get('file')
        if pdf_file:
            new_pdf = PdfFile.objects.create(file=pdf_file)
            return JsonResponse({'message': 'File uploaded successfully', 'fileUrl': new_pdf.file.url})
        return JsonResponse({'error': 'No file provided'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
