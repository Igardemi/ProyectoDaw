function getCarritos(){
	return new Promise(function(resolve,reject){
        xhr= new XMLHttpRequest();       
        xhr.open("GET","http://localhost:8000/api/carritos");
        xhr.responseType="json";
        xhr.send();
        xhr.onload=function(){
            if(xhr.status==200){          
                resolve(xhr.response);
            }
            else{
                reject("Error..."+xhr.statusText);
            }
        }
    })
}

function gethistorial(){
    getCarritos().then((data) => {
        let busqueda = data.filter(carrito => carrito.idCliente == usuario._id)
        if(usuario!=null){
            paintHistorial(busqueda);
        }
        else{
            alert("No tiene carritos")
        }
    }).catch((error) => console.log(error))
}

function paintHistorial(carritos){
    
    let historialTabla = document.getElementById("tablaHistorial");

    let tr = `<tr class="c-table__titulos">
    <td class="c-table__item">ID pedido</td>
    <td class="c-table__item ">Fecha</td>
    <td class="c-table__item">Total</td>
    <td class="c-table__item">Estado</td>
    <td class="c-table__item">Operaciones</td>
    </tr>` 
    
    if(carritos.length != 0){

        Array.from(carritos).forEach(carro => {
            let total=0;
            carro.articulos.forEach(articulo => {
                total = total + articulo.precio*articulo.cantidad;
            });
            total = total.toFixed(2);

            tr+=`<tr class="c-table__elementos">
                <td class="c-table__item">${carro._id}</td>
                <td class="c-table__item">${carro.fechaCreacion}</td>
                <td class="c-table__item">${total}</td>
                <td class="c-table__item">${(carro.pagado)?"Pagado":"No Pagado"}</td>
                <td class="c-table__item c-table__item--buttons">`;
            if(!carro.pagado){
                tr+=`
                 <img id="${carro._id}" src="assets/img/modificar.png" alt="recuperar" class="c-table__img recoverCart">
                 <img id="${carro._id}" src="assets/img/papelera.png" alt="borrar" class="c-table__img RemoveCart">
                </td>
                 </tr>`
            }
            else{
                tr+=`
                 <img id="${carro._id}" src="assets/img/papelera.png" alt="borrar" class="c-table__img RemoveCart">
                </td>
                </tr>`
            }
            
        });
        historialTabla.innerHTML=tr;

        Array.from(document.getElementsByClassName('RemoveCart')).forEach(a=>a.addEventListener('click', ()=>{borrarCarrito(a.id)}));
        Array.from(document.getElementsByClassName('recoverCart')).forEach(a=>a.addEventListener('click', ()=>{
                cargarCarrito(a.id);
            }));
    }
    else{
        historialTabla.innerHTML=tr;
    }
}

function borrarCarrito(id){

        let xhr = new XMLHttpRequest();
          xhr.open("DELETE", "http://localhost:8000/api/carritos/"+id);
          xhr.responseType = "json";
          xhr.send();
          xhr.onload = function () {
                gethistorial();
              return xhr.response;
          };
}



