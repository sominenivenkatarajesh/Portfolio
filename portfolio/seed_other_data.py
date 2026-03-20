import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from app.models import Skill, Internship, Project

# Clear existing entries
Skill.objects.all().delete()
Internship.objects.all().delete()
Project.objects.all().delete()

# Skills
skills_list = [
    "JavaScript", "Java", "PHP", "DSA", "C++", 
    "HTML", "CSS", "NodeJS", "React", "Express.js", "Django",
    "MySQL", "MongoDB", "Salesforce", "PostgreSQL",
    "Problem-Solving", "Team Work", "Communication", "Quick Learning", "Adaptability"
]

for order, skill_name in enumerate(skills_list):
    Skill.objects.create(name=skill_name, order=order)

# Internships
Internship.objects.create(
    company="Future Interns",
    role="Full-Stack Web-Development Intern",
    duration="Nov '25 - Dec '25",
    description="• Developed a full-stack mini e-commerce platform using the MERN stack, featuring dynamic product filtering, complex shopping cart logic, and a secure checkout simulation.\n• Designed and deployed a high-performance personal portfolio website using Tailwind CSS and React.js, incorporating SEO best practices and interactive UI components.\n• Implemented global state management using Redux/useContext to ensure seamless data synchronization.",
    order=1
)

Internship.objects.create(
    company="Internveda",
    role="Full-Stack Web-Development Intern",
    duration="Feb '24 - Mar '24",
    description="• Engineered a dynamic personal portfolio website using Vanilla JavaScript, HTML5, and CSS3, featuring a responsive design that ensures optimal viewing across all device types.\n• Implemented interactive UI components and smooth navigation using advanced JavaScript event handling, accessibility.\n• Optimized front-end assets and code structure to achieve high performance scores.",
    order=2
)

# Projects
Project.objects.create(
    title="Employee Management System",
    description="• Engineered a secure Employee Management System with session-based access for 50+ concurrent users, protecting sensitive payroll and credential data.\n• Developed a high-integrity CRUD interface to manage 100+ personnel records, including salary structures, professional designations, and corporate emails.\n• Implemented Role-Based Access Control (RBAC) to maintain 100% confidentiality of employee records, preventing unauthorized access to private data.",
    image_url="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    link="https://github.com/Sominenivenkatarajesh",
    tags="PHP, MySQL, HTML, CSS, JavaScript, Authentication",
    order=1
)

Project.objects.create(
    title="URL Shortener",
    description="• Engineered a high-efficiency URL-shortening system capable of handling 10,000+ links, resulting in sub-millisecond resolution for long-to-short mapping.\n• Implemented malicious URL detection and secure input validation to prevent unsafe link processing, enhancing user security by 95%.\n• Optimized data storage using hash maps to achieve an average lookup time of O(1), increasing system memory efficiency by 30% and preventing link collisions.",
    image_url="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link="https://github.com/Sominenivenkatarajesh",
    tags="PHP, MySQL, HTML, CSS",
    order=2
)

print("Skills, Internships, and Projects populated successfully.")
