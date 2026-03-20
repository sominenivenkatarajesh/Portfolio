from django.contrib import admin
from .models import Project, Skill, ContactMessage, Internship, Education, Certification, Achievement, Training

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'is_live', 'github_link')
    list_editable = ('date', 'is_live')
    search_fields = ('title', 'tags', 'description')
    ordering = ('-date',)

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'date')
    list_editable = ('category',)
    search_fields = ('name', 'category')
    ordering = ('category', '-date')

@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'date')
    list_editable = ('date',)
    search_fields = ('role', 'company', 'technologies', 'description')
    ordering = ('-date',)

@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('course', 'organization', 'date')
    list_editable = ('date',)
    search_fields = ('course', 'organization', 'technologies', 'description')
    ordering = ('-date',)

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'date')
    list_editable = ('date',)
    search_fields = ('degree', 'institution', 'description')
    ordering = ('-date',)

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'date')
    list_editable = ('date',)
    search_fields = ('title', 'issuer')
    ordering = ('-date',)

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_editable = ('date',)
    search_fields = ('title', 'description')
    ordering = ('-date',)

@admin.register(ContactMessage)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    readonly_fields = ('created_at',)
    search_fields = ('name', 'email', 'message')
    ordering = ('-created_at',)
