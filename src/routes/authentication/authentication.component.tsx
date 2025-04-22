import './authentication.styles.scss';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';



export const AuthComponent = () => {
    return (
        <div className="auth_container">
            <SignIn />
            <SignUp />
        </div>
    )
}