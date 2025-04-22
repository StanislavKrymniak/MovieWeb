import React from 'react';
import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles';

export enum ButtonTypeClasses {
    BASE = 'base',
    GOOGLE = 'google-sign-in',
    INVERTED = 'inverted'
}

type ButtonProps = {
    buttonType?: ButtonTypeClasses;
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const getButton = (buttonType: ButtonTypeClasses = ButtonTypeClasses.BASE) => {
    const buttonMap = {
        [ButtonTypeClasses.BASE]: BaseButton,
        [ButtonTypeClasses.GOOGLE]: GoogleSignInButton,
        [ButtonTypeClasses.INVERTED]: InvertedButton,
    };
    return buttonMap[buttonType] || BaseButton; 
}

const Button: React.FC<ButtonProps> = ({ children, buttonType = ButtonTypeClasses.BASE, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    );
};

export default Button;