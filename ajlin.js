const addBtn = document.getElementById('add-character');
const container = document.getElementById('characters-container');
const popupContainer = document.getElementById('popup-container');

// Load characters from localStorage
let characters = JSON.parse(localStorage.getItem('ajlinCharacters')) || [];

function saveCharacters() {
    localStorage.setItem('ajlinCharacters', JSON.stringify(characters));
    renderCharacters();
}

function renderCharacters() {
    container.innerHTML = '';
    characters.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${char.image || ''}" alt="${char.name}">
            <div class="character-name">${char.name}</div>
        `;
        card.addEventListener('click', () => showCharacterDetail(index));
        container.appendChild(card);
    });
}

function showCharacterDetail(index) {
    const char = characters[index];
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
            <button id="closeDetail" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <div style="display:flex; gap:20px; flex-wrap:wrap;">
            <img src="${char.image || ''}" style="width:200px; height:auto; border-radius:20px;">
            <div style="flex:1; word-wrap:break-word;">${Object.entries(char).map(([key,val]) => key !== 'image' ? `<strong>${key}:</strong> ${val}<br>` : '').join('')}</div>
        </div>
        <button id="deleteChar" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">Delete</button>
    `;
    popupContainer.appendChild(popup);
    popupContainer.style.pointerEvents = 'auto';

    document.getElementById('closeDetail').onclick = () => {
        popupContainer.innerHTML = '';
        popupContainer.style.pointerEvents = 'none';
    };

    document.getElementById('deleteChar').onclick = () => {
        if(confirm('Are you sure you want to delete this character?')){
            characters.splice(index,1);
            saveCharacters();
            popupContainer.innerHTML = '';
            popupContainer.style.pointerEvents = 'none';
        }
    };
}

addBtn.addEventListener('click', () => {
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
            <button id="closePopup" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <form id="charForm" style="display:flex; flex-direction:column; gap:10px;">
            <input type="text" name="Name" placeholder="Name:">
            <input type="text" name="MiddleName" placeholder="Middle name:">
            <input type="text" name="LastName" placeholder="Last name:">
            <input type="text" name="Age" placeholder="Age:">
            <input type="text" name="Generation" placeholder="Generation:">
            <input type="text" name="MentalState" placeholder="ᴍᴇɴᴛᴀʟ ꜱᴛᴀᴛᴇ:">
            <input type="text" name="MentalIllness" placeholder="Mental Illness(es):">
            <input type="text" name="Phobias" placeholder="Phobia(s):">
            <input type="text" name="Triggers" placeholder="Trigger(s):">
            <input type="text" name="Addictions" placeholder="Addiction(s):">
            <input type="text" name="HealthDefects" placeholder="Health defect(s):">
            <input type="text" name="Family" placeholder="Family/Relations:">
            <input type="text" name="FathersName" placeholder="Father’s name:">
            <input type="text" name="MothersName" placeholder="Mother’s name:">
            <input type="text" name="Siblings" placeholder="Siblings (age and name):">
            <input type="text" name="FamilySurname" placeholder="Family surname:">
            <input type="text" name="FamilyIncome" placeholder="Family income/class:">
            <input type="text" name="Personality" placeholder="Personality:">
            <input type="text" name="Hobbies" placeholder="Hobbies:">
            <input type="text" name="Likes" placeholder="Likes:">
            <input type="text" name="Dislikes" placeholder="Dislikes:">
            <input type="text" name="Skills" placeholder="Skills:">
            <input type="text" name="SexualOrientation" placeholder="Sexual orientation:">
            <input type="text" name="Kinks" placeholder="Kink(s):">
            <input type="text" name="Extra" placeholder="Extra:">
            <input type="text" name="Story" placeholder="Story:">
            <input type="text" name="NotableCrimes" placeholder="Notable crimes:">
            <input type="text" name="Country" placeholder="Country/Town:">
            <input type="text" name="Nationality" placeholder="Nationality:">
            <input type="text" name="Backstory" placeholder="Backstory:">
            <input type="text" name="Appearance" placeholder="Appearance characteristics:">
            <input type="text" name="HairColor" placeholder="Hair color:">
            <input type="text" name="EyeColor" placeholder="Eye color:">
            <input type="text" name="Height" placeholder="Height:">
            <input type="text" name="BodyType" placeholder="Body type:">
            <input type="text" name="Ethnicity" placeholder="Ethnicity:">
            <input type="text" name="SignificantBodyScars" placeholder="Significant body scars:">
            <input type="text" name="SignificantBirthMarks" placeholder="Significant birth marks:">
            <input type="text" name="FaceClaim" placeholder="Face claim:">
            <input type="file" name="image" accept="image/*">
            <button type="submit" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">Done</button>
        </form>
    `;
    popupContainer.appendChild(popup);
    popupContainer.style.pointerEvents = 'auto';

    document.getElementById('closePopup').onclick = () => {
        popupContainer.innerHTML = '';
        popupContainer.style.pointerEvents = 'none';
    };

    document.getElementById('charForm').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let charObj = {};
        for (let [key, val] of formData.entries()) {
            if(key === 'image' && val.name) {
                const reader = new FileReader();
                reader.onload = () => {
                    charObj[key] = reader.result;
                    characters.push(charObj);
                    saveCharacters();
                    popupContainer.innerHTML = '';
                    popupContainer.style.pointerEvents = 'none';
                };
                reader.readAsDataURL(val);
            } else if(key !== 'image') {
                charObj[key] = val;
            }
        }
        // if no image selected, still push
        if(!charObj.image){
            characters.push(charObj);
            saveCharacters();
            popupContainer.innerHTML = '';
            popupContainer.style.pointerEvents = 'none';
        }
    };
});

renderCharacters();
