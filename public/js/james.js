let rojo = false;

document.getElementById('title').addEventListener('click', () => {
    if (!rojo) {
    title.style.color = 'red';
    title.style.fontFamily = 'Verdana';
    rojo = true;
    } else {
    title.style.color = ''
    title.style.fontFamily = '';
    rojo = false
    }
});