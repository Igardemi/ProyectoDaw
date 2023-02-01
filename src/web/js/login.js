let usuario = null;

function login(newPost) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("POST", "http://localhost:8000/api/login/");
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.send(JSON.stringify(newPost));
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(xhr.response);
        } else {
          reject("no se ha insertado");
        }
      };
    });
}

function logout() {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("POST", "http://localhost:8000/api/logout/");
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem("usuario")).token);
      xhr.send();
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(xhr.response);
        } else {
          reject("no se ha insertado");
        }
      };
    });
}

function iniciarSesion() {

    let estaIniciado = false;
    let nombre = document.getElementById("user").value;
    let contrasenya = document.getElementById("password").value;

    let body = {
        "nombre" : nombre,
        "password" : contrasenya
    }

    login(body).then(usuario => {
        estaIniciado=true;
        localStorage.setItem("usuario",JSON.stringify(usuario));
        gethistorial()
        document.getElementById("login").close();
        document.getElementById("historialCarritos").showModal()
        
    });

    if (estaIniciado==true && carrito.articulos.length != 0) {
        guardarCarrito();
    }
}