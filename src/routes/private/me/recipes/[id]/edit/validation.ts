export interface Validation {
    name?: string,
    category?: string,
    duration?: number
}

export const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("name")){
        if(!values.name) {
            errors.name = "required";
        }
    };
    if(check("category")){
        if(!values.category) {
            errors.category = "required";
        }
    };
    if(check("duration")){
        if(!values.duration) {
            errors.duration = -1;
        }
    };

    return errors;
}

export default validation;