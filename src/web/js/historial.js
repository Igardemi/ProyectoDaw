// function getCarritos(){
//     let xhr = new XMLHttpRequest();
//       xhr.open("GET", "http://localhost:3000/carritos");
//       xhr.responseType = "json";
//       xhr.send();
//       xhr.onload = function () {
//           gethistorial(xhr.response)
//           return xhr.response;
//       };
//   }



function gethistorial(carritos){
    let busqueda = carritos.filter(carrito => carrito.idCliente == usuario.id)
    if(usuario!=null){
        paintHistorial(busqueda);
    }
    else{
        alert("No tiene carritos")
    }

}

function getCarritos(){
	return new Promise(function(resolve,reject){
        xhr= new XMLHttpRequest();       
        xhr.open("GET","http://localhost:3000/carritos");
        xhr.responseType="json";
        xhr.send();
        xhr.onload=function(){
            if(xhr.status==200){          
                resolve(gethistorial(xhr.response));
            }
            else{
                reject("Error..."+xhr.statusText);
            }
        }
    })
}

function paintHistorial(carritos){
    
    let historialTabla = document.getElementById("tablaHistorial");

    let tr = `<tr class="c-table__titulos">
    <td class="c-table__item">ID pedido</td>
    <td class="c-table__item ">Fecha</td>
    <td class="c-table__item">Total</td>
    <td class="c-table__item">Estado</td>
    <td class="c-table__item">Operaciones</td>
    </tr>
    `
    
    let total=0;
    if(carritos.length != 0){
        Array.from(carritos).forEach(carro => {
            carro.articulos.forEach(articulo => {
                total = total + articulo.precio;
            });

            tr+=`<tr class="c-table__elementos">
                <td class="c-table__item">${carro.id}</td>
                <td class="c-table__item">${carro.fechaCreacion}</td>
                <td class="c-table__item">${total}</td>
                <td class="c-table__item">${(carro.stado)?"Pagado":"No Pagado"}</td>
                <td class="c-table__item c-table__item--buttons">`;
            if(!carro.pagado){
                tr+=`
                 <img id="${carro.id}" src="assets/img/modificar.png" alt="recuperar" class="c-table__img recoverCart">
                 <img id="${carro.id}" src="assets/img/papelera.png" alt="borrar" class="c-table__img RemoveCart">
                </td>
                 </tr>`
            }
            else{
                tr+=`
                 <img id="${carro.id}" src="assets/img/papelera.png" alt="borrar" class="c-table__img RemoveCart">
                </td>
                </tr>`
            }
            
            //faltan los botones
        });
        historialTabla.innerHTML=tr;

        Array.from(document.getElementsByClassName('RemoveCart')).forEach(a=>a.addEventListener('click', ()=>{borrarCarrito(a.id)}));
        Array.from(document.getElementsByClassName('recoverCart')).forEach(a=>a.addEventListener('click', ()=>{console.log(a.id)}));
    }
    else{
        historialTabla.innerHTML=tr;
    }
}

function borrarCarrito(id){
        let xhr = new XMLHttpRequest();
          xhr.open("DELETE", "http://localhost:3000/carritos/"+id);
          xhr.responseType = "json";
          xhr.send();
          xhr.onload = function () {
            getCarritos();
              return xhr.response;
          };
}



