import os
import django

# Setup django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from app.models import Certification, Achievement, Education

# Clear existing entries properly before seeding or just add
Certification.objects.all().delete()
Achievement.objects.all().delete()
Education.objects.all().delete()

# Certifications
c1 = Certification(title="SEBI Investor Awareness", issuer="SEBI", date="Nov' 25", link="")
c1.save()

c2 = Certification(title="ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM", issuer="Infosys Springboard", date="Aug' 25", link="")
c2.save()

c3 = Certification(title="Cloud Computing", issuer="NPTEL", date="Apr' 25", link="")
c3.save()

c4 = Certification(title="Salesforce Certified AI Associate", issuer="Trailhead", date="Dec' 24", link="")
c4.save()

# Achievements
a1 = Achievement(title="Level 6 Gold Badge in Java", description="Earned Level 6 Gold Badge in Java Hacker Rank", date="Oct' 25")
a1.save()

a2 = Achievement(title="Campus Ambassador for Kitech", description="Selected as Campus Ambassador for Kitech, promoting the brand on campus and assisting in outreach and awareness activities.", date="Sep' 24")
a2.save()

a3 = Achievement(title="Shortlisted to Level-2 in code-a-haunt hackathon", description="Got shortlisted to Level-2 in code-a-haunt hackathon from a pool of 2,000+", date="Feb' 24")
a3.save()

# Education
e1 = Education(
    institution="Lovely Professional University",
    degree="Bachelor of Technology - Computer Science and Engineering; CGPA: 6.2",
    duration="Aug' 23 - Present",
    description="Punjab, India"
)
e1.save()

e2 = Education(
    institution="Narayana Junior Collage",
    degree="Intermediate; Percentage: 87",
    duration="Apr' 21 - Mar' 23",
    description="Tirupathi, Andhra pradesh"
)
e2.save()

e3 = Education(
    institution="Sri Chaitanaya School",
    degree="Matriculation; Percentage: 95",
    duration="Apr' 20 - Mar' 21",
    description="Tirupathi, Andhra pradesh"
)
e3.save()

print("Data populated successfully.")
