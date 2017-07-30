export class SignUpModelValidator {
  public validate(model: Object){
    let errors = [];

    if(model['password'] != model['confirmPassword'])
      errors.push("Passwords do not match!")

    if(!model['location'])
      errors.push("Please select the garage's location")

    //Check existing etc..
    return {
      result: errors.length == 0? true : false,
      errors: errors
    }
  }

}
