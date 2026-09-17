/* =========================================================
   KATTALEIA'S CANDLES — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {

    navToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.toggle("is-open");

      navToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      navToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

      navToggle.textContent = isOpen ? "✕" : "☰";

    });


    /* Close menu when clicking a navigation link */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mainNav.classList.remove("is-open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        navToggle.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

        navToggle.textContent = "☰";

      });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

      const clickedInsideNav =
        mainNav.contains(event.target);

      const clickedToggle =
        navToggle.contains(event.target);

      if (
        !clickedInsideNav &&
        !clickedToggle &&
        mainNav.classList.contains("is-open")
      ) {

        mainNav.classList.remove("is-open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        navToggle.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

        navToggle.textContent = "☰";

      }

    });

  }


  /* =======================================================
     SCROLL REVEAL ANIMATIONS
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add("is-visible");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    /* Fallback for older browsers */

    revealElements.forEach((element) => {

      element.classList.add("is-visible");

    });

  }


  /* =======================================================
     ORDER FORM
     ======================================================= */

  const orderForm =
    document.querySelector("#order-form");

  const formStatus =
    document.querySelector("#form-status");


  if (orderForm && formStatus) {

    orderForm.addEventListener("submit", (event) => {

      event.preventDefault();


      const name =
        document.querySelector("#name")?.value.trim();

      const contact =
        document.querySelector("#contact")?.value.trim();

      const candle =
        document.querySelector("#candle")?.value.trim();

      const message =
        document.querySelector("#message")?.value.trim();


      /* Basic validation */

      if (!name || !contact) {

        formStatus.textContent =
          "Please enter your name and contact information.";

        return;

      }


      /*
        We are NOT automatically sending anything yet.

        You will add your real WhatsApp number/link later.
      */

      formStatus.textContent =
        "Thank you! Your request has been prepared. Please contact us through WhatsApp to complete your order.";


      /*
        Keep the collected information available
        for future WhatsApp integration.
      */

      console.log("Order request:", {
        name,
        contact,
        candle,
        message
      });

    });

  }


  /* =======================================================
     PREVENT PLACEHOLDER LINKS FROM GOING NOWHERE
     ======================================================= */

  const allLinks =
    document.querySelectorAll('a[href]');


  allLinks.forEach((link) => {

    const href = link.getAttribute("href");

    if (!href) {
      return;
    }


    const placeholderLinks = [
      "WHATSAPP_LINK_HERE",
      "INSTAGRAM_LINK_HERE",
      "TIKTOK_LINK_HERE",
      "EMAIL_HERE",
      "PHONE_NUMBER_HERE"
    ];


    const isPlaceholder =
      placeholderLinks.some((placeholder) =>
        href.includes(placeholder)
      );


    if (isPlaceholder) {

      link.addEventListener("click", (event) => {

        event.preventDefault();

        console.log(
          "Placeholder link clicked:",
          href
        );

      });

    }

  });


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const yearElements =
    document.querySelectorAll("[data-current-year]");


  yearElements.forEach((element) => {

    element.textContent =
      new Date().getFullYear();

  });

});
