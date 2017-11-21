import {Component} from "@angular/core";

@Component({
  selector: 'alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  private showAlert = false;
  private alertModeSuccess = true;
  private alert: String;

  public newAlert(alert) {
    this.alertModeSuccess = true;
    this.alert = alert;
    this.showAlert = true;
  }

  public newError(alert) {
    this.alertModeSuccess = false;
    this.alert = alert;
    this.showAlert = true;
  }

  private closeAlert() {
    this.showAlert = false;
  }
}
