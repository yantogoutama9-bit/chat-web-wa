# Chat Web (Customer + Admin) + Unread Akurat (Cloud Function)

## 1) Isi firebaseConfig
Edit:
- public/customer.html
- public/admin.html

Cari:
```js
const firebaseConfig = { ... }
```

## 2) Buat settings/admin di Firestore
Collection: settings
Document: admin

Field:
- adminPin (string) contoh: "123456"
- adminName (string) contoh: "Admin CS"

## 3) Deploy Functions
```bash
firebase deploy --only functions
```

## 4) Deploy Hosting
```bash
firebase deploy --only hosting
```

## URL
- /customer.html
- /admin.html
