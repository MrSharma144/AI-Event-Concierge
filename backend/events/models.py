from django.db import models

class EventSearch(models.Model):
    query = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query: {self.query[:50]}"

class VenueProposal(models.Model):
    event = models.ForeignKey(EventSearch, on_delete=models.CASCADE, related_name='proposals')
    venue_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    estimated_cost = models.CharField(max_length=100)
    justification = models.TextField()
    image_url = models.URLField(max_length=500, null=True, blank=True)


    def __str__(self):
        return self.venue_name
