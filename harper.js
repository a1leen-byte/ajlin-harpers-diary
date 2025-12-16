const addBtn = document.getElementById("add-character");
const container = document.getElementById("characters-container");

addBtn.addEventListener("click", () => {
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);display:flex;justify-content:center;align-items:center;z-index:1000;">
      <div style="background:#fbf1e6;padding:20px;border-radius:25px;width:400px;max-height:90vh;overflow-y:auto;position:relative;">
        <h2 style="text-align:center;font-family:'Allura',cursive;">Character Submission</h2>
        <form id="character-form">
          Name:<br><input type="text" placeholder="Type here..." style="width:100%;margin-bottom:10px;"><br>
          <input type="file" id="character-image" style="margin-bottom:10px;"><br>
          <button type="submit" style="background:#f4c2d7;border:none;padding:8px 16px;border-radius:15px;margin-top:10px;">Done</button>
          <button type="button" id="cancel-btn" style="background:#f4c2d7;border:none;padding:8px 16px;border-radius:15px;margin-top:10px;float:left;">Cancel</button>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("cancel-btn").addEventListener("click", () => {
    popup.remove();
  });

  document.getElementById("character-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = e.target.querySelector("input[type=text]").value;
    const fileInput = e.target.querySelector("input[type=file]").files[0];
    
    // Temporary preview (before Firebase)
    const card = document.createElement("div");
    card.className = "character-card";
    const img = document.createElement("img");
    img.src = fileInput ? URL.createObjectURL(fileInput) : "";
    const name = document.createElement("div");
    name.className = "character-name";
    name.textContent = nameInput;
    card.appendChild(img);
    card.appendChild(name);
    container.appendChild(card);

    popup.remove();
  });
});
