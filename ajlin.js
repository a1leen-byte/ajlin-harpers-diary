document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-ajlin-character');
    const popupContainer = document.getElementById('ajlin-popup-container');
    const charactersContainer = document.getElementById('ajlin-characters-container');

    addBtn.addEventListener('click', () => {
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.background = '#fbf1e6';
        popup.style.padding = '20px';
        popup.style.borderRadius = '20px';
        popup.style.boxShadow = '0 10px 20px rgba(215,155,179,0.5)';
        popup.style.maxHeight = '80vh';
        popup.style.overflowY = 'auto';
        popup.style.width = '400px';
        popup.innerHTML = `
            <h2 style="font-family: 'Allura', cursive; color:#d77fa1; text-align:center;">Character Submission</h2>
            <form id="character-form">
                <label>Name:</label><br><input type="text" name="name"><br>
                <label>Middle name:</label><br><input type="text" name="middle"><br>
                <label>Last name:</label><br><input type="text" name="last"><br>
                <label>Age:</label><br><input type="text" name="age"><br>
                <label>Generation:</label><br><input type="text" name="generation"><br><br>

                <h3>Mental State</h3>
                <label>Mental Illness(es):</label><br><input type="text" name="mental_illness"><br>
                <label>Phobia(s):</label><br><input type="text" name="phobia"><br>
                <label>Trigger(s):</label><br><input type="text" name="trigger"><br>
                <label>Addiction(s):</label><br><input type="text" name="addiction"><br>
                <label>Health defect(s):</label><br><input type="text" name="health"><br><br>

                <h3>Family / Relations</h3>
                <label>Father's name:</label><br><input type="text" name="father"><br>
                <label>Mother's name:</label><br><input type="text" name="mother"><br>
                <label>Siblings (age and name):</label><br><input type="text" name="siblings"><br>
                <label>Family surname:</label><br><input type="text" name="family_surname"><br>
                <label>Family income / class:</label><br><input type="text" name="family_income"><br><br>

                <h3>Personality & Interests</h3>
                <label>Personality:</label><br><input type="text" name="personality"><br>
                <label>Hobbies:</label><br><input type="text" name="hobbies"><br>
                <label>Likes:</label><br><input type="text" name="likes"><br>
                <label>Dislikes:</label><br><input type="text" name="dislikes"><br>
                <label>Skills:</label><br><input type="text" name="skills"><br><br>

                <h3>Bedroom</h3>
                <label>Sexual orientation:</label><br><input type="text" name="orientation"><br>
                <label>Kink(s):</label><br><input type="text" name="kinks"><br>
                <label>Extra:</label><br><input type="text" name="extra"><br><br>

                <h3>Story</h3>
                <label>Notable convicted crimes:</label><br><input type="text" name="crimes"><br>
                <label>Country / Town:</label><br><input type="text" name="location"><br>
                <label>Nationality:</label><br><input type="text" name="nationality"><br>
                <label>Backstory:</label><br><textarea name="backstory" rows="3"></textarea><br><br>

                <h3>Appearance</h3>
                <label>Characteristics:</label><br><input type="text" name="characteristics"><br>
                <label>Hair color:</label><br><input type="text" name="hair"><br>
                <label>Eye color:</label><br><input type="text" name="eyes"><br>
                <label>Height:</label><br><input type="text" name="height"><br>
                <label>Body type:</label><br><input type="text" name="body"><br>
                <label>Ethnicity:</label><br><input type="text" name="ethnicity"><br>
                <label>Significant body scars:</label><br><input type="text" name="scars"><br>
                <label>Significant birth marks:</label><br><input type="text" name="marks"><br>
                <label>Face claim name:</label><br><input type="text" name="faceclaim"><br><br>

                <label>Attach Image:</label><br><input type="file" name="image"><br><br>

                <button type="submit" style="background:#f4c2d7; color:#6b4a3b; font-family:'Allura', cursive; border:none; padding:10px 20px; border-radius:15px;">Done</button>
                <button type="button" id="cancel-btn" style="background:#fbf1e6; color:#d77fa1; font-family:'Allura', cursive; border:none; padding:10px 20px; border-radius:15px; margin-left:10px;">Cancel</button>
            </form>
        `;
        popupContainer.appendChild(popup);

        document.getElementById('cancel-btn').addEventListener('click', () => {
            popupContainer.removeChild(popup);
        });

        document.getElementById('character-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);

            const characterData = {};
            formData.forEach((value, key) => {
                characterData[key] = value;
            });

            const card = document.createElement('div');
            card.className = 'character-card';
            let imgURL = '';
            const imgFile = formData.get('image');
            if (imgFile && imgFile.size > 0) {
                imgURL = URL.createObjectURL(imgFile);
            }

            card.innerHTML = `
                <img src="${imgURL}" alt="Character Image">
                <div class="character-name">${formData.get('name')}</div>
            `;
            charactersContainer.appendChild(card);
            popupContainer.removeChild(popup);

            card.addEventListener('click', () => {
                const detailPopup = document.createElement('div');
                detailPopup.style.position = 'fixed';
                detailPopup.style.top = '50%';
                detailPopup.style.left = '50%';
                detailPopup.style.transform = 'translate(-50%, -50%)';
                detailPopup.style.background = '#fbf1e6';
                detailPopup.style.padding = '20px';
                detailPopup.style.borderRadius = '20px';
                detailPopup.style.boxShadow = '0 10px 20px rgba(215,155,179,0.5)';
                detailPopup.style.maxHeight = '80vh';
                detailPopup.style.overflowY = 'auto';
                detailPopup.style.width = '400px';

                let detailsHTML = `<h2 style="font-family:'Allura', cursive; color:#d77fa1;">${characterData.name}</h2>`;
                for (let key in characterData) {
                    if (key !== 'image' && key !== 'name') {
                        detailsHTML += `<strong>${key.replace(/_/g, ' ')}:</strong> ${characterData[key]}<br>`;
                    }
                }
                if (imgURL) {
                    detailsHTML += `<img src="${imgURL}" style="width:100%; margin-top:10px; border-radius:15px;">`;
                }

                detailsHTML += `
                    <button id="delete-character" style="margin-top:10px; padding:10px 20px; border-radius:15px; border:none; background:#f4c2d7; font-family:'Allura', cursive; color:#6b4a3b;">🗑 Delete</button>
                    <button id="close-detail" style="margin-top:10px; padding:10px 20px; border-radius:15px; border:none; background:#f4c2d7; font-family:'Allura', cursive; color:#6b4a3b; margin-left:10px;">Close</button>
                `;

                detailPopup.innerHTML = detailsHTML;
                popupContainer.appendChild(detailPopup);

                document.getElementById('close-detail').addEventListener('click', () => {
                    popupContainer.removeChild(detailPopup);
                });

                document.getElementById('delete-character').addEventListener('click', () => {
                    const confirmDelete = confirm("Are you sure you want to delete this character?");
                    if (confirmDelete) {
                        charactersContainer.removeChild(card);
                        popupContainer.removeChild(detailPopup);
                    }
                });
            });
        });
    });
});
