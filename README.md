# Technical Test (Note App)

## Development server

tambahkan file .env pada root direktori dengan values sebagai berikut:

```
NODE_ENV=production
PORT=5000
WHITELIST_ORIGIN=http://localhost:4200
ACCESS_TOKEN_SECRET=yoursecretaccesstoken
REFRESH_TOKEN_SECRET=yoursecretrefrestoken
```

# Initiate this app

Run `npm install` di direktori root untuk menginstall packages aplikasi backend

Run `npm install` di direktori frontend untuk menginstall packages aplikasi frontend

# How to run this app

### 1. First

jalankan kedua aplikasi dengan perintah `npm run dev`

pastikan aplilkasi frontend berjalan di `localhost:4200`

dan aplikasi backend di `localhost:5000`

### 2. Second

build kode frontend (angular) dengan menjalankan `npm run build` pada direktori /frontend,

jalankan kode backend pada direkotri root dengan perintah `npm run dev`

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

#### Untuk Request lainnya bisa dilihat pada folder postman test
