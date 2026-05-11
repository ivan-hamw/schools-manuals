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