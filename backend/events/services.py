import json
import google.generativeai as genai
from django.conf import settings

def generate_venue_proposal(query: str) -> dict:
 
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set in the environment.")
    
    genai.configure(api_key=api_key)

    # Using the primary flash alias found in the available models list
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f'''
    SYSTEM ROLE: 
    You are a Strategic AI Event Architect for a luxury corporate concierge service. Your objective is to transform natural language event requests into high-fidelity, structured venue proposals.

    INSTRUCTIONS:
    1. Parse the USER_QUERY for: headcount, event type, budget, location preferences, and tone.
    2. Determine how many venue options the user is asking for. If they specify a number (e.g., "3 venues"), provide exactly that many. 
    3. If they don't specify a number, provide the single best venue option.
    4. For each venue, provide: name, location, estimated cost, and a professional justification.
    5. Return ONLY a valid JSON object with a "proposals" key containing an array of objects.

    JSON SCHEMA:
    {{
        "proposals": [
            {{
                "venue_name": "string (The specific, professional name of the suggested venue)",
                "location": "string (City, Region, or Address)",
                "estimated_cost": "string (Formatted currency, e.g., '$5,000' or '$12,500 including catering')",
                "justification": "string (A detailed, high-impact paragraph highlighting 3+ reasons for the selection)",
                "image_url": "string (A high-quality Unsplash image URL that represents this venue, e.g., https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000)"

            }}
        ]
    }}

    USER_QUERY: "{query}"
    
    RESPONSE (JSON ONLY):
    '''

    response = model.generate_content(prompt)
    
    try:
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
            
        data = json.loads(response_text.strip())
        
        # Ensure we always return a list of proposals
        if isinstance(data, list):
            return {"proposals": data}
        if "proposals" not in data:
            if "venue_name" in data:
                return {"proposals": [data]}
            return {"proposals": []}
            
        return data
        
    except json.JSONDecodeError as e:
        # Fallback if formatting fails
        return {
            "proposals": [{
                "venue_name": "AI Processing Error",
                "location": "Unknown",
                "estimated_cost": "N/A",
                "justification": f"The AI could not return a structured proposal. Raw text: {response.text[:200]}..."
            }]
        }

