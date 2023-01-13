const form = document.getElementById("payment-form");
const cardNumber = document.getElementById("card-number");
const expDate = document.getElementById("expiry-date");
const cvv = document.getElementById("cvv");
const cardholder = document.getElementById("cardholder");
const errorMessage = document.createElement("span");

errorMessage.setAttribute("id", "error-message");
errorMessage.style.color = "red";
form.appendChild(errorMessage);

form.addEventListener("submit", function(event) {
  event.preventDefault();
  errorMessage.innerHTML = "";

  if (cardNumber.value === "" || expDate.value === "" || cvv.value === "" || cardholder.value === "") {
    errorMessage.innerHTML = "Por favor complete todos los campos del formulario";
    return;
  }

  if (cardNumber.value.replace(/\s/g, "").length !== 16) {
    errorMessage.innerHTML = "El número de tarjeta debe tener 16 dígitos";
    return;
  }

  if (!isExpiryDateValid(expDate.value)) {
    errorMessage.innerHTML = "La fecha de expiración es inválida";
    return;
  }

  if (!isCardholderValid(cardholder.value)) {
    errorMessage.innerHTML = "El nombre del titular no puede contener números";
    return;
  }

  if (cvv.value.length !== 3) {
    errorMessage.innerHTML = "El CVV debe tener 3 dígitos";
    return;
  }

  form.submit();
});
// Función para comprobar si la fecha de expiración es válida
function isExpiryDateValid(expDate) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const [month, year] = expDate.split("/");

  if (year < currentYear) {
    return false;
  } else if (year === currentYear && month < currentMonth) {
    return false;
  }

  return true;
}

// Función para comprobar si se han puesto números en el nombre del titular de la tarjeta
function isCardholderValid(cardholder) {
    const regex = /^[^\d]+$/;
    return regex.test(cardholder);
}
