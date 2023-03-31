document
  .querySelector("#email")
  .addEventListener("input", () => checkCredential("email"));

document
  .querySelector("#password")
  .addEventListener("input", () => checkCredential("password"));

document
  .querySelector("#password-confirm")
  .addEventListener("input", () => confirmPassword("password-confirm"));

document
  .querySelector("form")
  .addEventListener("submit", (e) => e.preventDefault());

document.querySelector("#btn").addEventListener("click", () => setAction());

function checkCredential(id) {
  if (id === "email") {
    const pattern = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const val = document.getElementById("email").value;
    if (pattern.test(val)) {
      const text = `
        <div id="email-notif-text" class="text-green-500">
          This is a valid email address
        </div>`;
      document.getElementById("email-text").innerHTML = text;
    } else {
      const text = `
        <div id="email-notif-text" class="text-red-500">
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
      const numberText = `Number`;
      passNumber.innerHTML = numberText;
      passNumber.className = "text-green-500";
    } else {
      const numberText = `Number`;
      passNumber.innerHTML = numberText;
      passNumber.className = "text-red-500";
    }
  }
}

async function setAction() {
  const url = "https://642513949e0a30d92b2897d6.mockapi.io/users";
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const data = {
    email,
    password,
  };
  console.log(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
  }
}

function confirmPassword() {
  const pass = document.getElementById("password");
  const passwordConfirm = document.getElementById("password-confirm");
  const passConfirm = document.getElementById("pass-confirm");
  if (passwordConfirm.value != "") {
    if (pass.value != passwordConfirm.value) {
      passConfirm.innerHTML = `<div id="email-notif-text" class="text-red-500">Password Not Match</div>`;
    } else {
      passConfirm.innerHTML = `<div id="email-notif-text" class="text-green-500">Password Match</div>`;
    }
  }
  checkCredential("password");
}
