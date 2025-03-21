function selezionaOpzione(itemId, valore, button) {
    // Rimuovi la classe 'selected' da tutti i pulsanti fratelli
    const buttons = button.parentElement.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected');
    }
    // Aggiungi la classe 'selected' al pulsante cliccato
    button.classList.add('selected');
    // Imposta il valore dell'input nascosto
    document.getElementById(itemId).value = valore;
}

function generaReport() {
    const form = document.getElementById('checklistForm');
    const reportDiv = document.getElementById('report');
    let report = '<h2>Report Non Conformità</h2><ul>';

    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        if (element.tagName === 'INPUT' && element.value === 'non_conforme') {
            const label = form.querySelector(`label[for=${element.id}]`).innerText;
            const note = form.querySelector(`textarea[name=note${element.id.replace('item', '')}]`).value;
            report += `<li>${label} - Note: ${note}</li>`;
        }
    }

    report += '</ul>';
    reportDiv.innerHTML = report;
}
