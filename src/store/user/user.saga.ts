import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import { USER_ACTION_TYPES } from "./user.types";
import { signInSucces, signInFailed, signUpSucces,signUpFailed, signOutSucces, signOutFailed, EmailSignInStart, SignUpStart, SignUpSucces } from "./user.action";
import { 
    getCurrentUser, 
    createUserDocumentFromAuth,
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    additionalInformation
} from '../../utils/firebase/firebase.utils'
import { User } from "firebase/auth";


export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: additionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails)
        if (userSnapshot) {
            yield* put(signInSucces({id: userSnapshot.id, ...userSnapshot.data() }))
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}


export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser)
        if (!userAuth) {
            return console.log('user is not authenticated')
        }
        if (userAuth) {
            yield* call(getSnapshotFromUserAuth, userAuth)
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield* call(signInWithGooglePopup)
        const userSnapshot = yield* call(getSnapshotFromUserAuth, user)

    } catch (error) {
        yield* put(signInFailed(error as Error))
    }

}

export function* signInWithEmail({payload:{email,password}}: EmailSignInStart) {
    try {
        const UserCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password)
        if(UserCredential) {
            const {user} = UserCredential
            yield* call(getSnapshotFromUserAuth,user)
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signUp ({payload:{email, password, displayName,}}:SignUpStart) {
    try {
        const UserCredential = yield* call(createAuthUserWithEmailAndPassword,email, password)
        if (UserCredential) {
            const {user} = UserCredential
            yield* put(signUpSucces(user, {displayName}))

        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }

}

export function* signInAfterSignUp({payload:{user, additionalDetails}}:SignUpSucces) {
    yield* call(getSnapshotFromUserAuth,user, additionalDetails)
}

export function* signOut () {
    try {
        yield* call(signOutUser)
        yield* put(signOutSucces())
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}
export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}
export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}
export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}
export function* onSignUpSucces() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCES, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}
export function* userSagas() {
    yield* all ([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSucces),
        call(onSignOutStart)
    ])
}



/*
export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: additionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails)
        if (userSnapshot) {
            yield* put(signInSucces({id: userSnapshot.id, ...userSnapshot.data() }))
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser)
        if(!userAuth) {
            return console.log('user is not authenticated')
        }
        if(userAuth) {
            yield* call(getSnapshotFromUserAuth, userAuth)
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield* call(signInWithGooglePopup)
        yield* call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithEmail({payload:{email,password}}: EmailSignInStart) {
    try {
        const UserCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password)
        if(UserCredential) {
            const {user} = UserCredential
            yield* call(getSnapshotFromUserAuth,user)
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
} 

export function* signUp({payload:{email, password, displayName,}}:SignUpStart) {
    try {
        const UserCredential = yield* call(createAuthUserWithEmailAndPassword,email, password)
        if (UserCredential) {
            const {user} = UserCredential
            yield* put(signUpSucces(user, {displayName}))

        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }
}

export function* signInAfterSignUp({payload:{user, additionalDetails}}:SignUpSucces) {
    yield* call(getSnapshotFromUserAuth,user, additionalDetails)
}

export function* signOut () {
    try {
        yield* call(signOutUser)
        yield* put(signOutSucces())
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
} 

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}
export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}
export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSucces() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCES, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}*/