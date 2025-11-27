"use strict";

/* ==========================
   INDEX (splash screen)
   ========================== */
if (document.querySelector(".splash-screen")) {
  document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo");
    const splash = document.querySelector(".splash-screen");

    // Logo-animation
    setTimeout(() => logo.classList.add("animate"), 800);

    // Fade ud efter 2.5 sekunder
    setTimeout(() => splash.classList.add("fade-out"), 2500);

    // Skift til location.html efter 3.5 sekunder
    setTimeout(() => {
      window.location.href = "sites/location.html";
    }, 3500);
  });
}

/* ==========================
   LOCATION (fade in)
   ========================== */

if (document.querySelector(".location")) {
  document.addEventListener("DOMContentLoaded", () => {
    const locationSection = document.querySelector(".location");

    // Fade ind
    setTimeout(() => locationSection.classList.add("fade-in"), 100);
  });
}

/* ==========================
   SPILGALLERI (navbar, dialog osv.)
   ========================== */

if (document.querySelector(".spilgalleri-titel")) {
  console.log("🎮 Spilgalleri loaded");
}

// Back button (sikker måde)
const backBtn = document.querySelector(".back-btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "../sites/location.html";
  });
}

// søg
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", () => displayGames(allGames)); // Adjust as needed
}

let allGames = [];

// #2: Fetch games from JSON file
async function getGames() {
  const response = await fetch("../data/games.json");
  allGames = await response.json();
  console.log("📁 Games loaded:", allGames.length);
  // populateCategoryDropdown(); // Remove or comment out if not implemented
  displayGames(allGames);
}

// #3: Display all games
function displayGames(games) {
  const gameList = document.querySelector(".game-list-all");
  if (!gameList) return;
  gameList.innerHTML = "";

  if (games.length === 0) {
    gameList.innerHTML =
      '<p class="no-results">Ingen spil matchede dine filtre 😢</p>';
    return;
  }

  for (const game of games) {
    displayGame(game);
  }
}

// #4: Render a single game card and add event listeners
function displayGame(game) {
  const gameList = document.querySelector(".game-list-all");
  if (!gameList) return;

  const gameHTML = `
    <article class="game-card" tabindex="0" data-id="${game.id}">
        <section class="top-card">
            <img src="${game.image}" 
            alt="${game.title}" 
            class="game-image" />
        </section>
        <section class="bottom-card">
        <article class="card-header-container"><h2>${game.title}</h2></article>
        </section>
    </article>
  `;
  gameList.insertAdjacentHTML("beforeend", gameHTML);

  // Tilføj click event til den nye card
  const newCard = gameList.lastElementChild;
  newCard.addEventListener("click", function () {
    showGameModal(game.id);
  });
}

// #6: Vis game details (Session 3 version - bliver erstattet med modal i Del 2)
function showGameDetails(game) {
  alert(`
🎬 ${games.title} (${game.year})

🎭 Genre: ${games.genre.join(", ")}
⭐ Rating: ${games.rating}
🎥 Director: ${games.director}
👥 Actors: ${games.actors.join(", ")}

📝 ${games.description}
  `);
}

//Game Card Dialog
function getDifficultyClass(difficulty) {
  switch (difficulty.toLowerCase()) {
    case "let":
      return "difficulty-easy";
    case "mellem":
      return "difficulty-medium";
    case "svær":
      return "difficulty-hard";
    default:
      return "";
  }
}

