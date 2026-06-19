const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

/* Experience tabs */
const tabBtns = document.querySelectorAll(".exp-tab-btn");
const tabPanels = document.querySelectorAll(".exp-panel");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    tabPanels.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    document.getElementById(target).classList.add("active");
  });

  btn.addEventListener("mouseenter", () => {
    if (window.innerWidth <= 1024) return;
    const target = btn.dataset.tab;
    tabBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    tabPanels.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    document.getElementById(target).classList.add("active");
  });
});

/* Scroll spy */
const spyObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    });
  },
  { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
);

sections.forEach(sec => spyObserver.observe(sec));

/* Fade in */
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".fade-in").forEach(el => fadeObserver.observe(el));

/* Smooth scroll — sidebar: hover, mobile: click */
function scrollToSection(link) {
  const target = document.querySelector(link.getAttribute("href"));
  if (!target) return;
  const offset = window.innerWidth <= 1024 ? 70 : 0;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

const sideNavLinks = document.querySelectorAll(".side-nav .nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav .nav-link");

sideNavLinks.forEach(link => {
  link.addEventListener("click", e => e.preventDefault());

  link.addEventListener("mouseenter", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    scrollToSection(link);
  });
});

mobileNavLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    scrollToSection(link);
  });
});