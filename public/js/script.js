
let elements = [];

[].forEach.call(document.querySelectorAll('.scroll-to-link'), function (div) {
    div.onclick = function (e) {
        e.preventDefault();
        const target = this.dataset.target;
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
        const elems = document.querySelectorAll(".content-menu ul li");
        [].forEach.call(elems, function (el) {
            el.classList.remove("active");
        });
        this.classList.add("active");
        return false;
    };
});

document.getElementById('button-menu-mobile').onclick = function (e) {
    e.preventDefault();
    document.querySelector('html').classList.toggle('menu-opened');
}
document.querySelector('.left-menu .mobile-menu-closer').onclick = function (e) {
    e.preventDefault();
    document.querySelector('html').classList.remove('menu-opened');
}

function debounce (func) {
    let timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100, event);
    };
}

function calculElements () {
    let totalHeight = 0;
    elements = [];
    [].forEach.call(document.querySelectorAll('.content-section'), function (div) {
        const section = {};
        section.id = div.id;
        totalHeight += div.offsetHeight;
        section.maxHeight = totalHeight - 25;
        elements.push(section);
    });
    onScroll();
}

function onScroll () {
    const scroll = window.pageYOffset;
    console.log('scroll', scroll, elements)
    for (let i = 0; i < elements.length; i++) {
        const section = elements[i];
        if (scroll <= section.maxHeight) {
            const elems = document.querySelectorAll(".content-menu ul li");
            [].forEach.call(elems, function (el) {
                el.classList.remove("active");
            });
            const activeElems = document.querySelectorAll(".content-menu ul li[data-target='" + section.id + "']");
            [].forEach.call(activeElems, function (el) {
                el.classList.add("active");
            });
            break;
        }
    }
    if (window.innerHeight + scroll + 5 >= document.body.scrollHeight) { // end of scroll, last element
        const elems = document.querySelectorAll(".content-menu ul li");
        [].forEach.call(elems, function (el) {
            el.classList.remove("active");
        });
        const activeElems = document.querySelectorAll(".content-menu ul li:last-child");
        [].forEach.call(activeElems, function (el) {
            el.classList.add("active");
        });
    }
}

calculElements();
window.onload = () => {
    calculElements();
};
window.addEventListener("resize", debounce(function (e) {
    e.preventDefault();
    calculElements();
}));
window.addEventListener('scroll', function (e) {
    e.preventDefault();
    onScroll();
});