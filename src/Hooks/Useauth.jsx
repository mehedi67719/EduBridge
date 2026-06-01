import  { useContext } from 'react';
import { Authcontext } from '../Authentaction/Authcontext';


const Useauth = () => {
    return (
    useContext(Authcontext)
    );
};

export default Useauth;