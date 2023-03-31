document
  .querySelector("#email")
  .addEventListener("input", () => checkCredential("email"));

document
  .querySelector("#password")
  .addEventListener("input", () => checkCredential("password"));

document.querySelector("#btn").addEventListener("click", () => setAction());

document
  .querySelector("form")
  .addEventListener("submit", (e) => e.preventDefault());

function setAction() {
  fetch("https://642513949e0a30d92b2897d6.mockapi.io/users")
    .then((response) => response.json())
    .then((data) => {
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const check = data.find(
        (a) => a.email === email.value && a.password === password.value
      );
      if (check !== undefined) {
        sessionStorage.setItem("Name", check.username);
        sessionStorage.setItem("userID", check.id);
        window.location.href = "crud.html";
      } else {
        alert("Invalid Email or Password");
      }
    });
}

function checkCredential(id) {
  if (id === "email") {
    const pattern = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const val = document.getElementById("email").value;
    if (pattern.test(val)) {
      const text = `
			<div id ='email-notif-text' class = "text-green-500">
				This is a valid email address
			</div>`;
      document.getElementById("email-text").innerHTML = text;
    } else {
      const text = `
			<div id ='email-notif-text' class = "text-red-500">
				This is not a valid email address
			</div>`;
      document.getElementById("email-text").innerHTML = text;
    }
  }
  if (id === "password") {
    const val = document.getElementById("password").value;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;
    const passUppercase = document.getElementById("pass-uppercase");
    const passLowercase = document.getElementById("pass-lowercase");
    const passNumber = document.getElementById("pass-number");
    if (uppercasePattern.test(val)) {
      const uppercaseText = `Uppercase`;
      passUppercase.innerHTML = uppercaseText;
      passUppercase.className = "text-green-500";
    } else {
      const uppercaseText = `Uppercase`;
      passUppercase.innerHTML = uppercaseText;
      passUppercase.className = "text-red-500";
    }

    if (lowercasePattern.test(val)) {
      const lowercaseText = `Lowercase`;
      passLowercase.innerHTML = lowercaseText;
      passLowercase.className = "text-green-500";
    } else {
      const lowercaseText = `Lowercase`;
      passLowercase.innerHTML = lowercaseText;
      passLowercase.className = "text-red-500";
    }

    if (numberPattern.test(val)) {
      const numberText = `<i class="fa-solid fa-check"></i>Number`;
      passNumber.innerHTML = numberText;
      passNumber.className = "text-green-500";
    } else {
      const numberText = `<i class="fa-solid fa-xmark"></i>Number`;
      passNumber.innerHTML = numberText;
      passNumber.className = "text-red-500";
    }
  }
}
