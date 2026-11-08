(function () {
  var form = document.getElementById("book-form");
  var msg = document.getElementById("msg");
  var date = document.getElementById("date");
  var t = new Date();
  date.min =
    t.getFullYear() +
    "-" +
    String(t.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(t.getDate()).padStart(2, "0");

  function val(id) {
    return document.getElementById(id).value.trim();
  }

  function fail(text, id) {
    msg.className = "err";
    msg.textContent = text;
    document.getElementById(id).focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!val("name")) {
      return fail("Enter your name.", "name");
    }
    if (!val("service")) {
      return fail("Choose a style.", "service");
    }
    if (!val("date")) {
      return fail("Choose a preferred day.", "date");
    }
    if (val("date") < date.min) {
      return fail("Choose today or a later day.", "date");
    }

    var parts = val("date").split("-").map(Number);
    var day = new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString(
      "en-GB",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    );

    var lines = [
      "Hi Atisha, I’d like to book an appointment.",
      "Name: " + val("name"),
      "Style: " + val("service")
    ];
    if (val("length")) {
      lines.push("Length: " + val("length"));
    }
    if (val("size")) {
      lines.push("Braid size: " + val("size"));
    }
    lines.push("Preferred day: " + day + ", " + val("time").toLowerCase());
    if (val("notes")) {
      lines.push("Notes: " + val("notes"));
    }

    var url =
      "https://wa.me/5016384722?text=" + encodeURIComponent(lines.join("\n"));
    msg.className = "ok";
    msg.textContent = "";
    var a = document.createElement("a");
    a.href = url;
    a.rel = "noopener";
    a.target = "_blank";
    a.textContent = "Open WhatsApp to send your request";
    msg.append("Your request is ready. ", a, ".");
    window.open(url, "_blank", "noopener");
  });
})();