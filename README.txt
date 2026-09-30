BONSA BASHIR PORTFOLIO - FIREBASE VERSION

This version keeps the original HTML/CSS/JavaScript portfolio and adds Cloud Firestore.

Firebase features included:
- Contact form connected to Firestore
- Client-side validation
- Sending/success/error states
- Firestore security rules
- Firebase configuration file
- Firebase deployment configuration file
- Step-by-step Firebase setup guide

Main files:
- index.html       Portfolio UI and contact form
- styles.css       Portfolio styles
- script.js        Navigation, animations and Firebase contact-form logic
- firebase.js      Firebase initialization + Firestore connection
- firestore.rules  Firestore security rules
- firebase.json    Firebase CLI configuration
- SETUP_FIREBASE.md Complete setup and testing instructions

IMPORTANT:
1. Create a Firebase project.
2. Register a Web App.
3. Put your Firebase Web App configuration into firebase.js.
4. Create Firestore Database.
5. Publish firestore.rules.
6. Run with VS Code Live Server.
7. Test the contact form and verify the `messages` collection in Firestore.

No Firebase Admin SDK credentials are included or required in this frontend project.
