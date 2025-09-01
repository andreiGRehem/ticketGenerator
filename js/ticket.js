onload = function () {
  generateTicket();
};

function generateTicket() {
  var userData = localStorage.getItem("data");
  var userObj = JSON.parse(userData);
  var name = userObj.nome;
  var email = userObj.email;
  var github = userObj.github;
  var img = localStorage.getItem("wallpaper");
  var userdate = userObj.date;
  var date = new Date(userdate.replace(/\//g, "-"));
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  console.log(document.getElementById("name"));
  document.getElementById("name2").innerText = name;
  document.getElementById("name").innerText = name;
  document.getElementById("email").innerText = email;
  document.getElementById("github").innerText = github;
  document.getElementById("date").innerText = formattedDate;
  document.getElementById(
    "userImageUpload"
  ).src = `data:image/png;base64,${img}`;
}
