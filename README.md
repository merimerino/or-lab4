# Baza podataka - Licensed horses CRO

## Verzija 4.0

### Autor: Marija Danek

#### _Jezik: Hrvatski_

#### _Licenca: MIT - kod se može slobodno koristiti_

Baza podataka licenciranih konja u Republici Hrvatskoj, po Hrvatskom konjičkom savezu.
Vizualni i pristupačan prikaz tablice, sortiranje, filtriranje i preuzimanje u JSON/CSV obliku.

Sadrži Single-Sign-On, OpenApi specifikaciju te JSON-LD

#### Tablica atributa:

| Naziv            | Tip     | Opis                                                             |
| ---------------- | ------- | ---------------------------------------------------------------- |
| id_horse         | integer | ID konja                                                         |
| horse_name       | string  | Ime konja                                                        |
| father           | string  | Otac konja                                                       |
| mothers_father   | string  | Otac majke konja                                                 |
| year_of_birth    | integer | Godina rođenja                                                   |
| country_of_birth | string  | Zemlja rođenja                                                   |
| gender           | string  | Spol                                                             |
| breed            | string  | Pasmina                                                          |
| tournament       | boolean | Je li konj ikad bio na natjecanju? _True_ ako da, _false_ ako ne |
| owner_name       | string  | Ime vlasnika                                                     |
| owner_surname    | string  | Prezime vlasnika                                                 |
| id_owner         | string  | ID vlasnika                                                      |

## Razvoj i pokretanje

Potrebno je imati instaliran Node.js(npm).
Korištene tehnologije: Javascript, HTML, CSS; Typescript

Naredba za instalaciju potrebnih biblioteka

```sh
npm install
```

Naredbe za pokretanje.

```sh
npm run build
```

```sh
npm run start
```

Ili pomoću biblioteke Nodemon (praktično za razvoj)

```sh
npm run dev
```
