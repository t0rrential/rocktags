// import {setGlobalOptions} from "firebase-functions";
// import {onRequest} from "firebase-functions/https";
// import * as logger from "firebase-functions/logger";

import { beforeUserCreated, HttpsError } from "firebase-functions/v2/identity";
import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

// Initialize Admin SDK and Firestore
admin.initializeApp();
const db = admin.firestore();
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

export const createFirestoreUser = functions.auth.user().onCreate(async (user) => {
    // The user object is the same UserRecord you'd get from the Admin SDK
    const { uid, email, displayName } = user;
    
    // Data to write to Firestore
    const userData = {
        email: email,
        displayName: displayName || 'New User',
        role: 'user',
    };

    // Use the Auth UID as the document ID for the user profile
    const userRef = db.collection('users').doc(uid);

    console.log(`[V1] Creating user profile for UID: ${uid}`);

    try {
        await userRef.set(userData, { merge: true });
        console.log(`[V1] Successfully created user profile document for ${uid}`);
    } catch (error) {
        console.error(`[V1] Error creating user profile document for ${uid}:`, error);
        // Do NOT throw an HttpsError here, as it can't stop the Auth process.
        // Log the failure to debug later.
    }
});
