/**
 * deep-link.js
 * Adds a "copy link" button to every top-level accordion topic.
 * Navigating to page.html#topic-id will auto-open that accordion.
 */

(function () {
  'use strict';

  function init() {

    /* ── 1. Collect only top-level <details> (not nested ones) ── */
    const topLevelDetails = Array.from(
      document.querySelectorAll('.accordion-item > details')
    );

    /* ── 2. Assign stable IDs based on summary text ── */
    topLevelDetails.forEach((details) => {
      if (!details.id) {
        const summary = details.querySelector(':scope > summary');
        if (!summary) return;

        // Build a URL-safe slug from the visible text (strip emoji & punctuation)
        const raw = summary.textContent.trim();
        const slug = raw
          .replace(/[^\p{L}\p{N}\s]/gu, '')  // strip non-letter/non-digit
          .trim()
          .replace(/\s+/g, '-')
          .toLowerCase()
          .slice(0, 60);                      // cap length

        // Make sure it's unique on this page
        let id = slug || 'topic';
        let counter = 2;
        while (document.getElementById(id)) {
          id = `${slug}-${counter++}`;
        }
        details.id = id;
      }
    });

    /* ── 3. Inject copy-link button into each top-level summary ── */
    topLevelDetails.forEach((details) => {
      const summary = details.querySelector(':scope > summary');
      if (!summary) return;

      const btn = document.createElement('button');
      btn.className = 'copy-link-btn';
      btn.title = 'Copy link to this topic';
      btn.setAttribute('aria-label', 'Copy link to this topic');
      btn.innerHTML = '🔗';

      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // don't toggle the accordion
        e.preventDefault();

        const url = `${location.origin}${location.pathname}#${details.id}`;

        const doCopy = () => {
          // Fallback for file:// protocol or older browsers
          const ta = document.createElement('textarea');
          ta.value = url;
          ta.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast('Link copied! 🎉');
        };

        if (navigator.clipboard && location.protocol !== 'file:') {
          navigator.clipboard.writeText(url).then(() => {
            showToast('Link copied! 🎉');
          }).catch(doCopy);
        } else {
          doCopy();
        }
      });

      summary.appendChild(btn);
    });

    /* ── 4. On load: if there's a hash, open that accordion ── */
    function openFromHash() {
      const hash = location.hash.slice(1);
      if (!hash) return;

      const target = document.getElementById(hash);
      if (!target || target.tagName.toLowerCase() !== 'details') return;

      target.open = true;
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
  }

  /* ── 5. Toast notification ── */
  function showToast(message) {
    let toast = document.getElementById('deep-link-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'deep-link-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('visible'), 2200);
  }

  // Run after DOM is ready regardless of where the script tag is placed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
