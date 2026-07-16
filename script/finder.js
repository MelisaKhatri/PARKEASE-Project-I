
  
  const SPOTS = [
    { id:1,  name:"New Road Parking",     area:"New Road",     lat:27.7041, lng:85.3131, type:"4w",   rate:100, cap:20, avail:12, phone:"9812345678" },
    { id:2,  name:"Durbarmarg Parking",   area:"Durbarmarg",   lat:27.7104, lng:85.3176, type:"4w",   rate:120, cap:15, avail:5,  phone:"9812345678" },
    { id:3,  name:"Thamel Parking",       area:"Thamel",       lat:27.7152, lng:85.3123, type:"both", rate:80,  cap:25, avail:18, phone:"9805678910" },
    { id:4,  name:"Boudha Parking",       area:"Boudhanath",   lat:27.7215, lng:85.3621, type:"both", rate:60,  cap:30, avail:22, phone:"9840055774" },
    { id:5,  name:"Pashupati Parking",    area:"Pashupati",    lat:27.7105, lng:85.3485, type:"both", rate:50,  cap:40, avail:30, phone:"9800000000" },
    { id:6,  name:"Swoyambhu Parking",    area:"Swoyambhu",    lat:27.7149, lng:85.2905, type:"2w",   rate:30,  cap:50, avail:35, phone:"9861334455" },
    { id:7,  name:"Ratna Park Parking",   area:"Ratna Park",   lat:27.7026, lng:85.3152, type:"4w",   rate:90,  cap:18, avail:4,  phone:"9812334455" },
    { id:9,  name:"KM Mall Parking",      area:"Babarmahal",   lat:27.6975, lng:85.3214, type:"4w",   rate:110, cap:35, avail:8,  phone:"9803213210" },
    { id:10, name:"Chabahil Parking",     area:"Chabahil",     lat:27.7183, lng:85.3509, type:"2w",   rate:25,  cap:60, avail:45, phone:"9841556677" },
    { id:11, name:"Lazimpat Parking",     area:"Lazimpat",     lat:27.7207, lng:85.3185, type:"both", rate:85,  cap:20, avail:14, phone:"9805667788" },
    { id:12, name:"Putalisadak Parking",  area:"Putalisadak",  lat:27.7058, lng:85.3244, type:"2w",   rate:35,  cap:45, avail:38, phone:"9841778899" },
  ];

  let map;
  let markers = [];
  let activeId = null;

  function typeLabel(t) {
    if (t === "2w") return "2-Wheeler";
    if (t === "4w") return "4-Wheeler";
    return "2 & 4 Wheeler";
  }

  function tagClass(t) {
    if (t === "2w") return "tag-2w";
    if (t === "4w") return "tag-4w";
    return "tag-both";
  }

  function availColor(avail, cap) {
    var r = avail / cap;
    if (r > 0.5) return "#16a34a";
    if (r > 0.2) return "#d97706";
    return "#dc2626";
  }

  function makeMarkerIcon(type) {
    var color = type === "2w" ? "#2563eb" : type === "4w" ? "#16a34a" : "#f97316";
    return L.divIcon({
      className: "",
      html: '<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M15 1C7.8 1 2 6.8 2 14c0 9 13 25 13 25S28 23 28 14C28 6.8 22.2 1 15 1z" fill="' + color + '" stroke="white" stroke-width="1.5"/>' +
              '<text x="15" y="17" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="12" font-weight="bold" font-family="Arial">P</text>' +
            '</svg>',
      iconSize: [30, 40],
      iconAnchor: [15, 40]
    });
  }

  function initMap() {
    map = L.map("map", { center: [27.7103, 85.3222], zoom: 14 });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19
    }).addTo(map);
    placeMarkers(SPOTS);
  }

  function placeMarkers(spots) {
    markers.forEach(function(m) { map.removeLayer(m); });
    markers = [];

    spots.forEach(function(s) {
      var m = L.marker([s.lat, s.lng], { icon: makeMarkerIcon(s.type) }).addTo(map);

      m.bindPopup(
        '<div style="width:180px;font-family:Arial,sans-serif">' +
          '<div class="popup-title">' + s.name + '</div>' +
          '<div class="popup-area">' + s.area + ', Kathmandu</div>' +
          '<div class="popup-info"> ' + s.phone + '</div>' +
          '<div class="popup-info"> ' + typeLabel(s.type) + '</div>' +
          '<div class="popup-info" style="color:' + availColor(s.avail, s.cap) + ';font-weight:bold">' + s.avail + ' spots free / ' + s.cap + ' total</div>' +
          '<div class="popup-info" style="color:#2563eb;font-weight:bold">Rs. ' + s.rate + ' / hour</div>' +
          '<button class="popup-btn" onclick="callAndBook(' + s.id + ')">Call &amp; Book</button>' +
        '</div>'
      );

      m.on("click", function() {
        activeId = s.id;
        highlightCard(s.id);
      });

      markers.push(m);
    });

    buildCards(spots);
  }

  function buildCards(spots) {
    var vt = document.getElementById("vtype").value;
    var list = vt === "all" ? spots : spots.filter(function(s) {
      return s.type === vt || s.type === "both";
    });

    var el = document.getElementById("cards");
    el.innerHTML = "";

    if (list.length === 0) {
      el.innerHTML = '<p style="font-size:12px;color:#aaa;text-align:center;margin-top:20px">No spots found.</p>';
      return;
    }

    list.forEach(function(s) {
      var div = document.createElement("div");
      div.className = "finder-card" + (activeId === s.id ? " active" : "");
      div.id = "finder-card-" + s.id;
      div.innerHTML =
        '<div class="card-name">' + s.name + '</div>' +
        '<div class="card-area">' + s.area + ', Kathmandu</div>' +
        '<div class="card-row">' +
          '<span class="tag ' + tagClass(s.type) + '">' + typeLabel(s.type) + '</span>' +
          '<span class="avail" style="color:' + availColor(s.avail, s.cap) + '">' + s.avail + ' free</span>' +
          '<span class="price">Rs. ' + s.rate + '/hr</span>' +
        '</div>' +
        '<button class="book-btn" onclick="event.stopPropagation(); callAndBook(' + s.id + ')">Call &amp; Book</button>';

      div.onclick = function() { goToSpot(s); };
      el.appendChild(div);
    });
  }

  function goToSpot(s) {
    activeId = s.id;
    map.setView([s.lat, s.lng], 16);
    var idx = SPOTS.findIndex(function(x) { return x.id === s.id; });
    if (markers[idx]) markers[idx].openPopup();
    highlightCard(s.id);
  }

  function highlightCard(id) {
    document.querySelectorAll(".finder-card").forEach(function(c) { c.classList.remove("active"); });
    var c = document.getElementById("finder-card-" + id);
    if (c) { c.classList.add("active"); c.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
  }

  function doSearch() {
    var vt = document.getElementById("vtype").value;
    var filtered = vt === "all" ? SPOTS : SPOTS.filter(function(s) {
      return s.type === vt || s.type === "both";
    });
    placeMarkers(filtered);
    if (filtered.length) {
      var lats = filtered.map(function(s) { return s.lat; });
      var lngs = filtered.map(function(s) { return s.lng; });
      map.fitBounds([
        [Math.min.apply(null, lats), Math.min.apply(null, lngs)],
        [Math.max.apply(null, lats), Math.max.apply(null, lngs)]
      ], { padding: [40, 40] });
    }
  }

  function callAndBook(id) {

    var s = SPOTS.find(function(x) {
        return x.id === id;
    });

    if (!s) return;

    var payment = confirm(
        "Parking: " + s.name +
        "\nLocation: " + s.area +
        "\nRate: Rs. " + s.rate + "/hour" +
        "\n\nWould you like to proceed to payment?"
    );

    if (payment) {

        localStorage.setItem("parkingName", s.name);
        localStorage.setItem("vehicle", typeLabel(s.type));
        localStorage.setItem("duration", document.getElementById("duration").value);

        var hours = 2;

        if(document.getElementById("duration").value=="1 Hour") hours=1;
        if(document.getElementById("duration").value=="2 Hours") hours=2;
        if(document.getElementById("duration").value=="4 Hours") hours=4;
        if(document.getElementById("duration").value=="Full Day") hours=8;

        localStorage.setItem("amount", s.rate * hours);

        window.location.href = "payment.html?id=" + s.id;
    }
}




  window.onload = function() {
    document.getElementById("date").value = new Date().toISOString().split("T")[0];
    initMap();
  };