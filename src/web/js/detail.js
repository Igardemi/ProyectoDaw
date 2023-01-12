function muestraProducto(elemento) {

    let contenedor = document.getElementById("contenedorDetalles");
    contenedor.innerHTML =
        `
    <div id="imagenBono" class="c-detail__imagen">
    <img src="${elemento.image}">
    </div>
    <div id="datos" class="l-flex l-flex--direction-column l-flex--gap-7">
        <div class="c-close" id="cerrarDetalle">&#10005;</div>
        <div id="detalleTitulo" class="c-detail__titulo">${elemento.nombre}</div>
        <p id="detalleDescripcion" class="c-detail__descripcion">${elemento.descripcion}</p>
        <div id="detalleCantidad" class="l-flex l-flex--direction-row l-flex--align-items-center">
            <span>Introduce la cantidad:</span>
            <button class="c-detail__boton c-detail__boton--restar" id="botonRestarUnidad">-</button>
            <input type="text" id="cantidadProducto" class="c-detail__cantidad" value="1" min="1"
                width=100px></input>
            <button class="c-detail__boton c-detail__boton--sumar" id="botonSumarUnidad">+</button>
        </div>
        <div id="detallePrecio" class="c-detail__precio">${elemento.precio} €</div>
        <button id="anyadirCarrito" class="c-button ">Añadir a carrito</button>
    </div>
`;
}