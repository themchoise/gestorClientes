const frmAddClient = document.querySelector('#frmAddClient')
const cardFather = document.querySelector('#cardContainer');
const searchInput = document.querySelector('#mainSearch');
const btnSearch = document.querySelector('#gotoSearch');
const btnClearSearch = document.querySelector('#clearSearch');
const tableDashClient = $('#clientDashTable')




let loadHtml = () => {
    //tableDashClient.empty();
    $('#clientDashTable').DataTable().clear()
    $('#clientDashTable').DataTable().destroy();
   
    //$('#clientDashTable td').remove()
    
    //Vaciado de la lista, y la vuelvo a crear con los nuevos clientes
    

    //Iterando el LocalStorage
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let dataLocalStorage = localStorage.getItem(key)

        dataLocalStorage = JSON.parse(dataLocalStorage)
        const { razonsocial, telefono, email, date, cuit } = dataLocalStorage
        tableDashClient.append(
         `<tr id='clientid_${key}' key=${key} class='animate__animated '>`
        +'<td>'+key+'</td>' 
        +'<td>'+razonsocial+'</td>' 
        +'<td>'+cuit+'</td>' 
        +'<td>'+telefono+'</td>' 
        +'<td>'+email+'</td>' 
        +'<td>'+date+'</td>' 
        +'<td>'+'0'+'</td>' 
        +'<td>'+'<i class="fas fa-edit pointer" title="editar"></i>'+'</td>' 
        +'<td>'+`<i id='client_erase' class="fas fa-trash pointer  " title="borrar"></i>`+'</td>' 
        

        +'</tr>'
       )

    }

    $(document).ready( function () {
        

        $('#clientDashTable').DataTable({
            "searching": false,
            "paging": false,
            "info": false,
            "language": {
                "zeroRecords": "Sin Datos para mostrar",
                
               
            }
          });
    } );
    
   

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

////////BORRADO DE CLIENTES //////////
$( document ).ready( function() {
   
    let tabla = $('#clientDashTable')
    tabla[0].onclick = function(event) {
    let td = event.target.closest("#client_erase"); // (1)
    
    if (td) {
       
    let row = td.parentNode.parentNode ;
    console.log(row)
    let keyInStorageRow =  row.getAttribute('key')
     row.remove();
     
     removeItem(keyInStorageRow)   
    loadHtml() 
    
    event.stopPropagation()
    }
    event.stopPropagation()
  }

})

const removeItem = (key) => {
    localStorage.removeItem(key);  
}



