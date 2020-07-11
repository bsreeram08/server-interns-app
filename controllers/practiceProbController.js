const firebase = require("firebase-admin");
const serviceAccount = require("../secretKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://project-interns.firebaseio.com"
}, "practiceProblems");
const db = firebase.firestore();
const ProblemsRef = db.collection('Problems');
const usersRef = db.collection('Users');
exports.addProblem = async (req, res) => {
    const body = req.body;
    const problemTopic = body.problemTopic;
    const problemData = body.problemData;
    const userType = body.userType;
    if (!body) {
        res.status(403).send({
            status: "ERROR",
            message: "Invalid parameters",
        });
        return;
    }
    if (userType != "admins") {
        res.status(405).send({
            status: "ERROR",
            message: "Operation not permitted for this user."
        });
        return;
    }
    if (problemTopic == undefined || problemData == undefined) {
        res.status(422).send({
            status: "ERROR",
            message: "Empty data detected."
        });
        return;
    }
    const data = {
        problemTopic: problemTopic,
        problemData: problemData
    }
    await ProblemsRef.add(data);
    res.status(200).send({
        status: "SUCESS",
        message: "Data Added Sucessfully",
    });
    return;
}
exports.getProblems = async (req, res) => {
    const snapshot = await ProblemsRef.get();
    if (snapshot.empty) {
        res.status(404).send({
            status: "ERROR",
            message: "No problems available",
        });
        return;
    }
    const problems = [];
    let constructProblems;
    snapshot.forEach(doc => {
        constructProblems = {};
        constructProblems.problemId = doc.id;
        constructProblems.problemTopic = doc.data().problemTopic;
        constructProblems.problemData = doc.data().problemData;
        problems.push(constructProblems);
    });
    res.status(200).send({
        status: "SUCESS",
        message: "Problems Available",
        problems: problems
    });
    return;
}
exports.addSolution = async (req, res) => {
    const body = req.body;
    const problemId = body.problemId;
    const userId = body.userId;
    const solution = body.solution;
    if (!body) {
        res.status(403).send({
            status: "ERROR",
            message: "Invalid parameters",
        });
        return;
    }
    if (problemId == undefined || solution == undefined) {
        res.status(403).send({
            status: "ERROR",
            message: "Empty Data detected",
        });
        return;
    }
    const user = await usersRef.doc(userId).get();
    if (!user.exists) {
        res.status(404).send({
            status: "ERROR",
            message: "No user of that ID found",
        });
        return;
    }
    const userName = user.data().username;
    const givenProblemRef = ProblemsRef.doc(problemId);
    const problemDoc = await givenProblemRef.get();
    if (!problemDoc.exists) {
        res.status(404).send({
            status: "ERROR",
            message: "Problem not available",
        });
        return;
    }
    const problemData = problemDoc.data();
    let obj;
    if (problemData.solution === undefined) {
        obj = {};
    }
    else {
        obj = problemData.solution;
    }
    obj[userName] = solution;
    await givenProblemRef.update({
        solution: obj
    });
    res.status(200).send({
        status: "SUCESS",
        message: "Solution added sucessfully",
    });
}
exports.getSolutions = async (req, res) => {
    const body = req.body;
    const problemId = body.problemId;
    const userType = body.userType;
    if (!body) {
        res.status(403).send({
            status: "ERROR",
            message: "Invalid parameters",
        });
        return;
    }
    if (problemId == undefined || userType == undefined) {
        res.status(403).send({
            status: "ERROR",
            message: "Empty Data detected",
        });
        return;
    }
    if (userType != "admins") {
        res.status(405).send({
            status: "ERROR",
            message: "Operation not permitted for this user."
        });
        return;
    }
    const givenProblemRef = ProblemsRef.doc(problemId);
    const problemDoc = await givenProblemRef.get();
    if (!problemDoc.exists) {
        res.status(404).send({
            status: "ERROR",
            message: "Problem not available",
        });
        return;
    }
    const problemData = problemDoc.data();
    if (problemData.solution === undefined) {
        res.status(200).send({
            status: "ERROR",
            message: "No solutions available",
        });
        return;
    }
    res.status(200).send({
        status: "SUCESS",
        message: "Solutions available",
        solutions: problemData.solution
    });
}