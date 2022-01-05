document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const div = document.createElement("div");
  div.className = "red-square";
  main.appendChild(div);
  setTimeout(() => {
    div.style.opacity = "1";
  }, 500);
});
