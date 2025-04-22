import './sign-up.styles.scss'
import { useState, FormEvent, ChangeEvent } from "react";
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { useDispatch } from 'react-redux'
import { signUpStart } from '../../store/user/user.action'
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { selectUserError } from '../../store/user/user.selector';
export const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export const SignUp = () => {    
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password , confirmPassword} = formFields
    const userError = useSelector(selectUserError)
    const dispatch = useDispatch()
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert('passwords do not match')
            return;
        };
        try {
            dispatch(signUpStart(email,password,displayName))
            resetFormFields()
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
            } else {
                console.log(error)
                alert('Email already exists')
            }
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name , value} = event.target
        setFormFields({...formFields, [name]: value})
    }
    return (
        <div className="sign-up_container">
            <h2 className="sign-up_title">Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} className="sign-up_form">
                <FormInput
                    label="DisplayName" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName}
                />
                <FormInput 
                    label='Email'
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />
                <FormInput
                    label='Password'
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />
                <FormInput 
                    label='Confirm Password'
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='confirmPassword'
                    value={confirmPassword}
                />
                <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp