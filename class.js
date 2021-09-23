class Cliente {
    static contadorCliente = 0 ;

        constructor (nombreCliente, razonSocialCliente, telefonoCliente)
    {
        
        this.nombre=nombreCliente,
        this.razonsocial=razonSocialCliente,
        this.telefono=telefonoCliente
        this.id = ++Cliente.contadorCliente;
    }
    
}

    
    
    /*
    get nombre(){
        return this.nombre
    }

    set nombre(nombreCliente){
        this.nombre=nombreCliente
    }

    get razonSocial(){
        return this.razonSocial
    }

    set razonSocial(razonSocialCliente){
        this.razonSocial=razonSocialCliente
    }


    get telefono(){
        return this.telefono
    }

    set telefono(telefonoCliente){
        this.telefono=telefonoCliente
    }
    
}


class IngresoCliente extends Cliente{

    static contadorCliente = 0 ;

    constructor(nombreCliente,razonSocialCliente,telefonoCliente){
        super(nombreCliente,razonSocialCliente,telefonoCliente);
        this._id = ++IngresoCliente.contadorCliente;
    }

    get id(){
        return this._id;
    }


}
*/
