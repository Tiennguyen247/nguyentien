  /* ─ Theme toggle ─ */
  const toggle = document.getElementById('themeToggle');
  const html   = document.documentElement;

  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ─ Hamburger ─ */
  const ham   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  ham.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );

  /* ─ Smooth scroll ─ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ─ Scroll reveal ─ */
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i * 0.06) + 's';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─ Contact form ─
document.getElementById('sendMsgBtn').addEventListener('click', async () => {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-msg').value.trim();

  if (!email || !message) {
    alert('Please fill in your email and message.');
    return;
  }

  const btn = document.getElementById('sendMsgBtn');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xrealjyb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      btn.textContent = 'Sent! ✓';
      document.getElementById('cf-name').value = '';
      document.getElementById('cf-email').value = '';
      document.getElementById('cf-msg').value = '';
    } else {
      btn.textContent = 'Failed — Try Again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Error — Try Again';
    btn.disabled = false;
  }
});