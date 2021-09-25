let cargaHtml = () => {

    let ulClientes = document.querySelector('#ulClientes');
    let listado = document.getElementsByTagName('li')

    //Vaciado de la lista, y la vuelvo a crear con los nuevos clientes
    while (listado.length > 0) {
        ulClientes.removeChild(listado[0]);
    }

    //Iterando el LocalStorage
    for (let i = 0; i < localStorage.length; i++) {
        let elementoLista = document.createElement('li');
        let icon = document.createElement('i')
        let key = localStorage.key(i);
        let valor = localStorage.getItem(key)
        elementoLista.innerHTML = `ID=${key}, ${valor}`
        elementoLista.setAttribute("Key", `${key}`)
        elementoLista.appendChild(icon)
        elementoLista.className = "animate__animated animate__fadeIn"
        ulClientes.appendChild(elementoLista);
        
    }
    //Ordenando el listado
    function ordenarLista() {
        Array.from(listado)
            .sort((a, b) => a.textContent.localeCompare(b.textContent))         
            .forEach(resultado => 
                ulClientes.appendChild(resultado)
                )};

     ordenarLista();
}

let inicio = () => {
    result = window.confirm('Todos los datos son Obligatorios\n¿Desea Igresar un nuevo cliente?');
    return result;
}

let continua = () => {
    result = window.confirm('¿Agrega otro cliente cliente?');
    return result;
}

let cargaCliente = () => {
    let nombre = prompt('Ingrese el nombre del Cliente');
    let razonSocial = prompt('Razon Social');
    let telefono = prompt('Telefono');
    return [nombre, razonSocial, telefono];
}

