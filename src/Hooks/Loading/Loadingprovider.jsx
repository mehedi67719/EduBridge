import  { useState } from 'react';
import { Loadingcontext } from './LoadingContext';

const Loadingprovider = ({children}) => {
    const [loading,setLoading]=useState(false);
    return (
        <Loadingcontext value={loading,setLoading}>
            {children}
        </Loadingcontext>
    );
};

export default Loadingprovider;