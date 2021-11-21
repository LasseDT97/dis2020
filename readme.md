# Introduktion
Velkommen til banking_application. Programmet er udviklet med udgangspunkt i kravspecifikationen og API-specifikationen udleveret af CBS.
Efter udvikling af programmet er en one-click-run løsning implementeret med udgangspunkt i filer udleveret af instructors i kurset.
Ligeledes er programmet testet ved et testscript udleveret af selvsamme instructors.

# Forudsætninger
For at køre programmet skal vi have hentet flere node_modules. Der er formentlig givet en liste fra CBS, men her findes disse packages ligeledes:
mongoose, express, mongoDB, mocha, npm, seaport, http-proxy, https, path, fs og body-parser.

# Database
I directoriet "mongodump" ligger to .json filer med navnene "accounts.json" og "clients.json". Heri kan et dump af henholdsvis vores account collection og client
collection findes. De er begge trukket d.6 december.

Hvis du gerne vil åbne en database for at tjekke skal du ændre connection string der findes på linje 7 ved /src/database/db.js

# Hvordan kører programmet
For at køre programmet åbnes terminalen hvori vi skal sørge for at være i det korrekte directory = "lassethoby/src".
Hernæst skal vi køre commanden $ ./run.sh
Denne command starter vores seaport op, laver to instanser af vores server og starter til sidst vores loadBalancer.

Såfremt det ønskes at teste programmet kan man nu i en ny terminal køre commanden $ npm test

Hvis intet af dette fungerer kan man med fordel kigge den første del af den vedhæftede video i gennem hvor samme proces udføres.