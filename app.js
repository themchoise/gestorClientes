let listadoClientes = []
let numbers = '^[0-9]+$';
let inicio = () => {
    result = window.confirm('Todos los datos son Obligatorios\n¿Desea Igresar un nuevo cliente?');
    return result
}

let continua = () => {
    result = window.confirm('¿Agrega otro cliente cliente?');
    return result
}

let cargaCliente = () => {
    let nombre = prompt('Ingrese el nombre del Cliente');
    let razonSocial = prompt('Razon Social');
    let telefono = prompt('Telefono');
    return [nombre, razonSocial, telefono]   
}

if (inicio()) {

    

    do { 
            const [nombre, razonSocial, telefono] = cargaCliente();
            if (nombre && razonSocial &&  telefono ){
            let altaCliente = new Cliente(nombre, razonSocial, telefono)
            listadoClientes.push(altaCliente)
                }
            
    } while (continua());


}

if (listadoClientes.length > 0) {
    alert('Resultado por Consola')
    console.log('Su Listado de Clientes:');
    console.log(listadoClientes);
}

