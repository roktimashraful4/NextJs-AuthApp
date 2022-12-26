export default function login_validations(values){ 
    const errors = {}; 
    if (!values.email) {
        errors.email = 'Required the Email.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

    // validation for password 
    if(!values.password) { 
        errors.password = "Required the password"; 
    } else if(values.password.length <8 || values.password.length >20) { 
        errors.password = "Must be Greter then 8  and less then 20 character." 
    } else if (values.password.includes(' ')) { 
        errors.password = "Invalid Password"
    }
    return errors
}