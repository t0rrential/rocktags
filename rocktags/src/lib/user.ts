import { admin_db } from "@/config/firebase-admin";

interface User {
  id: string,
  displayName: string,
  role: string
};

export async function getAllUsers() {

  const userCollectionRef = admin_db.collection('users');

  const snapshot = await userCollectionRef.get();
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
  const userCollectionRef = admin_db.collection('users').doc(`${userId}`);

  const docSnapshot = await userCollectionRef.get();

  if (docSnapshot.exists) {
    const data = docSnapshot.data();
    
    return {
        id: docSnapshot.id,
        ...data
    } as User;
  } else {
    return null;
  }
}