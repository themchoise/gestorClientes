// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("btnNewClient");

// Get the <span> element that closes the modal
let spanCloseModal = document.getElementById('CloseModal');

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanCloseModal.onclick = function (e) {
  modal.style.display = "none";
  e.stopPropagation()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


