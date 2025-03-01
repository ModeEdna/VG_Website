document.addEventListener("DOMContentLoaded", function () {
  // Get needed elements
  const cardContainer = document.querySelector(".card-container");
  const leftButton = document.querySelector(".left-button");
  const rightButton = document.querySelector(".right-button");

  // Store original auto-scroll state
  let wasAutoScrolling = false;

  // Reference to the auto-scroll interval from the original script
  let originalScrollInterval;

  // Find the interval that's moving the card container
  function findAutoScrollInterval() {
    // Look for all intervals that might be modifying scrollLeft
    const initialScrollLeft = cardContainer.scrollLeft;

    // Check after a small delay if scrollLeft has changed without user interaction
    setTimeout(() => {
      if (cardContainer.scrollLeft !== initialScrollLeft) {
        wasAutoScrolling = true;
      }
    }, 100);

    // Look for window-level intervals that might contain the scroll function
    for (let i = 1; i < 9999; i++) {
      const tempInterval = window[`setInterval${i}`];
      if (tempInterval && typeof tempInterval === "function") {
        originalScrollInterval = i;
      }
    }
  }

  // Force stop auto-scrolling temporarily
  function pauseAutoScroll() {
    // Get access to original script's scope
    if (window.stopAutoScroll) {
      wasAutoScrolling = true;
      window.stopAutoScroll();
    } else {
      // Try to clear all possible intervals
      for (let i = 1; i < 100; i++) {
        clearInterval(i);
      }
    }
  }

  // Resume auto-scrolling if it was active
  function resumeAutoScroll() {
    if (wasAutoScrolling && window.startAutoScroll) {
      setTimeout(() => {
        window.startAutoScroll();
      }, 2000); // Wait 2 seconds before resuming
      wasAutoScrolling = false;
    }
  }

  // Enhanced button functionality
  if (leftButton && rightButton && cardContainer) {
    // Apply updated click handlers that pause auto-scroll
    leftButton.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Left button clicked - pausing auto-scroll");

      // Stop auto-scrolling while we perform manual scroll
      pauseAutoScroll();

      // Scroll left
      cardContainer.scrollBy({
        left: -300,
        behavior: "smooth",
      });

      // Resume auto-scrolling after a delay
      setTimeout(resumeAutoScroll, 2000);

      // Make buttons visible longer
      leftButton.classList.add("visible");
      setTimeout(() => {
        if (!cardContainer.matches(":hover")) {
          leftButton.classList.remove("visible");
        }
      }, 3000);
    });

    rightButton.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Right button clicked - pausing auto-scroll");

      // Stop auto-scrolling while we perform manual scroll
      pauseAutoScroll();

      // Scroll right
      cardContainer.scrollBy({
        left: 300,
        behavior: "smooth",
      });

      // Resume auto-scrolling after a delay
      setTimeout(resumeAutoScroll, 2000);

      // Make buttons visible longer
      rightButton.classList.add("visible");
      setTimeout(() => {
        if (!cardContainer.matches(":hover")) {
          rightButton.classList.remove("visible");
        }
      }, 3000);
    });

    // Make window functions available to our script
    if (typeof window.startAutoScroll !== "function") {
      findAutoScrollInterval();
    }

    // Log status
    console.log("Enhanced scroll buttons initialized");
  }
});
