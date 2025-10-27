import { db } from "@/config/firebase"; 
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

interface User {
  id: string,
  displayName: string,
  role: string //remove to use custom claims
};

export async function getAllUsers() {
  const userCollectionRef = collection(db, 'users');

  const snapshot = await getDocs(userCollectionRef);
  const usersArr : User[] = snapshot.docs.map(doc => {
    return {
      id: doc.id, 
      ...doc.data()
    } as User;
  });

  const usersObj = usersArr.reduce<Record<string, User>>((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  return usersObj;
}

export async function getUser(userId : string) : Promise<User | null> {
  const userDocRef = doc(db, 'users', userId);

  const docSnapshot = await getDoc(userDocRef)

  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    
    return {
        id: docSnapshot.id,
        ...data
    } as User;
  } else {
    return null;
  }
}