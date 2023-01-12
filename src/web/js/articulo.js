class Articulo{
    constructor(nombre,duracion,precio,image){
        
        this.nombre = nombre;
        this.duracion = duracion;
        this.precio = precio;
        this.image = image;
        this.id = this.crearID();
    }

    crearID() {

        let id = this.nombre + this.duracion + this.precio;
        return id;
    }
}