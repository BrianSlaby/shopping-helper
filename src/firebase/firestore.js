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
    arrayUnion,
    deleteDoc
 } from "firebase/firestore";

const db = getFirestore(app);

async function addNewListToDB(newListName, user) {
    const docRef = await addDoc(collection(db, "lists"), {
        name: newListName,
        uid: user.uid,
        items: {}
      });
}

async function addNewListItemToDB(newItemObj, newItemName, listID) {
    const itemRef = doc(db, "lists", listID);
    await updateDoc(itemRef, {
        [`items.${newItemName}`]: newItemObj
    });
}
// needs refactoring
async function deleteListItemFromDB(itemName, listID) {
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

async function deleteListFromDB(listID) {
    await deleteDoc(doc(db, "lists", listID));
}

export { 
    db,
    addNewListToDB,
    fetchLists,
    addNewListItemToDB,
    deleteListItemFromDB,
    deleteListFromDB
 }
