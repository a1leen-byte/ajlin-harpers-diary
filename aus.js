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
    worlds.forEach((world, worldIndex) => {
        const card = document.createElement('div');
        card.className = 'world-card';
        card.innerHTML = `<strong>${world.name}</strong>`;
        card.addEventListener('click', () => showWorldLocations(worldIndex));
        worldsContainer.appendChild(card);
    });
}

// Show locations for a specific world
function showWorldLocations(worldIndex) {
    const world = worlds[worldIndex];
    const popup = document.createElement('div');
    popup.style = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: #f4c2d7; padding: 20px;
        border-radius: 25px; width: 90%; max-width: 700px;
        max-height: 90%; overflow-y: auto; box-shadow: 0 10px 15px rgba(215,155,179,0.5);
    `;

    popup.innerHTML = `
        <div style="text-align:right">
            <button id="closeWorldPopup" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <h2>${world.name}</h2>
        <div id="locations-container" style="display:flex; flex-wrap:wrap; gap:15px; margin-top:20px;"></div>
        <button id="add-location" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">+ Add Location</button>
    `;
    popupContainer.appendChild(popup);
    popupContainer.style.pointerEvents = 'auto';

    const locationsContainer = document.getElementById('locations-container');

    function renderLocations() {
        locationsContainer.innerHTML = '';
        world.locations = world.locations || [];
        world.locations.forEach((loc, locIndex) => {
            const locCard = document.createElement('div');
            locCard.className = 'location-card';
            locCard.innerHTML = `<strong>${loc.name}</strong><br>${loc.description || ''}`;
            locationsContainer.appendChild(locCard);
        });
    }

    document.getElementById('add-location').onclick = () => {
        const locName = prompt('Enter location name:');
        const locDesc = prompt('Enter location description:');
        if(locName) {
            world.locations = world.locations || [];
            world.locations.push({name: locName, description: locDesc || ''});
            saveWorlds();
            renderLocations();
        }
    };

    renderLocations();

    document.getElementById('closeWorldPopup').onclick = () => {
        popupContainer.innerHTML = '';
        popupContainer.style.pointerEvents = 'none';
    };
}

// Add new world
addWorldBtn.addEventListener('click', () => {
    const worldName = prompt('Enter world name:');
    if(worldName) {
        worlds.push({name: worldName, locations: []});
        saveWorlds();
    }
});

// Initial render
renderWorlds();
