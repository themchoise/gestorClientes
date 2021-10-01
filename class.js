let ultimoIDStorage = 0

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

let dateConstructor = (year, month, day) => {
    let dateResult = `${day}-${month}-${year}`
    console.log(dateResult)
    return dateResult
}

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key > ultimoIDStorage) {
        ultimoIDStorage = (parseInt(key))
    }
}


class Cliente {

    static contadorCliente = ultimoIDStorage;

    constructor(razonSocialCliente, cuitCliente,  telefonoCliente, emailCliente) {

            this.razonsocial = razonSocialCliente,
            this.cuit = cuitCliente,
            this.telefono = telefonoCliente,
            this.email = emailCliente,
            this.date = dateConstructor(year, month, day)
        this.id = ++Cliente.contadorCliente;
    }



}

