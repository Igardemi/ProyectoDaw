let carrito;

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

// funciones de el carrito
function anyadirArticulosCarrito(nombreArticulo, duracion, opciones){
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

function calcularDescuento(descuentos) {
    let inputDescuento = document.getElementById("campoDescuento").value;
    let precioTotal = document.getElementById("precioTotal");
    let precioFinal = document.getElementById("precioFinal");

    let busqueda = descuentos.find(desc => desc.codigo == inputDescuento);

    if (busqueda) {
        let valorDescuento = busqueda.descuento;
        let calculoDescuento = precioTotal.textContent - (precioTotal.textContent * (valorDescuento / 100))
        precioFinal.innerHTML = calculoDescuento.toFixed(2)
    }
    else{
      alert("cupon descuento no válido");
      precioFinal.innerHTML=precioTotal.textContent;
    }
}

window.onload=()=>{

 carrito = new Carrito(34534546);

//categorias y botones
contenido = document.getElementById("contenido");
getCategories();

//botones header
document.getElementById("btnUsuario").addEventListener("click",()=>{document.getElementById("login").showModal()});
document.getElementById("btnCarrito").addEventListener("click",()=>{verCarrito()});

//botones carrito
document.getElementById("btnPagar").addEventListener("click",()=>{
document.getElementById("carrito").close();
document.getElementById("pago").showModal()
});
document.getElementById("volver").addEventListener("click",()=>{document.getElementById("carrito").close();});

//botones pantalla pago
document.getElementsByClassName("c-pago__boton--negativo")[0].addEventListener("click",()=>{document.getElementById("pago").close();});
document.getElementsByClassName("c-pago__boton--positivo")[0].addEventListener("click",()=>{console.log("Has pagado");});

//botones login
document.getElementsByClassName("c-login__iniciar")[0].addEventListener("click",()=>{
	usoPromesa();	
});
document.getElementById("cerrarLogin").addEventListener("click",()=>{document.getElementById("login").close();}); 

//botones historial carritos
document.getElementById("cerrarHistorial").addEventListener("click",()=>{document.getElementById("historialCarritos").close();}); 

//probando con el boton del nav
document.getElementById("btnNav1").addEventListener("click",()=>{gethistorial("Admin")});


}

