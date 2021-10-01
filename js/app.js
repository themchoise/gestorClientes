let clientList = [];
let numbers = '^[0-9]+$';

if (localStorage.length > 0) {
    loadHtml();
}

frmAddClient.addEventListener('submit', (event) => {
    event.preventDefault();
    let rzInpData = frmAddClient.children[1].value;
    let cuitInpData = Number(frmAddClient.children[3].value);
    let telInpData = Number(frmAddClient.children[5].value);
    let emailInpData = frmAddClient.children[7].value;

    let newCliente = new Cliente(rzInpData,cuitInpData,telInpData,emailInpData);
    clientList.push(newCliente)

   if (clientList.length > 0) {
   for (const cliente of clientList){
    const {id} = cliente
    localStorage.setItem(id,JSON.stringify(cliente))
    }
    }
        let timerInterval
        Swal.fire({
        title: 'Procesando',
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {     
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {  
        if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire(
               'Datos Almacenados con Exito'
              )
              setTimeout(() => {
                  Swal.close();
                  modal.style.display = "none";
                  cargaHtml();
                  //formClean();
              }, 1500);
        }
        })
 event.stopPropagation()
})

