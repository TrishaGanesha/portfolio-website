
document.addEventListener("DOMContentLoaded", () => {
  // Theme switch
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
      const isDark = theme === "dark";
      themeToggle.textContent = isDark ? "🌙" : "☀️";
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
      themeToggle.title = isDark ? "Switch to light theme" : "Switch to dark theme";
    }
  }

  // Start with the light theme
  setTheme("light");

  themeToggle?.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Project filtering and search
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const projectSearch = document.getElementById("projectSearch");
  const projectCount = document.getElementById("projectCount");
  const noProjects = document.getElementById("noProjects");

  let selectedCategory = "all";

  function filterProjects() {
    const searchText = projectSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const categories = card.dataset.category
        .toLowerCase()
        .split(/\s+/);

      const matchesCategory =
        selectedCategory === "all" ||
        categories.includes(selectedCategory);

      const matchesSearch =
        card.textContent.toLowerCase().includes(searchText);

      const isVisible = matchesCategory && matchesSearch;

      card.hidden = !isVisible;

      if (isVisible) {
        visibleCount++;
      }
    });

    projectCount.textContent =
      `${visibleCount} project${visibleCount === 1 ? "" : "s"} found`;

    noProjects.hidden = visibleCount !== 0;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      filterProjects();
    });
  });

  projectSearch?.addEventListener("input", filterProjects);

  filterProjects();

  // Contact form: prepares an email using the visitor's email application
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  // Replace this with your real email address.
  const portfolioEmail = "YOUR_EMAIL@example.com";

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const name = document.getElementById("name").value.trim();
    const senderEmail = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${senderEmail}\n\n` +
      `Message:\n${message}`
    );

    const mailtoLink =
      `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;

    formStatus.textContent =
      "Opening your email application. If nothing opens, check that an email app is configured.";

    window.location.href = mailtoLink;
  });

  // Footer year
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
