import { getFirestore } from "firebase-admin/firestore";
import { runWith }      from "firebase-functions";


export const setLocation = runWith({
    enforceAppCheck: true,
  })
  .https
  .onRequest((request, response) => request.body["ShortcutsAPIKey"] === process.env["ShortcutsAPIKey"] && typeof request.body["location"] === "string" ? ((firestore) => ((privateDocumentReference) => privateDocumentReference.get().then((privateDocumentSnapshot) => privateDocumentSnapshot.data()?.["location"] === request.body["location"] ? ((_response) => {})(response.json(privateDocumentSnapshot.data()).end()) : ((updateData) => privateDocumentReference.update(updateData).then(() => ((_response) => {})(response.json({
    ...privateDocumentSnapshot.data(),
    ...updateData,
  }).end())))({
    "location": request.body["location"],
  })))(firestore.collection("environment").doc("private")))(getFirestore()) : ((_response) => {})(response.status(403).end()));