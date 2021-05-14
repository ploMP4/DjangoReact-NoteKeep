# Generated by Django 3.1.4 on 2021-03-31 11:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
                ('email', models.CharField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=200, unique=True)),
            ],
        ),
    ]
