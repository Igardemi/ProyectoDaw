class Carrito{
    // constructor(id){
    //     this.id= id;
    //     this.idCliente; //introducir la id cuando alvaro acabe el login
    //     this.fechaCreacion = this.crearFecha();
    //     this.pagado=false;
    //     this.articulos = [];
    // }
    constructor(_id, _idcliente=null, _fechaCreacion=null, _articulos=[]){
        this.id= _id;
        this.idCliente= _idcliente; //introducir la id cuando alvaro acabe el login     
        this.pagado=false;
        this.articulos = _articulos;
        if( _fechaCreacion==null){
            this.fechaCreacion = this.crearFecha();
        }
        else{
            this.fechaCreacion = _fechaCreacion;
        }
    }

    setIdCliente(user){
        this.idCliente= user;
    }

    
    vaciarCarrito(){
        this.articulos=[];
    }

    crearFecha(){
        let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        let dias_semana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        let fechaAct = new Date();
        let fechaCompleta = (dias_semana[fechaAct.getDay()] + ', ' + fechaAct.getDate() + ' de ' + meses[fechaAct.getMonth()] + ' de ' + fechaAct.getUTCFullYear());
        return fechaCompleta;
    }

    nuevoArticulo(articulo, unidades){
        // console.log(articulo)
        let buscarRepetido = this.articulos.find(producto => producto.id == articulo.id);
        if (!buscarRepetido) {
            articulo.cantidad = unidades;
            this.articulos.push(articulo);
        }else{
            buscarRepetido.cantidad=Number.parseInt(unidades)+Number.parseInt(buscarRepetido.cantidad);
        }
    }

    borrarArticulo(idArt){
        let posicionArt = this.articulos.findIndex(articulo => articulo.id == idArt);
        this.articulos.splice(posicionArt,1);
        verCarrito();
    }

    modificarUnidades(idArt, unidades){
        let articulo = this.articulos.find(art => art.id == idArt);
        if (unidades == 1) {
            articulo.cantidad++;
            verCarrito();
        }
        if (unidades == -1) {
            articulo.cantidad--;
            if(articulo.cantidad <= 0){
                this.borrarArticulo(idArt);
            }
            verCarrito();
        }

        
    }

    //ya esta
    crearCarrito(){
        let precioTotal = 0;
        let sentencia = "";
        this.articulos.forEach(producto => {
            precioTotal += producto.precio * producto.cantidad;
            sentencia += `<div class="c-item ">
                            <img src="./assets/img/${producto.image}" alt="bus" class="c-item__imagen">
                            <div class="c-item__nombre">
                                <div class="c-item__texto c-item__texto--pequeño">${producto.duracion}</div>
                                <div class="c-item__texto">${producto.nombre}</div>
                            </div>
                            <div class="l-flex l-flex--direction-row l-flex--gap-5">
                                <div id="${producto.id}" class="c-item__texto btnRestar">-</div>
                                <div class="c-item__cantidad">${producto.cantidad}</div>
                                <div id="${producto.id}" class="c-item__texto btnSumar">+</div>
                            </div>
                            <div class="c-item__texto c-item__nombre--pequeño">${(producto.precio * producto.cantidad).toFixed(2)}€</div>
                            <button id="${producto.id}" class="c-item__borrar btnBorrar">X</button>
                        </div>`
        });

        let informacion={ "html" : sentencia, "total" : precioTotal.toFixed(2) };
        return informacion;
    }
}