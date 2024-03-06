export const validateForm=(user)=>{
   
    if(user.email.length==0){
        return {name:'email',message:'required field'};

    }
    if(!user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        return {name:'email',message:'Invalid email'};
    }

    if(user.password.length==0){
        return {name:'password',message:'required field'};
    }
    if(user.password.length < 8){
        return {name:'password',message:'please enter at least 8 characters'};
    }
   
    return {name:'ok',message:'ok'};
}