import admin from "firebase-admin";
import serviceAccount from "../serviceAccount.json"; 

// Define the type for the service account
const serviceAccountParams = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientX509CertUrl: serviceAccount.client_x509_cert_url,
};

// check if the app is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountParams),
    databaseURL: process.env.FIREBASE_REALTIME_DATABASE_URL
  });
}

const admin_db = admin.firestore();
const admin_auth = admin.auth();
const admin_rtdb = admin.database();

export { admin_db, admin_auth, admin_rtdb };
  