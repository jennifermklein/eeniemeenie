# Generated by Django 4.1.6 on 2023-02-03 01:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('eenie_meenie', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='name_pool',
        ),
        migrations.RemoveField(
            model_name='user',
            name='name_ranking',
        ),
    ]