function showGameModal(id) {
  const game = allGames.find((g) => g.id == id);
  if (!game) return;

  document.querySelector("#dialog-content").innerHTML = /*html*/ `

    <img src="${game.image}" alt="${game.title}" class="game-image" />
    <div class="dialog-bottom-content">
      <div class="dialog-details">
        <div class="infosite-header-container"><h2>${game.title}</h2></div>
        

        <div class="dialog-tag-container">
          <div class="tags"><p>${game.genre}</p></div>
          <div class="tags"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none">
  <path d="M9.99997 5.5C9.35747 5.5 8.73622 5.21313 8.24997 4.6925C7.77715 4.18469 7.4884 3.5075 7.43747 2.78625C7.38309 2.01688 7.61778 1.30938 8.09809 0.79375C8.5784 0.278125 9.24997 0 9.99997 0C10.7447 0 11.4181 0.283125 11.8968 0.7975C12.3803 1.31687 12.6156 2.02312 12.5612 2.78594C12.509 3.50812 12.2206 4.185 11.7487 4.69219C11.2637 5.21312 10.6428 5.5 9.99997 5.5ZM14.1197 11H5.88059C5.74812 11.0007 5.61726 10.971 5.49807 10.9132C5.37889 10.8554 5.27455 10.771 5.19309 10.6666C5.10668 10.5533 5.04702 10.422 5.01855 10.2824C4.99008 10.1429 4.99356 9.99866 5.02871 9.86063C5.29184 8.80406 5.94372 7.92781 6.91372 7.32687C7.77465 6.79375 8.87059 6.5 9.99997 6.5C11.1515 6.5 12.2187 6.78125 13.0847 7.31406C14.0568 7.91187 14.7097 8.79313 14.9715 9.8625C15.0063 10.0006 15.0093 10.1448 14.9806 10.2843C14.9518 10.4238 14.8919 10.555 14.8053 10.6681C14.7239 10.7721 14.6198 10.8561 14.501 10.9136C14.3821 10.9711 14.2517 11.0007 14.1197 11ZM4.09371 5.625C2.99403 5.625 2.02715 4.6025 1.93746 3.34594C1.89309 2.70219 2.09371 2.10687 2.49996 1.67031C2.90184 1.23812 3.46871 1 4.09371 1C4.71871 1 5.28121 1.23938 5.68528 1.67406C6.09465 2.11406 6.29465 2.70812 6.24778 3.34656C6.15809 4.60281 5.19153 5.625 4.09371 5.625ZM6.14559 6.60781C5.5959 6.33906 4.88246 6.20469 4.09403 6.20469C3.1734 6.20469 2.27934 6.44469 1.57621 6.88031C0.779027 7.375 0.242777 8.09531 0.0262145 8.965C-0.00547769 9.09009 -0.00847521 9.22073 0.0174461 9.34715C0.0433675 9.47356 0.0975367 9.59247 0.175902 9.695C0.250261 9.79046 0.345522 9.86759 0.45436 9.92047C0.563198 9.97334 0.682714 10.0006 0.803715 10H4.27246C4.33101 9.99999 4.3877 9.97944 4.43264 9.94192C4.47759 9.9044 4.50794 9.85229 4.5184 9.79469C4.52184 9.775 4.52621 9.75531 4.53121 9.73594C4.79621 8.67156 5.41715 7.77219 6.33465 7.11656C6.3684 7.09224 6.39554 7.05988 6.41362 7.02241C6.4317 6.98495 6.44014 6.94356 6.43819 6.90201C6.43623 6.86046 6.42394 6.82005 6.40242 6.78445C6.38091 6.74884 6.35085 6.71917 6.31497 6.69812C6.2659 6.66937 6.20965 6.63906 6.14559 6.60781Z" fill="#BF181D"/>
</svg><p>${game.players.min}-${game.players.max}</p></div>
          <div class="tags"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
  <path d="M6.66667 0C10.3487 0 13.3333 2.98467 13.3333 6.66667C13.3333 10.3487 10.3487 13.3333 6.66667 13.3333C2.98467 13.3333 0 10.3487 0 6.66667C0 2.98467 2.98467 0 6.66667 0ZM6.66667 2.66667C6.48986 2.66667 6.32029 2.7369 6.19526 2.86193C6.07024 2.98695 6 3.15652 6 3.33333V6.66667C6.00004 6.84346 6.0703 7.013 6.19533 7.138L8.19533 9.138C8.32107 9.25944 8.48947 9.32664 8.66427 9.32512C8.83907 9.3236 9.00627 9.25348 9.12988 9.12988C9.25348 9.00627 9.3236 8.83907 9.32512 8.66427C9.32664 8.48947 9.25944 8.32107 9.138 8.19533L7.33333 6.39067V3.33333C7.33333 3.15652 7.2631 2.98695 7.13807 2.86193C7.01305 2.7369 6.84348 2.66667 6.66667 2.66667Z" fill="#BF181D"/>
</svg><p>${game.playtime} min</p></div>
          <div class="tags"><p>${game.language}</p></div>
          <div class="tags"><p>${game.age} år</p></div>
        </div>
        <p>${game.rules}</p>
      </div>
      <div class="red-section">
        <div class="red-tag"><p>Hylde: ${game.shelf}</p></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
          <g filter="url(#filter0_d_82_2444)">
            <path d="M44.2568 46.2861H27.4258C26.8363 46.2861 26.2704 46.0524 25.8535 45.6367C25.4366 45.2209 25.2022 44.6564 25.2021 44.0684C25.2021 43.4803 25.4366 42.9158 25.8535 42.5C26.2704 42.0843 26.8363 41.8506 27.4258 41.8506H44.2568V46.2861Z" fill="#BF181D"/>
            <path d="M36 32.6875C36.5896 32.6875 37.1554 32.9211 37.5723 33.3369C37.9891 33.7527 38.2227 34.3173 38.2227 34.9053C38.2225 35.4931 37.9889 36.0569 37.5723 36.4727C37.1554 36.8885 36.5896 37.1221 36 37.1221C35.4104 37.1221 34.8446 36.8885 34.4277 36.4727C34.0111 36.0569 33.7775 35.4931 33.7773 34.9053C33.7773 34.3173 34.0109 33.7527 34.4277 33.3369C34.8446 32.9211 35.4104 32.6875 36 32.6875Z" fill="#BF181D"/>
            <path d="M36.4551 18.5859C37.4506 18.6699 38.4033 19.0281 39.207 19.6201C40.0108 20.2122 40.6344 21.0159 41.0078 21.9404C41.381 22.8647 41.49 23.8741 41.3223 24.8564C41.1544 25.839 40.7159 26.7559 40.0566 27.5049C39.3974 28.2538 38.5429 28.8055 37.5879 29.0986C37.5774 29.5187 37.3998 29.9174 37.0947 30.207C36.7896 30.4966 36.382 30.6539 35.9609 30.6436C35.54 30.6331 35.14 30.4565 34.8496 30.1523C34.5592 29.848 34.4017 29.4406 34.4121 29.0205V27.7529C34.4124 26.8789 35.1236 26.1699 36 26.1699C36.5511 26.1689 37.0822 25.9633 37.4902 25.5938C37.8982 25.2241 38.1541 24.7161 38.208 24.1689C38.2618 23.6217 38.1104 23.0736 37.7822 22.6318C37.454 22.1901 36.9751 21.8862 36.4346 21.7783C36.1123 21.7143 35.7798 21.7223 35.4609 21.8018C35.142 21.8813 34.844 22.0303 34.5898 22.2383C34.3358 22.4462 34.1308 22.7076 33.9902 23.0039C33.8496 23.3003 33.7774 23.6243 33.7773 23.9521C33.7773 24.3722 33.6093 24.7752 33.3115 25.0723C33.0139 25.369 32.6103 25.536 32.1895 25.5361C31.7684 25.5361 31.3642 25.3692 31.0664 25.0723C30.7686 24.7752 30.6016 24.3722 30.6016 23.9521C30.6016 22.9555 30.8787 21.9786 31.4023 21.1299C31.926 20.2812 32.6754 19.5936 33.5674 19.1445C34.4595 18.6955 35.4594 18.5019 36.4551 18.5859Z" fill="#BF181D"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36 0C53.6731 0 68 14.3269 68 32C68 49.6731 53.6731 64 36 64C18.3269 64 4 49.6731 4 32C4 14.3269 18.3269 0 36 0ZM27.1074 14.6084C25.5915 14.6085 24.1374 15.2092 23.0654 16.2783C21.9934 17.3476 21.3916 18.7983 21.3916 20.3105V44.0684C21.3916 45.6645 22.0267 47.1955 23.1582 48.3242C24.2898 49.4529 25.8255 50.0869 27.4258 50.0869H48.7031C49.2085 50.0869 49.6934 49.8867 50.0508 49.5303C50.408 49.1739 50.6083 48.6905 50.6084 48.1865C50.6084 47.6826 50.408 47.1992 50.0508 46.8428C49.6934 46.4863 49.2085 46.2861 48.7031 46.2861H48.0684V41.8506H48.7031C49.2085 41.8506 49.6934 41.6504 50.0508 41.2939C50.408 40.9375 50.6084 40.4542 50.6084 39.9502V20.3105C50.6084 18.7983 50.0066 17.3476 48.9346 16.2783C47.8626 15.2092 46.4085 14.6085 44.8926 14.6084H27.1074Z" fill="#BF181D"/>
          </g>
          <defs>
            <filter id="filter0_d_82_2444" x="0" y="0" width="72" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_82_2444"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_82_2444" result="shape"/>
            </filter>
          </defs>
        </svg>
        <div class="red-tag"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M5.72245 2.72642C6.73603 0.908806 7.24242 0 8 0C8.75758 0 9.26397 0.908806 10.2775 2.72642L10.5399 3.19682C10.8279 3.71362 10.9719 3.97203 11.1959 4.14243C11.4199 4.31283 11.6999 4.37603 12.2599 4.50243L12.7687 4.61763C14.7366 5.06323 15.7198 5.28563 15.9542 6.03844C16.1878 6.79044 15.5174 7.57525 14.1759 9.14406L13.8287 9.54966C13.4479 9.99526 13.2567 10.2185 13.1711 10.4937C13.0855 10.7697 13.1143 11.0673 13.1719 11.6617L13.2247 12.2033C13.4271 14.2969 13.5287 15.3433 12.9159 15.8081C12.3031 16.2729 11.3815 15.8489 9.53996 15.0009L9.06237 14.7817C8.53919 14.5401 8.27759 14.4201 8 14.4201C7.72241 14.4201 7.46081 14.5401 6.93762 14.7817L6.46084 15.0009C4.61848 15.8489 3.6969 16.2729 3.08492 15.8089C2.47133 15.3433 2.57293 14.2969 2.77532 12.2033L2.82812 11.6625C2.88572 11.0673 2.91452 10.7697 2.82812 10.4945C2.74332 10.2185 2.55213 9.99526 2.17134 9.55046L1.82415 9.14406C0.482577 7.57605 -0.187808 6.79124 0.0457869 6.03844C0.279381 5.28563 1.26416 5.06243 3.23211 4.61763L3.7409 4.50243C4.30009 4.37603 4.57928 4.31283 4.80408 4.14243C5.02887 3.97203 5.17207 3.71362 5.46006 3.19682L5.72245 2.72642Z" fill="#F7DC58"/>
</svg><p>${game.rating}</p></div>
      </div>

      <div class="rating-section">
        <h3>Hvad tænker du om spillet?</h3>
        <div class="rating-stars">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
            <g filter="url(#filter0_d_303_88)">
              <path d="M17.334 3.66675C17.4858 3.66684 17.7534 3.72673 18.2773 4.41089C18.8023 5.09638 19.3949 6.15404 20.2559 7.698L20.6934 8.4812C21.1299 9.26453 21.4757 9.9265 22.0547 10.3669C22.641 10.813 23.3666 10.9543 24.2129 11.1453V11.1462L25.0605 11.3376C26.7346 11.7167 27.8735 11.9775 28.6533 12.2849C29.319 12.5473 29.5251 12.7685 29.6074 12.9519L29.6357 13.0281C29.6999 13.2353 29.7017 13.5528 29.2471 14.2751C28.9007 14.8254 28.3757 15.4779 27.6543 16.3318L26.8672 17.2566L26.2891 17.9324L26.2881 17.9333C25.7083 18.6118 25.215 19.1585 24.9971 19.8591V19.8601C24.781 20.5571 24.8701 21.2916 24.958 22.199V22.2L25.0459 23.1023C25.2176 24.8789 25.3342 26.1021 25.2949 26.9832C25.2557 27.8622 25.0701 28.1048 24.9229 28.2166C24.7915 28.3162 24.548 28.4266 23.7568 28.2C22.9531 27.9697 21.8847 27.4808 20.3184 26.7595H20.3174L19.5215 26.3943C18.7323 26.0298 18.0666 25.7001 17.334 25.7C16.6011 25.7 15.9349 26.0297 15.1455 26.3943L14.3506 26.7595C12.7835 27.4808 11.7142 27.9695 10.9102 28.2C10.1185 28.4269 9.87544 28.3163 9.74512 28.2175C9.59691 28.1046 9.4123 27.8603 9.37305 26.9832C9.33365 26.1021 9.44934 24.8789 9.62109 23.1023L9.70898 22.2009V22.2C9.78582 21.406 9.86457 20.7426 9.73633 20.1218L9.66797 19.8582C9.45059 19.1562 8.95626 18.6089 8.37793 17.9333L7.80078 17.2576L7.7998 17.2566C6.66056 15.9251 5.88162 15.0096 5.41992 14.2761C4.96524 13.5537 4.96666 13.2353 5.03125 13.0271C5.09222 12.8306 5.25311 12.5851 6.01465 12.2849C6.79477 11.9775 7.93379 11.7169 9.60742 11.3386V11.3376L10.4551 11.1453C11.3017 10.9539 12.0244 10.8128 12.6113 10.3679C13.193 9.92697 13.5372 9.26255 13.9727 8.4812L13.9736 8.48218L14.4111 7.698C15.2721 6.15406 15.8647 5.09638 16.3896 4.41089C16.9141 3.72612 17.1822 3.66675 17.334 3.66675Z" stroke="black" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
              <filter id="filter0_d_303_88" x="0" y="2.66675" width="34.6673" height="34.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_303_88"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_303_88" result="shape"/>
              </filter>
            </defs>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
            <g filter="url(#filter0_d_303_88)">
              <path d="M17.334 3.66675C17.4858 3.66684 17.7534 3.72673 18.2773 4.41089C18.8023 5.09638 19.3949 6.15404 20.2559 7.698L20.6934 8.4812C21.1299 9.26453 21.4757 9.9265 22.0547 10.3669C22.641 10.813 23.3666 10.9543 24.2129 11.1453V11.1462L25.0605 11.3376C26.7346 11.7167 27.8735 11.9775 28.6533 12.2849C29.319 12.5473 29.5251 12.7685 29.6074 12.9519L29.6357 13.0281C29.6999 13.2353 29.7017 13.5528 29.2471 14.2751C28.9007 14.8254 28.3757 15.4779 27.6543 16.3318L26.8672 17.2566L26.2891 17.9324L26.2881 17.9333C25.7083 18.6118 25.215 19.1585 24.9971 19.8591V19.8601C24.781 20.5571 24.8701 21.2916 24.958 22.199V22.2L25.0459 23.1023C25.2176 24.8789 25.3342 26.1021 25.2949 26.9832C25.2557 27.8622 25.0701 28.1048 24.9229 28.2166C24.7915 28.3162 24.548 28.4266 23.7568 28.2C22.9531 27.9697 21.8847 27.4808 20.3184 26.7595H20.3174L19.5215 26.3943C18.7323 26.0298 18.0666 25.7001 17.334 25.7C16.6011 25.7 15.9349 26.0297 15.1455 26.3943L14.3506 26.7595C12.7835 27.4808 11.7142 27.9695 10.9102 28.2C10.1185 28.4269 9.87544 28.3163 9.74512 28.2175C9.59691 28.1046 9.4123 27.8603 9.37305 26.9832C9.33365 26.1021 9.44934 24.8789 9.62109 23.1023L9.70898 22.2009V22.2C9.78582 21.406 9.86457 20.7426 9.73633 20.1218L9.66797 19.8582C9.45059 19.1562 8.95626 18.6089 8.37793 17.9333L7.80078 17.2576L7.7998 17.2566C6.66056 15.9251 5.88162 15.0096 5.41992 14.2761C4.96524 13.5537 4.96666 13.2353 5.03125 13.0271C5.09222 12.8306 5.25311 12.5851 6.01465 12.2849C6.79477 11.9775 7.93379 11.7169 9.60742 11.3386V11.3376L10.4551 11.1453C11.3017 10.9539 12.0244 10.8128 12.6113 10.3679C13.193 9.92697 13.5372 9.26255 13.9727 8.4812L13.9736 8.48218L14.4111 7.698C15.2721 6.15406 15.8647 5.09638 16.3896 4.41089C16.9141 3.72612 17.1822 3.66675 17.334 3.66675Z" stroke="black" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
              <filter id="filter0_d_303_88" x="0" y="2.66675" width="34.6673" height="34.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_303_88"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_303_88" result="shape"/>
              </filter>
            </defs>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
            <g filter="url(#filter0_d_303_88)">
              <path d="M17.334 3.66675C17.4858 3.66684 17.7534 3.72673 18.2773 4.41089C18.8023 5.09638 19.3949 6.15404 20.2559 7.698L20.6934 8.4812C21.1299 9.26453 21.4757 9.9265 22.0547 10.3669C22.641 10.813 23.3666 10.9543 24.2129 11.1453V11.1462L25.0605 11.3376C26.7346 11.7167 27.8735 11.9775 28.6533 12.2849C29.319 12.5473 29.5251 12.7685 29.6074 12.9519L29.6357 13.0281C29.6999 13.2353 29.7017 13.5528 29.2471 14.2751C28.9007 14.8254 28.3757 15.4779 27.6543 16.3318L26.8672 17.2566L26.2891 17.9324L26.2881 17.9333C25.7083 18.6118 25.215 19.1585 24.9971 19.8591V19.8601C24.781 20.5571 24.8701 21.2916 24.958 22.199V22.2L25.0459 23.1023C25.2176 24.8789 25.3342 26.1021 25.2949 26.9832C25.2557 27.8622 25.0701 28.1048 24.9229 28.2166C24.7915 28.3162 24.548 28.4266 23.7568 28.2C22.9531 27.9697 21.8847 27.4808 20.3184 26.7595H20.3174L19.5215 26.3943C18.7323 26.0298 18.0666 25.7001 17.334 25.7C16.6011 25.7 15.9349 26.0297 15.1455 26.3943L14.3506 26.7595C12.7835 27.4808 11.7142 27.9695 10.9102 28.2C10.1185 28.4269 9.87544 28.3163 9.74512 28.2175C9.59691 28.1046 9.4123 27.8603 9.37305 26.9832C9.33365 26.1021 9.44934 24.8789 9.62109 23.1023L9.70898 22.2009V22.2C9.78582 21.406 9.86457 20.7426 9.73633 20.1218L9.66797 19.8582C9.45059 19.1562 8.95626 18.6089 8.37793 17.9333L7.80078 17.2576L7.7998 17.2566C6.66056 15.9251 5.88162 15.0096 5.41992 14.2761C4.96524 13.5537 4.96666 13.2353 5.03125 13.0271C5.09222 12.8306 5.25311 12.5851 6.01465 12.2849C6.79477 11.9775 7.93379 11.7169 9.60742 11.3386V11.3376L10.4551 11.1453C11.3017 10.9539 12.0244 10.8128 12.6113 10.3679C13.193 9.92697 13.5372 9.26255 13.9727 8.4812L13.9736 8.48218L14.4111 7.698C15.2721 6.15406 15.8647 5.09638 16.3896 4.41089C16.9141 3.72612 17.1822 3.66675 17.334 3.66675Z" stroke="black" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
              <filter id="filter0_d_303_88" x="0" y="2.66675" width="34.6673" height="34.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_303_88"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_303_88" result="shape"/>
              </filter>
            </defs>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
            <g filter="url(#filter0_d_303_88)">
              <path d="M17.334 3.66675C17.4858 3.66684 17.7534 3.72673 18.2773 4.41089C18.8023 5.09638 19.3949 6.15404 20.2559 7.698L20.6934 8.4812C21.1299 9.26453 21.4757 9.9265 22.0547 10.3669C22.641 10.813 23.3666 10.9543 24.2129 11.1453V11.1462L25.0605 11.3376C26.7346 11.7167 27.8735 11.9775 28.6533 12.2849C29.319 12.5473 29.5251 12.7685 29.6074 12.9519L29.6357 13.0281C29.6999 13.2353 29.7017 13.5528 29.2471 14.2751C28.9007 14.8254 28.3757 15.4779 27.6543 16.3318L26.8672 17.2566L26.2891 17.9324L26.2881 17.9333C25.7083 18.6118 25.215 19.1585 24.9971 19.8591V19.8601C24.781 20.5571 24.8701 21.2916 24.958 22.199V22.2L25.0459 23.1023C25.2176 24.8789 25.3342 26.1021 25.2949 26.9832C25.2557 27.8622 25.0701 28.1048 24.9229 28.2166C24.7915 28.3162 24.548 28.4266 23.7568 28.2C22.9531 27.9697 21.8847 27.4808 20.3184 26.7595H20.3174L19.5215 26.3943C18.7323 26.0298 18.0666 25.7001 17.334 25.7C16.6011 25.7 15.9349 26.0297 15.1455 26.3943L14.3506 26.7595C12.7835 27.4808 11.7142 27.9695 10.9102 28.2C10.1185 28.4269 9.87544 28.3163 9.74512 28.2175C9.59691 28.1046 9.4123 27.8603 9.37305 26.9832C9.33365 26.1021 9.44934 24.8789 9.62109 23.1023L9.70898 22.2009V22.2C9.78582 21.406 9.86457 20.7426 9.73633 20.1218L9.66797 19.8582C9.45059 19.1562 8.95626 18.6089 8.37793 17.9333L7.80078 17.2576L7.7998 17.2566C6.66056 15.9251 5.88162 15.0096 5.41992 14.2761C4.96524 13.5537 4.96666 13.2353 5.03125 13.0271C5.09222 12.8306 5.25311 12.5851 6.01465 12.2849C6.79477 11.9775 7.93379 11.7169 9.60742 11.3386V11.3376L10.4551 11.1453C11.3017 10.9539 12.0244 10.8128 12.6113 10.3679C13.193 9.92697 13.5372 9.26255 13.9727 8.4812L13.9736 8.48218L14.4111 7.698C15.2721 6.15406 15.8647 5.09638 16.3896 4.41089C16.9141 3.72612 17.1822 3.66675 17.334 3.66675Z" stroke="black" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
              <filter id="filter0_d_303_88" x="0" y="2.66675" width="34.6673" height="34.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_303_88"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_303_88" result="shape"/>
              </filter>
            </defs>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
            <g filter="url(#filter0_d_303_88)">
              <path d="M17.334 3.66675C17.4858 3.66684 17.7534 3.72673 18.2773 4.41089C18.8023 5.09638 19.3949 6.15404 20.2559 7.698L20.6934 8.4812C21.1299 9.26453 21.4757 9.9265 22.0547 10.3669C22.641 10.813 23.3666 10.9543 24.2129 11.1453V11.1462L25.0605 11.3376C26.7346 11.7167 27.8735 11.9775 28.6533 12.2849C29.319 12.5473 29.5251 12.7685 29.6074 12.9519L29.6357 13.0281C29.6999 13.2353 29.7017 13.5528 29.2471 14.2751C28.9007 14.8254 28.3757 15.4779 27.6543 16.3318L26.8672 17.2566L26.2891 17.9324L26.2881 17.9333C25.7083 18.6118 25.215 19.1585 24.9971 19.8591V19.8601C24.781 20.5571 24.8701 21.2916 24.958 22.199V22.2L25.0459 23.1023C25.2176 24.8789 25.3342 26.1021 25.2949 26.9832C25.2557 27.8622 25.0701 28.1048 24.9229 28.2166C24.7915 28.3162 24.548 28.4266 23.7568 28.2C22.9531 27.9697 21.8847 27.4808 20.3184 26.7595H20.3174L19.5215 26.3943C18.7323 26.0298 18.0666 25.7001 17.334 25.7C16.6011 25.7 15.9349 26.0297 15.1455 26.3943L14.3506 26.7595C12.7835 27.4808 11.7142 27.9695 10.9102 28.2C10.1185 28.4269 9.87544 28.3163 9.74512 28.2175C9.59691 28.1046 9.4123 27.8603 9.37305 26.9832C9.33365 26.1021 9.44934 24.8789 9.62109 23.1023L9.70898 22.2009V22.2C9.78582 21.406 9.86457 20.7426 9.73633 20.1218L9.66797 19.8582C9.45059 19.1562 8.95626 18.6089 8.37793 17.9333L7.80078 17.2576L7.7998 17.2566C6.66056 15.9251 5.88162 15.0096 5.41992 14.2761C4.96524 13.5537 4.96666 13.2353 5.03125 13.0271C5.09222 12.8306 5.25311 12.5851 6.01465 12.2849C6.79477 11.9775 7.93379 11.7169 9.60742 11.3386V11.3376L10.4551 11.1453C11.3017 10.9539 12.0244 10.8128 12.6113 10.3679C13.193 9.92697 13.5372 9.26255 13.9727 8.4812L13.9736 8.48218L14.4111 7.698C15.2721 6.15406 15.8647 5.09638 16.3896 4.41089C16.9141 3.72612 17.1822 3.66675 17.334 3.66675Z" stroke="black" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
              <filter id="filter0_d_303_88" x="0" y="2.66675" width="34.6673" height="34.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_303_88"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_303_88" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
        <div class="send-btn"><p>indsend</p></div>
      </div>
    </div>
      


      <p><${game.location}, </p>
    </div> 
  
  `;

  document.querySelector("#game-dialog").showModal();
}

