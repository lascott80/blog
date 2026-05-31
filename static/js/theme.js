(() => {
  const storageKey = "theme";

  const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

  const applyButtonState = (button) => {
    const dark = isDark();
    button.setAttribute("aria-pressed", dark ? "true" : "false");
    button.setAttribute("aria-label", dark ? "Toggle light mode" : "Toggle dark mode");
    button.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
  };

  const setTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem(storageKey, theme);
  };

  const init = () => {
    const button = document.querySelector("[data-theme-toggle]");
    if (!button) return;

    applyButtonState(button);

    button.addEventListener("click", () => {
      setTheme(isDark() ? "light" : "dark");
      applyButtonState(button);
    });
  };

  document.addEventListener("DOMContentLoaded", init);
})();
