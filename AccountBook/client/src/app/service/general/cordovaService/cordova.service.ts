import { Injectable } from '@angular/core';
declare var NativeStorage: any;
declare var navigator: any;
declare var cordova: any;

@Injectable()
export class CordovaService {
  onDeviceReady: Promise<any>;
  NativeStorage: any;
  camera: any;
  scanCode: any;

  constructor() {
    this.onDeviceReady = new Promise<any>((resolve, reject) => {
      document.addEventListener('deviceready', () => {
        resolve();
      }, false);
    });

    this.scanCode = {
      scanBarOrQRCode: () => this.onDeviceReady
        .then(() => new Promise((resolve, reject) => cordova.plugins.barcodeScanner.scan(resolve, reject,
          {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt: 'Place a barcode inside the scan area', // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            //   formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
            // orientation: 'landscape', // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: false // iOS and Android
          })
        ))
    };
    this.NativeStorage = {
      setItem: (key, value) => this.onDeviceReady
        .then(() => new Promise((resolve, reject) => NativeStorage.setItem(key, value, resolve, reject))),
      getItem: (key) => this.onDeviceReady
        .then(() => new Promise((resolve, reject) => NativeStorage.getItem(key, resolve, reject))),
      removeItem: (key) => this.onDeviceReady
        .then(() => new Promise((resolve, reject) => NativeStorage.remove(key, resolve, reject)))
    };
    this.camera = {
      getPicture: () => this.onDeviceReady
        .then(() => new Promise((resolve, reject) => navigator.camera.getPicture(resolve, reject, {
          quality: 100,
          // destinationType: 1, // FILE_URI
          destinationType: 0,
          cameraDirection: 1, // front camera
        })))
    };
  }

}
