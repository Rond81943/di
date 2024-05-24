let tover = document.getElementById('tov');
let cent = document.getElementById('cen');
let spisok = document.getElementById('selectCategory');
let addBtn = document.getElementById('add');
let main = document.getElementById('tbody');
let sps = ['product__price', 'fastfood__price', 'sport__price',
    'drinks__price', 'fun__price', 'another__price']
let allPrice = document.getElementById('all__price');


const cenInput = document.getElementById('cen');

cenInput.addEventListener('input', function() {
    // Получить введенный текст
    const value = this.value;

    // Проверить, соответствует ли введенный текст регулярному выражению
    const isValid = /^\d+$/.test(value);

    // Если введенный текст не соответствует регулярному выражению, очистить поле ввода
    if (!isValid) {
        this.value = '';
    }
});

const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = 
    `<div class="modal__content">
        <p>Пожалуйста, заполните поля "Товар" и "Цена".</p>
        <button class="modal__close-btn">Закрыть</button>
    </div>`
;
document.body.appendChild(modal);


function showModal() {
    modal.classList.add('modal--active');
}


function hideModal() {
    modal.classList.remove('modal--active');
}

document.querySelector('.modal__close-btn').addEventListener('click', hideModal);




function add(tov, cen, catec) {
    let newItem = document.createElement('tr');
    newItem.classList.add('purcashes__item');
    newItem.classList.add('purcashes__row')
    newItem.setAttribute('data-category', catec.value);
    let tnewItem = document.createElement('td');
    let cnewItem = document.createElement('td');
    let cenewItem = document.createElement('td');
    tnewItem.textContent = tov;
    cnewItem.textContent = cen;
    cenewItem.textContent = catec.text;
    newItem.appendChild(tnewItem);
    newItem.appendChild(cenewItem);
    newItem.appendChild(cnewItem);

    const deleteButton = document.createElement('td');
    deleteButton.innerHTML = '<i class="purcashes__item-del fa-solid fa-xmark"></i>';
    deleteButton.addEventListener('click', () => {
        main.removeChild(newItem);
        sps.forEach(el => {
            if (el.includes(catec.value)) {
                let i = Number(document.getElementById(el).textContent);
                i = i - Number(cen);
                document.getElementById(el).textContent = i;
            }
        })
        let i = 0;
        sps.forEach(el => {
            i = i + Number(document.getElementById(el).textContent);
            allPrice.textContent = i;
        })
        allPrice.textContent = i;
        ract()
    })
    newItem.appendChild(deleteButton)

    main.appendChild(newItem);


    sym = allPrice.textContent;

    sps.forEach(el => {
        if (el.includes(catec.value)) {
            let i = Number(document.getElementById(el).textContent);
            i = i + Number(cen);
            document.getElementById(el).textContent = i;
        }
    })
    let i = 0;
    sps.forEach(el => {
        i = i + Number(document.getElementById(el).textContent);
        allPrice.textContent = i;
    })
    allPrice.textContent = i;


}

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let tov = tover.value;
    let cen = cent.value;
    let catec = spisok.options[spisok.selectedIndex];

    if (tov === "" || cen === "") {
        showModal();
    } else if (typeof parseInt(cen) === "number") {
        add(tov, cen, catec)
        ract()
    }

})

function ract() {

    let arr = [];
    sps.forEach(el => {
        arr.push(Number(document.getElementById(el).textContent))
    })
    let sym = allPrice.textContent;

    let procent = arr.map((num) => {
        return ((num / sym) * 100);
    });

    let g = 0;

    for (let i = 0; i < procent.length; i++) {
        document.querySelectorAll('.unit')[i].style.cssText = `stroke-dasharray: ${procent[i]} 100; stroke-dashoffset: -${g};`;
        g = g + Number(procent[i]);
    }


}
