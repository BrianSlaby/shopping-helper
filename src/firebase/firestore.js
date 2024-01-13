import { app } from "./config"

import { 
    getFirestore,
    doc,
    addDoc,
    updateDoc,
    collection, 
    query, 
    where, 
    getDocs
 } from "firebase/firestore";

const db = getFirestore(app);

async function addNewListToDB(newListName, user) {
    const docRef = await addDoc(collection(db, "lists"), {
        name: newListName,
        uid: user.uid,
        items: []
      });
}

// const washingtonRef = doc(db, "cities", "DC");

// // Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//   capital: true
// });

async function fetchLists(user) {
    const q = query(collection(db, "lists"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);

    // console.log("querySnapshot")
    // console.log(querySnapshot)

    // querySnapshot.forEach((doc) => {
    // // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    // });
}


export { 
    addNewListToDB,
    fetchLists
 }
