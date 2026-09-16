# Restidsanalys Web

Statisk landningssida for Restidsanalys, byggd for GitHub Pages eller annan statisk hosting.

## Publicering

Publicera hela innehållet i den här mappen som webbroot. Huvudsidan använder
`original.css` och `palette.css`; de interaktiva analysvyerna ligger i
`reach.html`, `crisis.html` och `reinforcement.html` med tillhörande JavaScript.
Gemensamma kartor, filmer, typsnitt och MapLibre-filer ligger i `assets/`.

Hero-filmen ligger i `assets/video/hero.mp4` och ska följa med vid deploy.
Den interaktiva täckningskartan använder MapLibre och laddar Esris mörka
baskarta, medan områdesgeometrierna levereras lokalt från `assets/coverage-data.js`.

## Funktion

- Demo- och kontaktknappar öppnar kontaktpanelen.
- Kontaktpanelen sparar inget på sidan utan öppnar användarens e-postprogram.
- Login är medvetet låst och visar en modal tills kund-/pilotåtkomst ska öppnas.

För riktig server-side inskickning behövs en extern endpoint, till exempel befintlig FastAPI-backend,
en serverless function eller en formulärtjänst. Ren GitHub Pages/HTML kan inte skicka e-post själv.
