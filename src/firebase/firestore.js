import { app } from "./config"

import { 
    getFirestore,
    doc,
    addDoc,
    updateDoc,
    collection, 
    query, 
    where,
    getDoc, 
    getDocs,
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

async function deleteListItemFromDB(itemName, listID) {
    try {
        const listRef = doc(db, "lists", listID);
        const docSnap = await getDoc( listRef );
        const docData = docSnap.data()
        const itemsData = { ...docData.items }
        delete itemsData[itemName]

        await updateDoc(listRef, {
            "items": itemsData
        });

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
    }
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
