const worldsContainer = document.getElementById('worlds-container');
const popupContainer = document.getElementById('popup-container');
const addWorldBtn = document.getElementById('add-world');

let worlds = JSON.parse(localStorage.getItem('worlds')) || [];

// Save and re-render
function saveWorlds() {
  localStorage.setItem('worlds', JSON.stringify(worlds));
  renderWorlds();
}

// Render all worlds
function renderWorlds() {
  worldsContainer.innerHTML = '';
  worlds.forEach((world, wIndex) => {
    const worldCard = document.createElement('div');
    worldCard.className = 'world-card';

    worldCard.innerHTML = `
      <div class="world-header">
        <div class="world-name">${world.name}</div>
        <button class="add-btn" id="add-loc-${wIndex}">+</button>
      </div>
      <div class="locations-container" id="loc-container-${wIndex}" style="margin-top:10px;"></div>
    `;

    worldsContainer.appendChild(worldCard);

    // Render locations
    const locContainer = document.getElementById(`loc-container-${wIndex}`);
    world.locations?.forEach(loc => {
      const locCard = document.createElement('div');
      locCard.className = 'location-card';
      locCard.innerHTML = `
        <img src="${loc.image || ''}">
        <strong>${loc.name}</strong><br>
        ${loc.description || ''}
      `;
      locContainer.appendChild(locCard);
    });

    // Add location button
    document.getElementById(`add-loc-${wIndex}`).addEventListener('click', (e) => {
      e.stopPropagation(); // prevent collapsing
      openLocationPopup(wIndex);
    });
  });
}

// Add world popup
addWorldBtn.addEventListener('click', () => {
  const popup = document.createElement('div');
  popup.style = `
    position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
    background:#f4c2d7; padding:20px; border-radius:25px;
    width:90%; max-width:400px; box-shadow:0 10px 15px rgba(215,155,179,0.5);
  `;
  popup.innerHTML = `
    <div style="text-align:right">
      <button id="closeWorldPopup" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
    </div>
    <form id="worldForm" style="display:flex; flex-direction:column; gap:10px;">
      <input type="text" name="worldName" placeholder="World name" required>
      <button type="submit" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px; border-radius:15px; cursor:pointer;">Add World</button>
    </form>
  `;
  popupContainer.appendChild(popup);
  popupContainer.style.pointerEvents = 'auto';

  document.getElementById('closeWorldPopup').onclick = () => {
    popupContainer.innerHTML = '';
    popupContainer.style.pointerEvents = 'none';
  };

  document.getElementById('worldForm').onsubmit = (e) => {
    e.preventDefault();
    const name = e.target.worldName.value.trim();
    if(name){
      worlds.push({name, locations: []});
      saveWorlds();
      popupContainer.innerHTML = '';
      popupContainer.style.pointerEvents = 'none';
    }
  };
});

// Add location popup
function openLocationPopup(worldIndex) {
  const popup = document.createElement('div');
  popup.style = `
    position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
    background:#f4c2d7; padding:20px; border-radius:25px;
    width:90%; max-width:400px; box-shadow:0 10px 15px rgba(215,155,179,0.5);
  `;
  popup.innerHTML = `
    <div style="text-align:right">
      <button id="closeLocPopup" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
    </div>
    <form id="locForm" style="display:flex; flex-direction:column; gap:10px;">
      <input type="text" name="locName" placeholder="Location name" required>
      <textarea name="locDesc" placeholder="Description"></textarea>
      <input type="file" name="image" accept="image/*">
      <button type="submit" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px; border-radius:15px; cursor:pointer;">Add Location</button>
    </form>
  `;
  popupContainer.appendChild(popup);
  popupContainer.style.pointerEvents = 'auto';

  document.getElementById('closeLocPopup').onclick = () => {
    popupContainer.innerHTML = '';
    popupContainer.style.pointerEvents = 'none';
  };

  document.getElementById('locForm').onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const locObj = {
      name: formData.get('locName').trim(),
      description: formData.get('locDesc').trim()
    };
    const file = formData.get('image');
    if(file && file.name){
      const reader = new FileReader();
      reader.onload = () => {
        locObj.image = reader.result;
        worlds[worldIndex].locations.push(locObj);
        saveWorlds();
        popupContainer.innerHTML = '';
        popupContainer.style.pointerEvents = 'none';
      };
      reader.readAsDataURL(file);
    } else {
      worlds[worldIndex].locations.push(locObj);
      saveWorlds();
      popupContainer.innerHTML = '';
      popupContainer.style.pointerEvents = 'none';
    }
  };
}

// Initial render
renderWorlds();
