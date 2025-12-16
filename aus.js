const addWorldBtn = document.getElementById("add-world");
const worldsContainer = document.getElementById("worlds-container");
const popupContainer = document.getElementById("popup-container");

let worlds = JSON.parse(localStorage.getItem("ausWorlds")) || [];

/* ---------------- SAVE + RENDER ---------------- */

function saveWorlds() {
  localStorage.setItem("ausWorlds", JSON.stringify(worlds));
  renderWorlds();
}

function renderWorlds() {
  worldsContainer.innerHTML = "";

  worlds.forEach((world, wIndex) => {
    const worldCard = document.createElement("div");
    worldCard.className = "world-card";

    worldCard.innerHTML = `
      <div class="world-header">
        <div class="world-name">${world.name}</div>
        <div>
          <button class="add-btn" data-add-location>+</button>
          <button class="add-btn" data-delete-world>🗑</button>
        </div>
      </div>
      <div class="locations"></div>
    `;

    const locationsContainer = worldCard.querySelector(".locations");

    world.locations.forEach((loc, lIndex) => {
      const locCard = document.createElement("div");
      locCard.className = "location-card";

      locCard.innerHTML = `
        ${loc.image ? `<img src="${loc.image}">` : ""}
        <strong>${loc.name}</strong>
        <p style="word-wrap:break-word; overflow-wrap:anywhere; max-height:200px; overflow-y:auto;">
          ${loc.description}
        </p>
        <button class="add-btn" data-delete-location>🗑</button>
      `;

      locCard.querySelector("[data-delete-location]").onclick = () => {
        if (confirm("Delete this location?")) {
          world.locations.splice(lIndex, 1);
          saveWorlds();
        }
      };

      locationsContainer.appendChild(locCard);
    });

    /* ADD LOCATION */
    worldCard.querySelector("[data-add-location]").onclick = () => {
      openLocationPopup(wIndex);
    };

    /* DELETE WORLD */
    worldCard.querySelector("[data-delete-world]").onclick = () => {
      if (confirm("Delete this world and everything inside it?")) {
        worlds.splice(wIndex, 1);
        saveWorlds();
      }
    };

    worldsContainer.appendChild(worldCard);
  });
}

/* ---------------- POPUPS ---------------- */

function openWorldPopup() {
  popupContainer.style.pointerEvents = "auto";
  popupContainer.innerHTML = `
    <div style="
      position:fixed; top:50%; left:50%;
      transform:translate(-50%,-50%);
      background:#f4c2d7;
      padding:20px;
      border-radius:25px;
      width:90%; max-width:400px;
      box-shadow:0 10px 15px rgba(215,155,179,0.5);
    ">
      <h2 style="font-family:Allura; text-align:center;">New World</h2>
      <input id="worldName" placeholder="World name" style="width:100%; padding:10px;">
      <div style="display:flex; justify-content:space-between; margin-top:15px;">
        <button id="cancelWorld">Cancel</button>
        <button id="saveWorld">Done</button>
      </div>
    </div>
  `;

  document.getElementById("cancelWorld").onclick = closePopup;
  document.getElementById("saveWorld").onclick = () => {
    const name = document.getElementById("worldName").value.trim();
    if (!name) return;

    worlds.push({ name, locations: [] });
    saveWorlds();
    closePopup();
  };
}

function openLocationPopup(worldIndex) {
  popupContainer.style.pointerEvents = "auto";
  popupContainer.innerHTML = `
    <div style="
      position:fixed; top:50%; left:50%;
      transform:translate(-50%,-50%);
      background:#f4c2d7;
      padding:20px;
      border-radius:25px;
      width:90%; max-width:500px;
      max-height:90%; overflow-y:auto;
      box-shadow:0 10px 15px rgba(215,155,179,0.5);
    ">
      <h2 style="font-family:Allura; text-align:center;">New Location</h2>
      <input id="locName" placeholder="Location name" style="width:100%; padding:10px;"><br><br>
      <textarea id="locDesc" placeholder="Description" style="width:100%; height:120px;"></textarea><br><br>
      <input type="file" id="locImage" accept="image/*"><br><br>
      <div style="display:flex; justify-content:space-between;">
        <button id="cancelLoc">Cancel</button>
        <button id="saveLoc">Done</button>
      </div>
    </div>
  `;

  document.getElementById("cancelLoc").onclick = closePopup;
  document.getElementById("saveLoc").onclick = () => {
    const name = document.getElementById("locName").value.trim();
    const desc = document.getElementById("locDesc").value.trim();
    const file = document.getElementById("locImage").files[0];

    if (!name) return;

    const location = { name, description: desc, image: "" };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        location.image = reader.result;
        worlds[worldIndex].locations.push(location);
        saveWorlds();
        closePopup();
      };
      reader.readAsDataURL(file);
    } else {
      worlds[worldIndex].locations.push(location);
      saveWorlds();
      closePopup();
    }
  };
}

function closePopup() {
  popupContainer.innerHTML = "";
  popupContainer.style.pointerEvents = "none";
}

/* ---------------- EVENTS ---------------- */

addWorldBtn.addEventListener("click", openWorldPopup);

/* ---------------- INIT ---------------- */

renderWorlds();
