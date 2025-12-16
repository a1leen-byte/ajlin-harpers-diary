import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyASqFQZENu20dci2JqSE58UhILjJahsBAY",
  authDomain: "ajlin-harpers-diary.firebaseapp.com",
  projectId: "ajlin-harpers-diary",
  storageBucket: "ajlin-harpers-diary.firebasestorage.app",
  messagingSenderId: "973459790168",
  appId: "1:973459790168:web:47eb2bbc232c51595eed2d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addBtnHarper = document.getElementById('add-character');
const containerHarper = document.getElementById('characters-container');
const popupContainerHarper = document.getElementById('popup-container');

let harperCharacters = [];

// Load from Firestore
async function loadHarperCharacters() {
    harperCharacters = [];
    const querySnapshot = await getDocs(collection(db, "harperCharacters"));
    querySnapshot.forEach(docSnap => {
        harperCharacters.push({ id: docSnap.id, ...docSnap.data() });
    });
    renderHarperCharacters();
}

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
        border-radius: 25px; width: 90%; max-width: 700px;
        max-height: 90%; overflow-y: auto; box-shadow: 0 10px 15px rgba(215,155,179,0.5);
    `;
    popup.innerHTML = `
        <div style="text-align:right">
            <button id="closeDetailHarper" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <div style="display:flex; gap:20px; flex-wrap:wrap;">
            <img src="${char.image || ''}" style="width:200px; height:250px; object-fit:cover; border-radius:20px;">
            <div style="flex:1; word-wrap:break-word;">
                ${Object.entries(char).map(([key,val]) => key !== 'image' ? `<strong>${key}:</strong> ${val}<br>` : '').join('')}
            </div>
        </div>
        <button id="deleteCharHarper" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">Delete</button>
    `;
    popupContainerHarper.appendChild(popup);
    popupContainerHarper.style.pointerEvents = 'auto';

    document.getElementById('closeDetailHarper').onclick = () => {
        popupContainerHarper.innerHTML = '';
        popupContainerHarper.style.pointerEvents = 'none';
    };

    document.getElementById('deleteCharHarper').onclick = async () => {
        if(confirm('Are you sure you want to delete this character?')){
            if(char.id) await deleteDoc(doc(db, "harperCharacters", char.id));
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
        border-radius: 25px; width: 90%; max-width: 700px;
        max-height: 90%; overflow-y: auto; box-shadow: 0 10px 15px rgba(215,155,179,0.5);
    `;

    // **FULL ORIGINAL FORM** (unchanged)
    popup.innerHTML = `
        <div style="text-align:right">
            <button id="closePopupHarper" style="font-size:24px; background:none; border:none; cursor:pointer;">✖</button>
        </div>
        <form id="charFormHarper" style="display:flex; flex-direction:column; gap:10px;">
            <input type="text" name="Name" placeholder="Name:">
            <input type="text" name="MiddleName" placeholder="Middle name:">
            <input type="text" name="LastName" placeholder="Last name:">
            <select name="Gender">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input type="text" name="Age" placeholder="Age:">
            <input type="text" name="Generation" placeholder="Generation:">
            <input type="text" name="MentalState" placeholder="ᴍᴇɴᴛᴀʟ ꜱᴛᴀᴛᴇ:">
            <input type="text" name="MentalIllness" placeholder="Mental Illness(es):">
            <input type="text" name="Phobia" placeholder="Phobia(s):">
            <input type="text" name="Trigger" placeholder="Trigger(s):">
            <input type="text" name="Addiction" placeholder="Addiction(s):">
            <input type="text" name="HealthDefect" placeholder="Health defect(s):">
            <input type="text" name="Father" placeholder="Father's name:">
            <input type="text" name="Mother" placeholder="Mother's name:">
            <input type="text" name="Siblings" placeholder="Siblings (age and name):">
            <input type="text" name="FamilySurname" placeholder="Family surname:">
            <input type="text" name="FamilyIncome" placeholder="Family income (class):">
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
            <input type="text" name="HairColor" placeholder="Hair color:">
            <input type="text" name="EyeColor" placeholder="Eye color:">
            <input type="text" name="Height" placeholder="Height:">
            <input type="text" name="BodyType" placeholder="Body type:">
            <input type="text" name="Ethnicity" placeholder="Ethnicity:">
            <input type="text" name="SignificantScars" placeholder="Significant body scars:">
            <input type="text" name="SignificantBirthMarks" placeholder="Significant birth marks:">
            <input type="text" name="FaceClaim" placeholder="Face claim:">
            <input type="file" name="image" accept="image/*">
            <div style="display:flex; justify-content:space-between;">
                <button type="submit" style="margin-top:10px; background:#d77fa1; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">Done</button>
                <button type="button" id="cancelFormHarper" style="margin-top:10px; background:#6b4a3b; color:#fff; border:none; padding:10px 20px; border-radius:15px; cursor:pointer;">Cancel</button>
            </div>
        </form>
    `;

    popupContainerHarper.appendChild(popup);
    popupContainerHarper.style.pointerEvents = 'auto';

    document.getElementById('closePopupHarper').onclick = () => {
        popupContainerHarper.innerHTML = '';
        popupContainerHarper.style.pointerEvents = 'none';
    };

    document.getElementById('cancelFormHarper').onclick = () => {
        popupContainerHarper.innerHTML = '';
        popupContainerHarper.style.pointerEvents = 'none';
    };

    document.getElementById('charFormHarper').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let charObj = {};
        const file = formData.get('image');

        for (let [key,val] of formData.entries()) {
            if(key !== 'image') charObj[key] = val;
        }

        if(file && file.name){
            const reader = new FileReader();
            reader.onload = async () => {
                charObj.image = reader.result;
                const docRef = await addDoc(collection(db, "harperCharacters"), charObj);
                charObj.id = docRef.id;
                harperCharacters.push(charObj);
                saveHarperCharacters();
                popupContainerHarper.innerHTML = '';
                popupContainerHarper.style.pointerEvents = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            const docRef = await addDoc(collection(db, "harperCharacters"), charObj);
            charObj.id = docRef.id;
            harperCharacters.push(charObj);
            saveHarperCharacters();
            popupContainerHarper.innerHTML = '';
            popupContainerHarper.style.pointerEvents = 'none';
        }
    };
});

// Initial load
loadHarperCharacters();
