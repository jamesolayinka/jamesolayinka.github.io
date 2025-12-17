# James Olayinka - Personal Website

A professional, research-oriented personal website for a Quantitative Finance and Big Data professional. Built with a clean, "techie" aesthetic, featuring a custom dark/light mode, LaTeX-inspired typography, and interactive elements.

## Features

- **Minimalist Design**: Clean black-and-white aesthetic with `JetBrains Mono` for a coding-centric feel.
- **Dark/Light Mode**: System-aware theme toggling with persistence.
- **Interactive Resume**: Accordion-style sections for a compact yet detailed view.
- **Project Showcase**: "Works" page with pill-shaped tags and hover effects.
- **Blog Ready**: Integrated KaTeX for rendering math equations in blog posts.
- **Scheduler**: Built-in modal to schedule weekend catch-ups (Saturdays 7-9pm BST), generating Google Calendar invites.

## Tech Stack

- **HTML5**: Semantic structure.
- **CSS3**: Custom variables, Flexbox/Grid, and animations.
- **JavaScript**: Vanilla JS for theme logic and scheduler.
- **Fonts**: `JetBrains Mono` (Code), `Inter` (UI), `Merriweather` (Body).
- **Icons**: SVG icons for social links.

## Setup & Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/jamesolayinka/personal-website.git
    cd personal-website
    ```

2.  **Run locally**:
    You can use any static file server. For example, with Python:
    ```bash
    python3 -m http.server
    ```
    Then open `http://localhost:8000` in your browser.

    Or with VS Code Live Server:
    - Install the "Live Server" extension.
    - Right-click `index.html` -> "Open with Live Server".

## Deployment

This site is ready to be deployed on **GitHub Pages**.

1.  Push this repository to GitHub.
2.  Go to **Settings** > **Pages**.
3.  Under **Source**, select `main` branch and `/` (root) folder.
4.  Click **Save**. Your site will be live at `https://jamesolayinka.github.io/personal-website/`.

## License

[MIT](LICENSE) © 2025 James Olayinka
