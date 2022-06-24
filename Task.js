const form = document.getElementById('form')
const input = document.getElementById('input')
const output = document.getElementById('output')

const body = document.body;

let element = output.element

function onSubmit(e) {
    e.preventDefault();
    const value = input.value
    const elements = value.split('').map(letter => {
        const el = document.createElement('span');
        el.classList.add('liters')
        el.innerHTML = letter;
        return el;
    });

    output.innerHTML = '';
    elements.forEach(el => output.appendChild(el));
}

function mouseMove(event) {
    if (!element) return;
    element.style.left = event.clientX + 'px';
    element.style.top = event.clientY + 'px';
}

function mouseDown(event) {
    if (element) {
        const isSpace = event.target.classList.contains('space');
        if (event.target != element && (event.target.classList.contains('liters') || isSpace)) {

            element.remove()
            element.style.position = null;
            element.style.top = null;
            element.style.left = null;
            event.target.after(element)
            if (isSpace) {
                event.target.remove();
            }
        }

        element.classList.remove('moving');
        body.removeEventListener('mousemove', mouseMove);
        element = null;  /* or delete element; */
    } else {
        if (!event.target.classList.contains('liters')) return;
        const space = document.createElement('span');

        space.innerHTML = '&nbsp;';
        space.style.width = event.target.offsetWidth + 'px';
        space.style.height = event.target.offsetHeight + 'px';
        space.classList.add('space');
        event.target.before(space);

        element = event.target;

        element.remove()
        element.style.position = ('absolute')
        element.style.left = event.clientX + 'px';
        element.style.top = event.clientY + 'px';

        element.classList.add('moving');
        body.addEventListener('mousemove', mouseMove);
        body.appendChild(element);
    }
}

form.addEventListener('submit', onSubmit);
body.addEventListener('mousedown', mouseDown);