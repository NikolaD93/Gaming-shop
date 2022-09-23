const listaProizvoda = document.querySelector('#listaProizvoda');

let proizvodi = [];

window.addEventListener('load', () => {
    fetch('http://localhost:3000/')
    .then(res => res.json())
    .then(resJson => {
        proizvodi = [...resJson];
    })
    .then( _ => {
        // ispis proizvoda
        ispisProizvoda();
    })
    .catch(err => console.error(err));
})


const ispisProizvoda = () => {
    proizvodi.forEach(proizvod => {
        listaProizvoda.innerHTML += `
            <div class="item"> 
                <a onclick=goToSingle(${proizvod.id})>
                    <img src="http://localhost:3000${proizvod.img}" alt="">
                    <h3>${proizvod.name}</h3>
                    <p>$${proizvod.price}</p>
                 </a> 
            </div> 
        `
    })
}


const goToSingle = (id) => {
    localStorage.setItem("singleProduct", id); 
    window.location = "single.html";
   
}

