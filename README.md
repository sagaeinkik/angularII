# AngularII

av S.E.K för moment 4 i kursen Programmering i TypeScript på Mittuniversitetet.

## Moment 4

I det här momentet ska man med hjälp av ramverket Angular skapa en sida som hämtar hem data från ett API över kurser i Webbutvecklingsprogrammet, och skriva ut dem i en tabell.  
Man sorterar bland kurserna baserat på kurskod, kurstitel eller progression. Man filtrerar med hjälp av sökfältet.

## Uppbyggnad

Det finns ett interface, `models/kurs.ts`, som beskriver datans struktur från API:et. En service, `services/course.service.ts` hanterar själva hämtningen av data från API:et med hjälp av Angulars inbyggda HttpClient. Datan lagras sedan i en array av interfacet kurs, som en observable.

I `courses/courses.component.ts` tas datan emot med subscribe och lagras i två arrayer, `courses` och `filteredCourses`. En tvåvägsdatabindning görs från HTML-filen för att lagra värdet som skrivs i sökfältet, och en funktion matchar textsträngen mot kursernas namn. De kursobjekt vars textsträngar matchar lagras i `filteredCourses`. Är sökfältet tomt används `courses` för att återställa `filteredCourses` till fulla uppsättningen av kurser.

### Sortering

En variabel, `latestSort`, lagrar textsträngar eller null. Alla sorteringar sköts av samma funktion, `sortCourses`, i `courses.component.ts`. Funktionen använder sig av parametern sortByX för att göra en localeCompare, t ex `a[sortByX].localeCompare(b[sortByX])` så att funktionen är återanvändbar.
Variabeln latestSort uppdateras för att hålla reda på vad man har sorterat på senast genom att lagra värdet för sortByX. Om sortByX råkar vara samma som latestSort görs en reverse() på arrayen.
