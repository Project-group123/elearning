var allCourse = [];

function add() {
  var register = document.getElementById("course").value;
  var showErr = document.getElementById("showErr");
  var disp = document.getElementById("disp");

  if (register == "") {
    showErr.innerHTML = `<p style="color:red;">No Course registered</p>`;
  } else {
    showErr.innerHTML = "";
    document.getElementById("course").value = ""; 

    allCourse.push(register);

    localStorage.setItem('allCourses', JSON.stringify(allCourse));

    disp.innerHTML = "";
    for (var i = 0; i < allCourse.length; i++) {
      disp.innerHTML += `<p style="margin-bottom: 15px;">${allCourse[i]}</p>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var storedCourses = localStorage.getItem('allCourses');
  if (storedCourses) {
    allCourse = JSON.parse(storedCourses);
    var disp = document.getElementById("disp");
    disp.innerHTML = "";
    for (var i = 0; i < allCourse.length; i++) {
      disp.innerHTML += `<p style="margin-bottom: 15px;">${allCourse[i]}</p>`;
    }
  }
});
