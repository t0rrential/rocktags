

// import {setGlobalOptions} from "firebase-functions";
// import {onRequest} from "firebase-functions/https";
// import * as logger from "firebase-functions/logger";

import {beforeUserCreated, HttpsError} from "firebase-functions/v2/identity";

//setGlobalOptions({ maxInstances: 10 });

export const enforceMavsEmail = beforeUserCreated(async (event) => {
  const user = event.data;
  if (!user?.email?.endsWith("@mavs.uta.edu")) {
    throw new HttpsError("invalid-argument", "Only @mavs.uta.edu emails are allowed");
  }
});