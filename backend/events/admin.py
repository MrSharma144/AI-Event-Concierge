from django.contrib import admin
from .models import EventSearch, VenueProposal

class VenueProposalInline(admin.TabularInline):
    model = VenueProposal
    extra = 1

@admin.register(EventSearch)
class EventSearchAdmin(admin.ModelAdmin):
    list_display = ('id', 'query', 'created_at')
    inlines = [VenueProposalInline]

@admin.register(VenueProposal)
class VenueProposalAdmin(admin.ModelAdmin):
    list_display = ('venue_name', 'location', 'estimated_cost', 'event')
