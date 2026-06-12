import { axiosSecure } from "../../Hooks/Axiosinstance"

export const upoladroutine=async(formdata)=>{
    try{
        const res=await axiosSecure.post("/upload-routine",formdata)
        return res.data;
    }
    catch(err){
        console.log(err)
    }
}