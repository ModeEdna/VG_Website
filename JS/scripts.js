document.addEventListener("DOMContentLoaded", function () {
  const carouselImages = document.querySelector(".carousel-images");
  const indicators = document.querySelectorAll(".indicator");
  const upperLP = document.querySelector(".upperLP");
  const cardContainer = document.querySelector(".card-container");
  const leftButton = document.querySelector(".left-button");
  const rightButton = document.querySelector(".right-button");
  const scrollButtons = document.querySelectorAll(".scroll-button");
  const dropdownButton = document.querySelector(".dropdown-button");
  const dropdownContainer = document.querySelector(".dropdown-container");
  const cards = document.querySelectorAll(".card");
  const carouselTimer = document.createElement("div");
  carouselTimer.classList.add("carousel-timer");
  document.querySelector(".carousel-container").appendChild(carouselTimer);
  let imageWidth;
  let currentIndex = 0;
  let carouselInterval;
  let scrollSpeed = 1.5; // Speed of automatic scrolling
  let scrollInterval;

  // Calculate the width of the carousel images
  function calculateImageWidth() {
    imageWidth = document.querySelector(".carousel-image").clientWidth;
  }

  // Update the carousel position and indicators
  function updateCarousel() {
    calculateImageWidth();
    carouselImages.style.transform = `translateX(-${
      currentIndex * imageWidth
    }px)`;
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
    resetCarouselTimer();
  }

  // Calculate the height of the upper section based on the aspect ratio of the first image
  function calculateUpperLPHeight() {
    const firstImage = document.querySelector(".carousel-image");
    if (firstImage) {
      const aspectRatio = firstImage.clientWidth / firstImage.clientHeight;
      upperLP.style.height = `${upperLP.clientWidth / aspectRatio}px`;
    }
  }

  // Move to the next slide in the carousel
  function nextSlide() {
    currentIndex = (currentIndex + 1) % indicators.length;
    updateCarousel();
  }

  // Move to a specific slide in the carousel
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetCarouselInterval();
    restartVideo(index);
  }

  // Reset the carousel interval
  function resetCarouselInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 30000);
  }

  // Restart the video if the current slide is a video
  function restartVideo(index) {
    const currentSlide = carouselImages.children[index];
    if (currentSlide.tagName === "VIDEO") {
      currentSlide.currentTime = 0;
      currentSlide.play();
    }
  }

  // Automatically scroll the card container
  function autoScrollCards() {
    const scrollEnd = cardContainer.scrollWidth - cardContainer.clientWidth;

    // Check if we've reached the end
    if (cardContainer.scrollLeft >= scrollEnd) {
      stopAutoScroll();
      return;
    }

    cardContainer.scrollLeft += scrollSpeed;
  }

  // Start automatic scrolling
  function startAutoScroll() {
    scrollInterval = setInterval(autoScrollCards, 20); // Adjust interval as needed
  }

  // Stop automatic scrolling
  function stopAutoScroll() {
    clearInterval(scrollInterval);
  }

  // Reset the carousel timer
  function resetCarouselTimer() {
    carouselTimer.style.transition = "none";
    carouselTimer.style.width = "0";
    setTimeout(() => {
      carouselTimer.style.transition = "width 30s linear";
      carouselTimer.style.width = "100%";
    }, 50); // Small delay to trigger the transition
  }

  // Initial calculations
  updateCarousel();
  calculateUpperLPHeight();
  carouselInterval = setInterval(nextSlide, 30000);
  startAutoScroll();

  // Event listeners for carousel indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Update carousel and upper section height on window resize
  window.addEventListener("resize", () => {
    updateCarousel();
    calculateUpperLPHeight();
  });

  // Scroll the card container left or right
  leftButton.addEventListener("click", () => {
    cardContainer.scrollLeft -= 1000; // Adjust scroll amount as needed
  });

  rightButton.addEventListener("click", () => {
    cardContainer.scrollLeft += 1000; // Adjust scroll amount as needed
  });

  // Show scroll buttons on hover
  scrollButtons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.classList.add("visible");
    });
    button.addEventListener("mouseout", () => {
      button.classList.remove("visible");
    });
  });

  // Show scroll buttons when hovering over the card container
  cardContainer.addEventListener("mouseover", () => {
    scrollButtons.forEach((button) => {
      button.classList.add("visible");
    });
  });

  // Hide scroll buttons when not hovering over the card container
  cardContainer.addEventListener("mouseout", (event) => {
    if (
      !event.relatedTarget ||
      !event.relatedTarget.classList.contains("scroll-button")
    ) {
      scrollButtons.forEach((button) => {
        button.classList.remove("visible");
      });
    }
  });

  // Reduce scroll speed when hovering over a card
  cards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      scrollSpeed = 0.5; // Reduce speed to 1/10 of original
    });
    card.addEventListener("mouseout", () => {
      scrollSpeed = 1.5; // Restore original speed
    });
  });
});
