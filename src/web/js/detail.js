function muestraProducto(elemento, object) {

    let contenedor = document.getElementById("contenedorDetalles");
    contenedor.innerHTML =
        `
    <div id="imagenBono" class="c-detail__imagen">
    <img src="./assets/img/${elemento.image}">
    </div>
    <div id="datos" class="l-flex l-flex--direction-column l-flex--gap-7">
        <div class="c-close" id="cerrarDetalle">&#10005;</div>
        <div id="detalleTitulo" class="c-detail__titulo">${elemento.nombre}</div>
        <p id="detalleDescripcion" class="c-detail__descripcion">${elemento.descripcion}</p>
        <div id="detalleCantidad" class="l-flex l-flex--direction-row l-flex--align-items-center">
            <span>Introduce la cantidad:</span>
            <button class="c-detail__boton c-detail__boton--restar" id="botonRestarUnidad">-</button>
            <input type="text" id="cantidadProducto" class="c-detail__cantidad" value="1" min="1"
                width=100px disabled></input>
            <button class="c-detail__boton c-detail__boton--sumar" id="botonSumarUnidad">+</button>
            <select name="duracion" id="duracion" style="height:35px; width:170px;" class="g--margin-left-4">
            </select>
        </div>
        <div id="detallePrecio" class="c-detail__precio">${elemento.precio[0]} €</div>
        <button id="anyadirCarrito" class="c-button botonComprar">Añadir a carrito</button>
    </div>
`;
    let selectDuracion = document.getElementById("duracion");
    elemento.duracion.forEach(e =>{
        let opcion = document.createElement("option");
        let texto = document.createTextNode(e);
        opcion.value = e;
        opcion.appendChild(texto);
        selectDuracion.appendChild(opcion);

    });
    let posicionDuracion=0;
    selectDuracion.addEventListener("change",function(){

        posicionDuracion=elemento.duracion.indexOf(selectDuracion.value);
        document.getElementById("detallePrecio").innerHTML=elemento.precio[posicionDuracion]+"€";
    })

    document.getElementById("cerrarDetalle").addEventListener("click", () => { document.getElementById("detalleProducto").close(); });
    document.getElementById("botonRestarUnidad").addEventListener("click", () =>{
        restarUnidad();
        let valorInput = document.getElementById("cantidadProducto").value;
        document.getElementById("detallePrecio").innerHTML=(elemento.precio[posicionDuracion]*valorInput).toFixed(2)+"€";
    });
    document.getElementById("botonSumarUnidad").addEventListener("click", () =>{
        sumarUnidad();
        let valorInput = document.getElementById("cantidadProducto").value;
        document.getElementById("detallePrecio").innerHTML=(elemento.precio[posicionDuracion]*valorInput).toFixed(2)+"€";
    });
    document.getElementById("anyadirCarrito").addEventListener("click", function(){
        let cantidad = document.getElementById("cantidadProducto").value;
        anyadirArticulosCarrito(elemento.nombre,posicionDuracion,object.opciones, cantidad)
    });

}

function restarUnidad() {
    let elementoCantidad = document.getElementById("cantidadProducto");
    if (elementoCantidad.value > 1) {
        elementoCantidad.value--;
    }
    
    
}

function sumarUnidad() {
    document.getElementById("cantidadProducto").value++;
}