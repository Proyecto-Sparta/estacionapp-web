export class SignUpModelValidator {
  public validate(model: Object){
    let errors = [];

    if(model['password'] != model['confirmPassword'])
      errors.push("Passwords do not match!")

    //Check existing etc..
    return {
      result: errors.length == 0? true : false,
      errors: errors
    }
  }

}
