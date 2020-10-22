import * as functions from "firebase-functions";
import { db, API, types } from "./lib";

export const getItems = async (
  req: functions.Request,
  res: functions.Response
) => {
  try {
    const session = (await db
      .collection("session")
      .doc("current")
      .get()).data() as types.Session;
    const items = await API.getItems(session.session_id);
    res.status(200).json({ data: items });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
