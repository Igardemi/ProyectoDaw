let usuario = null;

function getUsers() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8000/api/usuarios");
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
        datos.forEach((user) => {
            if (user.nombre == nombre.value && user.password == pass.value) {
                // usuario=user;
                estaIniciado=true;   
                localStorage.setItem("usuario",JSON.stringify(user));            
                gethistorial();
                document.getElementById("login").close();
                document.getElementById("historialCarritos").showModal()
            }
        });
        //probando
        if (estaIniciado==true && carrito.articulos.length != 0) {
                    guardarCarrito();
        }
        if(estaIniciado==false){
            alert("Datos incorrectos")
        }
    }
}

function usoPromesa() {  
    getUsers().then((datos) => iniciarSesion(datos)).catch((error) => console.log(error));
}
