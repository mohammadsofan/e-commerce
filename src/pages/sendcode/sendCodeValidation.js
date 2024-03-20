export const validateForm=(email)=>{
   
    if(email.length==0){
        return {name:'email',message:'required field'};
    }
    if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        return {name:'email',message:'Invalid email'};
    }

   
    return {name:'ok',message:'ok'};
}