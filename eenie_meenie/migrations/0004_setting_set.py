# Generated by Django 4.1.6 on 2023-02-05 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eenie_meenie', '0003_user_name_pool_user_name_ranking'),
    ]

    operations = [
        migrations.AddField(
            model_name='setting',
            name='set',
            field=models.BooleanField(default=False),
        ),
    ]