// Get the modal
let modal = document.getElementById("myModal");
let fromChangeModal = document.getElementById("frmAddClient");
let spanCloseModal = document.getElementById('CloseModal');
let modalTitle = document.getElementById('titleModal');

let btnAddClient = document.getElementById("btnNewClient");
let btnSale = document.getElementById("btnSale");


spanCloseModal.onclick = function (e) {
  frmAddClient.style.display='none'
  frmSalesClient.style.display='none'
  $('#frmAddClient').trigger("reset");
  emptyForm();
  modal.style.display = "none";
  e.stopPropagation()
}


/*

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "block";
  }

}

*/