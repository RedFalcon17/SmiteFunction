import * as functions from "firebase-functions";
import * as moment from "moment";
import * as md5 from "md5";
const fetch = require("isomorphic-unfetch");

class Smite {
  devId: string;
  authKey: string;
  constructor(devId: string, authKey: string) {
    this.devId = devId;
    this.authKey = authKey;
  }

  async getGods(session: string) {
    var method = "getgods";
    var url = this.urlBuilder(session, method, null);
    return fetch(url)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  async getGodRecommendedItems(session: string, god_id: string) {
    var method = "getgodrecommendeditems";
    var url = this.urlBuilder(session, method, null, null, god_id);
    return fetch(url)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  getItems(session: string) {
    var method = "getitems";
    var url = this.urlBuilder(session, method);
    console.log(url);
    return this.makeRequest(url);
  }

  getDataUsed(session: string) {
    var method = "getdataused";
    var url = this.urlBuilder(session, method);
    return this.makeRequest(url);
  }

  connect() {
    var url =
      "http://api.smitegame.com/smiteapi.svc" +
      "/" +
      "createsession" +
      "json" +
      "/" +
      this.devId +
      "/" +
      this.getSignature("createsession") +
      "/" +
      this.timeStamp();
    return this.makeRequest(url);
  }

  makeRequest(url: string) {
    return fetch(url)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  urlBuilder(
    session: string,
    method: string,
    player?: string | null,
    match_id?: string | null,
    god_id?: string | null,
    queue?: string | null,
    tier?: string | null,
    season?: string | null
  ) {
    let baseURL =
      "http://api.smitegame.com/smiteapi.svc" +
      "/" +
      method +
      "json" +
      "/" +
      this.devId +
      "/" +
      this.getSignature(method) +
      "/" +
      session +
      "/" +
      this.timeStamp();

    if (player) {
      baseURL += `/${player}`;
    }
    if (god_id) {
      baseURL += `/${god_id}`;
    }
    if (match_id) {
      baseURL += `/${match_id}`;
    }
    if (queue) {
      baseURL += `/${queue}`;
    }
    if (tier) {
      baseURL += `/${tier}`;
    }
    if (season) {
      baseURL += `/${season}`;
    }
    baseURL += "/1";

    return baseURL;
  }

  timeStamp() {
    return moment()
      .utc()
      .format("YYYYMMDDHHmmss");
  }

  getSignature(method: string) {
    return md5(this.devId + method + this.authKey + this.timeStamp());
  }
}
export const API = new Smite(
  functions.config().smite_source.dev_id,
  functions.config().smite_source.auth_key
);
