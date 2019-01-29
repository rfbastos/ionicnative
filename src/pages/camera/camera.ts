import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  photoUri: string;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public camera:Camera,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  onActionSheet():void {
    this.actionSheetCtrl.create({
      title: 'Selecione a imagem',
      buttons: [{
        text: 'Carregar do dispositivo',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Tirar uma foto',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancelar'
      }
    
    ]
    }).present();
  }

  takePicture(sourceType: number): void {

      let cameraOptions: CameraOptions = {
        correctOrientation: true,
        quality: 100,
        saveToPhotoAlbum: false,
        sourceType: sourceType
      }

      this.camera.getPicture(cameraOptions)
        .then((fileUri: string) => {
          console.log('Photo: ', fileUri);
          this.photoUri = normalizeURL(fileUri);
          alert(this.photoUri);
        }).catch((error: Error)=> {
          console.log('Error: ', error);
        })
  }

}
