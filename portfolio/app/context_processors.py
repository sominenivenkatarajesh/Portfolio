import os

def global_context(request):
    return {
        'name': os.environ.get('NAME', 'Somineni Venkata Rajesh'),
        'role': os.environ.get('ROLE', '3rd Year Student & Aspiring Developer'),
        'email': os.environ.get('EMAIL', 'venkatrajeshnaidu@gmail.com'),
        'phone': os.environ.get('PHONE', '+91 6302759116'),
        'address': os.environ.get('ADDRESS', 'Visakhapatnam, Andhra Pradesh, India'),
        'github': os.environ.get('GITHUB', 'https://github.com/sominenivenkatarajesh'),
        'linkedin': os.environ.get('LINKEDIN', 'https://www.linkedin.com/in/somineni-venkat-rajesh'),
    }
