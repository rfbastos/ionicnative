import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ToastController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Clipboard } from '@ionic-native/clipboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { BarcodeScannerPage } from './../pages/barcode-scanner/barcode-scanner';
import { CameraPage } from './../pages/camera/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    BarcodeScannerPage,
    CameraPage,
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BarcodeScannerPage,
    CameraPage, 
    MyApp,
    HomePage
  ],
  providers: [
    BarcodeScanner,
    Camera,
    Clipboard,
    File,
    FilePath,
    StatusBar,
    SplashScreen,
    ToastController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