// Luk dialog på klik af X
document.querySelector("#close-dialog").addEventListener("click", () => {
  document.querySelector("#game-dialog").close();
});

// Dropdown-menu //// Åbn/luk dropdowns

// Load games on page load
document.addEventListener("DOMContentLoaded", getGames);

// FILTRERINGSSYSTEM //

// værdier fra input felter
function filterGames() {
  const searchValue = document
    .querySelector("#search-input")
    .value.toLowerCase();
  const difficultyValue = document.querySelector("#difficulty-select").value;
  const ageValue = document.querySelector("#age-select").value;
  const genreValue = document.querySelector("#genre-select").value;
  const playtimeValue = document.querySelector("#playtime-select").value;

  // Start med alle spil - kopieres efterfølgende
  let filteredGames = allGames;

  // filtrer på spil titel
  if (searchValue) {
    // Kun filtrer hvis der er indtastet noget
    filteredGames = filteredGames.filter((game) => {
      // includes() checker om søgeteksten findes i titlen
      return game.title.toLowerCase().includes(searchValue);
    });
  }

  // filtrer på valgt sværhedsgrad
  if (difficultyValue !== "all") {
    // Kun filtrer hvis ikke "all" er valgt
    filteredGames = filteredGames.filter((game) => {
      // Eksakt match på sværhedsgrad
      return game.difficulty === difficultyValue;
    });
  }

  // FILTER 3: Alder - filtrer på aldersgrænse
  if (ageValue !== "all") {
    // Kun filtrer hvis ikke "all" er valgt
    const filterAge = Number(ageValue) || 0;
    filteredGames = filteredGames.filter((game) => {
      // Check om spillets alder er mindre eller lig filterens alder
      return game.age <= filterAge;
    });
  }

  // filtrer på valgt genre
  if (genreValue !== "all") {
    // Kun filtrer hvis ikke "all" er valgt
    filteredGames = filteredGames.filter((game) => {
      // Eksakt match på genre
      return game.genre === genreValue;
    });
  }

  // Spilletid - filtrer på spilletid
  if (playtimeValue !== "all") {
    // Kun filtrer hvis ikke "all" er valgt
    const filterTime = Number(playtimeValue) || 0;
    filteredGames = filteredGames.filter((game) => {
      // Check om spillets spilletid er større eller lig filterens tid
      return game.playtime >= filterTime;
    });
  }

  // Vis de filtrerede spil på siden
  displayGames(filteredGames);
}

// Event listeners til alle filtre
document.addEventListener("DOMContentLoaded", () => {
  getGames();

  // Event listener til søgning
  document
    .querySelector("#search-input")
    .addEventListener("input", filterGames);

  // Event listeners til alle filter-dropdowns
  document
    .querySelector("#difficulty-select")
    .addEventListener("change", filterGames);
  document.querySelector("#age-select").addEventListener("change", filterGames);
  document
    .querySelector("#genre-select")
    .addEventListener("change", filterGames);
  document
    .querySelector("#playtime-select")
    .addEventListener("change", filterGames);
});

//Vestergade spilgalleri
function showVestergadeGames() {
  if (!allGames || allGames.length === 0) {
    return getGames().then(() => {
      showVestergadeGames();
      const filtered = allGames.filter(
        (g) => g.location && g.location.toLowerCase().trim() === "verstergade"
      );
      displayGames(filtered);
      return filtered;
    });
  }

  const filtered = allGames.filter(
    (g) => g.location && g.location.toLowerCase().trim() === "verstergade"
  );
  displayGames(filtered);
  return Promise.resolve(filtered);
}
