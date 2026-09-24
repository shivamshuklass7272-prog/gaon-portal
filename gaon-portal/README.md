# Basti Gaon Portal (बस्ती गाँव पोर्टल)

🌐 **Live Website**: [https://gaon-portal.onrender.com/](https://gaon-portal.onrender.com/)  

बस्ती ग्राम पंचायत के लिए डिजिटल कम्युनिटी पोर्टल — समस्या निवारण, सूचना बोर्ड, गाँव की जानकारी, सरकारी योजनाएं, छात्र व युवा कोना, स्वास्थ्य सेवा, और 1-क्लिक सरकारी फॉर्म।

## Kya hai isme

- **Backend**: Node.js + Express (`server.js`) — data ko `data/db.json` file me save karta hai, koi alag database install nahi karni padegi.
- **Frontend**: `public/index.html` — ek hi HTML file (HTML+CSS+JS), backend se `fetch` API ke zariye baat karti hai.

Yeh setup **localhost** ke saath-saath kisi bhi server (jaise Render, Railway, ya apne VPS) par bhi deploy ho sakta hai — sabhi users ka data ek hi jagah (server par) save hoga, isliye poore gaon ko same data dikhega.

## Chalane ke steps (VS Code me)

1. Is folder ko VS Code me kholein.
2. Terminal kholein (`` Ctrl + ` ``) aur ye command chalayein:
   ```
   npm install
   ```
3. Server start karein:
   ```
   npm start
   ```
4. Terminal me ye message dikhega:
   ```
   ✅ Hamara Gaon Portal chal raha hai: http://localhost:3000
   ```
5. Browser me `http://localhost:3000` kholein — website ready hai.

> Node.js install nahi hai to pehle [nodejs.org](https://nodejs.org) se install kar lein (LTS version).

## Folder structure

```
gaon-portal/
├── server.js          → backend (API + static file server)
├── package.json        → dependencies list
├── data/
│   └── db.json          → sara data yahan save hota hai (pehli baar chalane par khud ban jayegi)
├── public/
│   └── index.html        → poori website (frontend)
└── README.md
```

## API endpoints (reference)

| Method | Path              | Kaam                              |
|--------|-------------------|------------------------------------|
| GET    | /api/samasya      | Sabhi samasyaein laayein          |
| POST   | /api/samasya      | Nayi samasya jodein               |
| PATCH  | /api/samasya/:id  | Status badlein (nayi/progress/solved) |
| DELETE | /api/samasya/:id  | Samasya hatayein                  |
| GET    | /api/suchna       | Sabhi suchnaein laayein           |
| POST   | /api/suchna       | Nayi suchna jodein                |
| DELETE | /api/suchna/:id   | Suchna hatayein                   |
| GET    | /api/jaankari     | Gaon ki jaankari laayein          |
| PUT    | /api/jaankari     | Jaankari update karein            |
| GET    | /api/yojana       | Sabhi yojanaein laayein           |
| POST   | /api/yojana       | Nayi yojana jodein                |
| DELETE | /api/yojana/:id   | Yojana hatayein                   |

## Data kahan save hota hai

Sara data `data/db.json` file me save hota hai. Agar aap chahte hain ki data delete/reset ho jaaye, to bas ye file delete kar dein — server dobara start hone par khud nayi file bana lega.

## Internet par live karne ke liye

Agar poora gaon isse apne-apne phone se access kare (na ki sirf aapke computer se), to isse kisi free hosting service par daalna hoga, jaise:
- [Render.com](https://render.com) (free tier available)
- [Railway.app](https://railway.app)

### Render deploy setup (ready)

Is repo me `render.yaml` file already include hai. Bas aapko Render par yeh steps follow karni hain:

1. GitHub repo ko Render me add karein.
2. New Web Service create karein.
3. GitHub repo select karein.
4. Render apne aap `npm install` aur `npm start` run karega.
5. Optional: `.env` me `ADMIN_PASSWORD` aur `MONGODB_URI` set kar sakte hain.

Agar aap env variables set karna chahte hain, to `.env.example` file ko copy karke `.env` banayein:

```bash
cp .env.example .env
```

#### Example env values
```env
PORT=3000
ADMIN_PASSWORD=shivam@9026
MONGODB_URI=
```

> Agar `MONGODB_URI` blank rahe to app automatically memory mode me kaam karega. Production deploy ke liye MongoDB ka URI add karna better rahega.

Wahan is poore folder ko upload/connect karke "Node.js app" ke roop me deploy kar sakte hain — koi extra code change ki zarurat nahi hai.

## Android App ki tarah kaise install karein (PWA)

Ye website ab ek **PWA (Progressive Web App)** hai — matlab Play Store ke bina hi ise phone par "app" jaisa install kiya ja sakta hai.

### Testing ke liye (localhost par)
1. Server chalayein (`npm start`) aur `http://localhost:3000` apne phone ke Chrome me kholein (dono devices same WiFi par hone chahiye — computer ka local IP address use karein, jaise `http://192.168.1.5:3000`).
2. Chrome me address bar ke paas ya menu (⋮) me **"Install app"** ya **"Add to Home Screen"** ka option dikhega — usme tap karein.
3. App ka icon home screen par aa jayega, aur wo bilkul native app jaisi khulegi (full screen, apna icon, apna naam).

### Live/internet par deploy karne ke baad
Jab aap README ke "Internet par live karne ke liye" wale section me diye gaye steps se ise Render/Railway par deploy kar denge (HTTPS zaruri hai PWA ke liye, jo ye services free me deti hain), to website kholte hi header me **"📲 App Install Karein"** button khud-ba-khud dikhega — usme tap karke koi bhi gaon wala seedha apne phone par install kar sakta hai.

> Note: PWA install prompt sirf HTTPS par (ya localhost par testing ke waqt) dikhta hai — plain HTTP wali live site par nahi dikhega.

## Pradhan (Admin) Login

Ab samasyaein/complaints sirf **Gaon ke Pradhan** hi dekh sakte hain — login karke. Aam gaon wale sirf apni samasya darj kar sakte hain, kisi aur ki complaint nahi dekh sakte.

**Default password:** `shivam@9026`

### Password badalne ke liye
`.env` file me ye line set kar dein:
```env
ADMIN_PASSWORD=shivam@9026
```
Ya phir `server.js` file me fallback value badal dein, aur server restart kar dein (`Ctrl+C` phir `npm start`).

### Pradhan login kaise karein
1. Website ke header (upar) me **"🔐 Pradhan Login"** button dabayein
2. Password daalein → sabhi complaints dikhne lag jaayengi, category ke hisaab se
3. Har complaint ke status (Nayi/Progress/Solve) par tap karke aage badha sakte hain
4. Logout karne ke liye wahi button dobara dabayein (ab "🔓 Pradhan Mode — Logout" likha hoga)

**Suchna Board (announcements)** sabke liye public hi rahega — ye sirf samasya/complaints ke liye hai.

## Suchna Board — Edit aur Delete

Ab har suchna (announcement) ke neeche **Pradhan Login karne ke baad** hi "✏️ Edit" aur "🗑️ Hataayein" buttons dikhte hain — taaki official suchnaein sirf Pradhan hi manage kar sakein.

## Complaint Photo — Full Size Dekhna

Samasya list me (Pradhan Mode me) jis complaint ke saath photo hai, uski chhoti thumbnail par tap karne se ab photo poori screen par badi hokar khulti hai. Band karne ke liye upar ✕ dabayein ya bahar kahin tap karein.
