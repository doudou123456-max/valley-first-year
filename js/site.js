(function () {
  if (document.querySelector(".back-to-top")) return;

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.setAttribute("hidden", "");
  btn.innerHTML = '<span aria-hidden="true">↑</span>';

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.body.appendChild(btn);

  var threshold = 480;
  var ticking = false;

  function update() {
    ticking = false;
    if (window.scrollY > threshold) {
      btn.removeAttribute("hidden");
    } else {
      btn.setAttribute("hidden", "");
    }
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true }
  );

  update();
})();
