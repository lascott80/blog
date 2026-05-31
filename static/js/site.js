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

  document.addEventListener("DOMContentLoaded", () => {
    initBackToTop();
    initReadingProgress();
    initCopyLink();
  });
})();
