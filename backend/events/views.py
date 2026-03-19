from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import EventSearch, VenueProposal
from .services import generate_venue_proposal

@api_view(['POST'])
def propose_event(request):
    query = request.data.get('query')
    if not query:
        return Response({'error': 'Query is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Call LLM Service
    try:
        proposal_data = generate_venue_proposal(query)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Save to Database
    event_search = EventSearch.objects.create(query=query)
    proposals_to_return = []
    
    for prop in proposal_data.get('proposals', []):
        venue_proposal = VenueProposal.objects.create(
            event=event_search,
            venue_name=prop.get('venue_name', 'Unknown'),
            location=prop.get('location', 'Unknown'),
            estimated_cost=prop.get('estimated_cost', 'Unknown'),
            justification=prop.get('justification', 'No justification provided.')
        )
        proposals_to_return.append({
            'id': venue_proposal.id,
            'venue_name': venue_proposal.venue_name,
            'location': venue_proposal.location,
            'estimated_cost': venue_proposal.estimated_cost,
            'justification': venue_proposal.justification,
        })

    return Response({
        'id': event_search.id,
        'query': event_search.query,
        'created_at': event_search.created_at.isoformat(),
        'proposals': proposals_to_return
    })

@api_view(['GET'])
def get_history(request):
    searches = EventSearch.objects.all().order_by('-created_at')
    history_data = []
    
    for search in searches:
        proposals = search.proposals.all()
        history_data.append({
            'id': search.id,
            'query': search.query,
            'created_at': search.created_at.isoformat(),
            'proposals': [{
                'venue_name': p.venue_name,
                'location': p.location,
                'estimated_cost': p.estimated_cost,
                'justification': p.justification,
            } for p in proposals]
        })
            
    return Response(history_data)

