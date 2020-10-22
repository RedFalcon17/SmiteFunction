import * as functions from "firebase-functions";
import uuid = require("uuid/v4");
import { db } from "./lib";

export const addBuild = async (
  req: functions.Request,
  res: functions.Response
) => {
  const id = uuid();
  const body = req.body;
  const build = { id, ...body };
  try {
    await db
      .collection("builds")
      .doc(id)
      .set(build);
    res.status(201).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
