const firebase_functions = require("firebase-functions");
const firestore          = require("firebase-admin/firestore");


exports
  .default = firebase_functions
  .runWith({
    enforceAppCheck: true,
  })
  .https
  .onRequest((request, response) => request
    .body["ShortcutsAPIKey"] === process
    .env["ShortcutsAPIKey"] ? ((firestore) => ((environmentCollectionReference) => ((privateDocumentReference) => privateDocumentReference
      .get()
      .then((privateDocumentSnapshot) => ((updateData) => privateDocumentReference
        .update(updateData)
        .then(() => ((_response) => ((_promise) => {})(environmentCollectionReference
          .doc("public")
          .update({
            "focus": privateDocumentSnapshot.data()["focusPrior"], // Public document new data
          })))(response
            .json({
              ...privateDocumentSnapshot.data(),
              ...updateData,
            })
            .end())))({
              "focus": privateDocumentSnapshot.data()["focusPrior"], // Private document new data
              "focusPrior": privateDocumentSnapshot.data()["focus"], // Private document new data
            })))(environmentCollectionReference
              .doc("private")))(firestore
                .collection("environment")))(firestore
                  .getFirestore()) : ((_response) => {})(response
                    .status(403)
                    .end()));