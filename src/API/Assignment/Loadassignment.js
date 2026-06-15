import { axiosSecure } from "../../Hooks/Axiosinstance"

export const loadassignment=async()=>{
    try{
        const res=await axiosSecure.get("/assignment")
        return res.data;
    }
    catch(err){
        console.log(err)
    }
}