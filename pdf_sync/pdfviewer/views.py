from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import user_passes_test
from .models import PdfFile
import json

@csrf_exempt
def upload_pdf(request):
    if request.method == 'POST':
        if request.FILES.get('file'):
            pdf_file = request.FILES['file']
            new_pdf = PdfFile(file=pdf_file)
            new_pdf.save()
            return JsonResponse({'message': 'File uploaded successfully'}, status=200)
        return JsonResponse({'error': 'No file uploaded'}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)

def get_latest_pdf(request):
    latest_pdf = PdfFile.objects.last()
    if latest_pdf:
        return JsonResponse({'pdf_url': latest_pdf.file.url}, status=200)
    return JsonResponse({'error': 'No PDF found'}, status=404)

@csrf_exempt
@user_passes_test(lambda u: u.is_superuser)  # Only admin can change page
def update_pdf_page(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        page = data.get('page')
        # You might want to save this page number in a model to track state
        return JsonResponse({'message': 'Page updated', 'page': page}, status=200)
    return JsonResponse({'error': 'Invalid request'}, status=400)
