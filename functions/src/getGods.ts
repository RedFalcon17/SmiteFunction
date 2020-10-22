import * as functions from "firebase-functions";

import { API, db, types } from "./lib";

export const getGods = async (
  req: functions.Request,
  res: functions.Response
) => {
  try {
    const doc = await db
      .collection("session")
      .doc("current")
      .get();
    if (!doc.exists) {
      console.log("Session not found in db");
      throw new functions.https.HttpsError(
        "not-found",
        "Session not found in db."
      );
    }
    const session = doc.data() as types.Session;
    console.log("Session acquire: ", doc.data());
    const gods = await API.getGods(session.session_id);
    console.log("gods retrieved");
    res.status(200).json({ data: gods });
  } catch (err) {
    console.log("Error fetching gods!");
    new functions.https.HttpsError("unknown", err.message, err);
    res.status(500).end();
  }
};
