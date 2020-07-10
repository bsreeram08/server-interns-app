// const data = {
//   name: "Sreeram",
//   dob: "1999",
//   place: "Chennai",
// };

// const internshipReference = db.collection("Internship").doc("Avengers");
// const FieldValue = admin.firestore.FieldValue;
// internshipReference.update({
//   place: "Chennai",
//   internship: "Surfboard Payments",
//   timestamp: FieldValue.serverTimestamp(),
// });
// db.collection("Internship").doc("ix5yCG0fsjy1YZYKYAaP").delete();

// db.collection("Internship").doc("Avengers").update({
//   place: FieldValue.delete(),
// });
// const readData = db
//   .collection("Internship")
//   .doc("Avengers")
//   .get()
//   .then((doc) => {
//     console.log(doc.data());
//   })
//   .catch((err) => {
//     console.log(`Error : ${err}`);
//   });
// const retrieve = async () => {
//   const readData1 = await db.collection("Internship").get();
// };
