import * as functions from "firebase-functions";
import uuid = require("uuid/v4");
import { db } from "./lib";

export const addTierlist = async (
  req: functions.Request,
  res: functions.Response
) => {
  const id = uuid();
  const body = req.body;
  const tierlist = { id, ...body };
  try {
    await db
      .collection("tierlists")
      .doc(id)
      .set(tierlist);
    res.status(201).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
