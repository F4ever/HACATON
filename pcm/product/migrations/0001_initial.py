# Generated by Django 2.0.6 on 2018-06-16 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Component',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('slug', models.CharField(blank=True, max_length=128)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('added_at', models.DateTimeField(auto_now_add=True)),
                ('code', models.IntegerField(null=True)),
                ('description', models.TextField(blank=True)),
                ('components', models.ManyToManyField(to='product.Component')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
