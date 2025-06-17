import Button from "../button/button.component";
import { useState, FormEvent, ChangeEvent } from "react";
import './sign-in.styles.scss'
import FormInput from "../form-input/form-input.component";
import {ButtonTypeClasses} from "../button/button.component";
import { useDispatch } from "react-redux";
import { emailSignInStart } from "../../store/user/user.action";
import { googleSignInStart } from "../../store/user/user.action";
import { fetchWatchlistStart } from "../../store/watchlist/watchlist.action";
const defaultFormFields = {
    email: '',
    password: ''
}

export const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const dispatch = useDispatch()
    const { email, password} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name , value} = event.target
        
        setFormFields({...formFields, [name]: value})
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
        dispatch(fetchWatchlistStart())
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields();
            dispatch(fetchWatchlistStart())
        }
        catch(error) {
            console.log('user sign in failed', error)
        }
    }

    return (
        <div className="sign-in_container">
            <h2 className="sign-in_title">Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />
                <FormInput
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>   
                    <Button type='button' buttonType={ButtonTypeClasses.GOOGLE} onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}



export default SignIn