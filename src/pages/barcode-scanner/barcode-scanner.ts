import {BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanResult} from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-barcode-scanner',
  templateUrl: 'barcode-scanner.html',
})
export class BarcodeScannerPage {

barcodeResult: BarcodeScanResult;

  constructor(
    public barcodescanner: BarcodeScanner,
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  onGetBarcode():void {
    this.barcodescanner.scan()
    .then((barcodeResult: BarcodeScanResult) => {
      this.barcodeResult = barcodeResult;
      console.log('BarcodeScanner result ',barcodeResult);
    }
  ).catch((error)=> { console.log('BarcodeScanner ERROR ',error);
   });
  }

}
