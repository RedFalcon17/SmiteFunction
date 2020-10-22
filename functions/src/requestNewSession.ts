import * as functions from "firebase-functions";

import { API, db } from "./lib";

export const requestNewSession = async (
  req: functions.Request,
  res: functions.Response
) => {
  try {
    const session = await API.connect();
    console.log("Session reteived ", session);
    db.collection("session")
      .doc("current")
      .set(session);
    res.status(201).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
