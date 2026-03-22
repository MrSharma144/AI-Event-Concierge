from rest_framework import serializers
from .models import EventSearch, VenueProposal

class VenueProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = VenueProposal
        fields = ['id', 'venue_name', 'location', 'estimated_cost', 'justification', 'image_url']

class EventSearchSerializer(serializers.ModelSerializer):
    proposals = VenueProposalSerializer(many=True, read_only=True)

    class Meta:
        model = EventSearch
        fields = ['id', 'query', 'created_at', 'proposals']

class ProposeEventRequestSerializer(serializers.Serializer):
    query = serializers.CharField(required=True, help_text="The event description or query to generate proposals for.")

class ProposeEventResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    query = serializers.CharField()
    created_at = serializers.DateTimeField()
    proposals = VenueProposalSerializer(many=True)
