# Stacc code challenge 2021
GitHub Pages: https://frederikhr.github.io/stacc-konk-2022/

## Oppgavebeskrivelse
Her kan beskrive hvilke oppgave(r) du har valgt å løse.

- Jeg har prøvd å lage en nettside som bruker alle tre API'ene.
- Jeg har prøvd å fokusere på å lage en enkel side å navigere, en som hvem som helst ville klart å bruke.
- På nettsiden kan man utføre PEP-sjekk av en person, eller hente info om selskaper, eller hente info om ansatte i selskapet. Disse ble implementert med varierende grad av sukess. PEP-sjekken er mest robust.


## Hvordan kjøre prosjektet
Åpne index.html i en nettside.
- Jeg har brukt Firefox under utvikling, og det vil nok kjøre best der. 

## Kommentarer
Noen spesielle valg du ønsker å beskrive/forsvare?
- I kraft av at jeg ville lage en nettside som var lett og enkel å bruke, så har jeg valgt å ikke la brukeren hente ut alle typer data, siden mye ikke virket relevant (og hadde ofte ikke noen verdier)
- Jeg prøvde å lage en rekursiv funksjon for å hente ut data fra 'enheter' og 'roller' API'ene. For å hente ut info om et selskap kommer det noen ganger duplikater. For 'roller' API'et så kommer ikke ting i skikkelig rekkefølge (men alt som skal hentes, blir hentet).

