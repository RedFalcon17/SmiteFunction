import * as functions from "firebase-functions";
import { db } from "./lib";

export const getBuild = async (
  req: functions.Request,
  res: functions.Response
) => {
  const { id } = req.params;
  try {
    const doc = await db
      .collection("builds")
      .doc(id)
      .get();
    if (!doc.exists) {
      console.error("Build not found.");
      res.status(200).json({ data: [] });
    }
    const build = doc.data();
    res.status(200).json({ data: build });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
