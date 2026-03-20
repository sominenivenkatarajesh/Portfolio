document.addEventListener('DOMContentLoaded', () => {
    // 3D Background - Remove lines as requested
    // (If user wants a different 3D background later, it can be added here)

    // 3D Tilt Effect for cards
    const tiltElements = document.querySelectorAll('.card, .ach-card, .exp-card, .stat-card, .hero-image, .ach-icon-box');
    if (window.VanillaTilt) {
        VanillaTilt.init(Array.from(tiltElements), {
            max: 10,
            speed: 500,
            glare: true,
            "max-glare": 0.3,
            gyroscope: true,
            perspective: 1000,
            scale: 1.02
        });
    }

    // Custom 3D Cursor Effect
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorBlur = document.createElement('div');
        cursorBlur.className = 'custom-cursor-blur';
        document.body.appendChild(cursorBlur);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorBlur.style.left = e.clientX + 'px';
            cursorBlur.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Add hover effect for links
        const links = document.querySelectorAll('a, button, .exp-pill, .logo, .socials a');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorBlur.classList.add('cursor-hover');
            });
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorBlur.classList.remove('cursor-hover');
            });
        });
    } else {
        // Show default cursor on touch devices
        document.body.style.cursor = 'default';
        const style = document.createElement('style');
        style.innerHTML = '* { cursor: auto !important; }';
        document.head.appendChild(style);
    }
});
