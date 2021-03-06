# Generated by Django 2.0.6 on 2018-06-16 23:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ComponentContainer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.RemoveField(
            model_name='component',
            name='components',
        ),
        migrations.AlterField(
            model_name='component',
            name='code',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AddField(
            model_name='componentcontainer',
            name='children',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='childrens', to='product.Component'),
        ),
        migrations.AddField(
            model_name='componentcontainer',
            name='parent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parents', to='product.Component'),
        ),
    ]
