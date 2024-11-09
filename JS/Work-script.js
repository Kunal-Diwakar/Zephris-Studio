function Work() {
  const itemsArray = [];
const cursor = document.querySelector(".cursor");

// Arrays to track which images and videos have been displayed
let images = Array.from({ length: 7 }, (_, i) => i + 1); // 7 images: img-1 to img-7
let videos = Array.from({ length: 4 }, (_, i) => i + 1); // 4 videos: vid-1 to vid-4

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX - cursor.offsetWidth / 2,
    y: e.clientY - cursor.offsetHeight / 2,
    duration: 0.5,
    ease: "power2.out",
  });
});

document.addEventListener("click", function (event) {
  const clickSfx = new Audio("/Assets/About/click-sound.wav");
  clickSfx.play();

  const itemType = Math.random() > 0.5 ? "video" : "image";
  let container = document.createElement("div");
  let elementWidth = 700;

  // Check if all images or videos have been displayed, and reset the array if so
  if (itemType === "video") {
    if (videos.length === 0) {
      videos = Array.from({ length: 4 }, (_, i) => i + 1);
    }
    const videoNumber = videos.splice(Math.floor(Math.random() * videos.length), 1)[0];
    container.innerHTML = `<div class="video-container">
                                <video autoplay loop muted>
                                    <source src="/Assets/About/vid-${videoNumber}.mp4" type="video/mp4" />
                                </video>
                            </div>`;
  } else {
    if (images.length === 0) {
      images = Array.from({ length: 7 }, (_, i) => i + 1);
    }
    const imgNumber = images.splice(Math.floor(Math.random() * images.length), 1)[0];
    container.innerHTML = `<div class="img-container">
                                <img src="/Assets/About/img-${imgNumber}.webp" alt="About" />
                            </div>`;
  }

  const appendElement = container.firstChild;
  document.querySelector(".items-container").appendChild(appendElement);

  appendElement.style.left = `${event.clientX - elementWidth / 2}px`;
  appendElement.style.top = `${event.clientY}px`;
  const randomRotation = Math.random() * 10 - 5;

  gsap.set(appendElement, {
    scale: 0,
    rotation: randomRotation,
    transformOrigin: "center",
  });

  const tl = gsap.timeline();

  const randomScale = Math.random() * 0.5 + 0.5;
  tl.to(appendElement, {
    scale: randomScale,
    duration: 0.5,
    delay: 0.1,
  });

  tl.to(
    appendElement,
    {
      y: () => `-=500`,
      opacity: 1,
      duration: 4,
      ease: "none",
    },
    "<"
  ).to(appendElement, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      appendElement.parentNode.removeChild(appendElement);
      const index = itemsArray.indexOf(appendElement);
      if (index > -1) {
        itemsArray.splice(index, 1);
      }
    }
  });
});
}

Work()