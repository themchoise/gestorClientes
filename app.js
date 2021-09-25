let listadoClientes = [];
let numbers = '^[0-9]+$';

if (localStorage.length > 0) {
    cargaHtml();
}

const altaCliente = () => {

    if (inicio()) {

        do {
            const [nombre, razonSocial, telefono] = cargaCliente();
            if (nombre && razonSocial && telefono) {
                let altaCliente = new Cliente(nombre, razonSocial, telefono);
                listadoClientes.push(altaCliente);
            }

        } while (continua());

    }

    if (listadoClientes.length > 0) {
        console.log(listadoClientes)

        for (let i = 0; i < listadoClientes.length; i++) {
            const element = listadoClientes[i];
            let { nombre, id, razonsocial, telefono } = element
            localStorage.setItem(id, `Cliente: ${nombre},${razonsocial},${telefono}`)

        }
        listadoClientes = [];
        cargaHtml();


    }

}
