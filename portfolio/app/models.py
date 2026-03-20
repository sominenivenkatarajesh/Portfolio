from django.db import models

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Programming Languages', 'Programming Languages'),
        ('Frameworks', 'Frameworks'),
        ('Databases', 'Databases'),
        ('Tools/Platforms', 'Tools/Platforms'),
        ('Soft Skills', 'Soft Skills'),
        ('Other', 'Other'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Programming Languages')
    date = models.DateField(null=True, blank=True, help_text="Date added (for sorting)")

    def __str__(self):
        return f"{self.name} ({self.category})"

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image_url = models.URLField(max_length=500, blank=True, null=True, help_text="Link to hosting image")
    link = models.URLField(max_length=500, blank=True, null=True, help_text="Live project URL")
    github_link = models.URLField(max_length=500, blank=True, null=True, help_text="GitHub repository URL")
    is_live = models.BooleanField(default=True, help_text="Check if the project is currently live")
    tags = models.CharField(max_length=200, help_text="Comma separated tags")
    date = models.DateField(null=True, blank=True, help_text="Date for sorting (newest first)")

    def __str__(self):
        return self.title

    @property
    def tag_list(self):
        return [tag.strip() for tag in self.tags.split(',')]

    @property
    def point_list(self):
        if self.description:
            # Split by newline and filter out empty strings
            return [p.strip() for p in self.description.split('\n') if p.strip()]
        return []

class Internship(models.Model):
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    duration = models.CharField(max_length=100, help_text="e.g. June 2023 - Aug 2023")
    description = models.TextField()
    technologies = models.CharField(max_length=200, help_text="Comma separated tech, e.g. React, Node", blank=True, null=True)
    certificate_link = models.URLField(max_length=500, blank=True, null=True, help_text="Link to completion certificate")
    offer_letter_link = models.URLField(max_length=500, blank=True, null=True, help_text="Link to offer letter")
    date = models.DateField(null=True, blank=True, help_text="Completion date for sorting (newest first)")

    def __str__(self):
        return f"{self.role} at {self.company}"
        
    @property
    def tech_list(self):
        if self.technologies:
            return [tech.strip() for tech in self.technologies.split(',')]
        return []

class Training(models.Model):
    organization = models.CharField(max_length=200)
    course = models.CharField(max_length=200)
    duration = models.CharField(max_length=100, help_text="e.g. June 2023 - Aug 2023")
    description = models.TextField()
    technologies = models.CharField(max_length=200, help_text="Comma separated tech, e.g. React, Node", blank=True, null=True)
    certificate_link = models.URLField(max_length=500, blank=True, null=True, help_text="Link to completion certificate")
    date = models.DateField(null=True, blank=True, help_text="Completion date for sorting (newest first)")

    def __str__(self):
        return f"{self.course} at {self.organization}"
        
    @property
    def tech_list(self):
        if self.technologies:
            return [tech.strip() for tech in self.technologies.split(',')]
        return []

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"

class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    duration = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField(null=True, blank=True, help_text="Completion date for sorting (newest first)")

    def __str__(self):
        return f"{self.degree} at {self.institution}"

class Certification(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    date = models.DateField(null=True, blank=True, help_text="Completion date for sorting (newest first)")
    link = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return f"{self.title} by {self.issuer}"

class Achievement(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField(null=True, blank=True, help_text="Date for sorting (newest first)")

    def __str__(self):
        return self.title
