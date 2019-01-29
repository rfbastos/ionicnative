import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  photoUri: string;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public camera:Camera,
    public file: File,
    public filePath: FilePath,
    public navCtrl: NavController, 
    public platform: Platform,
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

          this.correctPathAndGetFileName(fileUri,sourceType)
            .then(data => {
              console.log('Corrigido: ', data)
            })
        }).catch((error: Error)=> {
          console.log('Error: ', error);
        });
  }

  correctPathAndGetFileName(fileUri: string,sourceType:number): Promise<{oldFilePath:string, oldFileName:string}> {
     if(this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {

        return this.filePath.resolveNativePath(fileUri)
          .then((correctFileUri: string) => {
              return  {
                oldFilePath: correctFileUri.substr(0, (correctFileUri.lastIndexOf('/')+1)),
                oldFileName: fileUri.substring((fileUri.lastIndexOf('/')+1), fileUri.lastIndexOf('?'))
              }
          }).catch((err=> {
            console.log('Erro ao corrigir Path ', err);
            let errorMsg: string = 'Erro ao corrigir o caminho da imagem';
            console.log(errorMsg);
            return Promise.reject(errorMsg);
          }));

     }

     return Promise.resolve({
      oldFilePath: fileUri.substr(0, (fileUri.lastIndexOf('/')+1)),
      oldFileName: fileUri.substr(fileUri.lastIndexOf('/')+1)
     });
  }

}
