firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href = window.location.origin;
  }
});

document.getElementById("sign-in").onclick = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    const errorMessage = error.message;
    alert(errorMessage);
  });
};