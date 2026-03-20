from django import forms
from .models import Project, Skill, Internship, Education, Certification, Achievement, Training

class ProjectForm(forms.ModelForm):
    point_1 = forms.CharField(label="Key Point 1", required=False, widget=forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Major feature or achievement...'}))
    point_2 = forms.CharField(label="Key Point 2", required=False, widget=forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Technical implementation detail...'}))
    point_3 = forms.CharField(label="Key Point 3", required=False, widget=forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Outcome or impact...'}))

    class Meta:
        model = Project
        fields = ['title', 'tags', 'image_url', 'link', 'github_link', 'is_live', 'date']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Project Title'}),
            'tags': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'React, Python, etc. (Required)'}),
            'image_url': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://...'}),
            'link': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://live-site.com...'}),
            'github_link': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://github.com/...'}),
            'is_live': forms.CheckboxInput(attrs={'style': 'transform: scale(1.5); margin-left: 10px; cursor: pointer;'}),
            'date': forms.DateInput(attrs={'class': 'form-input', 'type': 'date'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            # Populate points from description if it exists
            stored_description = str(self.instance.description or "")
            points = [p.strip() for p in stored_description.split('\n') if p.strip()]
            if len(points) > 0: self.fields['point_1'].initial = points[0]
            if len(points) > 1: self.fields['point_2'].initial = points[1]
            if len(points) > 2: self.fields['point_3'].initial = "\n".join(points[2:])

    def save(self, commit=True):
        instance = super().save(commit=False)
        p1 = self.cleaned_data.get('point_1', '').strip()
        p2 = self.cleaned_data.get('point_2', '').strip()
        p3 = self.cleaned_data.get('point_3', '').strip()
        
        bullets = []
        if p1: bullets.append(p1)
        if p2: bullets.append(p2)
        if p3: bullets.append(p3)
        
        instance.description = "\n".join(bullets)
        if commit:
            instance.save()
        return instance

class SkillForm(forms.ModelForm):
    class Meta:
        model = Skill
        fields = ['name', 'category']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Skill Name'}),
            'category': forms.Select(attrs={'class': 'form-input', 'style': 'background: rgba(0, 0, 0, 0.3); color: var(--text-main); font-family: var(--font-body);'}),
        }

class InternshipForm(forms.ModelForm):
    class Meta:
        model = Internship
        fields = ['company', 'role', 'duration', 'description', 'technologies', 'certificate_link', 'offer_letter_link', 'date']
        widgets = {
            'company': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Company Name'}),
            'role': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Job Role'}),
            'duration': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Jan 2024 - Present'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'placeholder': 'Responsibilities / Description', 'rows': 4}),
            'technologies': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'React, Node.js, Python'}),
            'certificate_link': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://link-to-certificate.com...'}),
            'offer_letter_link': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://link-to-offer-letter.com...'}),
            'date': forms.DateInput(attrs={'class': 'form-input', 'type': 'date'}),
        }

class TrainingForm(forms.ModelForm):
    class Meta:
        model = Training
        fields = ['organization', 'course', 'duration', 'description', 'technologies', 'certificate_link', 'date']
        widgets = {
            'organization': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Organization / Platform Name'}),
            'course': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Training Course Name'}),
            'duration': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Jan 2024 - Present'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'placeholder': 'What you learned', 'rows': 4}),
            'technologies': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'React, Python, etc'}),
            'certificate_link': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://link-to-certificate.com...'}),
            'date': forms.DateInput(attrs={'class': 'form-input', 'type': 'date'}),
        }

class EducationForm(forms.ModelForm):
    class Meta:
        model = Education
        fields = ['institution', 'degree', 'duration', 'description', 'date']
        widgets = {
            'institution': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Institution Name'}),
            'degree': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Degree / Qualification'}),
            'duration': forms.TextInput(attrs={'class': 'form-input', 'placeholder': '2019 - 2023'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'placeholder': 'Description (optional)', 'rows': 4}),
            'date': forms.DateInput(attrs={'class': 'form-input', 'type': 'date'}),
        }

class CertificationForm(forms.ModelForm):
    class Meta:
        model = Certification
        fields = ['title', 'issuer', 'date', 'link']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Certification Title'}),
            'issuer': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Issuing Organization'}),
            'date': forms.DateInput(attrs={'class': 'form-input', 'type': 'date'}),
            'link': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://...'}),
        }

class AchievementForm(forms.ModelForm):
    class Meta:
        model = Achievement
        fields = ['title', 'description', 'date']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Achievement Title'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'placeholder': 'Description', 'rows': 4}),
            'date': forms.DateInput(attrs={'class': 'form-input', 'type': 'date'}),
        }
