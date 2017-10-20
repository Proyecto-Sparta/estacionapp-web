import {LoginPage} from './login.po';
import {browser, by, element, protractor} from "protractor";
import {ChangeDetectorRef} from "@angular/core";

describe('Login page', () => {
  let page: LoginPage;
  let username;
  let password;
  let submit;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
    username = page.getModelElement('username');
    password = page.getModelElement('password');

  });

  it('should show form containing username', () => {
    expect(page.getLoginForm()).toContain('Username');
  });

  it('should disable button if username or password are empty', () => {
    username.clear().sendKeys(protractor.Key.BACK_SPACE);
    expect(username.getText()).toEqual('');
  });
});
