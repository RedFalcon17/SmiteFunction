import * as functions from "firebase-functions";
import { db } from "./lib";

export const deleteBuild = async (
  req: functions.Request,
  res: functions.Response
) => {
  const { id } = req.params;
  db.collection("builds")
    .doc(id)
    .delete()
    .then(() => {
      console.log(`${id} deleted.`);
      res.status(204).end();
    })
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
};
