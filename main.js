/* CRUCIBLE, progressive enhancement only. The page works with JS disabled;
   this adds an inline form success state and a quiet scroll reveal. */

(function () {
  "use strict";

  /* ---------- Scroll reveal (respects reduced-motion) ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealables = document.querySelectorAll(".reveal");

  if (reduce || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Request form ---------- */
  var form = document.getElementById("request-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var btn = document.getElementById("submit-btn");
  var email = document.getElementById("email");
  var btnLabel = btn ? btn.textContent : "Request access";

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg;
    status.classList.remove("is-ok", "is-err");
    if (kind) status.classList.add(kind);
  }

  form.addEventListener("submit", function (ev) {
    // Honeypot tripped -> silently pretend success, don't submit.
    var hp = form.querySelector('input[name="_gotcha"]');
    if (hp && hp.value) { ev.preventDefault(); setStatus("You're on the list.", "is-ok"); return; }

    if (!email || !email.value || !email.checkValidity()) {
      ev.preventDefault();
      setStatus("Enter a valid email address.", "is-err");
      if (email) email.focus();
      return;
    }

    // Endpoint not wired yet, don't fire a broken POST. Guides you, doesn't crash.
    if (form.action.indexOf("TODO_FORM_ENDPOINT") !== -1) {
      ev.preventDefault();
      setStatus("Demo mode, set TODO_FORM_ENDPOINT in index.html to go live.", "is-err");
      return;
    }

    // Wired: post via fetch for an inline success state (Formspree-compatible).
    ev.preventDefault();
    btn.disabled = true;
    btn.textContent = "Sending…";
    setStatus("");

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus("You're on the list. We'll send the brief when applications open.", "is-ok");
        } else {
          return res.json().then(function (data) {
            var msg = data && data.errors && data.errors.length
              ? data.errors.map(function (e) { return e.message; }).join(", ")
              : "Something went wrong. Try again or email us directly.";
            setStatus(msg, "is-err");
          });
        }
      })
      .catch(function () {
        setStatus("Network error. Check your connection and try again.", "is-err");
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = btnLabel;
      });
  });
})();
