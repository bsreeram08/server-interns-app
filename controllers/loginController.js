const firebase = require("firebase-admin");
const serviceAccount = require("../secretKey.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://project-interns.firebaseio.com"
});
const db = firebase.firestore();
const adminsRef = db.collection('Admins');
const usersRef = db.collection('Users');
exports.performAdminsLogin = async (req, res) => {
  const body = req.body;
  if (!body) {
    res.status(403).send({
      status: "ERROR",
      message: "Invalid parameters",
    });
    return;
  }
  const userName = body.username;
  const password = body.password;
  if (!userName || !password) {
    res.status(403).send({
      status: "ERROR",
      message: "Invalid parameters",
    });
    return;
  }
  const currentAdminSnapshot = await adminsRef.where(
    "username",
    "==",
    userName.toLowerCase()
  ).get();
  if (currentAdminSnapshot.empty) {
    res.status(404).send({
      status: "ERROR",
      message: "Admin not present",
    });
    return;
  }
  const currentAdminRef = currentAdminSnapshot.docs[0];
  const adminData = currentAdminRef.data();
  if (adminData.password !== password) {
    res.status(404).send({
      status: "ERROR",
      message: "Invalid Password",
    });
    return;
  }
  res.status(200).send({
    status: "SUCCESS",
    data: {
      uid: currentAdminRef.id,
      username: adminData.username,
      email: adminData.email,
      type: adminData.type,
    },
  });
  return;
}
exports.performUsersLogin = async (req, res) => {
  const body = req.body;
  if (!body) {
    res.status(403).send({
      status: "ERROR",
      message: "Invalid parameters",
    });
    return;
  }
  const userName = body.username;
  const password = body.password;
  if (!userName || !password) {
    res.status(403).send({
      status: "ERROR",
      message: "Invalid parameters",
    });
    return;
  }
  const currentUserSnapshot = await usersRef.where(
    "username",
    "==",
    userName.toLowerCase()
  ).get();
  if (currentUserSnapshot.empty) {
    res.status(404).send({
      status: "ERROR",
      message: "User not present",
    });
    return;
  }
  const currentUserRef = currentUserSnapshot.docs[0];
  const userData = currentUserRef.data();
  if (userData.password !== password) {
    res.status(404).send({
      status: "ERROR",
      message: "Invalid Password",
    });
    return;
  }
  res.status(200).send({
    status: "SUCCESS",
    data: {
      uid: currentUserRef.id,
      username: userData.username,
      email: userData.email,
      type: userData.type,
    },
  });
  return;
};
exports.signUp = async (req, res) => {
  const body = req.body;
  if (!body) {
    res.status(403).send({
      status: "ERROR",
      message: "Invalid parameters",
    });
    return;
  }
  const userName = body.username;
  const password = body.password;
  if (!userName || !password) {
    res.status(403).send({
      status: "ERROR",
      message: "Invalid parameters",
    });
    return;
  }
  await usersRef.add({
    username: userName,
    password: password
  });
  res.status(200).send({
    status: "SUCESS",
    message: "User added sucessfully",
  });
}
exports.getUserID = async (req, res) => {
  const body = req.body;
  if (!body) {
    res.status(403).send({
      status: "ERROR",
      message: "Invalid parameters",
    });
    return;
  }
  const userName = body.username;
  const allUsers = await usersRef.get();
  let userID = "";
  allUsers.forEach(user => {
    if (user.data().username === userName) {
      userID = user.id;
    }
  });
  if (userID === "") {
    res.status(404).send({
      ststus: "ERROR",
      message: "Error user with that ID not available"
    });
  }
  res.status(200).send({
    ststus: "SUCESS",
    message: "User found.",
    userID: userID
  });
}