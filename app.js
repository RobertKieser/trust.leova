// Leova Trust Portal - Content Management
class TrustPortal {
  constructor() {
    this.currentTab = 'overview';
    this.data = null;
    this.init();
  }

  async init() {
    await this.loadOverviewData();
    this.renderHeader();
    this.renderOverview();
    this.setupTabNavigation();
    this.setupButtons();
  }

  async loadOverviewData() {
    try {
      const response = await fetch('data/overview.json');
      this.data = await response.json();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  renderHeader() {
    if (!this.data) return;

    document.getElementById('portal-title').textContent = this.data.portal_title;
    document.getElementById('email-text').textContent = this.data.contact_email;
    document.getElementById('contact-email').href = `mailto:${this.data.contact_email}`;
    
    // Handle description as array of paragraphs
    const descriptionHTML = Array.isArray(this.data.description)
      ? this.data.description.map(para => `<p>${para}</p>`).join('')
      : `<p>${this.data.description}</p>`;
    document.getElementById('portal-description').innerHTML = descriptionHTML;
  }

  renderOverview() {
    if (!this.data) return;

    const container = document.getElementById('overview-content');
    container.innerHTML = '';

    this.data.overview_sections.forEach(section => {
      switch (section.type) {
        case 'certifications':
          container.appendChild(this.renderCertifications(section));
          break;
        case 'trusted_by':
          container.appendChild(this.renderTrustedBy(section));
          break;
        case 'documentation_preview':
          container.appendChild(this.renderDocumentationPreview(section));
          break;
        case 'controls_preview':
          container.appendChild(this.renderControlsPreview(section));
          break;
        case 'subprocessors_preview':
          container.appendChild(this.renderSubprocessorsPreview(section));
          break;
      }
    });
  }

  renderCertifications(section) {
    const sectionEl = document.createElement('section');
    sectionEl.className = 'content-section';
    sectionEl.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">${section.title}</h2>
      </div>
      <div class="section-card">
        <div class="certifications-grid">
          ${this.data.certifications.map(cert => `
            <div class="cert-badge" title="${cert.description}">
              <div style="font-size: 3rem;">${cert.icon}</div>
              <div style="font-size: 0.75rem; text-align: center; margin-top: 0.5rem; color: var(--color-content-secondary);">${cert.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    return sectionEl;
  }

  renderTrustedBy(section) {
    const sectionEl = document.createElement('section');
    sectionEl.className = 'content-section';
    sectionEl.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">${section.title}</h2>
      </div>
      <div class="section-card">
        <div class="trusted-logos">
          ${this.data.trusted_by.map(company => `
            <div class="logo-item">
              <div class="logo-img-container">
                <div class="logo-img" style="background: linear-gradient(135deg, var(--color-blue-bright), var(--color-teal)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.25rem;">
                  ${company.name.charAt(0)}
                </div>
              </div>
              <div class="logo-name">${company.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    return sectionEl;
  }

  renderDocumentationPreview(section) {
    const sectionEl = document.createElement('section');
    sectionEl.className = 'content-section';
    sectionEl.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">${section.title}</h2>
        <a href="#" class="tab-link" data-tab="documentation" style="color: var(--color-content-secondary); text-decoration: none; font-size: 0.875rem;">${section.link_text} →</a>
      </div>
      <div class="section-card">
        ${section.items.map((doc, index) => `
          <div class="card" style="${index < section.items.length - 1 ? 'border-bottom: 1px solid var(--color-border-subtle);' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="font-size: 1.25rem;">${doc.icon}</span>
                <span style="font-family: var(--font-primary); font-weight: 500; font-size: 0.875rem;">${doc.title}</span>
              </div>
              <button class="btn ${doc.access === 'public' ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.75rem; padding: 0.375rem 0.75rem;">
                ${doc.access === 'public' ? '📄 View' : '🔒 Request access'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    return sectionEl;
  }

  renderControlsPreview(section) {
    const sectionEl = document.createElement('section');
    sectionEl.className = 'content-section';
    sectionEl.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">${section.title}</h2>
        <a href="#" class="tab-link" data-tab="controls" style="color: var(--color-content-secondary); text-decoration: none; font-size: 0.875rem;">${section.link_text} →</a>
      </div>
      <div class="section-card">
        ${section.items.map((control, index) => `
          <div class="card" style="${index < section.items.length - 1 ? 'border-bottom: 1px solid var(--color-border-subtle);' : ''}">
            <div class="card-title">
              ${control.title}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </div>
            <div class="card-description">${control.description}</div>
            <div class="features-grid">
              ${control.features.map(feature => `
                <div class="feature-item">
                  <div class="feature-check"></div>
                  <div class="feature-text">${feature}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    return sectionEl;
  }

  renderSubprocessorsPreview(section) {
    const sectionEl = document.createElement('section');
    sectionEl.className = 'content-section';
    sectionEl.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">${section.title}</h2>
        <a href="#" class="tab-link" data-tab="subprocessors" style="color: var(--color-content-secondary); text-decoration: none; font-size: 0.875rem;">${section.link_text} →</a>
      </div>
      <div class="section-card">
        ${section.items.map((sub, index) => `
          <div style="padding: var(--spacing-md); ${index < section.items.length - 1 ? 'border-bottom: 1px solid var(--color-border-subtle);' : ''}">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 32px; height: 32px; background: linear-gradient(135deg, var(--color-blue-bright), var(--color-teal)); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0;">
                ${sub.name.charAt(0)}
              </div>
              <div style="flex: 1;">
                <div style="font-family: var(--font-primary); font-weight: 500; font-size: 0.875rem; color: var(--color-content-primary);">${sub.name}</div>
                <div style="font-size: 0.75rem; color: var(--color-content-tertiary);">${sub.service}</div>
              </div>
              <div style="font-size: 0.875rem; color: var(--color-content-tertiary); flex-shrink: 0;">${sub.location}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    return sectionEl;
  }

  setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${targetTab}-content`).classList.add('active');
        
        this.currentTab = targetTab;
      });
    });

    // Handle tab links in content
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-link') || e.target.closest('.tab-link')) {
        e.preventDefault();
        const link = e.target.classList.contains('tab-link') ? e.target : e.target.closest('.tab-link');
        const targetTab = link.dataset.tab;
        const tabButton = document.querySelector(`.tab[data-tab="${targetTab}"]`);
        if (tabButton) {
          tabButton.click();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  }

  setupButtons() {
    document.getElementById('subscribe-btn').addEventListener('click', () => {
      alert('Subscribe functionality would open a modal or form here');
    });

    document.getElementById('access-btn').addEventListener('click', () => {
      alert('Request access functionality would open a form here');
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TrustPortal();
});
