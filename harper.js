const addBtnHarper = document.getElementById('add-character');
const containerHarper = document.getElementById('characters-container');
const popupContainerHarper = document.getElementById('popup-container');

let harperCharacters = JSON.parse(localStorage.getItem('harperCharacters')) || [];

function saveHarperCharacters() {
    localStorage.setItem('harperCharacters', JSON.stringify(harperCharacters));
    renderHarperCharacters();
}

function renderHarperCharacters() {
    containerHarper.innerHTML = '';
    harperCharacters.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${char.image || ''}" alt="${char.Name}" style="width:140px; height:175px; object-fit:cover; border-radius:20px;">
            <div class="character-name">${char.Name || 'No Name'}</div>
        `;
        card.addEventListener('click', () => showHarperCharacterDetail(index));
        containerHarper.appendChild(card);
    });
}

function showHarperCharacterDetail(index) {
    const char = harperCharacters[index];
    const popup = document.createElement('div');
    popup.style = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: #f4c2d7; padding: 20px;
        border-radius: 25px; width: 90%; max-width: 600px;
        max-height: 90%; overflow-y: auto; box-shadow: 0 10px 15px rgba(215,155,179,0.5);
    `;
    popup.innerHTML = `
        <div style="text-align:right">
            <button id="closeDetailHarper" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <div style="display:flex; gap:20px; flex-wrap:wrap;">
            <img src="${char.image || ''}" style="width:200px; height:250px; object-fit:cover; border-radius:20px;">
            <div style="flex:1; word-wrap:break-word;">${Object.entries(char).map(([key,val]) => key !== 'image' ? `<strong>${key}:</strong> ${val}<br>` : '').join('')}</div>
        </div>
        <button id="deleteCharHarper" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">Delete</button>
    `;
    popupContainerHarper.appendChild(popup);
    popupContainerHarper.style.pointerEvents = 'auto';

    document.getElementById('closeDetailHarper').onclick = () => {
        popupContainerHarper.innerHTML = '';
        popupContainerHarper.style.pointerEvents = 'none';
    };

    document.getElementById('deleteCharHarper').onclick = () => {
        if(confirm('Are you sure you want to delete this character?')){
            harperCharacters.splice(index,1);
            saveHarperCharacters();
            popupContainerHarper.innerHTML = '';
            popupContainerHarper.style.pointerEvents = 'none';
        }
    };
}

addBtnHarper.addEventListener('click', () => {
    const popup = document.createElement('div');
    popup.style = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: #f4c2d7; padding: 20px;
        border-radius: 25px; width: 90%; max-width: 600px;
        max-height: 90%; overflow-y: auto; box-shadow: 0 10px 15px rgba(215,155,179,0.5);
    `;

    popup.innerHTML = `
        <div style="text-align:right">
            <button id="closePopupHarper" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <form id="charFormHarper" style="display:flex; flex-direction:column; gap:10px;">
            <input type="text" name="Name" placeholder="Name:">
            <input type="text" name="MiddleName" placeholder="Middle name:">
            <input type="text" name="LastName" placeholder="Last name:">
            <!-- add all other fields as before -->
            <input type="file" name="image" accept="image/*">
            <button type="submit" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">Done</button>
        </form>
    `;
    popupContainerHarper.appendChild(popup);
    popupContainerHarper.style.pointerEvents = 'auto';

    document.getElementById('closePopupHarper').onclick = () => {
        popupContainerHarper.innerHTML = '';
        popupContainerHarper.style.pointerEvents = 'none';
    };

    document.getElementById('charFormHarper').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let charObj = {};
        const file = formData.get('image');
        for (let [key,val] of formData.entries()) {
            if(key !== 'image') charObj[key] = val;
        }

        if(file && file.name){
            const reader = new FileReader();
            reader.onload = () => {
                charObj.image = reader.result;
                harperCharacters.push(charObj);
                saveHarperCharacters();
                popupContainerHarper.innerHTML = '';
                popupContainerHarper.style.pointerEvents = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            harperCharacters.push(charObj);
            saveHarperCharacters();
            popupContainerHarper.innerHTML = '';
            popupContainerHarper.style.pointerEvents = 'none';
        }
    };
});

renderHarperCharacters();
