document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      var loader = document.getElementById("loader");
      loader.style.display = "none";
      
      window.location.href = "Login.html";

      signupSection.style.display = "block";
    }, 4000);
  });
  