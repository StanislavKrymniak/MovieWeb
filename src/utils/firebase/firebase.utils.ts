import {initializeApp} from 'firebase/app';
import { getAuth,signInWithRedirect,signInWithPopup, GoogleAuthProvider, User,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, NextOrObserver, onAuthStateChanged } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, QueryDocumentSnapshot} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC4nqX1Gg7KxFmVn7mlz2hyMlRdOjspvwU",
    authDomain: "movie-web-322f8.firebaseapp.com",
    projectId: "movie-web-322f8",
    storageBucket: "movie-web-322f8.firebasestorage.app",
    messagingSenderId: "491091288638",
    appId: "1:491091288638:web:d84c6bbb1590d9b2b2276f",
    measurementId: "G-CZQKNRD779"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const GoogleProvider = new GoogleAuthProvider();   
GoogleProvider.setCustomParameters({
        prompt: 'select_account'
    });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, GoogleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, GoogleProvider);

const db = getFirestore();




export type additionalInformation = {
    displayName?: string
}

export type UserData = {
    createdAt: Date
    displayName: string
    email: string 
}

export const createUserDocumentFromAuth = async (
    userAuth: User,additionalInformation = {} as additionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userDocRef)
    console.log('does user already exists? :',userSnapshot.exists())

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        console.log('creating user for the first time')

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log('error creating the user', error);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const createAuthUserWithEmailAndPassword = async (email:string, password:string) => {
    if (!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email:string, password: string) => {
    if (!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback)

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve,reject) => {
        const unsubscribe = onAuthStateChanged(
            auth, 
            (userAuth) => {
                unsubscribe()
                resolve(userAuth)
            },
            reject
        )
    })
}