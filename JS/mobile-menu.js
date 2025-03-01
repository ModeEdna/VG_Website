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

    // Reset all dropdowns when opening/closing the menu
    mobileDropdownButtons.forEach((button) => {
      button.parentElement.classList.remove("show");
    });

    // Prevent body scrolling when menu is active
    document.body.style.overflow = this.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Handle mobile dropdown menus with smooth animation
  mobileDropdownButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const parent = this.parentElement;
      const wasActive = parent.classList.contains("show");

      // First close all dropdowns
      mobileDropdownButtons.forEach((otherButton) => {
        if (otherButton !== this) {
          otherButton.parentElement.classList.remove("show");
        }
      });

      // Then toggle this dropdown after a small delay if we're opening
      // This creates a smoother sequence of animations
      if (!wasActive) {
        parent.classList.add("show");
      } else {
        parent.classList.remove("show");
      }
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

  // Close menu when clicking outside
  mobileOverlay.addEventListener("click", function (e) {
    // Only close if clicking directly on the overlay (not its children)
    if (e.target === this) {
      hamburger.classList.remove("active");
      mobileOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
