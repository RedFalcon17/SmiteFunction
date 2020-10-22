import * as functions from "firebase-functions";
import { db } from "./lib";

export const getTierlist = async (
  req: functions.Request,
  res: functions.Response
) => {
  const { id } = req.params;
  try {
    const doc = await db
      .collection("tierlists")
      .doc(id)
      .get();
    if (!doc.exists) {
      console.error("Build not found");
      res.status(404).end();
    }
    const tierlist = doc.data();
    res.status(200).json({ data: tierlist });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
