import React from 'react';
import {useTheme} from "payload/dist/admin/components/utilities/Theme";
import './icon.scss';

export const Icon = () => {
    const { theme } = useTheme()
    return (
        <div className="logo-icon">
            <img
                src={theme === "dark" ? "/assets/4rent-light.png" : "/assets/4rent-dark.png"}
                alt="4RENT BLACK HILLS"
            />
        </div>
    );
}
