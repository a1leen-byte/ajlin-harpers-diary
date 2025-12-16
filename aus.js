const container = document.getElementById('universes-container');
const popupContainer = document.getElementById('popup-container');

let universes = JSON.parse(localStorage.getItem('universes')) || [];

function saveUniverses() {
    localStorage.setItem('universes', JSON.stringify(universes));
    renderUniverses();
}

function renderUniverses() {
    container.innerHTML = '';
    universes.forEach((universe, index) => {
        const card = document.createElement('div');
        card.className = 'universe-card';
        card.innerHTML = `
            <strong>${universe.name || 'Unnamed World'}</strong>
        `;
        card.addEventListener('click', () => showUniverseDetail(index));
        container.appendChild(card);
    });
}

function showUniverseDetail(index) {
    const universe = universes[index];
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
            <button id="closeDetail" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <h2>${universe.name}</h2>
        <button id="add-location">+ Add Location</button>
        <div id="locations-container" style="margin-top:15px; display:flex; flex-wrap:wrap; gap:15px;"></div>
        <button id="deleteUniverse" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">Delete World</button>
    `;
    popupContainer.appendChild(popup);
    popupContainer.style.pointerEvents = 'auto';

    const locationsContainer = popup.querySelector('#locations-container');

    // Render locations
    function renderLocations() {
        locationsContainer.innerHTML = '';
        (universe.locations || []).forEach((loc, locIndex) => {
            const locCard = document.createElement('div');
            locCard.className = 'location-card';
            locCard.style = `
                background: #f4c2d7;
                border-radius: 20px;
                width: 200px;
                padding: 10px;
                text-align: center;
                box-shadow: 0 5px 10px rgba(215,155,179,0.3);
                word-wrap: break-word;
                overflow-wrap: break-word;
                display: flex;
                flex-direction: column;
                align-items: center;
            `;
            locCard.innerHTML = `
                ${loc.image ? `<img src="${loc.image}" style="width:100%; height:150px; object-fit:cover; border-radius:15px; margin-bottom:8px;">` : ''}
                <strong>${loc.name}</strong>
                <p>${loc.description}</p>
                <button style="margin-top:5px; background:#d77fa1; color:#fff; border:none; padding:5px 10px; border-radius:10px; cursor:pointer;">Delete</button>
            `;
            locCard.querySelector('button').onclick = () => {
                if(confirm('Delete this location?')){
                    universe.locations.splice(locIndex,1);
                    saveUniverses();
                    renderLocations();
                }
            };
            locationsContainer.appendChild(locCard);
        });
    }
    renderLocations();

    // Add location
    popup.querySelector('#add-location').onclick = () => {
        const locForm = document.createElement('div');
        locForm.style = 'margin-top:10px; display:flex; flex-direction:column; gap:5px;';
        locForm.innerHTML = `
            <input type="text" placeholder="Location name" id="loc-name">
            <textarea placeholder="Description" id="loc-desc" rows="3"></textarea>
            <input type="file" id="loc-image" accept="image/*">
            <button style="background:#6b4a3b; color:#fff; border:none; padding:5px 10px; border-radius:10px; cursor:pointer;">Add</button>
        `;
        popup.querySelector('#add-location').after(locForm);
        locForm.querySelector('button').onclick = () => {
            const name = locForm.querySelector('#loc-name').value || 'Unnamed Location';
            const desc = locForm.querySelector('#loc-desc').value || '';
            const file = locForm.querySelector('#loc-image').files[0];
            const newLoc = { name, description: desc, image: '' };

            if(file){
                const reader = new FileReader();
                reader.onload = () => {
                    newLoc.image = reader.result;
                    universe.locations = universe.locations || [];
                    universe.locations.push(newLoc);
                    saveUniverses();
                    renderLocations();
                    locForm.remove();
                };
                reader.readAsDataURL(file);
            } else {
                universe.locations = universe.locations || [];
                universe.locations.push(newLoc);
                saveUniverses();
                renderLocations();
                locForm.remove();
            }
        };
    };

    document.getElementById('closeDetail').onclick = () => {
        popupContainer.innerHTML = '';
        popupContainer.style.pointerEvents = 'none';
    };

    document.getElementById('deleteUniverse').onclick = () => {
        if(confirm('Delete this world?')){
            universes.splice(index,1);
            saveUniverses();
            popupContainer.innerHTML = '';
            popupContainer.style.pointerEvents = 'none';
        }
    };
}

document.getElementById('add-universe').onclick = () => {
    const name = prompt('Enter world name:');
    if(name){
        universes.push({ name, locations: [] });
        saveUniverses();
    }
};

renderUniverses();
