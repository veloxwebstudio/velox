document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const navStart = document.querySelector(".nav-start");

  if (navToggle && navPanel) {
    navToggle.addEventListener("click", () => {
      const isOpen = navPanel.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navPanel && navPanel.classList.contains("open")) {
        navPanel.classList.remove("open");
        navToggle?.classList.remove("active");
        navToggle?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  });

  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (window.scrollY > 30) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });

  const allPaymentLinks = Array.from(document.querySelectorAll("[data-payment='true']"));
  allPaymentLinks.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "requirements.html";
    });
  });

  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : "0px";
    });

    if (item.classList.contains("open")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
