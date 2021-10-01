const frmAddClient = document.querySelector('#frmAddClient')
const cardFather = document.querySelector('#cardContainer');
const searchInput = document.querySelector('#mainSearch');
const btnSearch = document.querySelector('#gotoSearch');
const btnClearSearch = document.querySelector('#clearSearch');

let loadHtml = () => {


    //Vaciado de la lista, y la vuelvo a crear con los nuevos clientes
    cardFather.innerHTML = ''

    //Iterando el LocalStorage
    for (let i = 0; i < localStorage.length; i++) {
        let newH1 = document.createElement('h4');
        let newDiv = document.createElement('div');
        let newP = document.createElement('p');

        let key = localStorage.key(i);
        let dataLocalStorage = localStorage.getItem(key)
        dataLocalStorage = JSON.parse(dataLocalStorage)
        const { razonsocial, telefono, email, date, cuit } = dataLocalStorage

        newH1.innerHTML = razonsocial;
        newDiv.className = 'clientCard animate__animated animate__fadeIn';
        newDiv.innerHTML = `
        <h4>Razon Social: ${razonsocial}</h4>
        <p>CUIT: ${cuit}</p>
        <p>Telefono: ${telefono}</p>
        <p>E-mail: ${email}</p>
        <p>Alta: ${date}</p>`
        cardFather.appendChild(newDiv);



        /*
        let elementoLista = document.createElement('li');
        let icon = document.createElement('i')
        let key = localStorage.key(i);
        let valor = localStorage.getItem(key)
        icon.className='far fa-address-card fa-1x'
        elementoLista.innerHTML = `ID=${key}, ${valor}`
        elementoLista.setAttribute("Key", `${key}`)
        elementoLista.appendChild(icon)
        elementoLista.className = "animate__animated animate__fadeIn"
        ulClientes.appendChild(elementoLista);
        */

    }
    //;
    //Ordenando el listado
    /*
    function ordenarLista() {
        Array.from(listado)
            .sort((a, b) => a.textContent.localeCompare(b.textContent))         
            .forEach(resultado => 
                ulClientes.appendChild(resultado)
                )};

     ordenarLista();
     */
}


let formClean = () => {
    for (let i = 0; i < frmAddClient.children.length; i++) {
        const element = frmAddClient.children[i];
        element.value ? (element.value = '') : null
    }
}


let search = (findText) => {
    findText.toLowerCase();

    let cards = document.getElementsByClassName('clientCard');

    for (let i = 0; i < cards.length; i++) {
        const element = cards[i];
        let children = element.children[0].textContent;
        children = children.toLowerCase();
        children.includes(findText) ? cards[i].style.display = 'block' : cards[i].style.display = 'none';
    }
}


btnSearch.addEventListener('click', () => {
    let searchText = searchInput.value;
    searchText = searchText.toLowerCase();
    search(searchText);

})


btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    search('');
})



