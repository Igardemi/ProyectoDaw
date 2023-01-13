function getCarritos(){
    let xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:3000/carritos");
      xhr.responseType = "json";
      xhr.send();
      xhr.onload = function () {
          gethistorial(xhr.response)
          return xhr.response;
      };
  }



function gethistorial(carritos){
    let busqueda = carritos.filter(carrito => carrito.idCliente == usuario.id)
    if(usuario!=null){
        paintHistorial(busqueda);
    }
    else{
        alert("No tiene carritos")
    }

    // -----





}

// function getUserCarts(){
// 	return new Promise(function(resolve,reject){
//         xhr= new XMLHttpRequest();       
//         xhr.open("GET","http://localhost:3000/usuarios");
//         xhr.responseType="json";
//         xhr.send();
//         xhr.onload=function(){
//             if(xhr.status==200){
//                 resolve(xhr.response);
//             }
//             else{
//                 reject("Error..."+xhr.statusText);
//             }
//         }
//     })
// }

function paintHistorial(historial){
    console.log(historial)
    let historialTabla = document.getElementById("tablaHistorial");

    let tr = `<tr class="c-table__titulos">
    <td class="c-table__item">ID pedido</td>
    <td class="c-table__item ">Fechaaaa</td>
    <td class="c-table__item">Total</td>
    <td class="c-table__item">Estado</td>
    <td class="c-table__item">Operaciones</td>
    </tr>
    `
    
    let total=0;
    if(historial.length != 0){
        historial.forEach(element => {

            element.articulos.forEach(a => {
                total = total + a.precio;
            });

            tr+=`<tr class="c-table__elementos">
                <td class="c-table__item">${element.id}</td>
                <td class="c-table__item">${element.fecha}</td>
                <td class="c-table__item">${total}</td>
                <td class="c-table__item">${(element.pagado)?"Pagado":"No Pagado"}</td>
                <td class="c-table__item c-table__item--buttons">
                    <button class="c-button">Pagar</button>
                    <img src="assets/img/modificar.png" alt="recuperar" class="c-table__img">
                    <img src="assets/img/papelera.png" alt="borrar" class="c-table__img">
                </td>
            </tr>`

            //faltan los botones
        });

    }

    historialTabla.innerHTML=tr;
}



