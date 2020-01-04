firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href = window.location.origin;
  }
});

document.getElementById("sign-up").onclick = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirmation = document.getElementById("password-confirmation").value;

  if(password != passwordConfirmation){
    alert("Passwords do not match!");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    const errorMessage = error.message;
    alert(errorMessage);
  });
};