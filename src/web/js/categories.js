let contenido;

function getCategories(){
    let object = ciudades;
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
    textInfo="<select id='opciones' name='opciones'>";
    let contador = 0;
    opciones.forEach(opcion => {
        textInfo+=`<option value=${contador}>${opcion}</option>`;
        contador++;
    })
    textInfo+="</select>";
    return textInfo;
}

function getProductos(object){
    let innerText="<div class='l-flex l-flex--wrap'>";
object.opciones.forEach(opcion => {
    innerText+=`
    <div class='c-article g--margin-4'>
    <div class='c-article__imagen g--margin-4'>
    <img src="${opcion.image}" alt="foto ticket" width="200" height="160">
    </div>
    <div class='l-flex l-flex--direction-column g--margin-4'>
    <div class='c-article__nombre g--margin-4'>${opcion.nombre}</div>
    <div class='c-article__duracion'>${getOption(opcion.duracion)}</div>
    <div class='c-article__precio'>${opcion.precio[0]} Euros</div>
    <button class="c-button ${opcion.nombre} ${opcion.duracion} btnBuy">Comprar</button>   
    </div>
    </div>`;   
})
    innerText+="</div>"
    let lienzo = document.getElementById("contenido");
    lienzo.innerHTML=innerText;
    document.getElementById('opciones').selectedIndex
}


window.onload=()=>{
contenido = document.getElementById("contenido");
getCategories();
document.getElementById("btnUsuario").addEventListener("click",()=>{document.getElementById("login").showModal()});
document.getElementById("btnCarrito").addEventListener("click",()=>{document.getElementById("carrito").showModal()});
document.getElementById("btnPagar").addEventListener("click",()=>{document.getElementById("pago").showModal()});
}
