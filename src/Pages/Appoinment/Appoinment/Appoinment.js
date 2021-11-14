import React, { useState } from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import AppoinmentHeader from '../AppoinmentHeader/AppoinmentHeader';
import AvailableAppoinments from '../AvailableAppoinments/AvailableAppoinments';

const Appoinment = () => {
    const [date, setDate] = useState(new Date());
    return (
        <>
            <Navigation></Navigation>
            <AppoinmentHeader date={date} setDate={setDate}></AppoinmentHeader>
            <AvailableAppoinments date={date}></AvailableAppoinments>
        </>
    );
};

export default Appoinment;