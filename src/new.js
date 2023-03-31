const tableBody = document.querySelector("#table-body");
const form = document.querySelector("#form");

// GET method to fetch data from API
fetch("https://642513949e0a30d92b2897d6.mockapi.io/users")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      // create a new row for each item in the data
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${item.id}</td>
        <td>${item.username}</td>
        <td>${item.email}</td>
        <td>${item.phonenumber}</td>
        <td>${item.datebirth}</td>
        <td>${item.password}</td>
        <td>
          <button class="edit-button" data-id="${item.id}">Edit</button>
          <button class="delete-button" data-id="${item.id}">Delete</button>
        </td>
      `;
      tableBody.appendChild(newRow);
    });
  });

// POST method to add data to the API
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const newItem = {
    username: formData.get("username"),
    email: formData.get("email"),
    phonenumber: formData.get("phonenumber"),
    datebirth: formData.get("datebirth"),
    password: formData.get("password"),
  };

  fetch("https://642513949e0a30d92b2897d6.mockapi.io/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  })
    .then((response) => response.json())
    .then((data) => {
      // create a new row for the added item
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${data.id}</td>
        <td>${data.username}</td>
        <td>${data.email}</td>
        <td>${data.phonenumber}</td>
        <td>${data.datebirth}</td>
        <td>${data.password}</td>
        <td>
          <button class="edit-button" data-id="${data.id}">Edit</button>
          <button class="delete-button" data-id="${data.id}">Delete</button>
        </td>
      `;
      tableBody.appendChild(newRow);

      // reset the form
      form.reset();
    });
});

// PUT method to update data in the API
tableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-button")) {
    const id = event.target.getAttribute("data-id");
    const row = event.target.closest("tr");

    // populate the form with the data of the selected row
    form.elements["username"].value = row.cells[1].textContent;
    form.elements["email"].value = row.cells[2].textContent;
    form.elements["phonenumber"].value = row.cells[3].textContent;
    form.elements["datebirth"].value = row.cells[4].textContent;
    form.elements["password"].value = row.cells[5].textContent;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const updatedItem = {
        username: formData.get("username"),
        email: formData.get("email"),
        phonenumber: formData.get("phonenumber"),
        datebirth: formData.get("datebirth"),
        password: formData.get("password"),
      };

      fetch(`https://642513949e0a30d92b2897d6.mockapi.io/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      })
        .then((response) => response.json())
        .then((data) => {
          // update the row with the new data
          row.cells[1].textContent = data.username;
          row.cells[2].textContent = data.email;
          row.cells[3].textContent = data.phonenumber;
          row.cells[4].textContent = data.datebirth;
          row.cells[5].textContent = data.password;

          // reset the form
          form.reset();
        });
    });
  }
});

// DELETE method to remove data from the API
tableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    const id = event.target.getAttribute("data-id");
    const row = event.target.closest("tr");
    fetch(`https://642513949e0a30d92b2897d6.mockapi.io/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      // remove the row from the table
      row.remove();
    });
  }
});
