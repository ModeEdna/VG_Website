document.addEventListener("DOMContentLoaded", function () {
  // Get hamburger menu and mobile overlay elements
  const hamburger = document.querySelector(".hamburger");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const mobileDropdownButtons = document.querySelectorAll(
    ".mobile-menu .dropdown-button"
  );

  // Toggle mobile menu when hamburger is clicked
  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    mobileOverlay.classList.toggle("active");

    // Prevent body scrolling when menu is active
    document.body.style.overflow = this.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Handle mobile dropdown menus
  mobileDropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle this dropdown
      this.parentElement.classList.toggle("show");

      // Close other dropdowns
      mobileDropdownButtons.forEach((otherButton) => {
        if (otherButton !== this) {
          otherButton.parentElement.classList.remove("show");
        }
      });
    });
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(
    ".mobile-menu a:not(.dropdown-button)"
  );
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      mobileOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
});
