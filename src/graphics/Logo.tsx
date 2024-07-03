import React from 'react';
import {useTheme} from "payload/dist/admin/components/utilities/Theme";
import './logo.scss';

export const Logo = () => {
    const { theme } = useTheme()
    return (
        <div className="logo">
            <img
                src={theme === "dark" ? "/assets/4rent-light.png" : "/assets/4rent-dark.png"}
                alt="4RENT BLACK HILLS"
            />
        </div>
    );
}
