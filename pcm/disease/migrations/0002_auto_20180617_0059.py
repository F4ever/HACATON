# Generated by Django 2.0.6 on 2018-06-17 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disease', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='disease',
            name='title',
            field=models.CharField(max_length=256),
        ),
    ]