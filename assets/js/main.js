(function () {
  "use strict";

  /* Auto-updating copyright year */
  var yearEl = document.getElementById("copyright-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var header = document.querySelector(".site-header");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Contact form (Web3Forms) */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    var areaCheckboxes = contactForm.querySelectorAll(".area-checkbox");
    var areaHiddenInput = document.getElementById("area-of-interest-value");
    var statusEl = contactForm.querySelector(".form-status");
    var successPanel = document.getElementById("contact-success");
    var submitBtn = contactForm.querySelector(".contact-submit");
    var idleLabel = submitBtn ? submitBtn.textContent : "";
    var sendingLabel = contactForm.getAttribute("data-sending-label") || idleLabel;

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (areaHiddenInput) {
        var selected = [];
        areaCheckboxes.forEach(function (box) {
          if (box.checked) selected.push(box.value);
        });
        areaHiddenInput.value = selected.join(", ");
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = sendingLabel;
      }
      if (statusEl) {
        statusEl.textContent = "";
        statusEl.classList.remove("is-success", "is-error");
      }

      fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm)
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (!result || !result.success) throw new Error((result && result.message) || "Submission failed");
          contactForm.reset();
          contactForm.classList.add("form-sent");
          if (successPanel) successPanel.hidden = false;
        })
        .catch(function () {
          if (statusEl) {
            statusEl.textContent = contactForm.getAttribute("data-error-message") || "";
            statusEl.classList.add("is-error");
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = idleLabel;
          }
        });
    });
  }

  /* Abstract network-mesh hero animation (decorative, no map/geography implied) */
  var canvas = document.getElementById("mesh-canvas");
  if (!canvas || !canvas.getContext) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ctx = canvas.getContext("2d");
  var nodes = [];
  var width, height, dpr;

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.max(28, Math.min(70, Math.floor((width * height) / 22000)));
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 1
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    var linkDist = Math.min(150, width * 0.14);

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDist) {
          ctx.strokeStyle = "rgba(224, 186, 122," + (0.16 * (1 - dist / linkDist)) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        }
      }
    }

    for (var j = 0; j < nodes.length; j++) {
      var node = nodes[j];
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(240, 162, 74, 0.75)";
      ctx.fill();
    }

    if (!reduceMotion) requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);
  step();
})();
