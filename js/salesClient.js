 let selectedOptionProduct
    ,selectedOptionCompany
    ,companySelectedInStorage
    ,companyData
    ,resultSale
    ,keyObjectInStorage;

btnSale.onclick = function () {
  hideAnotherForms('frmSalesClient')
    
  frmSalesClient.style.display='block'
  emptyForm();

  modalTitle.innerHTML = 'Nueva Venta'

  $('#frmSalesClient').prepend(` 
  

<div class="center">
  <select name="clients" id="client_list"  class="selectClient center">
  <option value="-1" selected>Escoger Cliente</option>
  </select>
  </div>

  
  <div id="divProductList" class="center mt-15" style=display: none;>

        <select name="products"  id="products_list"  class="selectClient center">
        <option value="-1" selected>Escoger Producto</option>
        </select>


    </div>

    

    <div id="divAmount" autocomplete="off" class="center inptModif mt-15" style=display:none;>
    
    <input id="inpAmount" autocomplete="off"   type="number"  placeholder="Ingrese Cantidad">
    
        </div>

        <div id="divSalesRes"  class="salesRes" style=display:none;>
        <p class="resultAmount"  id="saleInformation"></p></div>
        </div>
        `)

  $('#divProductList').hide();
  $('#divAmount').hide();
  $('#divSalesRes').hide();
  
  populateSelectProcut();
  populateSelectClient();

  modal.style.display = "block";
  $('#client_list').change(function () {
   if (Number($(this).children("option:selected").val()) !== -1  )
   {
    //$('#divProductList').show();
    $('#divProductList').slideDown("fast");
   }else if 

         (Number($(this).children("option:selected").val()) == -1)
         {
           console.log('here')
          $('#divProductList').hide();
         }
   });


  $('#products_list').change(function () {
    selectedOptionProduct = Number($(this).children("option:selected").val());
    selectedOptionCompany = Number($('#client_list').children("option:selected").val());
    selectedOptionProduct !== -1 ? ($('#divAmount').slideDown()) : null;
    if (selectedOptionProduct !== -1 && selectedOptionCompany !== -1) {
      selectedOptionCompany.toString();
      companySelectedInStorage = localStorage.getItem(selectedOptionCompany);
      companyData = JSON.parse(companySelectedInStorage);
      let companyBalance = companyData.balance;
      let productSelected = products[selectedOptionProduct];
      $('#inpAmount').keyup(function () {
        resultSale = (Number(productSelected.Valor) * Number($(this).val()))
        $('.btnSubSales').slideDown("fast");
        $('#divSalesRes').fadeIn("slow")
        $('#saleInformation').text(`Resumen de su venta: ${productSelected.Producto} x ${Number($(this).val())} Total: $${resultSale}`)



      })

    }
  });




}

frmSalesClient.addEventListener('submit', (event) => {

  
  event.preventDefault()

  if ((selectedOptionProduct !== undefined) && (selectedOptionCompany !== undefined) && ($('#inpAmount').val() !== '')) {
    
    companyData.balance += resultSale
    localStorage.setItem(selectedOptionCompany, JSON.stringify(companyData))

    let productSelected = products[selectedOptionProduct];
    
    

    let newSales = new SalesRegister(
      new Date().valueOf(),
      companyData.razonsocial,
      productSelected.Producto,
      $('#inpAmount').val(),
      resultSale
    )

    let arrVenta = []
    for (let sale in newSales) {
      arrVenta.push(newSales[sale])
    }
    localStorage.setItem(`Sale_${companyData.razonsocial}_${new Date().valueOf()}`, JSON.stringify(arrVenta))
    

    swalFn('Procesando Venta', 'Venta Exitosa')
    event.stopPropagation()

  } else {
    $('#saleInformation').text('')
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo estuvo mal, debe completar la seleccion',

    })
  }
})

const fnSaveSales = (sale) => {

}