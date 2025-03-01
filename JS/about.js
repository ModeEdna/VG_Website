document.addEventListener("DOMContentLoaded", function () {
  // Leadership cards scrolling functionality
  const leadershipLeftBtn = document.querySelector(
    ".leadership-section .left-button"
  );
  const leadershipRightBtn = document.querySelector(
    ".leadership-section .right-button"
  );
  const leadershipContainer = document.querySelector(
    ".leadership-section .team-card-container"
  );

  if (leadershipLeftBtn && leadershipRightBtn && leadershipContainer) {
    leadershipLeftBtn.addEventListener("click", () => {
      leadershipContainer.scrollBy({
        left: -window.innerWidth,
        behavior: "smooth",
      });
    });

    leadershipRightBtn.addEventListener("click", () => {
      leadershipContainer.scrollBy({
        left: -window.innerWidth,
        behavior: "smooth",
      });
    });
  }

  // Team cards scrolling functionality
  const teamLeftBtn = document.querySelector(".team-section .left-button");
  const teamRightBtn = document.querySelector(".team-section .right-button");
  const teamContainer = document.querySelector(".team-card-container");

  if (teamLeftBtn && teamRightBtn && teamContainer) {
    teamLeftBtn.addEventListener("click", () => {
      teamContainer.scrollBy({
        left: -window.innerWidth,
        behavior: "smooth",
      });
    });

    teamRightBtn.addEventListener("click", () => {
      teamContainer.scrollBy({
        left: window.innerWidth,
        behavior: "smooth",
      });
    });
  }
});
