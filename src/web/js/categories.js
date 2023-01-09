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

function getProductos(object){
    console.log(object);
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
    <button class="c-button c-article__button ${opcion.nombre} ${opcion.duracion} btnBuy">Comprar</button>
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
    Array.from(document.getElementsByClassName("btnBuy")).forEach(btn =>{
        btn.addEventListener("click",()=>{alert("Producto añadido al carrito")});
    });

}


window.onload=()=>{

contenido = document.getElementById("contenido");
getCategories();
document.getElementById("btnUsuario").addEventListener("click",()=>{document.getElementById("login").showModal()});
document.getElementById("btnCarrito").addEventListener("click",()=>{document.getElementById("carrito").showModal()});
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

}

