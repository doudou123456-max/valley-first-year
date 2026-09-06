(function () {
  if (!document.querySelector(".back-to-top")) {
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
  }
})();

(function () {
  var toc = document.querySelector(".toc");
  if (!toc) return;

  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;

  var sections = links
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      return el ? { link: link, el: el } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  var ticking = false;

  function setActive() {
    ticking = false;
    var marker = window.scrollY + 96;
    var current = sections[0];

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= marker) {
        current = sections[i];
      }
    }

    sections.forEach(function (item) {
      if (item === current) {
        item.link.classList.add("is-active");
        item.link.setAttribute("aria-current", "true");
      } else {
        item.link.classList.remove("is-active");
        item.link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(setActive);
      }
    },
    { passive: true }
  );

  setActive();
})();
