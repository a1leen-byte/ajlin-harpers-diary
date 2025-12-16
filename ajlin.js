const addBtnAjlin = document.getElementById('add-character');
const containerAjlin = document.getElementById('characters-container');
const popupContainerAjlin = document.getElementById('popup-container');

let ajlinCharacters = JSON.parse(localStorage.getItem('ajlinCharacters')) || [];

function saveAjlinCharacters() {
    localStorage.setItem('ajlinCharacters', JSON.stringify(ajlinCharacters));
    renderAjlinCharacters();
}

function renderAjlinCharacters() {
    containerAjlin.innerHTML = '';
    ajlinCharacters.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${char.image || ''}" alt="${char.Name}" style="width:140px; height:175px; object-fit:cover; border-radius:20px;">
            <div class="character-name">${char.Name || 'No Name'}</div>
        `;
        card.addEventListener('click', () => showAjlinCharacterDetail(index));
        containerAjlin.appendChild(card);
    });
}

function showAjlinCharacterDetail(index) {
    const char = ajlinCharacters[index];
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
            <button id="closeDetailAjlin" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <div style="display:flex; gap:20px; flex-wrap:wrap;">
            <img src="${char.image || ''}" style="width:200px; height:250px; object-fit:cover; border-radius:20px;">
            <div style="flex:1; word-wrap:break-word;">${Object.entries(char).map(([key,val]) => key !== 'image' ? `<strong>${key}:</strong> ${val}<br>` : '').join('')}</div>
        </div>
        <button id="deleteCharAjlin" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">Delete</button>
    `;
    popupContainerAjlin.appendChild(popup);
    popupContainerAjlin.style.pointerEvents = 'auto';

    document.getElementById('closeDetailAjlin').onclick = () => {
        popupContainerAjlin.innerHTML = '';
        popupContainerAjlin.style.pointerEvents = 'none';
    };

    document.getElementById('deleteCharAjlin').onclick = () => {
        if(confirm('Are you sure you want to delete this character?')){
            ajlinCharacters.splice(index,1);
            saveAjlinCharacters();
            popupContainerAjlin.innerHTML = '';
            popupContainerAjlin.style.pointerEvents = 'none';
        }
    };
}

addBtnAjlin.addEventListener('click', () => {
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
            <button id="closePopupAjlin" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <form id="charFormAjlin" style="display:flex; flex-direction:column; gap:10px;">
            <input type="text" name="Name" placeholder="Name:">
            <input type="text" name="MiddleName" placeholder="Middle name:">
            <input type="text" name="LastName" placeholder="Last name:">
            <!-- add all other fields you need -->
            <input type="file" name="image" accept="image/*">
            <button type="submit" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">Done</button>
        </form>
    `;
    popupContainerAjlin.appendChild(popup);
    popupContainerAjlin.style.pointerEvents = 'auto';

    document.getElementById('closePopupAjlin').onclick = () => {
        popupContainerAjlin.innerHTML = '';
        popupContainerAjlin.style.pointerEvents = 'none';
    };

    document.getElementById('charFormAjlin').onsubmit = (e) => {
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
                ajlinCharacters.push(charObj);
                saveAjlinCharacters();
                popupContainerAjlin.innerHTML = '';
                popupContainerAjlin.style.pointerEvents = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            ajlinCharacters.push(charObj);
            saveAjlinCharacters();
            popupContainerAjlin.innerHTML = '';
            popupContainerAjlin.style.pointerEvents = 'none';
        }
    };
});

renderAjlinCharacters();
