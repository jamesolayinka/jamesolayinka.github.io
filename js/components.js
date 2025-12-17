export function loadComponents() {
    const headerHTML = `
        <div class="site-title"><a href="index.html" style="color: inherit; text-decoration: none;">James Olayinka</a></div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="resume.html">Resume</a></li>
                <li><a href="works.html">Works</a></li>
                <li><a href="blog.html">Blog</a></li>
            </ul>
        </nav>
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Dark Mode">Dark Mode</button>
    `;

    const footerHTML = `
        <p>&copy; ${new Date().getFullYear()} James Olayinka. All rights reserved.</p>
    `;

    const headerEl = document.querySelector('header');
    const footerEl = document.querySelector('footer');

    if (headerEl) headerEl.innerHTML = headerHTML;
    if (footerEl) footerEl.innerHTML = footerHTML;

    // Highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Re-attach theme toggle listener since we replaced the button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // We need to re-import or expose the toggle function, 
        // but for now let's just dispatch an event or rely on script.js to attach listeners AFTER components load.
        // Better yet, let's just let script.js handle the attachment.
    }
}
