let contenido;


function getCategories(object){
object.forEach(element => {  
    let enlace = document.createElement("a");
    enlace.href="#";
    enlace.className="g--decoration-none";
    enlace.addEventListener("click",()=>{
        console.log(element);
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

window.onload=()=>{
contenido = document.getElementById("contenido");
contenido.className="l-grid l-grid--colums-auto l-grid--gap-10 g--margin-horizonal-12";
getCategories(ciudades);
}