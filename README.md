# Restidsanalys Web

Statisk landningssida for Restidsanalys, byggd for GitHub Pages eller annan statisk hosting.

## Publicering

Publicera innehållet i den här mappen som webbroot:

- `index.html`
- `style.css`
- `assets/`

Hero-filmen ligger i `assets/video/hero.mp4` och ska följa med vid deploy.
Sidan använder samma mörka premiumriktning som produktlandningen i Next-appen.

## Funktion

- Demo- och kontaktknappar öppnar kontaktpanelen.
- Kontaktpanelen sparar inget på sidan utan öppnar användarens e-postprogram.
- Login är medvetet låst och visar en modal tills kund-/pilotåtkomst ska öppnas.

För riktig server-side inskickning behövs en extern endpoint, till exempel befintlig FastAPI-backend,
en serverless function eller en formulärtjänst. Ren GitHub Pages/HTML kan inte skicka e-post själv.
