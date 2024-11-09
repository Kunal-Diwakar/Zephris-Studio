import { dataCol1, dataCol2, dataCol3 } from "./data.js";

const lenis = new Lenis();

lenis.on("scroll", () => {
  ScrollTrigger.update();
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function Preloader() {
  gsap.from(".pre-text", 0.8, {
    y: 40,
    opacity: 0,
    ease: "power2.inOut",
    delay: 1,
  })

  gsap.from(".loader", 2, {
    width: 0,
    ease: "power4.inOut",
    delay: 2,
  })

  gsap.to(".pre-loader", 2, {
    top: "-100%",
    ease: "power4.inOut",
    delay: 4,
  })
}
function Work() {
  const projectSelector = {
    element: document.querySelector(".projects"),
    wrapper: document.querySelector(".projects-wrapper"),
    outro: document.querySelector(".outro"),
  };

  // Define isMobile as a function
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  const initLenis = () => {
    const lenisInstance = new Lenis({
      lerp: 0.064,
      smoothWheel: true,
    });
    lenisInstance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  };

  const createContents = () => {
    gsap.registerPlugin(ScrollTrigger);
    const datasets = [dataCol1, dataCol2, dataCol3];

    const animateHero = () => {
      const heroTitles = document.querySelectorAll(".work-title");
      if (!heroTitles.length) return;
      gsap.timeline({
        scrollTrigger: {
          trigger: ".Work",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
        .to(heroTitles[0], { yPercent: 120 })
        .to(heroTitles[1], { yPercent: 0 }, 0);
    };

    datasets.forEach((data) => {
      const projectCol = document.createElement("div");
      projectCol.classList.add("projects-col");
      projectSelector.wrapper.appendChild(projectCol);
      data.forEach((item) => {
        const projectsItem = document.createElement("div");
        projectsItem.classList.add("projects-col-item");
        projectsItem.style.backgroundColor = item.backgroundColor;
        projectsItem.innerHTML = `
          <div class="projects-col-item-title">
            <h2>${item.title}</h2>
          </div>
          <div class="projects-col-item-img">
            <img src="${item.img}" alt="${item.title}" />
          </div>
        `;
        projectCol.appendChild(projectsItem);
      });
    });

    if (!isMobile()) {
      calcFilledSpace();
      animateHero();
      animateOutro();
    }
  };

  const updateWrapperClass = () => {
    if (isMobile()) {
      projectSelector.wrapper.classList.remove("grid");
    } else {
      projectSelector.wrapper.classList.add("grid");
    }
  };

  const calcFilledSpace = () => {
    const projectCols = document.querySelectorAll(".projects-col");
    if (projectCols.length < 3) return;

    const projectColSecondHeight = projectCols[1].getBoundingClientRect().height;
    const projectColThirdHeight = projectCols[2].getBoundingClientRect().height;
    const difference = projectColThirdHeight - projectColSecondHeight;

    // Only call animateMedia if not mobile
    if (!isMobile()) {
      animateMedia(projectCols, difference);
    }
  };

  const animateMedia = (projectCols, difference) => {
    gsap.registerPlugin(ScrollTrigger);
    if (!projectCols[1]) {
      console.warn("Project column not found for animation.");
      return;
    }

    // Set y to 0 initially
    gsap.set(projectCols[1], { y: 0 });

    // Force the animation to run regardless of the difference
    gsap.timeline({
      scrollTrigger: {
        trigger: projectSelector.element,
        start: "top top",
        end: () => `${projectSelector.element.offsetHeight}px bottom`,
        scrub: true,
      },
    }).to(projectCols[1], {
      duration: 2,
      y: 200, // Use a fixed value to see the effect
      ease: "none",
    });
  };

  const animateOutro = () => {
    const outroWrapper = document.querySelector(".outro-wrapper");
    if (!outroWrapper) return;
    gsap.set(outroWrapper, { yPercent: -350 });
    gsap.timeline({
      scrollTrigger: {
        trigger: ".outro",
        start: "-50 bottom",
        end: "bottom bottom",
        scrub: true,
      },
    }).to(outroWrapper, { yPercent: 0 });
  };

  window.addEventListener("load", () => {
    createContents();
    updateWrapperClass(); // Set initial class based on width
    if (!isMobile()) {
      initLenis();
      ScrollTrigger.refresh();
      animateOutro();
    }
  });

  window.addEventListener("resize", () => {
      calcFilledSpace(); // Recalculate filled space on resize if not mobile
  });
}

function Marquee() {
  window.addEventListener("DOMContentLoaded", function(dets) {
      gsap.to(".marquee", {
        transform: "translateX(-100%)",
        repeat: Infinity,
        duration: 10,
        ease: "none",
      })
  })
}

function Txt() {
  let elements = document.querySelectorAll(".text");

  elements.forEach((element) => {
      let innerText = element.innerText;
      element.innerHTML = "";

      let textContainer = document.createElement("div");
      textContainer.classList.add("block");

      for (let letter of innerText) {
          let span = document.createElement("span");
          span.innerText = letter.trim() === "" ? "\xa0" : letter;
          span.classList.add("letter");
          textContainer.appendChild(span);
      }

      element.appendChild(textContainer);
      element.appendChild(textContainer.cloneNode(true));
  });

  elements.forEach((element) => {
      element.addEventListener("mouseover", () => {
          element.classList.add("play");
      });
      element.addEventListener("mouseleave", () => {
          element.classList.remove("play");
      });
  });
}


Preloader();
Work();
Marquee();
Txt();
