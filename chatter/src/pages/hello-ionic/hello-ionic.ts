import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
// declare var google;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  providers: [[Camera]]
})
export class HelloIonicPage {
  public photos: any;
  public base64Image: string;
  isChat: boolean;
  chatsData: any;
  chats = { user: "", msg: "", img: "" };
  // user = { name: "", desc: "" };
  // userDetails: any = { name: '', pos: 'Devs' };
  // infoWindow: any;
  // map: any;
  constructor(private db: AngularFireDatabase, private loadingCtrl: LoadingController, private camera: Camera,
    public toastCtrl: ToastController) {
    // let gm = this;
    // this.takePicture();
    this.isChat = false;
    this.chatsData = db.list('/chatsData/chats');
  }
  ngOnInit() {
    this.photos = [];
    this.chats.img = "assets/angularavatar.png";
  }
  deletePhoto(index) {
    console.log("Delete Photo");
  }
  logout() {
    this.isChat = false;
    this.chats = { user: "", msg: "", img: "" };
  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // this.base64Image = "data:image/jpeg;base64," + imageData;
      // this.photos.push(this.base64Image);
      this.chats.img = "data:image/jpeg;base64," + imageData;
      // this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }
  startChat() {
    this.isChat = true;
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }

  sendMsg() {
    this.chatsData.push(this.chats);
    this.clearMsg();
  }
  clearMsg() {
    this.chats.msg = "";
  }
  // googleMap() {
  //   this.map = new google.maps.Map(document.getElementById('map'), {
  //     center: { lat: 13.0216, lng: 77.5926 },
  //     zoom: 50
  //   });
  //   this.infoWindow = new google.maps.InfoWindow;

  //   // Try HTML5 geolocation.
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       var pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };

  //       this.infoWindow.setPosition(pos);
  //       this.infoWindow.setContent('Location found.');
  //       this.infoWindow.open(this.map);
  //       this.map.setCenter(pos);
  //     }, function () {
  //       this.handleLocationError(true, this.infoWindow, this.map.getCenter());
  //     });
  //   } else {
  //     // Browser doesn't support Geolocation
  //     this.handleLocationError(false, this.infoWindow, this.map.getCenter());
  //   }
  // }

  // handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //   infoWindow.setPosition(pos);
  //   infoWindow.setContent(browserHasGeolocation ?
  //     'Error: The Geolocation service failed.' :
  //     'Error: Your browser doesn\'t support geolocation.');
  //   infoWindow.open(this.map);
  // }

}
