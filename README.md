# MDU Eksamen (IxD but better)

Jeg har lavet mit eksamensprojekt ud fra temaet **IxD SpilCafé**. Jeg har ændret, tilføjet og slettet en del kode fordelt på min CSS-fil, JavaScript-fil og mine HTML-filer. Jeg vil kort gennemgå ændringer nedenfor.

*Jeg tæller `innerHTML` som HTML, og det beskrives derfor i HTML-sektionen. Al styling beskrives i CSS-delen, da jeg ikke har brugt nævneværdig inline-styling.*

Grundlæggende har min mappestruktur set sådan ud:  
- css
  - `app.css`
- data
  - `games.json`
- img
  - 
- js
- sites
  - `location.html`
  - `spilgalleri.html`
- `index.html`
- `README.md`

---

## HTML
Jeg har lavet flere HTML-sider med forskellige formål. `index.html` vises kun i få sekunder, før den omdirigerer til `location.html`, hvor man vælger hvilken brætspilscafé, man er på. Når man vælger en derfra, kommer man videre til `spilgalleri.html`, som er appens primære side med alle *game-cards*.

### index.html
Footeren er fjernet. Denne ændring er lavet, fordi en app oftest ikke har en footer.

### location.html
Siden er ændret fra at være et valg mellem tags til en mere grafisk repræsentation med *cards*. Footeren er også fjernet.
*Det er kun Vestergade cardet, som får brugeren videre til `spilgalleri.html`.*

### spilgalleri.html
**Navigationsbaren er totalt ændret** for at passe til et telefonlayout. Filter-dropdownmenuer er sat ind i deres egen **`dialog` modal** til filtrering. Tilbageknappen, footeren, baggrunden og sværhedsgradens filter-dropdown er fjernet for at **simplificere DOM-strukturen**. En **sidebar** er tilføjet til at navigere appen, og den inkluderer en Dark Mode-knap.
*Ingen af navigationslinksne fører dog et sted hen ud over `spilgalleri.html`. Visningen af sidebaren er kun for at åbne appen op til at være en del af en større samlet webside.*

*Game cards* har fået fjernet alle tags, så det kun er billede og titel, der vises. Min `innerHTML` til min `showGameModal` er ændret markant. De forskellige JSON-properties bliver nu vist som tags. Sværhedsgrad er fjernet. Informationerne er blevet inddelt i **semantiske sektioner**, såsom `.tag-container` og `.rating-section`. Der er også inddraget flere **SVG'er** til tags og rating, og ikoner er blevet fjernet fra kategorierne. Jeg har lavet en `a href`, som fyldes ud med `${game.rules_pdf}` og vises som et ikon, der forestiller en regelbog. Når man trykker på regel ikonet kommer man ind på en side, hvor man kan se reglerne til spil (når jeg har kunnet, har det været en pdf)

---

## CSS
I `:root` er farver og fonte blevet ændret. Der er nu givet **CSS variabler (`var()`)** til de fleste elementer, så jeg kan bruge en `darkmode`-klasse og skifte mellem temaer. Der er nu lavet et **funktionelt CSS Grid**, som indeholder *game cards*. Jeg har ryddet op i mit *stylesheet* ved at fjerne klasser og ID'er, der ikke længere bruges. Baggrundsbilledet er fjernet. De lyserøde/beige farver er erstattet med de røde farver, som passer bedre til brandet. Spilgalleriet er tilpasset og gjort mere overskueligt for at passe til en telefon. Al **pre-styling** fra `<button>` og `<input>` er fjernet og erstattet med et mere passende design. Jeg har også fjernet `#game-list-all`, da den ikke eksisterede i HTML'en.

---

## JavaScript
Jeg har **saneret koden** ved at fjerne de fleste `console.log`-statements, efter jeg bekræftede, at de virkede. Tilbageknappen fra spilgalleri-navbaren er fjernet. `showGameDetails`-funktionen er fjernet, da den erstattes med modalen. `getDifficultyClass`-funktionen er fjernet, da sværhedsgrad ikke længere vises. Jeg har tilføjet en **utility-funktion** kaldet `getLanguageFlag`, så der kommer et flag i stedet for navnet på et sprog. `difficultyValue` er fjernet fra `filterGames`-funktionen, da filtrering efter sværhedsgrad er deaktiveret. Der er tilføjet **UI-logik** til en *sidebar*, som kan vises ved at trykke på et *hamburgermenu-ikon* på *navigationsbaren* i `spilgalleri.html`. Jeg har tilføjet **logikken til `filterDialog`-modalen **, hvor filtreringen kan ske.

---

## json
Jeg har ændret partners billedet til en png uden baggrund. Jeg har tilføjet en propperty til hvert spil, som hedder `rules_pdf`. Proppertien er en `URL` til en side, hvor man kan finde reglerne til det valgte spil
