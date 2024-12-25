document.addEventListener('DOMContentLoaded', function() {
    const columnItems = document.querySelectorAll('.column-items');

    columnItems.forEach((item) => {
        const randomScrollPosition = Math.floor(Math.random() * (item.scrollHeight - item.clientHeight));
        item.scrollTop = randomScrollPosition;
    });
})

function openMenu() {
    const header = document.querySelector('.header');
    const button = document.querySelector('.nav-button');

    if (header.classList.contains('show-header')) {
        header.classList.add('hide-header');
        header.addEventListener('animationend', () => {
            header.classList.remove('show-header');
            header.classList.remove('hide-header');
        }, { once: true });
    }
    else {
        header.classList.add('show-header');
    }

    button.classList.toggle('rotate-button');
}