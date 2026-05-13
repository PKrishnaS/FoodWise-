// shared.js — included on every page after login

const API = "http://localhost:5000/api";

// Redirect to login if not logged in
function requireAuth() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) window.location.href = "login.html";
  return user;
}

// Render the sidebar
function renderSidebar(activePage) {
  const user = requireAuth();

  const navItems = [
    { label: "Dashboard",   icon: "📊", href: "dashboard.html",   page: "dashboard" },
    { label: "Food Entry",  icon: "🍽️", href: "food.html",        page: "food" },
    { label: "Waste Entry", icon: "♻️", href: "waste.html",       page: "waste" },
    { label: "Prediction",  icon: "🤖", href: "prediction.html",  page: "prediction" },
    { label: "Analysis",    icon: "📈", href: "analysis.html",    page: "analysis" },
    { label: "Surplus/NGO", icon: "🤝", href: "surplus.html",     page: "surplus" },
    { label: "Reports",     icon: "📋", href: "reports.html",     page: "reports" },
    { label: "Users",       icon: "👥", href: "users.html",       page: "users" },
  ];

  const navHTML = navItems.map(item => `
    <a href="${item.href}" class="nav-item ${activePage === item.page ? 'active' : ''}">
      <span class="nav-icon">${item.icon}</span>
      ${item.label}
    </a>
  `).join("");

  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);

  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="icon">🌿</div>
      <span>FoodWise</span>
    </div>
    <div class="nav-section">Main Menu</div>
    ${navHTML}
    <div class="sidebar-bottom">
      <div class="user-chip">
        <div class="user-avatar">${initials}</div>
        <div class="user-info">
          <div class="user-name">${user.name}</div>
          <div class="user-role">${user.role}</div>
        </div>
        <button class="logout-btn" onclick="logout()" title="Logout">✕</button>
      </div>
    </div>
  `;
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Utility: show alert
function showAlert(elId, message, type = "error") {
  const el = document.getElementById(elId);
  if (!el) return;
  el.className = `alert alert-${type}`;
  el.textContent = message;
  el.style.display = "block";
  setTimeout(() => el.style.display = "none", 4000);
}
