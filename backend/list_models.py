import os
import sys
import django
import google.generativeai as genai

# Setup django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.conf import settings

def list_models():
    genai.configure(api_key=settings.GEMINI_API_KEY)
    print("Listing available models to file...")
    with open('models.txt', 'w', encoding='utf-8') as f:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                f.write(m.name + "\n")
    print("DONE writing models_list.txt")

if __name__ == "__main__":
    try:
        list_models()
    except Exception as e:
        print(f"Error: {e}")
