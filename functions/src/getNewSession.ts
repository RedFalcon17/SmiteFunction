import * as functions from "firebase-functions";
import { API, db, types } from "./lib";

export const getNewSession = async (context: functions.EventContext) => {
  try {
    const session: types.Session = await API.connect();
    console.log("Sesssion: ", session);
    await db
      .collection("session")
      .doc("current")
      .set(session);
    console.log("Session successfully retrieved.");
    return null;
  } catch (err) {
    console.error("Error retrieving session");
    new functions.https.HttpsError("unknown", err.message, err);
    return null;
  }
};
