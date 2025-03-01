document.addEventListener("DOMContentLoaded", function () {
  // Setup scroll buttons for all card container sections
  const sections = document.querySelectorAll(".admin-cards");

  sections.forEach((section) => {
    const cardContainer = section.querySelector(".team-card-container");
    const leftButton = section.querySelector(".left-button");
    const rightButton = section.querySelector(".right-button");

    // Reset scroll position to start (to make first cards visible)
    cardContainer.scrollLeft = 0;

    // Calculate card width and appropriate scroll amount
    const firstCard = cardContainer.querySelector(".card-about-us");
    const cardWidth = firstCard
      ? firstCard.offsetWidth +
        parseInt(getComputedStyle(firstCard).marginRight)
      : 300;
    const scrollAmount = cardWidth * 2; // Scroll by 2 cards at a time

    rightButton.addEventListener("click", function () {
      cardContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    leftButton.addEventListener("click", function () {
      cardContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    // Hide/show scroll buttons based on scroll position
    function updateButtonVisibility() {
      // Left button visibility
      if (cardContainer.scrollLeft <= 0) {
        leftButton.style.opacity = "0.5";
        leftButton.style.pointerEvents = "none"; // Disable button when at the start
      } else {
        leftButton.style.opacity = "1";
        leftButton.style.pointerEvents = "auto"; // Enable button
      }

      // Right button visibility
      if (
        cardContainer.scrollLeft + cardContainer.clientWidth >=
        cardContainer.scrollWidth - 10
      ) {
        rightButton.style.opacity = "0.5";
        rightButton.style.pointerEvents = "none"; // Disable button when at the end
      } else {
        rightButton.style.opacity = "1";
        rightButton.style.pointerEvents = "auto"; // Enable button
      }
    }

    // Add scroll event listener
    cardContainer.addEventListener("scroll", updateButtonVisibility);

    // Initial check for button visibility
    updateButtonVisibility();

    // Hide buttons if there's nothing to scroll
    if (cardContainer.scrollWidth <= cardContainer.clientWidth) {
      leftButton.style.display = "none";
      rightButton.style.display = "none";
    } else {
      leftButton.style.display = "flex"; // Use flex for better centering
      rightButton.style.display = "flex";
    }
  });
});
