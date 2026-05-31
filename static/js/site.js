(() => {
  const initBackToTop = () => {
    const button = document.querySelector("[data-back-to-top]");
    if (!button) return;

    const update = () => {
      button.classList.toggle("is-visible", window.scrollY > 420);
    };

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    update();
    window.addEventListener("scroll", update, { passive: true });
  };

  const initReadingProgress = () => {
    const bar = document.querySelector("[data-reading-progress]");
    if (!bar) return;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      bar.style.transform = `scaleX(${Math.max(0, Math.min(progress, 100)) / 100})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  const initCopyLink = () => {
    const button = document.querySelector("[data-copy-link]");
    if (!button) return;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const original = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = original;
        }, 1400);
      } catch {
        button.textContent = "Copy failed";
      }
    });
  };

  const initRevealOnScroll = () => {
    const items = document.querySelectorAll(".reveal-on-scroll");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    items.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 60, 240)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -48px 0px" }
    );

    items.forEach((item) => observer.observe(item));
  };

  const initImageLightbox = () => {
    const triggers = document.querySelectorAll("[data-lightbox-image]");
    if (!triggers.length) return;

    const dialog = document.createElement("dialog");
    dialog.className = "image-lightbox";
    dialog.setAttribute("aria-modal", "true");
    dialog.innerHTML = `
      <p class="visually-hidden" id="image-lightbox-title">Expanded image view</p>
      <div class="image-lightbox__actions">
        <a class="image-lightbox__download" href="#" download>Download image</a>
        <button class="image-lightbox__close" type="button" aria-label="Close image viewer">Close</button>
      </div>
      <figure class="image-lightbox__figure">
        <img class="image-lightbox__image" alt="">
        <figcaption class="image-lightbox__caption" id="image-lightbox-caption" hidden></figcaption>
      </figure>
    `;
    dialog.setAttribute("aria-labelledby", "image-lightbox-title");
    dialog.setAttribute("aria-describedby", "image-lightbox-caption");

    document.body.appendChild(dialog);

    const closeButton = dialog.querySelector(".image-lightbox__close");
    const downloadLink = dialog.querySelector(".image-lightbox__download");
    const image = dialog.querySelector(".image-lightbox__image");
    const caption = dialog.querySelector(".image-lightbox__caption");
    let lastTrigger = null;

    const getFocusable = () =>
      [...dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(
        (element) => !element.hasAttribute("hidden")
      );

    const close = () => {
      if (!dialog.open) return;
      dialog.close();
      document.body.classList.remove("lightbox-open");
      image.removeAttribute("src");
      image.alt = "";
      caption.textContent = "";
      caption.hidden = true;
      if (lastTrigger) {
        lastTrigger.focus();
      }
    };

    closeButton.addEventListener("click", close);

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        close();
      }
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("lightbox-open");
    });

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const source = trigger.getAttribute("href");
        const thumbnail = trigger.querySelector("img");
        const figure = trigger.closest("figure");
        const sourceCaption = figure?.querySelector("figcaption")?.textContent?.trim() || "";
        if (!source || !thumbnail) return;

        lastTrigger = trigger;
        image.src = source;
        image.alt = thumbnail.alt || "";
        downloadLink.href = source;
        downloadLink.setAttribute("aria-label", `Download image${thumbnail.alt ? `: ${thumbnail.alt}` : ""}`);

        const pathParts = source.split("/");
        const fileName = pathParts[pathParts.length - 1] || "image";
        downloadLink.setAttribute("download", fileName);

        const captionText = sourceCaption || thumbnail.alt || "";
        caption.textContent = captionText;
        caption.hidden = !captionText;

        if (!dialog.open) {
          dialog.showModal();
        }

        document.body.classList.add("lightbox-open");
        closeButton.focus();
      });
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    initBackToTop();
    initReadingProgress();
    initCopyLink();
    initRevealOnScroll();
    initImageLightbox();
  });
})();
