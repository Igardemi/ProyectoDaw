let carrito;

//funcion que crea los botones de las ciudades destacadas.
function botonesNav(){
  getCategories().then(
    response => {
      let botonesNav = document.getElementById("buttonsNav");
      response.forEach(evento => {
          if(evento.destacada==true){
            let button = document.createElement("button");
            button.type='button';
            button.innerText=evento.ciudad.toUpperCase();
            button.classList="c-header__btnCategory";
            botonesNav.appendChild(button);
  
            button.addEventListener("click", () => {
              getProductos(evento);
            });
          }
      })
    }
  )
  }

function getDescuentos() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/descuentos");
  xhr.responseType = "json";
  xhr.send();
  xhr.onload = function () {
    calcularDescuento(xhr.response);
    return xhr.response;
  };
}

function post(newPost, idUsuario) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "http://localhost:3000/carritos/");
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(newPost));

    xhr.onload = () => {
      if (xhr.status == 201) {
        resolve("se ha insertado correctamente");
      } else {
        reject("no se ha insertado");
      }
    };
  });
}

// funciones de el carrito
function anyadirArticulosCarrito(nombreArticulo, duracion, opciones) {
  let producto = opciones.find((a) => a.nombre == nombreArticulo);

  let articulo = new Articulo(
    producto.nombre,
    producto.duracion[duracion],
    producto.precio[duracion],
    producto.image
  );

  carrito.nuevoArticulo(articulo);
}

function verCarrito() {
  let dialog = document.getElementById("carrito");
  botonesCarrito();

  if (dialog.open) {
    dialog.close();
  }
  dialog.showModal();

  let listaProductos = document.getElementById("carritoProductos");
  let precioTotal = document.getElementById("precioTotal");
  let precioFinal = document.getElementById("precioFinal");

  precioFinal.innerHTML = "0";
  precioTotal.innerHTML = "0";

  let productos = carrito.crearCarrito();
  listaProductos.innerHTML = productos.html;
  precioTotal.innerHTML = productos.total;
  precioFinal.innerHTML = productos.total;

  botonesArticulos();
}

function botonesCarrito() {
  document.getElementById("btnPagar").addEventListener("click", () => {
    document.getElementById("carrito").close();
    if (usuario != null) {
      document.getElementById("pago").showModal();
    } else {
      document.getElementById("login").close();
      document.getElementById("login").showModal();
    }
  });

  document.getElementById("volver").addEventListener("click", () => {
    document.getElementById("carrito").close();
  });

  document.getElementById("borrarCarrito").addEventListener("click", () => {
    carrito.vaciarCarrito();
    document.getElementById("carrito").close();
  });

  let btnDescuento = document.getElementById("btnDescuento");
  btnDescuento.addEventListener("click", () => {
    getDescuentos();
  });
}

function botonesArticulos() {
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

function calcularDescuento(decuentos) {
  let inputDescuento = document.getElementById("campoDescuento").value;
  let precioTotal = document.getElementById("precioTotal");
  let precioFinal = document.getElementById("precioFinal");

  let busqueda = decuentos.find(
    (descuento) => descuento.codigo == inputDescuento
  );

  if (busqueda) {
    let valorDescuento = busqueda.descuento;
    let calculoDescuento =
      precioTotal.textContent -
      precioTotal.textContent * (valorDescuento / 100);
    precioFinal.innerHTML = calculoDescuento.toFixed(2);
  } else {
    alert("cupon descuento no válido");
    precioFinal.innerHTML = precioTotal.textContent;
  }
}

function guardarCarrito() {
  carrito.setIdCliente(usuario.id);
  console.log(carrito);
  post(carrito).then();
}

window.onload = () => {
  carrito = new Carrito(Date.now());

  //categorias y botones
  contenido = document.getElementById("contenido");
  paintCategories();
  botonesNav();

  //botones header
  document.getElementById("btnUsuario").addEventListener("click", () => {
    if(usuario==null){
      document.getElementById("login").showModal()
    }else{
      getCarritos();
      document.getElementById("historialCarritos").showModal();
    }

  });
  document.getElementById("btnCarrito").addEventListener("click", verCarrito);

  //botones pantalla pago
  document
    .getElementsByClassName("c-pago__boton--negativo")[0]
    .addEventListener("click", () => {
      document.getElementById("pago").close();
    });
  document
    .getElementsByClassName("c-pago__boton--positivo")[0]
    .addEventListener("click", () => {
      console.log("Has pagado");
    });

  //botones login
  document
    .getElementsByClassName("c-login__iniciar")[0]
    .addEventListener("click", () => {
      usoPromesa();
    });
  document.getElementById("cerrarLogin").addEventListener("click", () => {
    document.getElementById("login").close();
  });

  //botones historial carritos
  document.getElementById("cerrarHistorial").addEventListener("click", () => {
    document.getElementById("historialCarritos").close();
  });

  //Boton busqueda
  document.getElementById("btnBusqueda").addEventListener("click", ()=>{
    buscar()
  });

  //boton nav
  document.getElementById("btnNav1").addEventListener("click", ()=>{
    botonesNav();
  });
};

