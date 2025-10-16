// import {setGlobalOptions} from "firebase-functions";
// import {onRequest} from "firebase-functions/https";
// import * as logger from "firebase-functions/logger";

import { beforeUserCreated, HttpsError } from "firebase-functions/v2/identity";
require("firebase-functions/logger/compat");

export const enforceMavsEmail = beforeUserCreated(async (event) => {
  const user = event.data;
  const now = new Date();
  console.log(`[${now.toISOString()}] attempting sign up with email ${user?.email}`);
  if (!user?.email?.endsWith("@mavs.uta.edu")) {
    console.log(`[${now.toISOString()}] invalid email ${user?.email}`);
    throw new HttpsError("invalid-argument", "Only @mavs.uta.edu emails are allowed");
  }
});
