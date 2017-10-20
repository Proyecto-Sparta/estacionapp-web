import {browser, by, element} from 'protractor';

export class LoginPage {

  navigateTo() {
    return browser.get('/login');
  }

  getLoginForm() {
    return element(by.tagName('form')).getText();
  }

  getLoginButton(){
    return element(by.buttonText('Log in'));
  }

  getModelElement(name){
    return element(by.id(name));
  }

}
