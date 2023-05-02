import { Injectable } from '@angular/core';
import {VivaOptions, VivaRequestTransaction, VivaResponseTransaction} from "./viva.interface";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";

@Injectable({
  providedIn: 'root'
})
export class VivaLibService {
  private _onResponseProceed!: (data: VivaResponseTransaction) => void;
  private _initOptions: VivaOptions | undefined = undefined
  constructor(
    private iab: InAppBrowser,
  ) {

  }

  set initOptions(opts: VivaOptions) {
    this._initOptions = opts;
  }
  startTransaction(vivaOptions: VivaRequestTransaction, onResponProc: (data: VivaResponseTransaction) => void) {
    this._onResponseProceed = onResponProc;
    if (this._initOptions === undefined) {
      console.error("Initialization Viva options are not set!");
      throw {error: "Initialization Viva options are not set!"};
      return;
    }
    Object.keys(this._initOptions).forEach((key) => {
      if (!key || key !== "") {
        throw {error: `The parameter ${key} is not set!`}
      }
    });

    // const callback = `gr.oss.open.retail://result`;
    // const appId = "gr.oss.open.retail";
    const receipt = vivaOptions.receipt ? vivaOptions.receipt : false;
    const rating = vivaOptions.rating ? vivaOptions.rating : false;
    const result = vivaOptions.result ? vivaOptions.result : false;
    const installments = vivaOptions.installments ? vivaOptions.installments : false;
    const prefInstallments = vivaOptions.installments ?
      (vivaOptions.prefInstallments ? vivaOptions.prefInstallments : "") : "";

    const deeplinkPath = "vivapayclient://pay/v1"
      + "?merchantKey=" + this._initOptions.merchantKey
      + "&appId=" + this._initOptions.appId
      + "&action=" + vivaOptions.action
      + "&amount=" + this.ConvertToVivaAmount(vivaOptions.amount)
      + "&tipAmount=" + this.ConvertToVivaAmount(vivaOptions.tipAmount)
      + "&show_receipt=" + receipt
      + "&show_rating=" + rating
      + "&show_transaction_result=" + result
      + "&withInstallments=" + installments
      + "&preferredInstallments=" + prefInstallments
      + "&paymentMethod=" + vivaOptions.paymentMethod
      + "&callback=" + this._initOptions.callback;

    this.iab.create(deeplinkPath, "_system");
  }

  endTransaction(callBackUrl: string) {
    const vivaPostTrans = this.analyzeUrl(callBackUrl);
    if (this._onResponseProceed) {
      this._onResponseProceed(vivaPostTrans);
      // this.router.navigate([vivaPostTrans.path], {
      //     state: {
      //         inputData: vivaPostTrans.qParameters
      //     }
      // });
    }
  }

  private ConvertToVivaAmount(valNum: number) {
    return Math.trunc(valNum * 100);
  }

  private analyzeUrl(callBack: string): VivaResponseTransaction {
    let qParameters : any = {};
    if (callBack) {
      const analyzStep2 = callBack.split("?");
      const queryParameters = analyzStep2[1].split("&");
      if (queryParameters) {
        queryParameters.forEach((param) => {
          const paramKeyValue = param.split("=");
          if (paramKeyValue) {
            qParameters[paramKeyValue[0]] = paramKeyValue[1];
          }
        });
      }
    }
    return qParameters;
  }
}
