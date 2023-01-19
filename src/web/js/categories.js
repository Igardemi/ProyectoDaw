let contenido;

function getCategories() {
	return new Promise(function (resolve, reject) {
	  let xhr = new XMLHttpRequest();
	  xhr.responseType = "json";
	  xhr.open("GET", "http://localhost:3000/ciudades");
	  xhr.send();
	  xhr.onload = () => {
		if (xhr.status == 200) {
		  resolve(xhr.response);
		} else {
		  reject("no se han recibido datos");
		}
	  };
	});
  }

/**
 * Recorre todas las categorias del json y las pinta en cards.
 * @param {*} object Recibe la respuesta de la Api con los datos de todas las ciudades y sus opciones
 */
function paintCategories() {
	getCategories().then((object) => {
		// console.log(object);	
	Array.from(object).forEach((element) => {
		let enlace = document.createElement("a");
		enlace.href = "#";
		enlace.className = "g--decoration-none";
		enlace.addEventListener("click", () => {
			getProductos(element);
		});
		let box = document.createElement("div");
		box.style.backgroundImage = "url(./assets/img/" + element.foto + ")";
		box.className = "c-categorie";
		let title = document.createElement("div");
		title.className = "c-categorie__title";
		let text = document.createElement("h2");
		text.textContent = element.ciudad;
		title.appendChild(text);
		box.appendChild(title);
		enlace.appendChild(box);
		contenido.appendChild(enlace);
	});
})
.catch((error) => console.log(error));
}

function getOption(opciones) {
	textInfo =
		"<select id='opciones' name='opciones' style='height:45px; width:100px;'>";
	let contador = 0;
	console.log(opciones)
	opciones.duracion.forEach((opcion) => {
		textInfo += `<option value="${opciones.precio[contador]}">${opcion}</option>`;
		contador++;
	});
	textInfo += "</select>";
	return textInfo;
}

/**
 * Recorre las opciones de movilidad de la ciuidad selecciona y las pinta en cards.
 * @param {*} object recibe como parametro un objeto ciudad
 */
function getProductos(object){
    document.getElementById("seleccion").innerText="Opciones de movilidad en "+object.ciudad;
    let innerText=`<div class='l-flex l-flex--wrap l-flex--gap-10 l-flex--justify-content-center'>`;
     
object.opciones.forEach(opcion => {
    innerText+=`
    <div class='c-article'>
    <img class='c-article__imagen' src="./assets/img/${opcion.image}" alt="foto ticket" width="300" height="200">
    <div class='c-article__nombre'>${opcion.nombre}</div>
    <div class='l-flex l-flex--direction-row l-flex--justify-content-center l-flex--align-content-center l-flex--gap-5'>
    <div class='c-article__duracion'>${getOption(opcion)}</div>
    <div class='c-article__precio'>${opcion.precio[0]} Euros</div>
    </div>
    <div class='l-flex l-flex--direction-row l-flex--gap-10 g--margin-top-6 g--margin-bottom-6'>
    <button id='${opcion.nombre}' class="c-button c-article__button btnBuy">Comprar</button>
    <button ref="${opcion.nombre}" class="c-button c-button--secundario c-article__button btnInfo">info</button> 
    </div>
    </div>`;   

});
    innerText+="</div>"
    let lienzo = document.getElementById("contenido");
    lienzo.innerHTML=innerText;

   Array.from(document.getElementsByClassName("btnInfo")).forEach((btn) => {
		btn.addEventListener("click", () => {
			muestraProducto(object.opciones.find((a) => a.nombre == btn.getAttribute("ref")), object);
            //pinta el modal
			document.getElementById("detalleProducto").showModal();
		});
	});


    Array.from(document.getElementsByClassName("btnBuy")).forEach(btn =>{
        btn.addEventListener("click",()=>{
			let posicion = btn.parentNode.parentNode.getElementsByClassName('c-article__duracion')[0].firstChild.selectedIndex;
            anyadirArticulosCarrito(btn.id , posicion, object.opciones);
        })
    });

	Array.from(document.getElementsByName('opciones')).forEach((a)=>{a.addEventListener('change', ()=>{ 
		a.parentNode.parentNode.getElementsByClassName('c-article__precio')[0].textContent=a.value + " Euros";
		
	});});
		

}


