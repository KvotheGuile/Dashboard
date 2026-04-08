
import React, { useState } from 'react';
import Popup from "../components/popup";



const LandingPage: React.FC = () => {

    const timeOutTime: number = 30;
    const [popupOn, setPopupOn] = useState<boolean>(true);

    const popupClick = () => {
        setPopupOn(false);

        setTimeout(() => { setPopupOn(true); }, timeOutTime * 1000);
    }

    const popupDisplay = () => {
        if (popupOn) 
            return ( <Popup title='TIME OUT' content='Click here to get access to 30 seconds more' onClose={popupClick} /> )
        else 
            return ( <></>)
    }
    
    return (
        <div className="p-6">
        <nav className="bg-white shadow rounded-lg">
            {/* Header */}
            <div className="border-b p-4">
            <p className="text-lg font-semibold">Welcome</p>
            </div>

            <div className="border-b p-4">
                <p>Nothing here</p>
            </div>

            {popupDisplay()}

        </nav>
        </div>
    );
};

export default LandingPage;