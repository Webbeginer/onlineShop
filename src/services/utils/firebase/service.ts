import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import  app  from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retriveData( collectionName: string ) {
    const snapshot= await getDocs(collection(firestore, collectionName));
    const data= snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data
};

export async function retriveDataByID(collectionName: string, id: string) {
    const snapshot= await getDoc(doc(firestore, collectionName, id));
    const data= snapshot.data();
    return data
};

export async function register(data:{email: string, password: string, name: string, role?: string}) {
    const q= await query(collection(firestore, "users"), where("email", "==", data.email));
    const snapshot= await getDocs(q);
    const user= snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (user.length > 0) {
        return {status: false, statusCode: 400, message: "user already exist"};
    }
    try{
        const role= "member";
        const password= await bcrypt.hash(data.password, 10);
        await addDoc(collection(firestore, "users"), {email: data.email, password: password, name: data.name, role: role});
        return {status: true, statusCode: 200, message: "user created"};
    }catch(error){
        return {status: false, statusCode: 400, message: "error"}
    }
    
};

export async function login(data: {email: string}) {
    const q = await query(collection(firestore, "users"), where("email", "==", data.email));
    const snapshot = await getDocs(q);
    const user= snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if(user.length > 0) {
        return user[0]
    }else{
        return null
    }
};

export async function loginWithGoogle(data: any) {
    console.log("Data received for Google login:", data);

    const q = query(collection(firestore, "users"), where("email", "==", data.email));
    const snapshot = await getDocs(q);
    const user: any = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("User from Firebase query:", user);

    if (user.length > 0) {
        data.role = user[0].role;
        await updateDoc(doc(firestore, "users", user[0].id), data);
        console.log("Existing user updated:", data);
        return { status: true, data: data };
    } else {
        data.role = "member";
        await addDoc(collection(firestore, "users"), data);
        console.log("New user added:", data);
        return { status: true, data: data };
    }
}

