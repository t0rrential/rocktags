import { db } from "@/config/firebase"; 
import { GeoPoint } from "firebase/firestore";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

interface Cat {
  id: string,
  coordinates: GeoPoint,
  dietary_restrictions: string[],
  fav_spot: string,
  feeding_time: string[],
  image_url: string,
  where_not_to_rub: string[],
  where_to_rub: string[]
};

export async function getAllCats() {
  const catsCollectionRef = collection(db, 'cats');

  const snapshot = await getDocs(catsCollectionRef);
  const catsArr : Cat[] = snapshot.docs.map(doc => {
    return {
      id: doc.id, 
      ...doc.data()
    } as Cat;
  });

  const usersObj = catsArr.reduce<Record<string, Cat>>((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});

  return usersObj;
}

export async function getCat(catId : string) : Promise<Cat | null> {
  const catDocRef = doc(db, 'cats', catId);

  const docSnapshot = await getDoc(catDocRef)

  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    
    return {
        id: docSnapshot.id,
        ...data
    } as Cat;
  } else {
    return null;
  }
}