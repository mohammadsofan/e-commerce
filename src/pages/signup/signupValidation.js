export const validateForm=(user)=>{
    if(user.userName.length==0){
        return {name:'userName',message:'required field'};
    }
    if(user.userName.length < 3 || user.userName.length >20){
        return {name:'userName',message:'User name must be between 3 and 20 letters'};
    }
     
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
    if(!user.image){
        return {name:'image',message:'required field'};

    }
    const imageExtention=user.image.name.slice(-4);
     if(imageExtention !='.jpg' && imageExtention != '.png' && imageExtention != 'jpeg' && imageExtention !='.svg'){
        return {name:'image',message:'invalid image'};
     }

    return {name:'ok',message:'ok'};
}