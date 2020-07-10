const firebase = require("firebase-admin");
const serviceAccount = require("../secretKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://fb-node-learn.firebaseio.com",
}, "videos");
const db = firebase.firestore();
const videosRef = db.collection('Videos');
exports.getVideos = async (req, res) => {
    const period = req.body.period;
    const periodRef = await videosRef.doc(period);
    const snapShot = await periodRef.get();
    if (!snapShot.exists) {
        res.status(404).send({
            status: "ERROR",
            message: "No assesment for that period."
        });
    }
    res.status(200).send({
        status: "SUCESS",
        message: "Data sucessfully retrieved",
        data: (snapShot.data())
    });
}
exports.addVideos = async (req, res) => {
    const body = req.body;
    const period = body.period;
    const userType = body.userType;
    let urls = body.urls;
    if (!body) {
        res.status(403).send({
            status: "ERROR",
            message: "Invalid parameters",
        });
        return;
    }
    if (userType != "admin") {
        res.status(405).send({
            status: "ERROR",
            message: "Operation not permitted for this user."
        });
        return;
    }
    const periodRef = await videosRef.doc(period);
    periodRef.update({ urls: (urls) });
    res.status(200).send({
        status: "SUCESS",
        message: "Added"
    });
}