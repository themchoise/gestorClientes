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
    
    <select name="clients" id="client_list">
    <option value="-1" selected>Escoger Cliente</option>
    </select>
  
    <select name="products" id="products_list">
    <option value="-1" selected>Escoger Producto</option>
    </select>

    <input id="inpAmount"   type="number" style=display: none; placeholder="Cantidad">
    <p class="resultAmount" id="saleInformation"></p>
  
        `)

  $('#inpAmount').hide();
  $('#saleInformation').hide();
  populateSelectProcut();
  populateSelectClient();

  modal.style.display = "block";

  $('#products_list').change(function () {
    selectedOptionProduct = Number($(this).children("option:selected").val());
    selectedOptionCompany = Number($('#client_list').children("option:selected").val());
    selectedOptionProduct !== -1 ? ($('#inpAmount').show()) : null;
    if (selectedOptionProduct !== -1 && selectedOptionCompany !== -1) {
      selectedOptionCompany.toString();
      companySelectedInStorage = localStorage.getItem(selectedOptionCompany);
      companyData = JSON.parse(companySelectedInStorage);
      let companyBalance = companyData.balance;
      let productSelected = products[selectedOptionProduct];
      $('#inpAmount').keyup(function () {
        resultSale = (Number(productSelected.Valor) * Number($(this).val()))
        $('#saleInformation').show();
        $('#saleInformation').text(`Resumen de su venta: ${productSelected.Producto} x ${Number($(this).val())} Total: ${resultSale}`)



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