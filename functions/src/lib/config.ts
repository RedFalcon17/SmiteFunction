import * as admin from "firebase-admin";

const app = !admin.apps.length
  ? admin.initializeApp()
  : admin.app("smite-source");

export const db = app.firestore();
