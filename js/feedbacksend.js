document.addEventListener('keydown', function (e) {
    // Check if Ctrl (or Cmd on Mac) + Enter is pressed
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {

        const selectedText = window.getSelection().toString().trim();

        if (selectedText.length > 0) {
            const pageTitle = document.title;
            const pageUrl = window.location.href;

            // Logic to send data goes here
            sendReport(selectedText, pageTitle, pageUrl);
        } else {
            alert("Please highlight the error first!");
        }
    }
});

function sendReport(text, title, url) {
    fetch('https://formspree.io/f/mrejrayq', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: JSON.stringify({
            page: title,
            link: url,
            highlighted_text: text
        })
    })
        .then(response => {
            if (response.ok) {
                alert("Typo reported! Thanks for helping out.");
            }
        });
}

// --- Accordion Hash Routing & Auto-Expand ---
function handleHashChange() {
    const hash = window.location.hash;
    if (!hash) return;
    
    const decodedHash = decodeURIComponent(hash.substring(1));
    if (!decodedHash) return;
    
    // 1. Try to find the element by ID
    let target = document.getElementById(decodedHash);
    
    // 2. If not found by ID, match by slugified summary text
    if (!target) {
        const summaries = document.querySelectorAll('details summary');
        for (const summary of summaries) {
            if (generateSlug(summary.textContent) === decodedHash) {
                target = summary.closest('details');
                break;
            }
        }
    }
    
    if (target) {
        // Expand target details and any parent details
        let detailsElement = target.tagName.toLowerCase() === 'details' ? target : target.closest('details');
        while (detailsElement) {
            detailsElement.setAttribute('open', '');
            detailsElement = detailsElement.parentElement.closest('details');
        }
        
        // Scroll target into view — use a longer delay on fresh page loads
        // so the browser has finished laying out before we scroll
        const scrollDelay = document.readyState === 'complete' ? 150 : 400;
        setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Add a temporary glow outline highlight to draw attention
            const accordionItem = target.closest('.accordion-item');
            if (accordionItem) {
                accordionItem.style.outline = '3px solid #38bdf8';
                accordionItem.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.6)';
                
                setTimeout(() => {
                    accordionItem.style.transition = 'outline 0.5s ease, box-shadow 0.5s ease';
                    accordionItem.style.outline = '';
                    accordionItem.style.boxShadow = '';
                }, 2000);
            }
        }, scrollDelay);
    }
}

function generateSlug(text) {
    return text
        .toLowerCase()
        // Strip emojis and non-alphanumeric/spaces/dashes
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '') // strip any leading/trailing dashes from emoji removal
        .trim();
}

// Attach event listeners
window.addEventListener('hashchange', handleHashChange);
window.addEventListener('DOMContentLoaded', handleHashChange);
window.addEventListener('load', handleHashChange);