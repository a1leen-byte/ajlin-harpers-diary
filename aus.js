document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('universes-container');
  const addUniverseBtn = document.getElementById('add-universe');
  
  let universes = JSON.parse(localStorage.getItem('universes')) || [];

  function saveUniverses() {
    localStorage.setItem('universes', JSON.stringify(universes));
    renderUniverses();
  }

  function renderUniverses() {
    container.innerHTML = '';
    universes.forEach((universe, uIndex) => {
      const card = document.createElement('div');
      card.className = 'universe-card';
      card.style.cursor = 'pointer';

      // Universe content
      const title = document.createElement('div');
      title.style.fontWeight = 'bold';
      title.style.marginBottom = '10px';
      title.textContent = universe.name || 'Unnamed World';
      card.appendChild(title);

      // Delete universe button
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete World';
      delBtn.style.marginBottom = '10px';
      delBtn.style.padding = '5px 10px';
      delBtn.style.border = 'none';
      delBtn.style.borderRadius = '10px';
      delBtn.style.cursor = 'pointer';
      delBtn.style.backgroundColor = '#d77fa1';
      delBtn.style.color = '#fff';
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Delete ${universe.name}?`)) {
          universes.splice(uIndex, 1);
          saveUniverses();
        }
      });
      card.appendChild(delBtn);

      // Locations container
      const locationsContainer = document.createElement('div');
      locationsContainer.style.display = 'flex';
      locationsContainer.style.flexDirection = 'column';
      locationsContainer.style.gap = '10px';
      locationsContainer.style.marginTop = '10px';
      locationsContainer.style.width = '100%';

      universe.locations.forEach((loc, lIndex) => {
        const locCard = document.createElement('div');
        locCard.style.background = '#f9d9e3';
        locCard.style.borderRadius = '15px';
        locCard.style.padding = '10px';
        locCard.style.textAlign = 'left';
        locCard.style.overflowWrap = 'break-word';
        locCard.style.display = 'flex';
        locCard.style.gap = '10px';
        locCard.style.alignItems = 'center';

        const locText = document.createElement('div');
        locText.innerHTML = `<strong>${loc.name}</strong><br>${loc.description}`;
        locCard.appendChild(locText);

        if (loc.image) {
          const img = document.createElement('img');
          img.src = loc.image;
          img.style.width = '80px';
          img.style.height = '100px';
          img.style.objectFit = 'cover';
          img.style.borderRadius = '10px';
          locCard.appendChild(img);
        }

        const delLocBtn = document.createElement('button');
        delLocBtn.textContent = 'Delete';
        delLocBtn.style.marginLeft = 'auto';
        delLocBtn.style.padding = '5px 10px';
        delLocBtn.style.border = 'none';
        delLocBtn.style.borderRadius = '10px';
        delLocBtn.style.cursor = 'pointer';
        delLocBtn.style.backgroundColor = '#6b4a3b';
        delLocBtn.style.color = '#fff';
        delLocBtn.addEventListener('click', () => {
          if (confirm(`Delete location ${loc.name}?`)) {
            universes[uIndex].locations.splice(lIndex, 1);
            saveUniverses();
          }
        });

        locCard.appendChild(delLocBtn);
        locationsContainer.appendChild(locCard);
      });

      card.appendChild(locationsContainer);

      // Add location button
      const addLocBtn = document.createElement('button');
      addLocBtn.textContent = '+ Add Location';
      addLocBtn.style.marginTop = '10px';
      addLocBtn.style.padding = '5px 10px';
      addLocBtn.style.border = 'none';
      addLocBtn.style.borderRadius = '10px';
      addLocBtn.style.cursor = 'pointer';
      addLocBtn.style.backgroundColor = '#f4c2d7';
      addLocBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const locName = prompt('Enter location name:');
        if (!locName) return;
        const locDesc = prompt('Enter location description:');
        let locImage = '';
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = () => {
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            locImage = reader.result;
            universes[uIndex].locations.push({ name: locName, description: locDesc, image: locImage });
            saveUniverses();
          };
          if(file) reader.readAsDataURL(file);
        };
        fileInput.click();
        // If user cancels file, still add location without image
        setTimeout(() => {
          if(!locImage) {
            universes[uIndex].locations.push({ name: locName, description: locDesc, image: '' });
            saveUniverses();
          }
        }, 1000);
      });
      card.appendChild(addLocBtn);

      container.appendChild(card);
    });
  }

  addUniverseBtn.addEventListener('click', () => {
    const name = prompt('Enter world name:');
    if(name){
      universes.push({ name, locations: [] });
      saveUniverses();
    }
  });

  renderUniverses();
});
