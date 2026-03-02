// Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .stack-item, .project-card, .exp-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      ring.style.width = '60px';
      ring.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      ring.style.width = '40px';
      ring.style.height = '40px';
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  // Animate stats
  function animateNumber(el, target, suffix = '') {
    let start = 0;
    const inc = target / 60;
    const update = () => {
      start += inc;
      if (start >= target) {
        start = target;
      } else {
        requestAnimationFrame(update);
      }
      const display = Number.isInteger(target) ? Math.floor(start) : start.toFixed(2);
      el.querySelector('.accent').textContent = display;
    };
    update();
  }

  // Typewriter terminal effect
  const lines = document.querySelectorAll('.terminal-body .t-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.transition = 'opacity 0.3s';
      line.style.opacity = '1';
    }, 1000 + i * 120);
  });

  // Stack level bars animation
  const stackLevels = document.querySelectorAll('.stack-level');
  const stackObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.style.width;
      }
    });
  });
  stackLevels.forEach(el => {
    const target = el.style.width;
    el.style.width = '0';
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => { el.style.width = target; }, 200);
        obs.disconnect();
      }
    });
    obs.observe(el);
  });