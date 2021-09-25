let ultimoIDStorage = 0

for (let i = 0; i < localStorage.length; i++) {

    let key = localStorage.key(i);
    if (key > ultimoIDStorage) {
        ultimoIDStorage = (parseInt(key))
    }


}


class Cliente {

    static contadorCliente = ultimoIDStorage;

    constructor(nombreCliente, razonSocialCliente, telefonoCliente) {

        this.nombre = nombreCliente,
            this.razonsocial = razonSocialCliente,
            this.telefono = telefonoCliente
        this.id = ++Cliente.contadorCliente;
    }

}

