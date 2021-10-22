let statisticsView = document.getElementById('statisticsView');
let arr = [] ;
let newArr = [] ;



statisticsView.onclick = () => {
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (  (key.includes('Sale') ) ) 
        {
        let dataLocalStorage = localStorage.getItem(key) ;
        
        dataLocalStorage = JSON.parse(dataLocalStorage) ;
        let client = dataLocalStorage[1];
        let product = dataLocalStorage[2];
        let mount = dataLocalStorage[4];
        newArr.push({'client':client, 'mount':mount})
        
        let amount = Number(dataLocalStorage[3]);
      
        arr.push({'x':amount, 'y':mount ,indexLabel: client})
        
    
        }
    }

    let numeros = [1, 2, 3, 4, 5];
let total = numeros.reduce((a, b) => a + b, 0);


    
    const found = newArr.filter(e => e.client=='Pizzeria Ciber Tato')
    let k = found.map(function(element){
        
            return element.mount  

          })
              let totalAmount = k.reduce((a, b) => a + b, 0);
    console.log(totalAmount)

    $('#dibsub2').empty();
    $('#dibsub1').slideUp("fast");

    $('#dibsub2').fadeIn("fast");
    $('#dibsub2').append(`<h2 class="producTitle"> Graficos </h2>`)
    $('#dibsub2').append(`<div id="chartContainer" style="height: 300px; width: 100%;"></div>`)

       
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "Resumen de Ventas"
        },
          axisY: {
          includeZero: false
        },
        
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#fefefe",
              indexLabelFontSize: 16,
            indexLabelPlacement: "outside",
            dataPoints: arr
        }]
    });
    chart.render();
    
    }


