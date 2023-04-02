document.getElementById('debug-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const language = document.getElementById('language').value;
    const code = document.getElementById('code').value;
    const error = document.getElementById('error').value;
    const codeFunction = document.getElementById('function').value;

    const response = await fetch('/debug', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ language, code, error, function: codeFunction })
    });

    const data = await response.json();
    document.getElementById('output').innerText = data.message;
});

