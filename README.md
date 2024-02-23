# 🏠 FamiLynk - Organizer Domowy

FamiLynk to aplikacja webowa stworzona w Next.js z TypeScript, która pomaga w organizacji życia rodzinnego. Aplikacja pozwala na dzielenie się z innymi członkami rodziny różnymi informacjami, takimi jak kalendarz, notatki, obowiązki i przepisy.

strona: https://hakhiros.vercel.app

## Spis Treści

- [Funkcje](#funkcje)
- [Technologie i Biblioteki](#technologie-i-biblioteki)
- [Instalacja](#instalacja)
- [Użycie](#użycie)
- [Autorzy](#autors)

## Funkcje

Aplikacja FamiLynk oferuje następujące funkcje:

- **Domy**: W FamiLynk to grupy lub przestrzenie organizacyjne, które pozwalają na wspólne zarządzanie życiem rodzinym. Możesz utworzyć swój własny 'Dom' dla swojej rodziny lub dołączyć do istniejącego, aby wspólnie planować, organizować i zarządzać obowiązkami oraz wydarzeniami. Domy pozwalają na spersonalizowanie aplikacji pod potrzeby różnych grup rodzinnych. Chcąc zaprosić innych członków rodziny udostępniając im link do dołączenia do 'Domu' lub podać im kod QR.
- **Kalendarz**: Możesz dodawać i zaplanować ważne wydarzenia, by każdy członek rodziny nie czuł się zaskoczony.
- **Notatki**: Twórz notatki, które są dostępne dla wszystkich członków rodziny, żeby dać informacje członkom domu np. (lista zakupów, co zabrać na wyjazd, itd...).
- **Obowiązki**: Przypisuj obowiązki domowe na konkretny dzień tygodnia dla wybranych użytkowników, aby nikt nie zapomniał o tym co miał zrobić.
- **Przepisy**: Wybieraj i przygotowuj dania z listy przepisów kulinarnych. Masz tam opisaną listę składników, kroki przygotowania, poziom trudności i czas przygotowania posiłku.

## Technologie i Biblioteki

Aplikacja FamiLynk została zbudowana przy użyciu kluczowych technologii i bibliotek:

- [Next.js](https://nextjs.org): Framework React do renderowania na serwerze.
- [TypeScript](https://www.typescriptlang.org): Rozszerza JavaScript o typy, co pomaga w większej pewności kodu.
- [Prisma](https://prisma.io): ORM do interakcji z bazą danych.
- [next-auth](https://next-auth.js.org): Zapewnia mechanizmy autentykacji i zarządzania sesjami.
- [FontAwesome](https://fontawesome.com): Dostarcza ikony do użycia w aplikacji.
- [FullCalendar](https://fullcalendar.io): Biblioteka do obsługi kalendarza.
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js): Służy do haszowania haseł użytkowników.
- [react-qr-code](https://github.com/zpao/qrcode.react): Umożliwia generowanie kodów QR.
- [react-toastify](https://fkhadra.github.io/react-toastify): Wyświetla powiadomienia w aplikacji.
- [dockera](https://docs.docker.com): konteneryzacja aplikacji


## Instalacja

1. Sklonuj repozytorium:

```bash
$ git clone https://github.com/Yndh/hakhiros.git
$ cd hakhiros
```

2. Zainstaluj [dockera](https://docs.docker.com/engine/install/) 

3. Uruchom aplikację 
* bez hot-reload'a
```bash
$ docker compose up --build
```
* z hot-reload'en
```bash
docker compose watch
```

## Użycie

1. Zarejestruj się lub zaloguj się w aplikacji.
2. Utwórz nową rodzinę lub dołącz do istniejącej.
3. Korzystaj z różnych modułów aplikacji, takich jak kalendarz, notatki, obowiązki i przepisy.

## Autorzy
<p align="center">
<img src="https://github.com/Yndh.png?size=60" alt="Yndh" href="https://github.com/Yndh">
<img src="https://github.com/Qlesuga.png?size=60" alt="Qlesuga" href="https://github.com/Qlesuga">
<img src="https://github.com/MarcinSzablak.png?size=60" alt="MarcinSzablak" href="https://github.com/MarcinSzablak">
<img src="https://github.com/IB2R5I.png?size=60" alt="IB2R5" href="https://github.com/IB2R5I">
</p>