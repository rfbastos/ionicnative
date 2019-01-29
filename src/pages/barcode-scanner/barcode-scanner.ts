import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-barcode-scanner',
  templateUrl: 'barcode-scanner.html',
})
export class BarcodeScannerPage {

barcodeResult: BarcodeScanResult;
codigodebarras: String;
correios: boolean;


  constructor(
    public barcodescanner: BarcodeScanner,
    private clipboard: Clipboard,
    public toastController: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  onGetBarcode():void {
    this.barcodescanner.scan()
    .then((barcodeResult: BarcodeScanResult) => {
      this.barcodeResult = barcodeResult;
      this.codigodebarras = barcodeResult.text;
      this.validaCodigoSro();

      console.log('BarcodeScanner result ',barcodeResult);
    }
  ).catch((error)=> { console.log('BarcodeScanner ERROR ',error);
   });
  }

  copyToClipboard(): void {
    console.log("copy clicado - codigo: ",this.codigodebarras);
    this.validaCodigoSro();
    this.clipboard.copy(this.codigodebarras.toString()).then(()=> {
      this.presentToast('Código copiado com sucesso');
      console.log("copy toast executado");
    }).catch((error)=>{
      this.presentToast('Erro ao copiar');
      console.log('Erro ao copiar: ',error);
      
    });

  }

  validaCodigoSro(){
    let codigo;
    codigo = this.codigodebarras;
    if(codigo.length==13) {
      console.log('Possivel codigo dos correios');
      if(codigo.match(/.{1,2}/g)) {
        if(codigo[0].match(/[a-z]+|\d+/ig)) {
          this.correios = true;
        }
      }
    }
 }

  rastrearCorreios(): void {
    this.presentToast('Abrindo rastreio dos correios...');
    window.open("https://www.linkcorreios.com.br/"+this.codigodebarras);
    console.log("Rastreando codigo.."+this.codigodebarras);
  }

  async presentToast(msg: String) {
    let msgFinal;
    if(msg == null) {
      msgFinal = "Aguarde...";
    } else {
      msgFinal = msg;
    }
    const toast = await this.toastController.create({
      message: msgFinal,
      duration: 2000
    });
    toast.present();
  }

  

}
