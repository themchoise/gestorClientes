const    frmAddClient = document.querySelector('#frmAddClient')
        ,frmSalesClient = document.querySelector('#frmSalesClient')
        ,cardFather = document.querySelector('#cardContainer')
        ,searchInput = document.querySelector('#mainSearch')
        ,btnSearch = document.querySelector('#gotoSearch')
        ,btnClearSearch = document.querySelector('#clearSearch')
        ,letters =/^[a-zA-Z]+$/
        ,tableDashClient = $('#clientDashTable');


let fnStartForm = () => {
    $('#frmAddClient').append(`
     <div class="center">
     <button type="submit"> Guardar </button>    
     </div> `)
    
    
    };
    
    let fnStartFormSales = () => {
        $('#frmSalesClient').append(`
        <div class="center">
        <button type="submit" class="btnSubSales"> Procesar Venta </button>    
        </div> `)
    };
    
    

let loadHtml = () => {
    $('#clientDashTable').DataTable().clear();
    $('#clientDashTable').DataTable().destroy();
      
    //Vaciado de la lista, y la vuelvo a crear con los nuevos clientes

    //Iterando el LocalStorage
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (  !(key.includes('Sale') ) ) 
        {
        let dataLocalStorage = localStorage.getItem(key)

        dataLocalStorage = JSON.parse(dataLocalStorage)
        const { razonsocial, telefono, email, date, cuit, balance, monto, deuda } = dataLocalStorage
        tableDashClient.append(
         `<tr id='clientid_${key}' key=${key} class='animate__animated '>`
        
        +'<td>'+razonsocial+'</td>' 
        +'<td>'+cuit+'</td>' 
        +'<td>'+telefono+'</td>' 
        +'<td>'+email+'</td>' 
        +'<td>'+date+'</td>' 
        +'<td>'+'$ ' +balance+'</td>' 
        +'<td>'+'$ ' +deuda+'</td>' 
        +'<td>'+'$ ' +monto+'</td>' 
        +'<td>'+'<i class="fas fa-edit pointer" title="editar"></i>'+'</td>' 
        +'<td>'+`<i id='client_erase' class="fas fa-trash pointer  " title="borrar"></i>`+'</td>' 
        

        +'</tr>'
       )

    }
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

$('#mainSearch').keyup(function(e){ 
    let searchText= e.target.value.toLowerCase()

    $("#tableBodyClientDashTable tr").filter(function() {
        $(this).toggle( $(this).text().toLowerCase().indexOf(searchText) > -1)  
    })
    
})



////////BORRADO DE CLIENTES //////////
$( document ).ready( function() {
   
    let tabla = $('#clientDashTable')
    tabla[0].onclick = function(event) {
    let td = event.target.closest("#client_erase"); // (1)
    
    if (td) {
       
    let row = td.parentNode.parentNode ;
    
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



const hideAnotherForms = (FormTrue) => {

    let existingForms = document.getElementsByTagName('form');
    for (let i = 0; i < existingForms.length; i++) {
        const idForms = existingForms[i];
        if ( idForms!==FormTrue ){
            existingForms[i].style.display='none'
        }
        else{
            existingForms[i].style.display='block'
        }

        
        
    }

}