let usuario;

function getUsers() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/usuarios/");
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
    let existeNombre = false;
    let existeContr = false;
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
                alert("Todo ok, estaIniciado="+estaIniciado+"\nEl nombre: "+usuario);
            document.getElementById("login").close();
            }
        });
        if(estaIniciado==false){
            alert("Mal")
        }
        // if (existeNombre == false || existeContr == false) {
        //     alert("Algo esta mal");
        // } else {
        //     usuario=nombre.value;
        //     estaIniciado=true;
        //     alert("Todo ok, estaIniciado="+estaIniciado+"\nEl nombre: "+usuario);
        //     document.getElementById("login").close();
        // }
    }
}

function usoPromesa() {
    getUsers()
        .then((datos) => iniciarSesion(datos))
        .catch((error) => console.log(error));
}
