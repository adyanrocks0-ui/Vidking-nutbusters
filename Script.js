window.addEventListener("message", function (event) {
  try {
    const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;

    // Check if it’s a VidKing progress event
    if (data && data.type === "progress") {
      const progress = data.progress;
      const id = data.id || "default_video";

      // Save progress in localStorage
      localStorage.setItem(`vidking_progress_${id}`, progress);

      // Update UI
      document.querySelector("#messageArea").innerText = `Progress: ${progress.toFixed(1)}%`;
    }
  } catch (e) {
    console.warn("Non-JSON message ignored:", event.data);
  }
});

// On page load, resume progress if available
window.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("vidkingPlayer");
  const id = "default_video"; // you can make this dynamic per video
  const savedProgress = localStorage.getItem(`vidking_progress_${id}`);

  if (savedProgress) {
    console.log(`Resuming from ${savedProgress}%`);
    // Convert to seconds or time offset if needed
    iframe.src += `?progress=${savedProgress}`;
  }
});
