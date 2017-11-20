export class SettingsValidator {
  public validate(model: Object) {
    const errors = [];

    if (model['newPassword'] !== model['confirmNewPassword']) {
      errors.push('Passwords do not match!');
    }

    return {
      result: errors.length === 0,
      errors: errors
    };
  }
}
