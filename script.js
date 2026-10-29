document.addEventListener("DOMContentLoaded", function () {
const gameGrid = document.querySelector(".game-grid");
const saveGameBtn = document.getElementById("saveGameBtn");
const searchBox = document.getElementById("searchBox");


const gameName = document.getElementById("gameName");
const gameGenre = document.getElementById("gameGenre");
const gamePlatform = document.getElementById("gamePlatform");
const gameStatus = document.getElementById("gameStatus");
const gameRating = document.getElementById("gameRating");
const gameHours = document.getElementById("gameHours");
const gameYear = document.getElementById("gameYear");
const gameNotes = document.getElementById("gameNotes");

// Search games
window.searchGames = function () {
    if (!searchBox) return;

    const searchText = searchBox.value.toLowerCase().trim();

    document.querySelectorAll(".game-card").forEach(function (card) {
        const title = card.querySelector("h3");
        const details = card.querySelector("p");

        const matchesTitle = title &&
            title.textContent.toLowerCase().includes(searchText);

        const matchesDetails = details &&
            details.textContent.toLowerCase().includes(searchText);

        card.style.display =
            matchesTitle || matchesDetails ? "" : "none";
    });
};

// Scroll to the Add Game form
window.openAddGameForm = function () {
    document.querySelector(".add-game-section")
        ?.scrollIntoView({ behavior: "smooth" });

    gameName?.focus();
};

// Update dashboard statistics
function updateStatistics() {
    const cards = document.querySelectorAll(".game-card");
    const statCards = document.querySelectorAll(".stat-card");

    let playing = 0;
    let completed = 0;
    let favourites = 0;

    cards.forEach(function (card) {
        const status = card.querySelector(".game-status, .playing, .completed, .want");
        const statusText = status ? status.textContent.trim().toLowerCase() : "";

        if (statusText === "playing") playing++;
        if (statusText === "completed") completed++;

        if (card.dataset.favourite === "true") favourites++;
    });

    if (statCards[0]) statCards[0].querySelector("h2").textContent = cards.length;
    if (statCards[1]) statCards[1].querySelector("h2").textContent = playing;
    if (statCards[2]) statCards[2].querySelector("h2").textContent = completed;
    if (statCards[3]) statCards[3].querySelector("h2").textContent = favourites;
}

// Add Edit and Delete buttons to a game card
function addCardButtons(card) {
    if (card.querySelector(".game-actions")) return;

    const actions = document.createElement("div");
    actions.className = "game-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function () {
        const heading = card.querySelector("h3");
        const newName = prompt("Enter the new game name:", heading.textContent);

        if (newName && newName.trim()) {
            heading.textContent = newName.trim();
            updateStatistics();
        }
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this game?")) {
            card.remove();
            updateStatistics();
        }
    });

    actions.append(editButton, deleteButton);
    card.appendChild(actions);
}

// Prepare the existing games
document.querySelectorAll(".game-card").forEach(addCardButtons);

// Save a new game
if (saveGameBtn) {
    saveGameBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const name = gameName.value.trim();
        const genre = gameGenre.value.trim();
        const platform = gamePlatform.value;
        const status = gameStatus.value;
        const rating = gameRating.value;
        const hours = gameHours.value;
        const year = gameYear.value;
        const notes = gameNotes.value.trim();

        if (!name || !genre || !platform || !status) {
            alert("Please enter the game name, genre, platform, and status.");
            return;
        }

        if (rating && (Number(rating) < 1 || Number(rating) > 10)) {
            alert("Rating must be between 1 and 10.");
            return;
        }

        if (hours && Number(hours) < 0) {
            alert("Hours played cannot be negative.");
            return;
        }

        // Create the game card
        const card = document.createElement("div");
        card.className = "game-card";

        const icon = document.createElement("div");
        icon.className = "game-icon";
        icon.textContent = "🎮";

        const heading = document.createElement("h3");
        heading.textContent = name;

        const details = document.createElement("p");
        details.textContent = genre + " • " + platform +
            (year ? " • " + year : "");

        const statusLabel = document.createElement("span");
        statusLabel.className = "game-status";
        statusLabel.textContent = status;

        const info = document.createElement("div");
        info.className = "game-info";

        const ratingText = document.createElement("span");
        ratingText.textContent = "⭐ " + (rating || "—");

        const hoursText = document.createElement("span");
        hoursText.textContent = "⏱ " + (hours || "0") + " hrs";

        info.append(ratingText, hoursText);
        card.append(icon, heading, details, statusLabel, info);

        if (notes) {
            const noteText = document.createElement("p");
            noteText.textContent = "Notes: " + notes;
            card.appendChild(noteText);
        }

        gameGrid.appendChild(card);
        addCardButtons(card);

        // Clear the form
        gameName.value = "";
        gameGenre.value = "";
        gamePlatform.value = "";
        gameStatus.value = "";
        gameRating.value = "";
        gameHours.value = "";
        gameYear.value = "";
        gameNotes.value = "";

        updateStatistics();
        alert("Game added successfully!");
    });
}

// Initialize dashboard statistics
updateStatistics();

});
