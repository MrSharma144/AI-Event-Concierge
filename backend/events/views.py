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
    venue_proposal = VenueProposal.objects.create(
        event=event_search,
        venue_name=proposal_data.get('venue_name', 'Unknown'),
        location=proposal_data.get('location', 'Unknown'),
        estimated_cost=proposal_data.get('estimated_cost', 'Unknown'),
        justification=proposal_data.get('justification', 'No justification provided.')
    )

    return Response({
        'id': venue_proposal.id,
        'venue_name': venue_proposal.venue_name,
        'location': venue_proposal.location,
        'estimated_cost': venue_proposal.estimated_cost,
        'justification': venue_proposal.justification,
        'query': event_search.query,
        'created_at': event_search.created_at.isoformat(),
    })

@api_view(['GET'])
def get_history(request):
    searches = EventSearch.objects.all().order_by('-created_at')
    history_data = []
    
    for search in searches:
        # Get latest proposal for each search (usually just one)
        proposal = search.proposals.first()
        if proposal:
            history_data.append({
                'id': search.id,
                'query': search.query,
                'created_at': search.created_at.isoformat(),
                'proposal': {
                    'venue_name': proposal.venue_name,
                    'location': proposal.location,
                    'estimated_cost': proposal.estimated_cost,
                    'justification': proposal.justification,
                }
            })
            
    return Response(history_data)
