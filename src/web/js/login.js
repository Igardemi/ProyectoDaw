let usuario = null;

function getUsers() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/usuarios");
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
//No se si pasarle por parametro el array
function iniciarSesion(datos) {

    let estaIniciado = false;
    let nombre = document.getElementById("user");
    let pass = document.getElementById("password");

    if (nombre.value == "" && pass.value == "") {
        alert("Introduce los dos datos");
    } else {
        datos.forEach((e) => {
            if (e.nombre == nombre.value && e.password == pass.value) {
                usuario=e;
                estaIniciado=true;

                if (carrito.articulos.length == 0) {
                    // vacio
                }else{
                    carrito.setIdCliente(usuario)
                    guardarCarrito();
                }

                getCarritos();
                document.getElementById("login").close();
                document.getElementById("historialCarritos").showModal()


            }
        });
        if(estaIniciado==false){
            alert("Datos incorrectos")
        }
    }
}

function usoPromesa() {
    
    getUsers()
        .then((datos) => iniciarSesion(datos))
        .catch((error) => console.log(error));
}
