const addBtn = document.getElementById('add-plot');
const popupContainer = document.getElementById('popup-container');
const plotsContainer = document.getElementById('plots-container');
let plotItems = []; // Store all items for filtering

function renderPlots(filter = "all") {
    plotsContainer.innerHTML = '';
    plotItems.forEach(item => {
        if (filter === "all" || item.type === filter) {
            plotsContainer.appendChild(item.card);
        }
    });
}

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
    popup.style.width = '400px';
    popup.innerHTML = `
        <h2 style="font-family: 'Allura', cursive; color:#d77fa1; text-align:center;">New Plot / Scenario</h2>
        <form id="plot-form">
            <label>Type:</label>
            <select name="type" style="width:100%; margin-bottom:10px;">
                <option value="plot">Plot</option>
                <option value="scenario">Scenario</option>
            </select><br>
            <label>Name:</label><br><input type="text" name="author" style="width:100%;"><br>
            <label>Plot / Scenario:</label><br><textarea name="content" rows="5" style="width:100%;"></textarea><br><br>
            <button type="submit" style="background:#f4c2d7; color:#6b4a3b; font-family:'Allura', cursive; border:none; padding:10px 20px; border-radius:15px;">Done</button>
            <button type="button" id="cancel-btn" style="background:#fbf1e6; color:#d77fa1; font-family:'Allura', cursive; border:none; padding:10px 20px; border-radius:15px; margin-left:10px;">Cancel</button>
        </form>
    `;
    popupContainer.appendChild(popup);

    document.getElementById('cancel-btn').addEventListener('click', () => {
        popupContainer.removeChild(popup);
    });

    document.getElementById('plot-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const plotData = {};
        formData.forEach((value, key) => plotData[key] = value);

        const card = document.createElement('div');
        card.className = 'plot-card';
        card.textContent = `${plotData.author}: ${plotData.content.substring(0, 50)}${plotData.content.length > 50 ? '...' : ''}`;
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
            detailPopup.style.width = '400px';
            detailPopup.innerHTML = `
                <h2 style="font-family:'Allura', cursive; color:#d77fa1;">${plotData.author} (${plotData.type})</h2>
                <p>${plotData.content}</p>
                <button id="delete-plot" style="margin-top:10px; padding:10px 20px; border-radius:15px; border:none; background:#f4c2d7; font-family:'Allura', cursive; color:#6b4a3b;">🗑 Delete</button>
                <button id="close-detail" style="margin-top:10px; padding:10px 20px; border-radius:15px; border:none; background:#f4c2d7; font-family:'Allura', cursive; color:#6b4a3b; margin-left:10px;">Close</button>
            `;
            popupContainer.appendChild(detailPopup);

            document.getElementById('close-detail').addEventListener('click', () => {
                popupContainer.removeChild(detailPopup);
            });

            document.getElementById('delete-plot').addEventListener('click', () => {
                if (confirm("Are you sure you want to delete this item?")) {
                    plotsContainer.removeChild(card);
                    popupContainer.removeChild(detailPopup);
                    plotItems = plotItems.filter(i => i.card !== card);
                }
            });
        });

        // Save in array for filtering
        plotItems.push({ card, type: plotData.type });
        renderPlots(); // show all by default
    });
});

// Filter buttons
document.getElementById('show-plots').addEventListener('click', () => renderPlots("plot"));
document.getElementById('show-scenarios').addEventListener('click', () => renderPlots("scenario"));
document.getElementById('show-all').addEventListener('click', () => renderPlots("all"));
