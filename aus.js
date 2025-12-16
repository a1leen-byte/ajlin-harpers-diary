const addBtn = document.getElementById('add-universe');
const popupContainer = document.getElementById('popup-container');
const universesContainer = document.getElementById('universes-container');

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
        <h2 style="font-family:'Allura', cursive; color:#d77fa1; text-align:center;">New Universe</h2>
        <form id="universe-form">
            <label>Universe Name:</label><br><input type="text" name="name" required><br><br>
            <label>Header Image:</label><br><input type="file" name="image"><br><br>
            <label>Characteristics:</label><br><textarea name="description" rows="4" placeholder="Describe this universe..."></textarea><br><br>
            <button type="submit" style="background:#f4c2d7; color:#6b4a3b; font-family:'Allura', cursive; border:none; padding:10px 20px; border-radius:15px;">Done</button>
            <button type="button" id="cancel-btn" style="background:#fbf1e6; color:#d77fa1; font-family:'Allura', cursive; border:none; padding:10px 20px; border-radius:15px; margin-left:10px;">Cancel</button>
        </form>
    `;

    popupContainer.appendChild(popup);

    document.getElementById('cancel-btn').addEventListener('click', () => {
        popupContainer.removeChild(popup);
    });

    document.getElementById('universe-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const universeData = {};
        formData.forEach((value, key) => {
            universeData[key] = value;
        });

        const card = document.createElement('div');
        card.className = 'universe-card';
        let imgURL = '';
        const imgFile = formData.get('image');
        if (imgFile && imgFile.size > 0) {
            imgURL = URL.createObjectURL(imgFile);
        }

        card.innerHTML = `
            ${imgURL ? `<img src="${imgURL}" alt="Universe Image">` : ''}
            <div class="universe-title">${formData.get('name')}</div>
        `;

        universesContainer.appendChild(card);
        popupContainer.removeChild(popup);

        // Click to see full details + delete
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

            let detailsHTML = `<h2 style="font-family:'Allura', cursive; color:#d77fa1;">${universeData.name}</h2>`;
            if (imgURL) {
                detailsHTML += `<img src="${imgURL}" style="width:100%; margin-top:10px; border-radius:15px;">`;
            }
            detailsHTML += `<p>${universeData.description}</p>`;
            detailsHTML += `
                <button id="delete-universe" style="margin-top:10px; padding:10px 20px; border-radius:15px; border:none; background:#f4c2d7; font-family:'Allura', cursive; color:#6b4a3b;">🗑 Delete</button>
                <button id="close-detail" style="margin-top:10px; padding:10px 20px; border-radius:15px; border:none; background:#f4c2d7; font-family:'Allura', cursive; color:#6b4a3b; margin-left:10px;">Close</button>
            `;

            detailPopup.innerHTML = detailsHTML;
            popupContainer.appendChild(detailPopup);

            document.getElementById('close-detail').addEventListener('click', () => {
                popupContainer.removeChild(detailPopup);
            });

            document.getElementById('delete-universe').addEventListener('click', () => {
                const confirmDelete = confirm("Are you sure you want to delete this universe?");
                if (confirmDelete) {
                    universesContainer.removeChild(card);
                    popupContainer.removeChild(detailPopup);
                }
            });
        });
    });
});
