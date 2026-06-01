import React, { useContext } from 'react';
import { Loadingcontext } from './Loading/LoadingContext';

const Useloading = () => {
    return (
       useContext(Loadingcontext)
    );
};

export default Useloading;