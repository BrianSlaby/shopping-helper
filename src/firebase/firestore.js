import { app } from "./config"

import { 
    getFirestore,
    doc,
    addDoc,
    updateDoc,
    collection, 
    query, 
    where, 
    getDocs,
    arrayUnion
 } from "firebase/firestore";

const db = getFirestore(app);

async function addNewListToDB(newListName, user) {
    const docRef = await addDoc(collection(db, "lists"), {
        name: newListName,
        uid: user.uid,
        items: []
      });
}

async function addNewListItemToDB(item, listID) {
    const itemRef = doc(db, "lists", listID);
    await updateDoc(itemRef, {
        items: arrayUnion(item)
    });
}

async function deleteListItemFromDB(item, listID) {
    const itemRef = doc(db, "lists", listID);
    await updateDoc(itemRef, {
        items: arrayRemove(item)
    });
}

async function fetchLists(user) {
    const q = query(collection(db, "lists"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const lists = []
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        const id = doc.id
        lists.push({ ...data, id })
    });
    return lists
}


export { 
    db,
    addNewListToDB,
    fetchLists,
    addNewListItemToDB,
    deleteListItemFromDB
 }
