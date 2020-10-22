import * as functions from "firebase-functions";
import { db } from "./lib";

export const editBuild = async (
  req: functions.Request,
  res: functions.Response
) => {
  const { id } = req.params;
  const build = { id, ...req.body };
  try {
    await db
      .collection("builds")
      .doc(id)
      .set(build);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
