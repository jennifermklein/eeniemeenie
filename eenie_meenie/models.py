from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class User(AbstractUser):
    settings = models.ForeignKey('Setting', on_delete=models.CASCADE, null=True, blank=True, related_name='setter')
    partner = models.OneToOneField('User', on_delete=models.CASCADE, null=True, blank=True, related_name='partnered_by')
    name_pool = ArrayField(models.CharField(max_length=100), default=list)
    name_ranking = ArrayField(models.CharField(max_length=100), default=list)

    def __str__(self):
        return f'{self.username}'

class Setting(models.Model):
    year = models.IntegerField()
    gender = models.CharField(max_length=1)
    min_popularity_percent = models.IntegerField()
    max_popularity_percent = models.IntegerField()
    set = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.set = bool(self.year) and bool(self.gender) and (bool(self.min_popularity_percent) or self.min_popularity_percent == 0) and (bool(self.max_popularity_percent) or self.max_popularity_percent == 0)
        super(Setting, self).save(*args, **kwargs)

    def __str__(self):
        return f'Names for gender: {self.gender} in {self.year} with popularity between {self.min_popularity_percent} and {self.max_popularity_percent}'

