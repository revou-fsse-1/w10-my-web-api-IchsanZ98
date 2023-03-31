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
      <td class="px-6 py-4 whitespace-nowrap">${item.id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${item.username}</td>
      <td class="px-6 py-4 whitespace-nowrap">${item.email}</td>
      <td class="px-6 py-4 whitespace-nowrap">${item.phonenumber}</td>
      <td class="px-6 py-4 whitespace-nowrap">${item.datebirth}</td>
      <td class="px-6 py-4 whitespace-nowrap">${item.password}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 edit-button" data-id="${item.id}">Edit</button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded delete-button" data-id="${item.id}">Delete</button>
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
      <td class="px-6 py-4 whitespace-nowrap">${data.id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${data.username}</td>
      <td class="px-6 py-4 whitespace-nowrap">${data.email}</td>
      <td class="px-6 py-4 whitespace-nowrap">${data.phonenumber}</td>
      <td class="px-6 py-4 whitespace-nowrap">${data.datebirth}</td>
      <td class="px-6 py-4 whitespace-nowrap">${data.password}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 edit-button" data-id="${data.id}">Edit</button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded delete-button" data-id="${data.id}">Delete</button>
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
