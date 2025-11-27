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

    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00911 10.1536L13.3973 15.5357C13.6833 15.8213 14.0711 15.9818 14.4754 15.9818C14.8797 15.9818 15.2675 15.8213 15.5535 15.5357C15.8394 15.2501 16 14.8628 16 14.4589C16 14.055 15.8394 13.6677 15.5535 13.3821L10.1632 8L15.5524 2.61791C15.6939 2.4765 15.8062 2.30863 15.8827 2.12389C15.9593 1.93916 15.9987 1.74117 15.9986 1.54123C15.9986 1.34129 15.9591 1.14332 15.8825 0.958621C15.8058 0.773921 15.6935 0.606108 15.5519 0.464764C15.4104 0.32342 15.2423 0.211313 15.0574 0.134844C14.8724 0.0583748 14.6742 0.0190408 14.474 0.0190879C14.2739 0.019135 14.0757 0.0585622 13.8908 0.135119C13.7058 0.211675 13.5378 0.323861 13.3963 0.465272L8.00911 5.84736L2.62088 0.465272C2.48035 0.319805 2.31223 0.20375 2.12632 0.123877C1.94041 0.044005 1.74044 0.00191503 1.53807 6.3842e-05C1.3357 -0.00178735 1.13499 0.036637 0.947644 0.113095C0.760301 0.189553 0.590079 0.302513 0.446909 0.445385C0.30374 0.588257 0.19049 0.758179 0.113768 0.945236C0.0370464 1.13229 -0.00161105 1.33274 5.14303e-05 1.53488C0.00171391 1.73702 0.0436629 1.9368 0.123451 2.12258C0.203239 2.30835 0.319268 2.47639 0.464769 2.61689L5.85504 8L0.465785 13.3831C0.320285 13.5236 0.204256 13.6917 0.124468 13.8774C0.0446794 14.0632 0.00272991 14.263 0.00106743 14.4651C-0.000595046 14.6673 0.0380624 14.8677 0.114784 15.0548C0.191506 15.2418 0.304756 15.4117 0.447925 15.5546C0.591095 15.6975 0.761317 15.8104 0.94866 15.8869C1.136 15.9634 1.33671 16.0018 1.53908 15.9999C1.74145 15.9981 1.94142 15.956 2.12733 15.8761C2.31324 15.7963 2.48137 15.6802 2.62189 15.5347L8.00911 10.1536Z" fill="black"/>
    </svg>
    <img src="${game.image}" alt="${game.title}" class="game-image" />
    <div class="dialog-bottom-content">
      <div class="dialog-details">
        <div class="infosite-header-container"><h2>${game.title}</h2></div>
        

        <div class="dialog-tag-container">
          <div class="tags"><p>${game.genre}</p></div>
          <div class="tags">
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99997 5.5C9.35747 5.5 8.73622 5.21313 8.24997 4.6925C7.77715 4.18469 7.4884 3.5075 7.43747 2.78625C7.38309 2.01688 7.61778 1.30938 8.09809 0.79375C8.5784 0.278125 9.24997 0 9.99997 0C10.7447 0 11.4181 0.283125 11.8968 0.7975C12.3803 1.31687 12.6156 2.02312 12.5612 2.78594C12.509 3.50812 12.2206 4.185 11.7487 4.69219C11.2637 5.21312 10.6428 5.5 9.99997 5.5ZM14.1197 11H5.88059C5.74812 11.0007 5.61726 10.971 5.49807 10.9132C5.37889 10.8554 5.27455 10.771 5.19309 10.6666C5.10668 10.5533 5.04702 10.422 5.01855 10.2824C4.99008 10.1429 4.99356 9.99866 5.02871 9.86063C5.29184 8.80406 5.94372 7.92781 6.91372 7.32687C7.77465 6.79375 8.87059 6.5 9.99997 6.5C11.1515 6.5 12.2187 6.78125 13.0847 7.31406C14.0568 7.91187 14.7097 8.79313 14.9715 9.8625C15.0063 10.0006 15.0093 10.1448 14.9806 10.2843C14.9518 10.4238 14.8919 10.555 14.8053 10.6681C14.7239 10.7721 14.6198 10.8561 14.501 10.9136C14.3821 10.9711 14.2517 11.0007 14.1197 11ZM4.09371 5.625C2.99403 5.625 2.02715 4.6025 1.93746 3.34594C1.89309 2.70219 2.09371 2.10687 2.49996 1.67031C2.90184 1.23812 3.46871 1 4.09371 1C4.71871 1 5.28121 1.23938 5.68528 1.67406C6.09465 2.11406 6.29465 2.70812 6.24778 3.34656C6.15809 4.60281 5.19153 5.625 4.09371 5.625ZM6.14559 6.60781C5.5959 6.33906 4.88246 6.20469 4.09403 6.20469C3.1734 6.20469 2.27934 6.44469 1.57621 6.88031C0.779027 7.375 0.242777 8.09531 0.0262145 8.965C-0.00547769 9.09009 -0.00847521 9.22073 0.0174461 9.34715C0.0433675 9.47356 0.0975367 9.59247 0.175902 9.695C0.250261 9.79046 0.345522 9.86759 0.45436 9.92047C0.563198 9.97334 0.682714 10.0006 0.803715 10H4.27246C4.33101 9.99999 4.3877 9.97944 4.43264 9.94192C4.47759 9.9044 4.50794 9.85229 4.5184 9.79469C4.52184 9.775 4.52621 9.75531 4.53121 9.73594C4.79621 8.67156 5.41715 7.77219 6.33465 7.11656C6.3684 7.09224 6.39554 7.05988 6.41362 7.02241C6.4317 6.98495 6.44014 6.94356 6.43819 6.90201C6.43623 6.86046 6.42394 6.82005 6.40242 6.78445C6.38091 6.74884 6.35085 6.71917 6.31497 6.69812C6.2659 6.66937 6.20965 6.63906 6.14559 6.60781Z" fill="#BF181D"/>
            </svg>
            <p>${game.players.min}-${game.players.max}</p>
            </div>
          <div class="tags">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66667 0C10.3487 0 13.3333 2.98467 13.3333 6.66667C13.3333 10.3487 10.3487 13.3333 6.66667 13.3333C2.98467 13.3333 0 10.3487 0 6.66667C0 2.98467 2.98467 0 6.66667 0ZM6.66667 2.66667C6.48986 2.66667 6.32029 2.7369 6.19526 2.86193C6.07024 2.98695 6 3.15652 6 3.33333V6.66667C6.00004 6.84346 6.0703 7.013 6.19533 7.138L8.19533 9.138C8.32107 9.25944 8.48947 9.32664 8.66427 9.32512C8.83907 9.3236 9.00627 9.25348 9.12988 9.12988C9.25348 9.00627 9.3236 8.83907 9.32512 8.66427C9.32664 8.48947 9.25944 8.32107 9.138 8.19533L7.33333 6.39067V3.33333C7.33333 3.15652 7.2631 2.98695 7.13807 2.86193C7.01305 2.7369 6.84348 2.66667 6.66667 2.66667Z" fill="#BF181D"/>
            </svg>
            <p>${game.playtime} min</p></div>
          <div class="tags"><p>${game.language}</p></div>
          <div class="tags"><p>${game.age} år</p></div>
        </div>
        <p>${game.rules}</p>
      </div>

      <div class="red-section">
        <div class="red-tag"><p>Hylde: ${game.shelf}</p></div>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        <div class="red-tag">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.72245 2.72642C6.73603 0.908806 7.24242 0 8 0C8.75758 0 9.26397 0.908806 10.2775 2.72642L10.5399 3.19682C10.8279 3.71362 10.9719 3.97203 11.1959 4.14243C11.4199 4.31283 11.6999 4.37603 12.2599 4.50243L12.7687 4.61763C14.7366 5.06323 15.7198 5.28563 15.9542 6.03844C16.1878 6.79044 15.5174 7.57525 14.1759 9.14406L13.8287 9.54966C13.4479 9.99526 13.2567 10.2185 13.1711 10.4937C13.0855 10.7697 13.1143 11.0673 13.1719 11.6617L13.2247 12.2033C13.4271 14.2969 13.5287 15.3433 12.9159 15.8081C12.3031 16.2729 11.3815 15.8489 9.53996 15.0009L9.06237 14.7817C8.53919 14.5401 8.27759 14.4201 8 14.4201C7.72241 14.4201 7.46081 14.5401 6.93762 14.7817L6.46084 15.0009C4.61848 15.8489 3.6969 16.2729 3.08492 15.8089C2.47133 15.3433 2.57293 14.2969 2.77532 12.2033L2.82812 11.6625C2.88572 11.0673 2.91452 10.7697 2.82812 10.4945C2.74332 10.2185 2.55213 9.99526 2.17134 9.55046L1.82415 9.14406C0.482577 7.57605 -0.187808 6.79124 0.0457869 6.03844C0.279381 5.28563 1.26416 5.06243 3.23211 4.61763L3.7409 4.50243C4.30009 4.37603 4.57928 4.31283 4.80408 4.14243C5.02887 3.97203 5.17207 3.71362 5.46006 3.19682L5.72245 2.72642Z" fill="#F7DC58"/>
          </svg>
          <p>${game.rating}</p></div>
        <svg width="377" height="510" viewBox="0 0 377 510" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M268.5 290C246.754 290 229.06 307.353 228.513 328.968L228.487 331.032C227.94 352.647 210.246 370 188.5 370C166.754 370 149.06 352.647 148.513 331.032L148.487 328.968C147.94 307.353 130.246 290 108.5 290H268.5Z" fill="#F1F1F1"/>
          <path d="M364.148 298C371.246 298 377 303.373 377 310V378H188.5C216.892 378 239.909 356.51 239.909 330V334C239.909 314.118 257.172 298 278.466 298H364.148Z" fill="#F1F1F1"/>
          <path d="M98.5341 298C119.828 298 137.091 314.118 137.091 334V330C137.091 356.51 160.108 378 188.5 378H0V310C2.76014e-07 303.373 5.75416 298 12.8523 298H98.5341Z" fill="#F1F1F1"/>
        </svg>
      </div>

      <div class="rating-section">
        <h3>Hvad tænker du om spillet?</h3>
        <div class="rating-stars">
          <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_303_81)">
            <path d="M17.334 1C17.4858 1.00009 17.7534 1.05998 18.2773 1.74414C18.8023 2.42963 19.3949 3.48729 20.2559 5.03125L20.6934 5.81445C21.1299 6.59778 21.4757 7.25976 22.0547 7.7002C22.641 8.14622 23.3666 8.28751 24.2129 8.47852V8.47949L25.0605 8.6709C26.7346 9.04994 27.8735 9.3108 28.6533 9.61816C29.319 9.88057 29.5251 10.1018 29.6074 10.2852L29.6357 10.3613C29.6999 10.5685 29.7017 10.8861 29.2471 11.6084C28.9007 12.1586 28.3757 12.8112 27.6543 13.665L26.8672 14.5898L26.2891 15.2656L26.2881 15.2666C25.7083 15.945 25.215 16.4918 24.9971 17.1924V17.1934C24.781 17.8904 24.8701 18.6248 24.958 19.5322V19.5332L25.0459 20.4355C25.2176 22.2121 25.3342 23.4354 25.2949 24.3164C25.2557 25.1954 25.0701 25.4381 24.9229 25.5498C24.7915 25.6494 24.548 25.7599 23.7568 25.5332C22.9531 25.3029 21.8847 24.814 20.3184 24.0928H20.3174L19.5215 23.7275C18.7323 23.3631 18.0666 23.0333 17.334 23.0332C16.6011 23.0332 15.9349 23.363 15.1455 23.7275L14.3506 24.0928C12.7835 24.8141 11.7142 25.3027 10.9102 25.5332C10.1185 25.7601 9.87544 25.6496 9.74512 25.5508C9.59691 25.4379 9.4123 25.1936 9.37305 24.3164C9.33365 23.4353 9.44934 22.2121 9.62109 20.4355L9.70898 19.5342V19.5332C9.78582 18.7392 9.86457 18.0758 9.73633 17.4551L9.66797 17.1914C9.45059 16.4894 8.95626 15.9421 8.37793 15.2666L7.80078 14.5908L7.7998 14.5898C6.66056 13.2583 5.88162 12.3429 5.41992 11.6094C4.96524 10.8869 4.96666 10.5685 5.03125 10.3604C5.09222 10.1639 5.25311 9.91831 6.01465 9.61816C6.79477 9.31072 7.93379 9.05014 9.60742 8.67188V8.6709L10.4551 8.47852C11.3017 8.28715 12.0244 8.14606 12.6113 7.70117C13.193 7.26022 13.5372 6.5958 13.9727 5.81445L13.9736 5.81543L14.4111 5.03125C15.2721 3.48731 15.8647 2.42963 16.3896 1.74414C16.9141 1.05937 17.1822 1 17.334 1Z" stroke="black" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
            <filter id="filter0_d_303_81" x="0" y="0" width="34.6673" height="34.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_303_81"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_303_81" result="shape"/>
            </filter>
            </defs>
          </svg>
          <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_303_81)">
            <path d="M17.334 1C17.4858 1.00009 17.7534 1.05998 18.2773 1.74414C18.8023 2.42963 19.3949 3.48729 20.2559 5.03125L20.6934 5.81445C21.1299 6.59778 21.4757 7.25976 22.0547 7.7002C22.641 8.14622 23.3666 8.28751 24.2129 8.47852V8.47949L25.0605 8.6709C26.7346 9.04994 27.8735 9.3108 28.6533 9.61816C29.319 9.88057 29.5251 10.1018 29.6074 10.2852L29.6357 10.3613C29.6999 10.5685 29.7017 10.8861 29.2471 11.6084C28.9007 12.1586 28.3757 12.8112 27.6543 13.665L26.8672 14.5898L26.2891 15.2656L26.2881 15.2666C25.7083 15.945 25.215 16.4918 24.9971 17.1924V17.1934C24.781 17.8904 24.8701 18.6248 24.958 19.5322V19.5332L25.0459 20.4355C25.2176 22.2121 25.3342 23.4354 25.2949 24.3164C25.2557 25.1954 25.0701 25.4381 24.9229 25.5498C24.7915 25.6494 24.548 25.7599 23.7568 25.5332C22.9531 25.3029 21.8847 24.814 20.3184 24.0928H20.3174L19.5215 23.7275C18.7323 23.3631 18.0666 23.0333 17.334 23.0332C16.6011 23.0332 15.9349 23.363 15.1455 23.7275L14.3506 24.0928C12.7835 24.8141 11.7142 25.3027 10.9102 25.5332C10.1185 25.7601 9.87544 25.6496 9.74512 25.5508C9.59691 25.4379 9.4123 25.1936 9.37305 24.3164C9.33365 23.4353 9.44934 22.2121 9.62109 20.4355L9.70898 19.5342V19.5332C9.78582 18.7392 9.86457 18.0758 9.73633 17.4551L9.66797 17.1914C9.45059 16.4894 8.95626 15.9421 8.37793 15.2666L7.80078 14.5908L7.7998 14.5898C6.66056 13.2583 5.88162 12.3429 5.41992 11.6094C4.96524 10.8869 4.96666 10.5685 5.03125 10.3604C5.09222 10.1639 5.25311 9.91831 6.01465 9.61816C6.79477 9.31072 7.93379 9.05014 9.60742 8.67188V8.6709L10.4551 8.47852C11.3017 8.28715 12.0244 8.14606 12.6113 7.70117C13.193 7.26022 13.5372 6.5958 13.9727 5.81445L13.9736 5.81543L14.4111 5.03125C15.2721 3.48731 15.8647 2.42963 16.3896 1.74414C16.9141 1.05937 17.1822 1 17.334 1Z" stroke="black" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
            <filter id="filter0_d_303_81" x="0" y="0" width="34.6673" height="34.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_303_81"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_303_81" result="shape"/>
            </filter>
            </defs>
          </svg>
          <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_303_81)">
            <path d="M17.334 1C17.4858 1.00009 17.7534 1.05998 18.2773 1.74414C18.8023 2.42963 19.3949 3.48729 20.2559 5.03125L20.6934 5.81445C21.1299 6.59778 21.4757 7.25976 22.0547 7.7002C22.641 8.14622 23.3666 8.28751 24.2129 8.47852V8.47949L25.0605 8.6709C26.7346 9.04994 27.8735 9.3108 28.6533 9.61816C29.319 9.88057 29.5251 10.1018 29.6074 10.2852L29.6357 10.3613C29.6999 10.5685 29.7017 10.8861 29.2471 11.6084C28.9007 12.1586 28.3757 12.8112 27.6543 13.665L26.8672 14.5898L26.2891 15.2656L26.2881 15.2666C25.7083 15.945 25.215 16.4918 24.9971 17.1924V17.1934C24.781 17.8904 24.8701 18.6248 24.958 19.5322V19.5332L25.0459 20.4355C25.2176 22.2121 25.3342 23.4354 25.2949 24.3164C25.2557 25.1954 25.0701 25.4381 24.9229 25.5498C24.7915 25.6494 24.548 25.7599 23.7568 25.5332C22.9531 25.3029 21.8847 24.814 20.3184 24.0928H20.3174L19.5215 23.7275C18.7323 23.3631 18.0666 23.0333 17.334 23.0332C16.6011 23.0332 15.9349 23.363 15.1455 23.7275L14.3506 24.0928C12.7835 24.8141 11.7142 25.3027 10.9102 25.5332C10.1185 25.7601 9.87544 25.6496 9.74512 25.5508C9.59691 25.4379 9.4123 25.1936 9.37305 24.3164C9.33365 23.4353 9.44934 22.2121 9.62109 20.4355L9.70898 19.5342V19.5332C9.78582 18.7392 9.86457 18.0758 9.73633 17.4551L9.66797 17.1914C9.45059 16.4894 8.95626 15.9421 8.37793 15.2666L7.80078 14.5908L7.7998 14.5898C6.66056 13.2583 5.88162 12.3429 5.41992 11.6094C4.96524 10.8869 4.96666 10.5685 5.03125 10.3604C5.09222 10.1639 5.25311 9.91831 6.01465 9.61816C6.79477 9.31072 7.93379 9.05014 9.60742 8.67188V8.6709L10.4551 8.47852C11.3017 8.28715 12.0244 8.14606 12.6113 7.70117C13.193 7.26022 13.5372 6.5958 13.9727 5.81445L13.9736 5.81543L14.4111 5.03125C15.2721 3.48731 15.8647 2.42963 16.3896 1.74414C16.9141 1.05937 17.1822 1 17.334 1Z" stroke="black" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
            <filter id="filter0_d_303_81" x="0" y="0" width="34.6673" height="34.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_303_81"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_303_81" result="shape"/>
            </filter>
            </defs>
          </svg>
          <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_303_81)">
            <path d="M17.334 1C17.4858 1.00009 17.7534 1.05998 18.2773 1.74414C18.8023 2.42963 19.3949 3.48729 20.2559 5.03125L20.6934 5.81445C21.1299 6.59778 21.4757 7.25976 22.0547 7.7002C22.641 8.14622 23.3666 8.28751 24.2129 8.47852V8.47949L25.0605 8.6709C26.7346 9.04994 27.8735 9.3108 28.6533 9.61816C29.319 9.88057 29.5251 10.1018 29.6074 10.2852L29.6357 10.3613C29.6999 10.5685 29.7017 10.8861 29.2471 11.6084C28.9007 12.1586 28.3757 12.8112 27.6543 13.665L26.8672 14.5898L26.2891 15.2656L26.2881 15.2666C25.7083 15.945 25.215 16.4918 24.9971 17.1924V17.1934C24.781 17.8904 24.8701 18.6248 24.958 19.5322V19.5332L25.0459 20.4355C25.2176 22.2121 25.3342 23.4354 25.2949 24.3164C25.2557 25.1954 25.0701 25.4381 24.9229 25.5498C24.7915 25.6494 24.548 25.7599 23.7568 25.5332C22.9531 25.3029 21.8847 24.814 20.3184 24.0928H20.3174L19.5215 23.7275C18.7323 23.3631 18.0666 23.0333 17.334 23.0332C16.6011 23.0332 15.9349 23.363 15.1455 23.7275L14.3506 24.0928C12.7835 24.8141 11.7142 25.3027 10.9102 25.5332C10.1185 25.7601 9.87544 25.6496 9.74512 25.5508C9.59691 25.4379 9.4123 25.1936 9.37305 24.3164C9.33365 23.4353 9.44934 22.2121 9.62109 20.4355L9.70898 19.5342V19.5332C9.78582 18.7392 9.86457 18.0758 9.73633 17.4551L9.66797 17.1914C9.45059 16.4894 8.95626 15.9421 8.37793 15.2666L7.80078 14.5908L7.7998 14.5898C6.66056 13.2583 5.88162 12.3429 5.41992 11.6094C4.96524 10.8869 4.96666 10.5685 5.03125 10.3604C5.09222 10.1639 5.25311 9.91831 6.01465 9.61816C6.79477 9.31072 7.93379 9.05014 9.60742 8.67188V8.6709L10.4551 8.47852C11.3017 8.28715 12.0244 8.14606 12.6113 7.70117C13.193 7.26022 13.5372 6.5958 13.9727 5.81445L13.9736 5.81543L14.4111 5.03125C15.2721 3.48731 15.8647 2.42963 16.3896 1.74414C16.9141 1.05937 17.1822 1 17.334 1Z" stroke="black" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
            <filter id="filter0_d_303_81" x="0" y="0" width="34.6673" height="34.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_303_81"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_303_81" result="shape"/>
            </filter>
            </defs>
          </svg>
          <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_303_81)">
            <path d="M17.334 1C17.4858 1.00009 17.7534 1.05998 18.2773 1.74414C18.8023 2.42963 19.3949 3.48729 20.2559 5.03125L20.6934 5.81445C21.1299 6.59778 21.4757 7.25976 22.0547 7.7002C22.641 8.14622 23.3666 8.28751 24.2129 8.47852V8.47949L25.0605 8.6709C26.7346 9.04994 27.8735 9.3108 28.6533 9.61816C29.319 9.88057 29.5251 10.1018 29.6074 10.2852L29.6357 10.3613C29.6999 10.5685 29.7017 10.8861 29.2471 11.6084C28.9007 12.1586 28.3757 12.8112 27.6543 13.665L26.8672 14.5898L26.2891 15.2656L26.2881 15.2666C25.7083 15.945 25.215 16.4918 24.9971 17.1924V17.1934C24.781 17.8904 24.8701 18.6248 24.958 19.5322V19.5332L25.0459 20.4355C25.2176 22.2121 25.3342 23.4354 25.2949 24.3164C25.2557 25.1954 25.0701 25.4381 24.9229 25.5498C24.7915 25.6494 24.548 25.7599 23.7568 25.5332C22.9531 25.3029 21.8847 24.814 20.3184 24.0928H20.3174L19.5215 23.7275C18.7323 23.3631 18.0666 23.0333 17.334 23.0332C16.6011 23.0332 15.9349 23.363 15.1455 23.7275L14.3506 24.0928C12.7835 24.8141 11.7142 25.3027 10.9102 25.5332C10.1185 25.7601 9.87544 25.6496 9.74512 25.5508C9.59691 25.4379 9.4123 25.1936 9.37305 24.3164C9.33365 23.4353 9.44934 22.2121 9.62109 20.4355L9.70898 19.5342V19.5332C9.78582 18.7392 9.86457 18.0758 9.73633 17.4551L9.66797 17.1914C9.45059 16.4894 8.95626 15.9421 8.37793 15.2666L7.80078 14.5908L7.7998 14.5898C6.66056 13.2583 5.88162 12.3429 5.41992 11.6094C4.96524 10.8869 4.96666 10.5685 5.03125 10.3604C5.09222 10.1639 5.25311 9.91831 6.01465 9.61816C6.79477 9.31072 7.93379 9.05014 9.60742 8.67188V8.6709L10.4551 8.47852C11.3017 8.28715 12.0244 8.14606 12.6113 7.70117C13.193 7.26022 13.5372 6.5958 13.9727 5.81445L13.9736 5.81543L14.4111 5.03125C15.2721 3.48731 15.8647 2.42963 16.3896 1.74414C16.9141 1.05937 17.1822 1 17.334 1Z" stroke="black" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
            <filter id="filter0_d_303_81" x="0" y="0" width="34.6673" height="34.6665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_303_81"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_303_81" result="shape"/>
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
