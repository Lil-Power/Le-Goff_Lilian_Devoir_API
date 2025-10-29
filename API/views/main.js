const API_URL = "http://localhost:3000";
const token = localStorage.getItem("token");

/* LOGIN / LOGOUT */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const { email, password } = Object.fromEntries(formData.entries());

      try {
        const res = await fetch(`${API_URL}/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "dashboard.html";
        } else {
          loginMessage.textContent = data.message || "Erreur de connexion";
          loginMessage.style.color = "red";
        }
      } catch (err) {
        loginMessage.textContent = "Erreur serveur";
        loginMessage.style.color = "red";
      }
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }

  // Redirection si non connecté
  if (!token && !window.location.href.includes("index.html")) {
    window.location.href = "index.html";
  }
});

/* DASHBOARD */
function loadDashboardUser() {
  if (!token) return;

  const userEmail = JSON.parse(atob(token.split(".")[1])).email;

  fetch(`${API_URL}/users`, {
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => res.json())
    .then((users) => {
      const user = users.find((u) => u.email === userEmail);
      if (!user) return;
      const nameElem = document.getElementById("userName");
      const emailElem = document.getElementById("userEmail");
      if (nameElem) nameElem.textContent = user.name;
      if (emailElem) emailElem.textContent = user.email;
    });

  const dateElem = document.getElementById("currentDate");
  if (dateElem) dateElem.textContent = new Date().toLocaleDateString();

  loadReservations();
}

/* USERS CRUD */
async function loadUsers() {
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: "Bearer " + token },
  });
  const users = await res.json();
  const tbody = document.querySelector("#usersTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  users.forEach((u) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${u.name}</td>
                    <td>${u.firstname || ""}</td>
                    <td>${u.email}</td>
                    <td><button onclick="deleteUser('${
                      u.email
                    }')">Supprimer</button></td>`;
    tbody.appendChild(tr);
  });
}

async function addUser(form) {
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  form.reset();
  loadUsers();
}

async function deleteUser(email) {
  await fetch(`${API_URL}/users/${email}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  loadUsers();
}

/* CATWAYS CRUD */
async function loadCatways() {
  const res = await fetch(`${API_URL}/catways`, {
    headers: { Authorization: "Bearer " + token },
  });
  const catways = await res.json();
  const tbody = document.querySelector("#catwaysTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  catways.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${c.catwayNumber}</td>
                    <td>${c.catwayType}</td>
                    <td>${c.stateDescription || ""}</td>
                    <td><button onclick="deleteCatway('${
                      c._id
                    }')">Supprimer</button></td>`;
    tbody.appendChild(tr);
  });
}

async function addCatway(form) {
  const formData = new FormData(form);
  const catway = Object.fromEntries(formData.entries());
  await fetch(`${API_URL}/catways`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(catway),
  });
  form.reset();
  loadCatways();
}

async function deleteCatway(id) {
  await fetch(`${API_URL}/catways/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  loadCatways();
}

/* RESERVATIONS CRUD */
async function loadReservations() {
  const res = await fetch(`${API_URL}/catways`, {
    headers: { Authorization: "Bearer " + token },
  });
  const catways = await res.json();
  const tbody = document.querySelector("#reservationsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  catways.forEach((catway) => {
    if (catway.reservations) {
      catway.reservations.forEach((r) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${catway.catwayNumber}</td>
                        <td>${r.clientName}</td>
                        <td>${r.boatName}</td>
                        <td>${r.startDate}</td>
                        <td>${r.endDate}</td>
                        <td><button onclick="deleteReservation('${catway._id}','${r._id}')">Supprimer</button></td>`;
        tbody.appendChild(tr);
      });
    }
  });
}

async function addReservation(form, catwayId) {
  const formData = new FormData(form);
  const reservation = Object.fromEntries(formData.entries());
  await fetch(`${API_URL}/catways/${catwayId}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(reservation),
  });
  form.reset();
  loadReservations();
}

async function deleteReservation(catwayId, reservationId) {
  await fetch(`${API_URL}/catways/${catwayId}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  loadReservations();
}
