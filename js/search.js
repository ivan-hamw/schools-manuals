// --- Unified Client-side Search for IT Manuals ---
// Static search index (works with file:// protocol - no fetch needed)

// ── Utility functions ──────────────────────────────────────────────────────

function generateSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // strip emoji & non-alphanumeric
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

function getSnippet(content, queryTerms) {
    if (!content) return '';
    const lower = content.toLowerCase();
    let firstIdx = -1;
    let firstLen = 0;
    for (const term of queryTerms) {
        const idx = lower.indexOf(term);
        if (idx !== -1 && (firstIdx === -1 || idx < firstIdx)) {
            firstIdx = idx;
            firstLen = term.length;
        }
    }
    if (firstIdx === -1) return content.length > 110 ? content.substring(0, 107) + '...' : content;

    const start = Math.max(0, firstIdx - 40);
    const end = Math.min(content.length, firstIdx + firstLen + 70);
    let snippet = content.substring(start, end);

    if (start > 0) {
        const sp = snippet.indexOf(' ');
        snippet = '...' + (sp !== -1 && sp < 15 ? snippet.substring(sp + 1) : snippet);
    }
    if (end < content.length) {
        const sp = snippet.lastIndexOf(' ');
        snippet = (sp !== -1 && sp > snippet.length - 15 ? snippet.substring(0, sp) : snippet) + '...';
    }
    return snippet;
}

function highlightText(text, queryTerms) {
    if (!text || !queryTerms.length) return text;
    const escaped = queryTerms
        .map(t => t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);
    if (!escaped.length) return text;
    const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// ── Search logic ───────────────────────────────────────────────────────────

function doSearch(query) {
    if (!query) return [];
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];

    const results = [];
    SEARCH_INDEX.forEach(item => {
        let score = 0;
        let allMatch = true;
        const titleLower = item.title.toLowerCase();
        const contentLower = item.content.toLowerCase();

        terms.forEach(term => {
            const inTitle = titleLower.indexOf(term);
            const inContent = contentLower.indexOf(term);
            if (inTitle !== -1) {
                score += (inTitle === 0 ? 100 : 50);
            } else if (inContent !== -1) {
                score += 10;
            } else {
                allMatch = false;
            }
        });

        if (allMatch) {
            results.push({ item, score, snippet: getSnippet(item.content, terms) });
        }
    });

    return results.sort((a, b) => b.score - a.score);
}

// ── UI rendering ───────────────────────────────────────────────────────────

let activeResultIndex = -1;

function renderResults(results, queryTerms) {
    const dropdown = document.getElementById('search-results');
    const clearBtn = document.getElementById('search-clear-btn');
    dropdown.innerHTML = '';
    activeResultIndex = -1;

    if (results.length === 0) {
        dropdown.innerHTML = '<div class="search-no-results">No topics found. Try different keywords.</div>';
        dropdown.classList.add('visible');
        clearBtn.style.display = 'flex';
        return;
    }

    // Group by page
    const groups = {};
    results.forEach(res => {
        const key = res.item.pageTitle;
        if (!groups[key]) groups[key] = [];
        groups[key].push(res);
    });

    Object.keys(groups).forEach(pageName => {
        const groupEl = document.createElement('div');
        groupEl.className = 'search-result-group';

        const headerEl = document.createElement('div');
        headerEl.className = 'search-result-group-header';
        headerEl.textContent = pageName;
        groupEl.appendChild(headerEl);

        groups[pageName].forEach(res => {
            const { item, snippet } = res;
            const linkEl = document.createElement('a');
            linkEl.className = 'search-result-item';
            linkEl.href = `${item.pageUrl}#${item.anchor}`;

            const titleEl = document.createElement('div');
            titleEl.className = 'search-result-title';
            titleEl.innerHTML = highlightText(item.title, queryTerms);

            const snippetEl = document.createElement('div');
            snippetEl.className = 'search-result-snippet';
            snippetEl.innerHTML = highlightText(snippet, queryTerms);

            linkEl.appendChild(titleEl);
            if (snippet) linkEl.appendChild(snippetEl);
            groupEl.appendChild(linkEl);
        });

        dropdown.appendChild(groupEl);
    });

    dropdown.classList.add('visible');
    clearBtn.style.display = 'flex';
}

function closeDropdown() {
    const dropdown = document.getElementById('search-results');
    if (dropdown) dropdown.classList.remove('visible');
    activeResultIndex = -1;
}

// ── Init ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search-input');
    const dropdown = document.getElementById('search-results');
    const clearBtn = document.getElementById('search-clear-btn');

    if (!input || !dropdown) return;

    // Enable the input immediately (index is already in memory)
    input.removeAttribute('disabled');
    input.placeholder = "Search topics (e.g. cables, PIN, sound, payslips)...";

    // Input handler
    input.addEventListener('input', () => {
        const val = input.value.trim();
        if (!val) {
            closeDropdown();
            clearBtn.style.display = 'none';
            return;
        }
        const terms = val.toLowerCase().split(/\s+/).filter(Boolean);
        renderResults(doSearch(val), terms);
    });

    // Clear button
    clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus();
        closeDropdown();
        clearBtn.style.display = 'none';
    });

    // Keyboard navigation
    input.addEventListener('keydown', e => {
        const items = dropdown.querySelectorAll('.search-result-item');
        if (!dropdown.classList.contains('visible') || !items.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (activeResultIndex < items.length - 1) {
                if (activeResultIndex >= 0) items[activeResultIndex].classList.remove('selected');
                activeResultIndex++;
                items[activeResultIndex].classList.add('selected');
                items[activeResultIndex].scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeResultIndex > 0) {
                items[activeResultIndex].classList.remove('selected');
                activeResultIndex--;
                items[activeResultIndex].classList.add('selected');
                items[activeResultIndex].scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'Enter') {
            if (activeResultIndex >= 0 && activeResultIndex < items.length) {
                e.preventDefault();
                items[activeResultIndex].click();
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeDropdown();
            input.blur();
        }
    });

    // Click outside to close
    document.addEventListener('click', e => {
        const container = document.querySelector('.search-container');
        if (container && !container.contains(e.target)) closeDropdown();
    });
});
