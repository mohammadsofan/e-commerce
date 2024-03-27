export const  orderValidation=(orderInfo)=>{
    const {phone,address} = orderInfo;
    if(phone.length == 0){
        return {name:'phone',message:'Reqiured field'}
    }
    else if(phone.length !=10){
        return {name:'phone',message:'Phone number must equal 10 digits'}
    }
    else if(address.length ==0){
        return {name:'address',message:'Reqiured field'}

    }
    return {name:'ok',message:'ok'}

}