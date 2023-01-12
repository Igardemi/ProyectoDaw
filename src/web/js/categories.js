let contenido;

function getCategories(){

    let xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:3000/ciudades");
	xhr.responseType = "json";
	xhr.send();
	xhr.onload = function () {
		paintCategories(xhr.response);
		return xhr.response;
	};
}

function getDescuentos(){

    let xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:3000/descuentos");
	xhr.responseType = "json";
	xhr.send();
	xhr.onload = function () {
		calcularDescuento(xhr.response);
		return xhr.response;
	};
}

function paintCategories(object){

    object.forEach(element => {  
    let enlace = document.createElement("a");
    enlace.href="#";
    enlace.className="g--decoration-none";
    enlace.addEventListener("click",()=>{
        getProductos(element);});
    let box = document.createElement("div");
    box.style.backgroundImage="url(./assets/img/"+element.foto+")";
    box.className = "c-categorie";
    let title = document.createElement("div");
    title.className = "c-categorie__title";
    let text = document.createElement("h2");
    text.textContent=element.ciudad;
    title.appendChild(text);
    box.appendChild(title);
    enlace.appendChild(box);
    contenido.appendChild(enlace);
});
}

function getOption(opciones){
    textInfo="<select id='opciones' name='opciones' style='height:45px; width:100px;'>";
    let contador = 0;
    opciones.forEach(opcion => {
        textInfo+=`<option value="${contador}">${opcion}</option>`;
        contador++;
    })
    textInfo+="</select>";
    return textInfo;
}

function getProductos(object){;
    document.getElementById("seleccion").innerText="Opciones de movilidad en "+object.ciudad;
    let innerText=`<div class='l-flex l-flex--wrap l-flex--gap-10 l-flex--justify-content-center'>`;
     
object.opciones.forEach(opcion => {
    innerText+=`
    <div class='c-article'>
    <img class='c-article__imagen' src="${opcion.image}" alt="foto ticket" width="300" height="200">
    <div class='c-article__nombre'>${opcion.nombre}</div>
    <div class='l-flex l-flex--direction-row l-flex--justify-content-center l-flex--align-content-center l-flex--gap-5'>
    <div class='c-article__duracion'>${getOption(opcion.duracion)}</div>
    <div class='c-article__precio'>${opcion.precio[0]} Euros</div>
    </div>
    <div class='l-flex l-flex--direction-row l-flex--gap-10 g--margin-top-6 g--margin-bottom-6'>
    <button id='${opcion.nombre}' class="c-button c-article__button ${opcion.nombre} ${opcion.duracion} btnBuy">Comprar</button>
    <button class="c-button c-button--secundario c-article__button ${opcion.nombre} ${opcion.duracion} btnInfo">info</button>      
    </div>
    </div>`;   
})
    innerText+="</div>"
    let lienzo = document.getElementById("contenido");
    lienzo.innerHTML=innerText;
    Array.from(document.getElementsByClassName("btnInfo")).forEach(btn =>{
        btn.addEventListener("click",()=>{document.getElementById("detalleProducto").showModal()})
    });


    // ----------------------
    Array.from(document.getElementsByClassName("btnBuy")).forEach(btn =>{
        btn.addEventListener("click",()=>{
            let duracion = document.getElementById("opciones").value;
            añadirArticulosCarrito(btn.id , duracion, object.opciones);
        })
    });



    // -----------------------
    

}


// funciones de el carrito
let carrito;

function añadirArticulosCarrito(nombreArticulo, duracion, opciones){
    let producto = opciones.find(a => a.nombre == nombreArticulo);
    
    let articulo = new Articulo(producto.nombre,producto.duracion[duracion],producto.precio[duracion],producto.image);

    carrito.nuevoArticulo(articulo);
}

function verCarrito() {
    let dialog = document.getElementById("carrito");

    if (dialog.open) {
        dialog.close();
    }
    dialog.showModal();

    let listaProductos = document.getElementById("carritoProductos");
    let precioTotal = document.getElementById("precioTotal");
    let precioFinal = document.getElementById("precioFinal");

    precioFinal.innerHTML= "0";
    precioTotal.innerHTML= "0";

    let productos = carrito.crearCarrito();
    listaProductos.innerHTML = productos.html;
    precioTotal.innerHTML = productos.total;

    botonesCarrito();
    aplicarDescuento();
}

function botonesCarrito() {
    let btnSuma = document.querySelectorAll(".btnSumar");
    let btnResta = document.querySelectorAll(".btnRestar");
    let btnBorrar = document.querySelectorAll(".btnBorrar");

    btnSuma.forEach((btn) => {
        btn.addEventListener("click", () => {
          carrito.modificarUnidades(btn.id, 1);
        });
      });
    
      btnResta.forEach((btn) => {
        btn.addEventListener("click", () => {
          carrito.modificarUnidades(btn.id, -1);
        });
      });
    
      btnBorrar.forEach((btn) => {
        btn.addEventListener("click", () => {
          carrito.borrarArticulo(btn.id);
        });
      });
}

function aplicarDescuento() {
    let btnDescuento = document.getElementById("btnDescuento");
    btnDescuento.addEventListener("click", () => {
        getDescuentos()
    })
}

function calcularDescuento(decuentos) {
    let inputDescuento = document.getElementById("campoDescuento").value;
    let precioTotal = document.getElementById("precioTotal");
    let precioFinal = document.getElementById("precioFinal");

    let busqueda = decuentos.find(descuento => descuento.codigo == inputDescuento);

    if (busqueda) {
        let valorDescuento = busqueda.descuento;
        let calculoDescuento = precioTotal.textContent - (precioTotal.textContent * (valorDescuento / 100))
        precioFinal.innerHTML = calculoDescuento.toFixed(2)
    }else{
        alert("noooo")
    }

}






// -----------------------


window.onload=()=>{

    //Categorías

contenido = document.getElementById("contenido");
getCategories();
document.getElementById("btnUsuario").addEventListener("click",()=>{document.getElementById("login").showModal()});

// -----
document.getElementById("btnCarrito").addEventListener("click",verCarrito);
carrito = new Carrito(33);



// ---

document.getElementById("btnPagar").addEventListener("click",()=>{
    document.getElementById("carrito").close();
    document.getElementById("pago").showModal()});
document.getElementsByClassName("c-pago__boton--negativo")[0].addEventListener("click",()=>{document.getElementById("pago").close();});
document.getElementById("volver").addEventListener("click",()=>{document.getElementById("carrito").close();});
document.getElementById("anyadirCarrito").addEventListener("click",()=>{document.getElementById("detalleProducto").close();}); 

document.getElementsByClassName("c-login__iniciar")[0].addEventListener("click",()=>{
document.getElementById("login").close();
document.getElementById("historialCarritos").showModal()});


document.getElementById("cerrarDetalle").addEventListener("click",()=>{document.getElementById("detalleProducto").close();});
document.getElementById("cerrarLogin").addEventListener("click",()=>{document.getElementById("login").close();}); 
document.getElementById("cerrarHistorial").addEventListener("click",()=>{document.getElementById("historialCarritos").close();}); 

//Detalle del producto

document.getElementById("imagenBono").src = getImagen();
document.getElementById("detalleTitulo").innerText = getTitulo();
document.getElementById("detalleDescripcion").innerText = getDescripcion();
document.getElementById("detallePrecio").innerText = getPrecio();
}
