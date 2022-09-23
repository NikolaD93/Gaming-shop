const slika = document.querySelector('#slika');
const naziv = document.querySelector('#naziv');
const cena = document.querySelector('.price');
const opis = document.querySelector('#opis');
const kolicina = document.querySelector('#qty');
const kategorije = document.querySelector('.category');

const forma = document.querySelector('form');

let currentId = null;
let currentProduct = {};


window.addEventListener('load', () => {

    currentId = localStorage.getItem("singleProduct");

   

    fetch(`http://localhost:3000/${currentId}`)
    .then(proizvodRaw => {
        return proizvodRaw.json();
    })
    .then(proizvodJson => {
        // console.log(proizvodJson);
        currentProduct = proizvodJson[0];
        slika.innerHTML = `<img src="http://localhost:3000${proizvodJson[0].img}" />`;
        naziv.textContent = `${proizvodJson[0].name}`;
        cena.textContent = `$${proizvodJson[0].price}`;
        opis.textContent = `${proizvodJson[0].desc}`;

        kolicina.innerHTML = '';

        for(let i = 1; i <= proizvodJson[0].qty; i++) {
            kolicina.innerHTML += `<option value="${i}">${i}</option>`;
        }

        let katTemp = proizvodJson[0].category.trim().split(',');
        // console.log(katTemp);

        kategorije.innerHTML = '';

        katTemp.forEach((element, idx) => {
            if(katTemp.length != idx + 1) {
                kategorije.innerHTML += `<a href=""> ${element.trim()}</a>,`
            } else {
                kategorije.innerHTML += `<a href=""> ${element.trim()}</a>`
            }
        })
    })
    .catch(err => console.error(err));
})


forma.addEventListener('submit', (event) => {
    event.preventDefault();

    currentProduct.qty = Number(event.target.kolicina.value);
    


    if(!localStorage.getItem('korpa')){
        localStorage.setItem('korpa', '[]');
    }

    korpa = JSON.parse(localStorage.getItem('korpa'));
    
   
    let isProductAdded = false;

    korpa.forEach((element) => {
        if(element.id === currentProduct.id){
            element.qty += currentProduct.qty;
            isProductAdded = true;
        }
    })

    if (!isProductAdded) {
        korpa.push(currentProduct);
    }
    

   
    
    document.querySelector('#brStavki').innerHTML = ` (${korpa.length})`;
    localStorage.setItem('korpa', JSON.stringify(korpa));

    window.location = "products.html";
    
})

