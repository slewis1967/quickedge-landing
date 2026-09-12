'use strict';

// Scroll-triggered reveal
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);
document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

// Hero generative canvas (lightweight "AI video" showpiece)
(function heroMotion() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let width, height, dpr;
  let t = 0;
  const nodes = [];
  const NODE_COUNT = 52;

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  function initNodes() {
    nodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(1, 3.2),
        vx: rand(-0.4, 0.4),
        vy: rand(-0.4, 0.4),
      });
    }
  }
  initNodes();

  function step() {
    ctx.clearRect(0, 0, width, height);
    // softly tinted backdrop
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, 'rgba(10,77,240,0.06)');
    grad.addColorStop(1, 'rgba(13,178,107,0.06)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // update node positions
    for (const n of nodes) {
      n.x += n.vx + Math.sin((n.y + t) * 0.002) * 0.15;
      n.y += n.vy + Math.cos((n.x - t) * 0.002) * 0.15;
      if (n.x < -20) n.x = width + 20;
      if (n.x > width + 20) n.x = -20;
      if (n.y < -20) n.y = height + 20;
      if (n.y > height + 20) n.y = -20;
    }

    // draw connections
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          const alpha = Math.max(0, 1 - dist / 140) * 0.35;
          ctx.strokeStyle = `rgba(10,77,240,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // draw nodes
    for (const n of nodes) {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(10,77,240,0.7)';
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    t += 1;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();

// Assistant demo (scripted)
(function assistantDemo() {
  const feed = document.getElementById('assistant-feed');
  const form = document.getElementById('assistant-form');
  const input = document.getElementById('assistant-input');
  if (!feed || !form || !input) return;

  function post(role, text) {
    const div = document.createElement('div');
    div.className = 'assistant-msg';
    div.dataset.role = role;
    div.textContent = text;
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  function reflect(briefRaw) {
    const brief = briefRaw.trim().toLowerCase();
    if (!brief) return;

    post('user', `You: ${briefRaw}`);

    // Simple routing without inventing clients or numbers
    if (brief.includes('website')) {
      post(
        'ai',
        [
          'Next step: 30‑min call to scope your site.',
          'Deliverable: a modern 5–7 page site you own.',
          'Fees: AU$3,500 once + AU$99/mo care (GST incl.).',
          'CTA: call +61 7 4800 3016 or enquire by email.',
        ].join(' ')
      );
    } else if (
      brief.includes('ops') ||
      brief.includes('operations') ||
      brief.includes('inbox') ||
      brief.includes('lead') ||
      brief.includes('monday')
    ) {
      post(
        'ai',
        [
          'Next step: map your lead/inbox/metrics flows.',
          'Fees: Setup AU$2,990; Setup + Nurture AU$5,490; Retainer AU$1,490/mo (GST excl.).',
          'HITL: people still Approve; paper trail; gate ON first 2 weeks.',
        ].join(' ')
      );
    } else if (brief.includes('video')) {
      post(
        'ai',
        [
          'Next step: share a 1–2 sentence concept and target channel.',
          'Output: 15–45s AI‑assisted cut for ads, landing, or socials.',
          'Fees: quoted per brief.',
        ].join(' ')
      );
    } else if (brief.includes('workshop')) {
      post('ai', 'SEQ workshop: AU$990. We book a slot and prepare an agenda.');
    } else if (brief.includes('phone') || brief.includes('sms')) {
      post('ai', 'Phone & SMS are quoted per brief. We set up an Australian number and compliant flows.');
    } else {
      post(
        'ai',
        'We can help with websites, AI ops, AI video, phone/SMS, or a SEQ workshop. Mention one to see the scoped next step.'
      );
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    reflect(input.value);
    input.value = '';
    input.focus();
  });

  document.querySelectorAll('.pill[data-brief]').forEach((btn) => {
    btn.addEventListener('click', () => {
      reflect(btn.dataset.brief || '');
    });
  });

  // Seed one message
  post('ai', 'Tell us what you need in one line (e.g., “website”, “ops”, “video”).');
})();
