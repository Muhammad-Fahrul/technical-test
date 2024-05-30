# Technical Test (Note App)

## Development server

Run `npm install` di direktori root untuk menginstall packages aplikasi backend

Run `npm install` di direktori frontend untuk menginstall packages aplikasi frontend

lalu jalankan kedua aplikasi dengan perintah `npm run dev`

pastikan aplilkasi frontend berjalan di `localhost:4200`

dan aplikasi backend di `localhost:5000`

# User API Spec

## Login User API

login sebagai user (dummy data)

```json
{
  "username": "user",
  "password": "user"
}
```

Response Body Success :

```json
{
  "data": {
    "accessToken": "unique-token"
  }
}
```

# Contoh Request

## Notes API Spec

### Add Note API

Setiap Data akan selalu memiliki id unique

Endpoint : POST /api/notes

Request Body :

```json
{
  "title": "string",
  "desc": "string"
}
```

Response Body Success :

```json
{
  "data": {
    "noteId": 1,
    "message": "string"
  }
}
```

Untuk Request lainnya bisa dilihat pada folder postman test
