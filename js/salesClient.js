let selectedOptionProduct
  , selectedOptionCompany
  , companySelectedInStorage
  , companyData
  , keyObjectInStorage
  , resultSale = 0
  , debtValue = 0
  , weigth = 1000
  , value = 0
  , iva = 0
  , kgAmount = 400
  , weightPer = 0;

btnSale.onclick = function () {
  hideAnotherForms('frmSalesClient');
  frmSalesClient.style.display = 'block'
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
    <input id="inpAmount" autocomplete="off" class="inputSAle"   type="number"  placeholder="Ingrese Cantidad">
        </div>
        <div  id="divPayment"  class="center salesRes inptModif"  style=display:none;>
        <label> Pago </label>
        <input id="inpPayMent" class="inputPayment" autocomplete="off"   type="number"  placeholder="">
        <label  class="ml-5"> Peso(Gramos) </label>
        <input id="inpWeight" class="inputPayment" autocomplete="off" value="1000"   type="number"  placeholder="">
        <label id="lblDebt" class="ml-5"></label>
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
    if (Number($(this).children("option:selected").val()) !== -1) {
      //$('#divProductList').show();
      $('#divProductList').slideDown("fast");
    } else if
      (Number($(this).children("option:selected").val()) == -1) {
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
        weigth = (Number($(this).val()) * Number((productSelected.Peso) * 1000));
        $('#inpWeight').val(weigth)
        weightPer = (weigth / 1000)
        Value = Number($(this).val());
        resultSale = (kgAmount * weightPer);
        iva = parseFloat((resultSale * 0.21));
        resultsale = resultSale += resultSale * 0.21
        resultSale = Number(resultSale);
        $('#inpWeight').keyup(function () {
          weigth = $(this).val()
          weightPer = (weigth / 1000)
          resultSale = (weightPer * 400);
          resultSale += parseFloat(resultSale * 0.21)
          iva = parseFloat((resultSale * 0.21).toFixed(2));
          $('#inpPayMent').val(parseFloat(resultSale).toFixed(2));
          dolarValue ? (
            $('#saleInformation').text(`Resumen de su venta: ${productSelected.Producto} x ${Value} Total: $${resultSale.toFixed(2)} Iva $${parseFloat(iva).toFixed(2)}  U$$:${parseFloat(resultSale / dolarValue).toFixed(2)}   `)
          )
            :
            (
              $('#saleInformation').text(`Resumen de su venta: ${productSelected.Producto} x ${Value} Total: $${resultSale.toFixed(2)} Iva $${parseFloat(iva).toFixed(2)} U$$:No Obtenido   `)
            )
        })
        $('.btnSubSales').slideDown("fast");
        $('#divSalesRes').fadeIn("slow");
        dolarValue ? (
          $('#saleInformation').text(`Resumen de su venta: ${productSelected.Producto} x ${Value} Total: $${resultSale} \nIva $${parseFloat(iva).toFixed(2)}  U$$:${parseFloat(resultSale / dolarValue).toFixed(2)}   `)
        )
          :
          (
            $('#saleInformation').text(`Resumen de su venta: ${productSelected.Producto} x ${Value} Total: $${resultSale} Iva $${parseFloat(iva).toFixed(2)} U$$:No Obtenido   `)
          )
        $('#divPayment').fadeIn("slow");
        $('#inpPayMent').val(parseFloat(resultSale).toFixed(2));
        $('#inpPayMent').keyup(function () {
          let inpValue = $(this).val();
          debtValue = Number((resultSale - inpValue));
          if (debtValue < 0 || debtValue == resultSale) {
            $('#frmSalesClient :submit').prop("disabled", true);
            $('#frmSalesClient :submit').addClass("disabledSubmit");
          }
          else {
            $('#frmSalesClient :submit').prop("disabled", false);
            $('#frmSalesClient :submit').removeClass("disabledSubmit");
          }

          $('#lblDebt').text(`Deuda$ ${parseFloat(debtValue).toFixed(2)}`);
        })
      })
    }
  });
}

frmSalesClient.addEventListener('submit', (event) => {
  event.preventDefault()
 console.log( Number( $('#inpAmount').val() ))
  if ((selectedOptionProduct !== undefined) && (selectedOptionCompany !== undefined) && ($('#inpAmount').val() !== '') && Number($('#inpAmount').val()) !== 0 && resultSale>0 && Value>0) {

    companyData.monto += resultSale;

    companyData.deuda += debtValue;

    companyData.balance += Number($('#inpPayMent').val())

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
      text: 'Algo estuvo mal, revise los valores ingresados',

    })
  }
})

