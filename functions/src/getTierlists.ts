import * as functions from "firebase-functions";
import { db } from "./lib";

export const getTierlists = async (
  req: functions.Request,
  res: functions.Response
) => {
  try {
    const query = await db.collection("tierlists").get();
    const tierlists: any[] = [];
    query.forEach(list => {
      tierlists.push(list.data());
    });
    res.status(200).json({ data: tierlists });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
