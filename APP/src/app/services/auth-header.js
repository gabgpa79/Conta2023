export default function authHeader() {    
    const token = JSON.parse(localStorage.getItem("@tokenConta23"));
    if(token){
        return { 'x-access-token' : token}
    }else{
        return {};
    }
}