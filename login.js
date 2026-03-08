function login(){

const username=document.getElementById("username").value;
const password=document.getElementById("password").value;

if(username==="admin" && password==="admin123"){

// save login session
localStorage.setItem("isLoggedIn",true);

// redirect to dashboard
window.location.href="dashboard.html";

}

else{
alert("Invalid username or password");
}

}