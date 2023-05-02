export interface VivaOptions {
  callback: string;
  merchantKey: string;
  appId: string;
}

export interface VivaRequestTransaction {
  amount: number;
  tipAmount: number;
  action: "sale" | "transactionDetails" | "abort" | "cancel" | "foreground";
  paymentMethod: "CardPresent" | "MOTO" | "QrDefault" | "QrPayconic" | "AliPay" | "Klarna";
  receipt: boolean;
  rating: boolean;
  result: boolean;
  installments: boolean;
  prefInstallments: string;
}

export interface VivaResponseTransaction {
  status?: string;
  message?: string;
  action?: string;
  clientTransactionId?: string;
  amount?: number;
  tipAmount?: number;
  verificationMethod?: string;
  rrn?: string;
  cardType?: string;
  referenceNumber?: number;
  accountNumber?: string;
  authorisationCode?: string;
  tid?: number;
  orderCode?: string;
  shortOrderCode?: string;
  transactionDate?: Date;
  transactionId?: string;
}
