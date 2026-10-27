/**
 * FEATURE: INTERSTELLAR TRANSMISSION STATION & CONTACT CONTROLLER
 * Integrates Web3Forms for direct-to-inbox delivery with instant feedback
 * and seamless fallback options.
 */

class ContactTransmission {
  constructor() {
    this.form = document.getElementById('transmission-form');
    this.feedback = document.getElementById('form-feedback');
    this.copyBtns = document.querySelectorAll('.copy-trigger');
    this.submitBtn = document.getElementById('btn-submit-message');

    this.init();
  }

  init() {
    this.bindCopyButtons();
    this.bindForm();
  }

  bindCopyButtons() {
    this.copyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy');
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span>Copied! ✦</span>';
          btn.style.background = 'var(--solar-gold)';
          btn.style.color = '#ffffff';

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy', err);
        });
      });
    });
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  bindForm() {
    if (!this.form) return;

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      const accessKeyInput = document.getElementById('web3forms-key');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : 'Software Opportunity / Portfolio Contact';
      const message = messageInput ? messageInput.value.trim() : '';
      const accessKey = accessKeyInput ? accessKeyInput.value.trim() : '';

      // Validation
      if (!name) {
        this.showFeedback('error', 'Please enter your name.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!email || !this.isValidEmail(email)) {
        this.showFeedback('error', 'Please enter a valid email address so Mudrika can reply to you.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!message || message.length < 5) {
        this.showFeedback('error', 'Please write a message (at least 5 characters).');
        if (messageInput) messageInput.focus();
        return;
      }

      // Check if user has added their live Web3Forms access key
      const isPlaceholder = !accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE';

      if (isPlaceholder) {
        // Fallback flow: opens mail client with exact message pre-filled
        this.showFeedback('notice', `
          <strong>✦ Launching Your Email App...</strong><br>
          Opening your default email client with your message drafted to <strong>mudrikasharma2009@gmail.com</strong>.<br>
          <span style="font-size: 0.78rem; opacity: 0.85; margin-top: 4px; display: inline-block;">
            💡 Note for Mudrika: Add your free Web3Forms key in <code>index.html</code> to enable 1-click background delivery without opening any app!
          </span>
        `);

        const mailtoUrl = `mailto:mudrikasharma2009@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Hi Mudrika,\n\n${message}\n\n---\nSender Name: ${name}\nSender Email: ${email}`)}`;

        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 900);

        return;
      }

      // Live Web3Forms Submission via Fetch API
      const originalBtnHTML = this.submitBtn ? this.submitBtn.innerHTML : 'Send Message';
      if (this.submitBtn) {
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = `<span>Sending Message...</span>`;
      }

      const formData = new FormData(this.form);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.status === 200 && data.success) {
          this.showFeedback('success', `
            <strong>✦ Message Delivered to Mudrika Sharma!</strong><br>
            Thank you, <strong>${name}</strong>. Your message was successfully dispatched directly to <strong>mudrikasharma2009@gmail.com</strong>. She will get back to you at <em>${email}</em> shortly!
          `);
          this.form.reset();
        } else {
          throw new Error(data.message || 'Transmission failed.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        this.showFeedback('error', `
          <strong>Could not send in background:</strong> ${error.message || 'Network error'}<br>
          You can reach Mudrika directly at <a href="mailto:mudrikasharma2009@gmail.com" style="text-decoration: underline; font-weight: bold; color: inherit;">mudrikasharma2009@gmail.com</a>.
        `);
      } finally {
        if (this.submitBtn) {
          this.submitBtn.disabled = false;
          this.submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  }

  showFeedback(type, htmlContent) {
    if (!this.feedback) return;
    this.feedback.className = `form-feedback ${type}`;
    this.feedback.innerHTML = htmlContent;
    this.feedback.style.display = 'block';

    // Smoothly scroll feedback into view if needed
    this.feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

window.ContactTransmission = ContactTransmission;
