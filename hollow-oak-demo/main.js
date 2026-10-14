(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var sections = links
      .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            links.forEach(function (link) {
              link.removeAttribute("aria-current");
            });
            var current = nav.querySelector('a[href="#' + entry.target.id + '"]');
            if (current) current.setAttribute("aria-current", "true");
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
      );
      sections.forEach(function (section) {
        observer.observe(section);
      });
    }
  }

  var form = document.querySelector("#quote-form");
  var success = document.querySelector("#form-success");
  var reset = document.querySelector("#reset-form");
  if (!form || !success) return;

  form.addEventListener("input", function (event) {
    if (event.target && event.target.setCustomValidity) {
      event.target.setCustomValidity("");
    }
  });

  form.addEventListener(
    "invalid",
    function () {
      form.classList.add("was-checked");
    },
    true
  );

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.classList.add("was-checked");

    ["name", "phone", "address"].forEach(function (key) {
      var field = form.elements[key];
      var value = String(field.value || "").trim();
      field.setCustomValidity(value ? "" : "Please fill in this field.");
    });

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData(form);
    var name = String(data.get("name") || "").trim();
    var phone = String(data.get("phone") || "").trim();
    var address = String(data.get("address") || "").trim();
    var town = String(data.get("town") || "").trim();
    var service = String(data.get("service") || "").trim();
    var visitWindow = String(data.get("window") || "").trim();

    success.querySelector('[data-fill="name"]').textContent = name;
    success.querySelector('[data-fill="phone"]').textContent = phone;

    var place =
      town === "Outside the usual area"
        ? address + ", which you marked as outside the usual area"
        : address + " in " + town;

    var detail =
      "If this were a real request (" +
      service +
      ") for " +
      place +
      ", we would confirm it and text a reminder the day before. ";

    if (visitWindow && visitWindow !== "No preference") {
      detail += "The window you picked is " + visitWindow + ". ";
    } else {
      detail += "Open windows are morning 8 to 11, or afternoon 12 to 3 or 2 to 5. ";
    }

    detail +=
      "The diagnostic visit is $89 (example demo pricing), waived if you approve the repair. An after-hours or weekend emergency adds $125 (example demo pricing).";

    if (town === "Outside the usual area") {
      detail += " The owner would decide whether we can take that address. A visit is not promised.";
    }

    success.querySelector('[data-fill="detail"]').textContent = detail;
    form.hidden = true;
    success.hidden = false;
    success.focus();
  });

  if (reset) {
    reset.addEventListener("click", function () {
      form.reset();
      form.classList.remove("was-checked");
      form.hidden = false;
      success.hidden = true;
      var first = form.querySelector("[name='name']");
      if (first) first.focus();
    });
  }
})();
