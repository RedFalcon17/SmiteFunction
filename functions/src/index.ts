import * as express from "express";
import * as cors from "cors";
import * as functions from "firebase-functions";
import { validateFirebaseIdToken } from "./lib";

const app = express();
app.use(cors({ origin: true }));

import { getNewSession } from "./getNewSession";
import { requestNewSession } from "./requestNewSession";
import { getGods } from "./getGods";
import { getBuilds } from "./getBuilds";
import { getBuild } from "./getBuild";
import { addBuild } from "./addBuild";
import { addTierlist } from "./addTierlist";
import { getTierlist } from "./getTierlist";
import { getTierlists } from "./getTierlists";
import { getItems } from "./getItems";
import { editBuild } from "./editBuild";
import { deleteBuild } from "./deleteBuild";

export const renewSession = functions.pubsub
  .schedule("every 15 minutes")
  .onRun(getNewSession);

app.get("/gods", getGods);
app.get("/session", requestNewSession);
app.get("/builds/:id", getBuilds);
app.get("/build/:id", getBuild);
app.put("/build/:id", validateFirebaseIdToken, editBuild);
app.delete("/build/:id", validateFirebaseIdToken, deleteBuild);
app.post("/builds", validateFirebaseIdToken, addBuild);
app.post("/tierlists", validateFirebaseIdToken, addTierlist);
app.get("/tierlists/:id", getTierlist);
app.get("/tierlists", getTierlists);
app.get("/items", getItems);

export const api = functions.https.onRequest(app);
