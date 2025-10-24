export interface Validation {
    email?: string,
    username?: string,
    code?: string,
}

export const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("email")){
        if(!values.email) {
            errors.email = "required";
        }
        else if(!/\S+@\S+\.\S+/.test(values.email)){
            errors.email = "Invalid email address"
        }
    } 

    if(check("username")){
        if(!values.username) {
            errors.username = "required";
        }
        else if(values.username.length <= 3){
            errors.username = "Invalid"
        }
    } 

    return errors
}

export default validation