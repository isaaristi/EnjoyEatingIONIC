import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { PrincipalPage } from '../principal/principal';
import { TabsPage } from '../../../menu/src/pages/tabs/tabs';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {

  users: string;
  pass: string;

  constructor(public navCtrl: NavController,
    public service: LoginService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: Storage) {

  }

  login() {
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loading.present();
    this.service.login(this.users, this.pass).subscribe(res => {
      loading.dismiss();
      let data = {user:this.users, password:this.pass};
    this.storage.set("logged",true);
    this.storage.set("user", data);
      if (res.success) {
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.toastCtrl.create({ message: "Usuario o contraseña incorrecta", duration: 3000 }).present();
      }
    });
  }


}
