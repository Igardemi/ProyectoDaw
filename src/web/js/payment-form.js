const form = document.getElementById("payment-form");
const cardNumber = document.getElementById("card-number");
const expDate = document.getElementById("expiry-date");
const cvv = document.getElementById("cvv");
const cardholder = document.getElementById("cardholder");

document.getElementsByClassName("c-pago__boton--positivo")[0].addEventListener("click",()=>{
    if (comprobarValores() == true){
      alert("Has pagado correctamente");
      carrito.pagado = true;
      console.log(carrito);
    }
});

function comprobarValores(){
  let resultado = true;

  if (cardNumber.value === "" || expDate.value === "" || cvv.value === "" || cardholder.value === "") {
    alert("Por favor complete todos los campos del formulario")
    return false;
  }

  if (cardNumber.value.replace(/\s/g, "").length !== 16) {
    alert("El número de tarjeta debe tener 16 dígitos")
    return false;
  }

  if (cvv.value.length !== 3) {
    alert("El CVV debe tener 3 dígitos")
    return false;
  } 

  return true;
}