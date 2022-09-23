
const cartTable = document.getElementById('cartTable');

window.addEventListener('load', () => {
    if(localStorage.getItem('korpa')) {
        korpa = JSON.parse(localStorage.getItem('korpa'));
    }

    cartTable.innerHTML = '';


    korpa.forEach(stavka => {
        console.log(stavka)
        cartTable.innerHTML += `
            <tr id="cart-item-${stavka.id}">
                <th scope="row" class="text-white">${stavka.id + 1}</th>
                <td><img src="http://localhost:3000/${stavka.img}" height="30px" /></td>
                <td class="text-white">${stavka.name}</td>
                <td class="text-white">$${stavka.price}</td>
                <td class="text-white">${stavka.qty}</td>
                <td class="text-white">$${stavka.price * stavka.qty}</td>
                <td><button onclick="removeItem(${stavka.id})" class="btn btn-danger m-0">X</button></td>
             </tr>
        `
    })

    let total = korpa.reduce((acc, curVal) => {
        return acc + (curVal.price * curVal.qty)
    },0);

    cartTable.innerHTML += `
    <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="total">Total: </td>
                <td id="total-price" class="text-white">$${total}</td>
    `
})


const removeItem = (id) => {
    korpa = JSON.parse(localStorage.getItem('korpa'));

    let itemId = `cart-item-${id}`
    let selectedItem = document.getElementById(itemId)
    
    if (selectedItem) {
        selectedItem.remove();
    }

    korpa = korpa.filter(item => item.id != id);
    localStorage.setItem("korpa", JSON.stringify(korpa))

    let totall = korpa.reduce((acc, curVal) => {
        return acc + (curVal.price * curVal.qty)
    },0);

    const total = document.getElementById("total-price")
    total.innerText = ` $${totall}`;
    document.querySelector('#brStavki').innerHTML = ` (${korpa.length})`;

    
}