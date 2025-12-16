const addWorldBtn = document.getElementById('add-world');
const worldsContainer = document.getElementById('worlds-container');
const popupContainer = document.getElementById('popup-container');

let worlds = JSON.parse(localStorage.getItem('worlds')) || [];

// Save worlds to localStorage
function saveWorlds() {
    localStorage.setItem('worlds', JSON.stringify(worlds));
    renderWorlds();
}

// Render all worlds
function renderWorlds() {
    worldsContainer.innerHTML = '';
    worlds.forEach((world, index) => {
        const card = document.createElement('div');
        card.className = 'world-card';
        card.innerHTML = `<strong>${world.name}</strong>`;
        card.addEventListener('click', () => showWorldDetail(index));
        worldsContainer.appendChild(card);

        // Render locations directly below world if expanded
        if(world.locations && world.showLocations){
            world.locations.forEach((loc, locIndex) => {
                const locCard = document.createElement('div');
                locCard.className = 'location-card';
                locCard.innerHTML = `<strong>${loc.name}</strong><br>${loc.description || ''}`;
                worldsContainer.appendChild(locCard);
            });

            const addLocBtn = document.createElement('button');
            addLocBtn.textContent = '+';
            addLocBtn.className = 'add-btn';
            addLocBtn.style.top = 'auto';
            addLocBtn.style.bottom = '20px';
            addLocBtn.onclick = () => addLocation(index);
            worldsContainer.appendChild(addLocBtn);
        }
    });
}

// Show submission popup for world
function showWorldDetail(worldIndex) {
    worlds[worldIndex].showLocations = !worlds[worldIndex].showLocations;
    renderWorlds();
}

// Add new world
addWorldBtn.addEventListener('click', () => {
    const popup = document.createElement('div');
    popup.style = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: #f4c2d7; padding: 20px;
        border-radius: 25px; width: 90%; max-width: 400px;
        box-shadow: 0 10px 15px rgba(215,155,179,0.5);
    `;

    popup.innerHTML = `
        <div style="text-align:right">
            <button id="closePopupWorld" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <form id="worldForm" style="display:flex; flex-direction:column; gap:10px;">
            <input type="text" name="worldName" placeholder="World name" required>
            <button type="submit" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px; border-radius:15px; cursor:pointer;">Add World</button>
        </form>
    `;
    popupContainer.appendChild(popup);
    popupContainer.style.pointerEvents = 'auto';

    document.getElementById('closePopupWorld').onclick = () => {
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

// Add location to a world
function addLocation(worldIndex) {
    const popup = document.createElement('div');
    popup.style = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: #f4c2d7; padding: 20px;
        border-radius: 25px; width: 90%; max-width: 400px;
        box-shadow: 0 10px 15px rgba(215,155,179,0.5);
    `;

    popup.innerHTML = `
        <div style="text-align:right">
            <button id="closePopupLoc" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <form id="locForm" style="display:flex; flex-direction:column; gap:10px;">
            <input type="text" name="locName" placeholder="Location name" required>
            <textarea name="locDesc" placeholder="Description"></textarea>
            <button type="submit" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px; border-radius:15px; cursor:pointer;">Add Location</button>
        </form>
    `;
    popupContainer.appendChild(popup);
    popupContainer.style.pointerEvents = 'auto';

    document.getElementById('closePopupLoc').onclick = () => {
        popupContainer.innerHTML = '';
        popupContainer.style.pointerEvents = 'none';
    };

    document.getElementById('locForm').onsubmit = (e) => {
        e.preventDefault();
        const name = e.target.locName.value.trim();
        const desc = e.target.locDesc.value.trim();
        if(name){
            worlds[worldIndex].locations.push({name, description: desc});
            saveWorlds();
            popupContainer.innerHTML = '';
            popupContainer.style.pointerEvents = 'none';
        }
    };
}

// Initial render
renderWorlds();
