import * as functions from "firebase-functions";
import { db } from "./lib";

export const getBuilds = async (
  req: functions.Request,
  res: functions.Response
) => {
  try {
    const { id } = req.params;
    console.log({ id });
    const query = await db
      .collection("builds")
      .where("god_id", "==", parseInt(id))
      .get();
    const builds: any[] = [];
    if (query.empty) {
      console.log("no matches found");
    }
    query.forEach(build => {
      const b = build.data();
      builds.push(b);
    });
    return res.status(200).json({ data: builds });
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
};
