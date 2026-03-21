from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import logout
from django.contrib.auth.decorators import user_passes_test
from .models import Project, Skill, ContactMessage, Internship, Education, Certification, Achievement, Training
from .forms import ProjectForm, SkillForm, InternshipForm, EducationForm, CertificationForm, AchievementForm, TrainingForm

def home(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message_body = request.POST.get('message')
        
        # Save to database
        ContactMessage.objects.create(name=name, email=email, message=message_body)
        
        try:
            # Notify Admin
            subject = f"New Portfolio Message from {name}"
            email_message = f"From: {name} <{email}>\n\nMessage:\n{message_body}"
            send_mail(subject, email_message, settings.DEFAULT_FROM_EMAIL, [settings.DEFAULT_FROM_EMAIL])

            # Auto-reply to User
            user_subject = "Thanks for getting in touch!"
            user_message = f"Hi {name},\n\nThank you for reaching out to me! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nSomineni Venkata Rajesh"
            send_mail(user_subject, user_message, settings.DEFAULT_FROM_EMAIL, [email])

            messages.success(request, 'Your message has been sent successfully!')
        except Exception as e:
            print(f"Email error in home view: {e}")
            messages.warning(request, f'Message saved, but failed to send email: {str(e)}')
            
        return redirect('home')

    projects_list = Project.objects.all().order_by('-date')
    skills_list = Skill.objects.all().order_by('category', '-date')
    internships_list = Internship.objects.all().order_by('-date')
    education_list = Education.objects.all().order_by('-date')
    certification_list = Certification.objects.all().order_by('-date')
    achievement_list = Achievement.objects.all().order_by('-date')
    training_list = Training.objects.all().order_by('-date')
    
    # Combine Internships and Trainings for Experience Section
    experience_list = []
    for item in internships_list[:3]:
        experience_list.append({
            'group_by': item.company,
            'title': item.role,
            'duration': item.duration,
            'description': item.description,
            'tech_list': item.tech_list,
            'certificate_link': item.certificate_link,
            'offer_letter_link': item.offer_letter_link,
            'type': 'Internship'
        })
    for item in training_list[:3]:
        experience_list.append({
            'group_by': item.organization,
            'title': item.course,
            'duration': item.duration,
            'description': item.description,
            'tech_list': item.tech_list,
            'certificate_link': item.certificate_link,
            'type': 'Training'
        })
    
    # Sort by order if needed, or keep as is. Let's just group them.
    grouped_experience = {}
    for item in experience_list:
        group = item['group_by']
        if group not in grouped_experience:
            grouped_experience[group] = []
        grouped_experience[group].append(item)

    # Group Certifications by Issuer
    raw_certs = certification_list[:3]
    grouped_certs = {}
    for cert in raw_certs:
        issuer = cert.issuer
        if issuer not in grouped_certs:
            grouped_certs[issuer] = []
        grouped_certs[issuer].append(cert)
    
    context = {
        'projects': projects_list[:3], 
        'skills': skills_list[:5], 
        'grouped_experience': grouped_experience,
        'education_list': education_list[:3],
        'grouped_certs': grouped_certs,
        'achievement_list': achievement_list[:3],
        'projects_count': Project.objects.count(),
        'internships_count': Internship.objects.count(),
        'name': 'Somineni Venkata Rajesh',
        'about': 'I am a 3rd-year Computer Science student and a passionate developer. I have focused my journey on intensive training and internships, building practical experience in full-stack web development.',
    }
    return render(request, 'home.html', context)

def about(request):
    projects_list = Project.objects.all().order_by('-date')
    internships_list = Internship.objects.all().order_by('-date')
    education_list = Education.objects.all().order_by('-date')
    certification_list = Certification.objects.all().order_by('-date')
    achievement_list = Achievement.objects.all().order_by('-date')
    training_list = Training.objects.all().order_by('-date')
    # Group Internships and Trainings for Experience
    experience_list = []
    for item in internships_list:
        experience_list.append({
            'group_by': item.company,
            'title': item.role,
            'duration': item.duration,
            'description': item.description,
            'tech_list': item.tech_list,
            'certificate_link': item.certificate_link,
            'offer_letter_link': item.offer_letter_link,
            'type': 'Internship'
        })
    for item in training_list:
        experience_list.append({
            'group_by': item.organization,
            'title': item.course,
            'duration': item.duration,
            'description': item.description,
            'tech_list': item.tech_list,
            'certificate_link': item.certificate_link,
            'type': 'Training'
        })
    
    grouped_experience = {}
    for item in experience_list:
        group = item['group_by']
        if group not in grouped_experience:
            grouped_experience[group] = []
        grouped_experience[group].append(item)

    context = {
        'name': 'Somineni Venkata Rajesh',
        'about': 'I am a 3rd-year Computer Science student and a passionate developer. I have focused my journey on intensive training and internships, building practical experience in full-stack web development.',
        'projects': projects_list,
        'grouped_experience': grouped_experience,
        'education_list': education_list,
        'certification_list': certification_list,
        'achievement_list': achievement_list,
        'projects_count': Project.objects.count(),
        'internships_count': Internship.objects.count(),
    }
    return render(request, 'about.html', context)

def projects(request):
    projects_list = Project.objects.all().order_by('-date')
    context = {
        'projects': projects_list,
    }
    return render(request, 'projects.html', context)

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message_body = request.POST.get('message')
        ContactMessage.objects.create(name=name, email=email, message=message_body)
        try:
            # Notify Admin
            subject = f"New Portfolio Message from {name}"
            email_message = f"From: {name} <{email}>\n<br>\nMessage:\n{message_body}"
            send_mail(subject, email_message, settings.DEFAULT_FROM_EMAIL, [settings.DEFAULT_FROM_EMAIL])

            # Auto-reply to User
            user_subject = "Thanks for getting in touch!"
            user_message = f"Hi {name},\n\nThank you for reaching out to me! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nSomineni Venkata Rajesh"
            send_mail(user_subject, user_message, settings.DEFAULT_FROM_EMAIL, [email])

            messages.success(request, 'Your message has been sent successfully!')
        except Exception as e:
            print(f"Email error in contact view: {e}")
            messages.warning(request, f'Message saved, but failed to send email: {str(e)}')
        return redirect('contact')
    return render(request, 'contact.html')

# --- DASHBOARD & CRUD VIEWS ---
def is_admin(user):
    return user.is_authenticated and user.is_staff

@user_passes_test(is_admin, login_url='/django-admin/login/')
def dashboard(request):
    query = request.GET.get('q', '')
    
    # Base queries
    projects_list = Project.objects.all().order_by('-date')
    skills_list = Skill.objects.all().order_by('category', '-date')
    internships_list = Internship.objects.all().order_by('-date')
    messages_list = ContactMessage.objects.all().order_by('-created_at')
    education_list = Education.objects.all().order_by('-date')
    certification_list = Certification.objects.all().order_by('-date')
    achievement_list = Achievement.objects.all().order_by('-date')
    training_list = Training.objects.all().order_by('-date')
    
    # Apply search filter if query exists
    if query:
        projects_list = projects_list.filter(title__icontains=query) | projects_list.filter(tags__icontains=query)
        skills_list = skills_list.filter(name__icontains=query) | skills_list.filter(category__icontains=query)
        internships_list = internships_list.filter(company__icontains=query) | internships_list.filter(role__icontains=query)
        messages_list = messages_list.filter(name__icontains=query) | messages_list.filter(email__icontains=query) | messages_list.filter(message__icontains=query)
        education_list = education_list.filter(institution__icontains=query) | education_list.filter(degree__icontains=query)
        certification_list = certification_list.filter(title__icontains=query) | certification_list.filter(issuer__icontains=query)
        achievement_list = achievement_list.filter(title__icontains=query) | achievement_list.filter(description__icontains=query)
        training_list = training_list.filter(course__icontains=query) | training_list.filter(organization__icontains=query)
    
    # Group Skills for Dashboard
    category_order = ['Programming Languages', 'Frameworks', 'Databases', 'Tools/Platforms', 'Soft Skills', 'Other']
    grouped_skills = {cat: [] for cat in category_order}
    for skill in skills_list:
        cat = skill.category
        if cat in grouped_skills:
            grouped_skills[cat].append(skill)
        else:
            grouped_skills['Other'].append(skill)
    grouped_skills = {k: v for k, v in grouped_skills.items() if v}

    context = {
        'projects': projects_list,
        'grouped_skills': grouped_skills,
        'internships': internships_list,
        'messages_list': messages_list,
        'education_list': education_list,
        'certification_list': certification_list,
        'achievement_list': achievement_list,
        'training_list': training_list,
        'search_query': query,
    }
    return render(request, 'dashboard.html', context)

# --- PROJECT CRUD ---
@user_passes_test(is_admin)
def project_create(request):
    form = ProjectForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Project added successfully!')
        return redirect('dashboard')
    return render(request, 'project_form.html', {'form': form, 'title': 'Add Project'})

@user_passes_test(is_admin)
def project_update(request, pk):
    project = get_object_or_404(Project, pk=pk)
    form = ProjectForm(request.POST or None, instance=project)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Project updated successfully!')
        return redirect('dashboard')
    return render(request, 'project_form.html', {'form': form, 'title': 'Edit Project'})

@user_passes_test(is_admin)
def project_delete(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        project.delete()
        messages.success(request, 'Project deleted successfully!')
        return redirect(reverse('dashboard') + '#projects-section')
    return render(request, 'confirm_delete.html', {'object': project, 'type': 'Project'})

# --- SKILL CRUD ---
@user_passes_test(is_admin)
def skill_create(request):
    form = SkillForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Skill added successfully!')
        return redirect(reverse('dashboard') + '#skills-section')
    return render(request, 'skill_form.html', {'form': form, 'title': 'Add Skill'})

@user_passes_test(is_admin)
def skill_update(request, pk):
    skill = get_object_or_404(Skill, pk=pk)
    form = SkillForm(request.POST or None, instance=skill)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Skill updated successfully!')
        return redirect(reverse('dashboard') + '#skills-section')
    return render(request, 'skill_form.html', {'form': form, 'title': 'Edit Skill'})

@user_passes_test(is_admin)
def skill_delete(request, pk):
    skill = get_object_or_404(Skill, pk=pk)
    if request.method == 'POST':
        skill.delete()
        messages.success(request, 'Skill deleted successfully!')
        return redirect(reverse('dashboard') + '#skills-section')
    return render(request, 'confirm_delete.html', {'object': skill, 'type': 'Skill'})

# --- INTERNSHIP CRUD ---
@user_passes_test(is_admin)
def internship_create(request):
    form = InternshipForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Internship added successfully!')
        return redirect(reverse('dashboard') + '#internships-section')
    return render(request, 'internship_form.html', {'form': form, 'title': 'Add Internship'})

@user_passes_test(is_admin)
def internship_update(request, pk):
    internship = get_object_or_404(Internship, pk=pk)
    form = InternshipForm(request.POST or None, instance=internship)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Internship updated successfully!')
        return redirect(reverse('dashboard') + '#internships-section')
    return render(request, 'internship_form.html', {'form': form, 'title': 'Edit Internship'})

@user_passes_test(is_admin)
def internship_delete(request, pk):
    internship = get_object_or_404(Internship, pk=pk)
    if request.method == 'POST':
        internship.delete()
        messages.success(request, 'Internship deleted successfully!')
        return redirect(reverse('dashboard') + '#internships-section')
    return render(request, 'confirm_delete.html', {'object': internship, 'type': 'Internship'})

# --- TRAINING CRUD ---
@user_passes_test(is_admin)
def training_create(request):
    form = TrainingForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Training added successfully!')
        return redirect(reverse('dashboard') + '#trainings-section')
    return render(request, 'training_form.html', {'form': form, 'title': 'Add Training'})

@user_passes_test(is_admin)
def training_update(request, pk):
    training = get_object_or_404(Training, pk=pk)
    form = TrainingForm(request.POST or None, instance=training)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Training updated successfully!')
        return redirect(reverse('dashboard') + '#trainings-section')
    return render(request, 'training_form.html', {'form': form, 'title': 'Edit Training'})

@user_passes_test(is_admin)
def training_delete(request, pk):
    training = get_object_or_404(Training, pk=pk)
    if request.method == 'POST':
        training.delete()
        messages.success(request, 'Training deleted successfully!')
        return redirect(reverse('dashboard') + '#trainings-section')
    return render(request, 'confirm_delete.html', {'object': training, 'type': 'Training'})

# --- EDUCATION CRUD ---
@user_passes_test(is_admin)
def education_create(request):
    form = EducationForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Education added successfully!')
        return redirect(reverse('dashboard') + '#education-section')
    return render(request, 'generic_form.html', {'form': form, 'title': 'Add Education'})

@user_passes_test(is_admin)
def education_update(request, pk):
    education = get_object_or_404(Education, pk=pk)
    form = EducationForm(request.POST or None, instance=education)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Education updated successfully!')
        return redirect(reverse('dashboard') + '#education-section')
    return render(request, 'generic_form.html', {'form': form, 'title': 'Edit Education'})

@user_passes_test(is_admin)
def education_delete(request, pk):
    education = get_object_or_404(Education, pk=pk)
    if request.method == 'POST':
        education.delete()
        messages.success(request, 'Education deleted successfully!')
        return redirect(reverse('dashboard') + '#education-section')
    return render(request, 'confirm_delete.html', {'object': education, 'type': 'Education'})

# --- CERTIFICATION CRUD ---
@user_passes_test(is_admin)
def certification_create(request):
    form = CertificationForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Certification added successfully!')
        return redirect(reverse('dashboard') + '#certifications-section')
    return render(request, 'generic_form.html', {'form': form, 'title': 'Add Certification'})

@user_passes_test(is_admin)
def certification_update(request, pk):
    certification = get_object_or_404(Certification, pk=pk)
    form = CertificationForm(request.POST or None, instance=certification)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Certification updated successfully!')
        return redirect(reverse('dashboard') + '#certifications-section')
    return render(request, 'generic_form.html', {'form': form, 'title': 'Edit Certification'})

@user_passes_test(is_admin)
def certification_delete(request, pk):
    certification = get_object_or_404(Certification, pk=pk)
    if request.method == 'POST':
        certification.delete()
        messages.success(request, 'Certification deleted successfully!')
        return redirect(reverse('dashboard') + '#certifications-section')
    return render(request, 'confirm_delete.html', {'object': certification, 'type': 'Certification'})

# --- ACHIEVEMENT CRUD ---
@user_passes_test(is_admin)
def achievement_create(request):
    form = AchievementForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Achievement added successfully!')
        return redirect(reverse('dashboard') + '#achievements-section')
    return render(request, 'generic_form.html', {'form': form, 'title': 'Add Achievement'})

@user_passes_test(is_admin)
def achievement_update(request, pk):
    achievement = get_object_or_404(Achievement, pk=pk)
    form = AchievementForm(request.POST or None, instance=achievement)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Achievement updated successfully!')
        return redirect(reverse('dashboard') + '#achievements-section')
    return render(request, 'generic_form.html', {'form': form, 'title': 'Edit Achievement'})

@user_passes_test(is_admin)
def achievement_delete(request, pk):
    achievement = get_object_or_404(Achievement, pk=pk)
    if request.method == 'POST':
        achievement.delete()
        messages.success(request, 'Achievement deleted successfully!')
        return redirect(reverse('dashboard') + '#achievements-section')
    return render(request, 'confirm_delete.html', {'object': achievement, 'type': 'Achievement'})

@user_passes_test(is_admin)
def contact_delete(request, pk):
    msg = get_object_or_404(ContactMessage, pk=pk)
    if request.method == 'POST':
        msg.delete()
        messages.success(request, 'Message deleted successfully!')
        return redirect(reverse('dashboard') + '#messages-section')
    return render(request, 'confirm_delete.html', {'object': msg, 'type': 'Message'})

# Public page
def internships(request):
    internships_list = Internship.objects.all().order_by('-date')
    training_list = Training.objects.all().order_by('-date')
    
    experience_list = []
    for item in internships_list:
        experience_list.append({
            'group_by': item.company,
            'title': item.role,
            'duration': item.duration,
            'description': item.description,
            'tech_list': item.tech_list,
            'certificate_link': item.certificate_link,
            'offer_letter_link': item.offer_letter_link,
            'type': 'Internship'
        })
    for item in training_list:
        experience_list.append({
            'group_by': item.organization,
            'title': item.course,
            'duration': item.duration,
            'description': item.description,
            'tech_list': item.tech_list,
            'certificate_link': item.certificate_link,
            'type': 'Training'
        })
    
    grouped_experience = {}
    for item in experience_list:
        group = item['group_by']
        if group not in grouped_experience:
            grouped_experience[group] = []
        grouped_experience[group].append(item)
        
    return render(request, 'internships.html', {'grouped_experience': grouped_experience})

def education(request):
    education_list = Education.objects.all().order_by('-date')
    return render(request, 'education.html', {'education_list': education_list})

def certifications(request):
    raw_certs = Certification.objects.all().order_by('-date')
    grouped_certs = {}
    for cert in raw_certs:
        issuer = cert.issuer
        if issuer not in grouped_certs:
            grouped_certs[issuer] = []
        grouped_certs[issuer].append(cert)
    return render(request, 'certifications.html', {'grouped_certs': grouped_certs})

def achievements(request):
    achievement_list = Achievement.objects.all().order_by('-date')
    return render(request, 'achievements.html', {'achievement_list': achievement_list})

def skills(request):
    raw_skills = Skill.objects.all().order_by('category', '-date')
    
    category_order = ['Programming Languages', 'Frameworks', 'Databases', 'Tools/Platforms', 'Soft Skills', 'Other']
    grouped_skills = {cat: [] for cat in category_order}
    
    for skill in raw_skills:
        cat = skill.category
        if cat in grouped_skills:
            grouped_skills[cat].append(skill)
        else:
            grouped_skills['Other'].append(skill)
            
    # Filter out empty categories
    grouped_skills = {k: v for k, v in grouped_skills.items() if v}

    return render(request, 'skills.html', {'grouped_skills': grouped_skills})

def user_logout(request):
    logout(request)
    messages.info(request, "You have been logged out.")
    return redirect('home')
