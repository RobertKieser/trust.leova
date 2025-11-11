# Leova Trust Center

A professional trust portal for Leova clinical trial software, showcasing security certifications, compliance standards, and data protection measures.

## Features

- **Responsive Design**: Mobile-friendly layout that works across all devices
- **Custom Branding**: Leova color palette and typography (Maven Pro, Raleway)
- **Tab Navigation**: Overview, Documentation, Controls, Subprocessors, and Updates sections
- **Security Focused**: Highlights certifications, controls, and compliance standards
- **Clean Code**: Self-contained HTML with embedded CSS and minimal JavaScript

## Color Palette

- Navy: `#0d123d`
- Dark Blue: `#1c305e`
- Royal Blue: `#030a8c`
- Bright Blue: `#127dc2`
- Teal: `#0aa6b5`
- Mint: `#00ebb2`

## Typography

- Primary Font: Maven Pro
- Heading Font: Raleway (Light 300 / Bold 700)

## Deployment to GitHub Pages

### Option 1: Quick Deploy

1. Create a new repository on GitHub (e.g., `leova-trust-center`)
2. Clone the repository locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/leova-trust-center.git
   cd leova-trust-center
   ```
3. Copy the `index.html` file to the repository root
4. Commit and push:
   ```bash
   git add index.html
   git commit -m "Initial trust center deployment"
   git push origin main
   ```
5. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `(root)`
   - Save

Your site will be available at: `https://YOUR_USERNAME.github.io/leova-trust-center/`

### Option 2: Custom Domain

1. Follow steps 1-5 above
2. In your repository, create a file named `CNAME` with your custom domain:
   ```
   trust.leova.com
   ```
3. Configure DNS records with your domain provider:
   - Add a CNAME record pointing `trust` to `YOUR_USERNAME.github.io`
4. In GitHub Settings → Pages, enter your custom domain and save
5. Enable "Enforce HTTPS"

## Customization Guide

### Updating Content

#### Certifications
Edit the certification grid in the Overview section (around line 380):
```html
<div class="cert-item">
    <div class="cert-icon">🔒</div>
    <div class="cert-name">Your Certification</div>
</div>
```

#### Security Controls
Add new controls in both Overview and Controls tabs (around lines 400 and 700):
```html
<div class="control-item">
    <div class="control-header">Control Name</div>
    <div class="control-description">Description here</div>
    <div class="control-points">
        <div class="control-point">
            <div class="control-check"></div>
            <span>Control point description</span>
        </div>
    </div>
</div>
```

#### Subprocessors
Edit the subprocessor list (around line 550 and 850):
```html
<div class="subprocessor-item">
    <div class="subprocessor-logo"></div>
    <div class="subprocessor-info">
        <div class="subprocessor-name">Company Name</div>
        <div class="subprocessor-purpose">Purpose</div>
    </div>
    <div class="subprocessor-location">Location</div>
</div>
```

#### Updates
Add news items to the Updates section (around line 620 and 900):
```html
<div class="update-item">
    <div class="update-date">Date</div>
    <div class="update-title">Title</div>
    <div class="update-content">
        <p>Content here</p>
    </div>
    <a href="#" class="update-link">Link text →</a>
</div>
```

### Styling Changes

All CSS is contained in the `<style>` section (lines 20-500). Key variables are defined at the top:

```css
:root {
    /* Modify colors */
    --leova-navy: #0d123d;
    --leova-bright-blue: #127dc2;
    /* etc. */
}
```

### Adding Logo

Replace the text-based logo (around line 360) with an image:
```html
<div class="logo">
    <img src="logo.png" alt="Leova" style="width: 48px; height: 48px;">
</div>
```

## File Structure

```
leova-trust-center/
├── index.html          # Main trust portal page
├── README.md           # This file
└── CNAME              # (Optional) Custom domain configuration
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **File Size**: ~40KB (single HTML file)
- **Load Time**: < 1 second on standard connections
- **Dependencies**: Only Google Fonts (Maven Pro, Raleway)

## Security Considerations

- No external JavaScript libraries
- Minimal external dependencies (fonts only)
- No cookies or tracking
- Static content only

## Future Enhancements

Consider adding:
- Search functionality for documentation
- Document access request forms
- Newsletter subscription integration
- Analytics (privacy-respecting)
- Downloadable certificates (PDF)

## License

Proprietary - Leova Clinical Trial Software

## Contact

For questions about this trust center, contact: security@leova.com
