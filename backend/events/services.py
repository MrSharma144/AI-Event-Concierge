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
    2. If details are missing (e.g., budget), provide a "Market-Standard" estimate based on the event scale.
    3. The "justification" field must be professional, persuasive, and directly reference how the venue satisfies the specific constraints in the query.
    4. Return ONLY a valid JSON object. No conversational preamble, no markdown formatting (```json), and no closing text.

    JSON SCHEMA:
    {{
        "venue_name": "string (The specific, professional name of the suggested venue)",
        "location": "string (City, Region, or Address)",
        "estimated_cost": "string (Formatted currency, e.g., '$5,000' or '$12,500 including catering')",
        "justification": "string (A detailed, high-impact paragraph highlighting 3+ reasons for the selection)"
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
            
        return json.loads(response_text.strip())
    except json.JSONDecodeError as e:
        # Fallback dictionary if formatting fails
        return {
            "venue_name": "AI Processing Error",
            "location": "Unknown",
            "estimated_cost": "N/A",
            "justification": f"The AI could not return a structured proposal. Raw text: {response.text[:200]}..."
        }
