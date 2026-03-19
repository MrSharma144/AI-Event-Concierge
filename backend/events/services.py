import json
import google.generativeai as genai
from django.conf import settings

def generate_venue_proposal(query: str) -> dict:
    """
    Calls the Gemini API to get a structured JSON venue proposal based on the given query.
    Expected returned structure:
    {
        "venue_name": "Name of the venue",
        "location": "Location",
        "estimated_cost": "$Cost",
        "justification": "Why it fits the event"
    }
    """
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set in the environment.")
    
    genai.configure(api_key=api_key)

    # Use a recommended model for text/instruct tasks
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f'''
    You are an expert AI Event Concierge. Your task is to plan a corporate event based on the user's natural language description.
    
    User Query: "{query}"
    
    You must respond ONLY with a valid, raw JSON object representing a venue proposal that fits the request. Do not include markdown formatting like ```json or ``` at the beginning or end.
    
    The JSON object must have exactly the following keys:
    - "venue_name": A creative and suitable venue name.
    - "location": The venue's location (city, state, or specific region as appropriate).
    - "estimated_cost": A realistic estimate of the total cost formatted as a string (e.g., "$4,000" or "$15,000 - $20,000").
    - "justification": A compelling paragraph explaining why this venue perfectly fits the user's event.
    '''

    response = model.generate_content(prompt)
    
    try:
        response_text = response.text.strip()
        # Clean up possible markdown wrappers if the AI didn't follow instructions
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
            
        return json.loads(response_text.strip())
    except json.JSONDecodeError as e:
        # Fallback dictionary if formatting fails
        return {
            "venue_name": "AI Processing Error",
            "location": "Unknown",
            "estimated_cost": "N/A",
            "justification": f"The AI could not return a structured proposal. Raw text: {response.text[:200]}..."
        }
