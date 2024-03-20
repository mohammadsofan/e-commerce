export const validateForm=(user)=>{
 
    if(user.password.length==0){
        return {name:'password',message:'required field'};
    }
    if(user.password.length < 8){
        return {name:'password',message:'please enter at least 8 characters'};
    }
    if(user.code.length==0){
        return {name:'code',message:'required field'};

    }
    return {name:'ok',message:'ok'};
}