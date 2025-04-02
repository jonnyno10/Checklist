let startX, startY, touchTimeout;

function navigateTo(section) {
    window.location.href = section + '.html';
}

function goHome() {
    window.location.href = 'index.html';
}

function goToAuditSelection() {
    window.location.href = 'nuovoAudit.html';
}

function dragStart(event) {
    touchTimeout = setTimeout(() => {
        startX = event.clientX || event.touches[0].clientX;
        startY = event.clientY || event.touches[0].clientY;
        event.target.classList.add('dragging');
        document.addEventListener('touchmove', preventScroll, { passive: false });
    }, 500); // 0,5 secondi
}

function dragEnd(event) {
    clearTimeout(touchTimeout);
    document.removeEventListener('touchmove', preventScroll);
    const element = event.target;
    element.classList.remove('dragging');
    const direction = getDragDirection(event);
    if (direction) {
        handleDragDirection(direction, element);
    }
}

function preventScroll(event) {
    event.preventDefault();
}

function getDragDirection(event) {
    const endX = event.clientX || (event.changedTouches ? event.changedTouches[0].clientX : startX);
    const endY = event.clientY || (event.changedTouches ? event.changedTouches[0].clientY : startY);
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return deltaX > 0 ? 'right' : 'left';
    } else {
        return deltaY > 0 ? 'down' : 'up';
    }
}

function handleDragDirection(direction, element) {
    switch (direction) {
        case 'left':
            if (!element.classList.contains('drag-left') && !element.classList.contains('drag-right') && !element.classList.contains('drag-up')) {
                updateState('NC', element);
                showNoteDialog('left', element);
            }
            break;
        case 'right':
            if (!element.classList.contains('drag-left') && !element.classList.contains('drag-right') && !element.classList.contains('drag-up')) {
                updateState('C', element);
                showNoteDialog('right', element);
            }
            break;
        case 'up':
            if (!element.classList.contains('drag-left') && !element.classList.contains('drag-right') && !element.classList.contains('drag-up')) {
                updateState('NA', element);
                showNoteDialog('up', element);
            }
            break;
        case 'down':
            confirmNoteDeletion(element);
            break;
    }
}

function updateState(state, element) {
    const row = element.closest('tr');
    const stateCell = row.querySelector('.stato');
    stateCell.innerText = state;
    stateCell.classList.remove('drag-left', 'drag-right', 'drag-up');
    if (state === 'NC') {
        stateCell.classList.add('drag-left');
    } else if (state === 'C') {
        stateCell.classList.add('drag-right');
    } else if (state === 'NA') {
        stateCell.classList.add('drag-up');
    }
}

function showNoteDialog(direction, element) {
    const row = element.closest('tr');
    const note = prompt('Scrivi una nota:');
    if (note) {
        const noteCell = row.querySelector('.note');
        noteCell.innerText = note;
    }
}

function confirmNoteDeletion(element) {
    const row = element.closest('tr');
    const confirmDeletion = confirm('Vuoi cancellare la nota?');
    if (confirmDeletion) {
        const noteCell = row.querySelector('.note');
        noteCell.innerText = '';
        const stateCell = row.querySelector('.stato');
        stateCell.innerText = '';
        stateCell.classList.remove('drag-left', 'drag-right', 'drag-up');
    }
}

// Aggiungi gli eventi touch
document.querySelectorAll('tr').forEach(row => {
    row.addEventListener('touchstart', dragStart);
    row.addEventListener('touchend', dragEnd);
});
    row.addEventListener('touchend', dragEnd);
});
