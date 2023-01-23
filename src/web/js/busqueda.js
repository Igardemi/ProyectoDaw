//Busqueda
function getCategoriasBusqueda() {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "http://127.0.0.1:8000/api/ciudades");
		xhr.responseType = "json";
		xhr.send();
		xhr.onload = function () {
			if (xhr.status == 200) {
				resolve(xhr.response);
			} else {
				reject("Error " + xhr.statusText);
			}
		};
	});
}

function buscar() {
	let input = document.getElementById("busqueda").value;
	getCategoriasBusqueda()
		.then((datos) => {
			verUnProducto(datos, input);
		})
		.catch((error) => console.log(error));
}

function verUnProducto(listado, buscado) {
	let arrayOpciones = [];
	let arrayCoincidencias = [];
	listado.forEach((ciudades) => {
		ciudades.opciones.forEach((opcion) => {
			arrayOpciones.push(opcion);
			if (opcion.nombre.toLowerCase().includes(buscado.toLowerCase())) {
				arrayCoincidencias.push(opcion);
			}
		});
	});
	verCoincidencias(arrayCoincidencias);
}

function verCoincidencias(datos) {
	let titulo = document.getElementById("titulo");
	let contenedor = document.getElementById("contenido");
	let texto = "";
	if (datos.length == 0) {
		texto += "No hay ninguna coincidencia";
	} else {
		datos.forEach(elm => {
			// console.log(elm);
			texto += `
      <div class='c-article'>
      <img class='c-article__imagen' src="./assets/img/${
				elm.image
			}" alt="foto ticket" width="300" height="200">
      <div class='c-article__nombre'>${elm.nombre}</div>
      <div class='l-flex l-flex--direction-row l-flex--justify-content-center l-flex--align-content-center l-flex--gap-5'>
      <div class='c-article__duracion'>${getOption(elm)}</div>
      <div class='c-article__precio'>${elm.precio[0]} Euros</div>
      </div>
      <div class='l-flex l-flex--direction-row l-flex--gap-10 g--margin-top-6 g--margin-bottom-6'>
      <button id='${
				elm.nombre
			}' class="c-button c-article__button btnBuy">Comprar</button>
      <button ref="${
				elm.nombre
			}" class="c-button c-button--secundario c-article__button btnInfo">info</button> 
      </div>
      </div>`;
		});
	}
	titulo.innerHTML = "Resultados de la búsqueda";
	contenedor.innerHTML = texto;

  Array.from(document.getElementsByName('opciones')).forEach((a)=>{a.addEventListener('change', ()=>{ 
		// console.log(a.parentNode.parentNode.getElementsByClassName('c-article__precio')[0].textContent);
		a.parentNode.parentNode.getElementsByClassName('c-article__precio')[0].textContent=a.value + " Euros";
		
	});});

  Array.from(document.getElementsByClassName("btnInfo")).forEach((btn) => {
		btn.addEventListener("click", () => {
			muestraProducto(datos.find((a) => a.nombre == btn.getAttribute("ref")));
            //pinta el modal
			document.getElementById("detalleProducto").showModal();
		});
	});


    Array.from(document.getElementsByClassName("btnBuy")).forEach(btn =>{
        btn.addEventListener("click",()=>{
			let posicion = btn.parentNode.parentNode.getElementsByClassName('c-article__duracion')[0].firstChild.selectedIndex;
      console.log(posicion)      
      anyadirArticulosCarrito(btn.id , posicion, datos);
        })
    });

}
