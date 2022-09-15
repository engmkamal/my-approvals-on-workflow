import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ICustomer {
  CustId: any;
  CustPassword: any;
  CustName: any;
  CustCompanyName: any;
  CustCompanyAddress?: any;
  CustEmail: any;
  CustContact?: any;
  CustDesignation?: any;  
}


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private isUserLoggedIn = new BehaviorSubject(false);
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();
  loggedUserInfo$!: Observable<ICustomer>;

  loogedCustomer!: ICustomer;

  private _userName = '';
  private _customerId = '';

  customerInfo = {};

  customersList:ICustomer[] = [
    {
      CustId: "1000",
      CustPassword: "demo",
      CustName: "Mostafa Kamal",
      CustCompanyName: "Berger Paints Bangladesh Limited",
      CustCompanyAddress: "Uttara, Dhaka, Bangladesh",
      CustEmail: "kamal@bergerbd.com",
      CustContact: "0191324255310",
      CustDesignation: "Software Engineer",
    },
    {
      CustId: "2000",
      CustPassword: "demo",
      CustName: "Mostafa Kamal",
      CustCompanyName: "Berger Paints Bangladesh Limited",
      CustCompanyAddress: "Uttara, Dhaka, Bangladesh",
      CustEmail: "kamal@bergertech.com",
      CustContact: "0191324255310",
      CustDesignation: "Software Engineer",
    },
    {
      CustId: "3000",
      CustPassword: "demo",
      CustName: "Mostafa Kamal",
      CustCompanyName: "Berger Paints Bangladesh Limited",
      CustCompanyAddress: "Uttara, Dhaka, Bangladesh",
      CustEmail: "kamal@jnbl.com",
      CustContact: "0191324255310",
      CustDesignation: "Software Engineer",
    }

  ] 

  checkCredentials(username: string, customerId:string, password: string) {
    this.customersList.forEach(c => {
      if (c.CustId === customerId && c.CustPassword === password) {
        this.isUserLoggedIn.next(true);        

        let lUserInfo = {
          CustId: c.CustId,
          CustPassword: c.CustPassword,
          CustName: c.CustName,
          CustCompanyName: c.CustCompanyName,
          CustCompanyAddress: c.CustCompanyAddress,
          CustEmail: c.CustEmail,
          CustContact: c.CustContact,
          CustDesignation: c.CustDesignation,
        }

        this.loogedCustomer = lUserInfo;
        this.customerInfo = lUserInfo;

        this.loggedUserInfo$ = new Observable((observer)=>{
          observer.next(lUserInfo);
        })

        this.customerInfo = c;
        this._userName = c.CustName;
      }
    });
    
  }

  logout() {
    this.isUserLoggedIn.next(false);

    let lUserInfo = {
      CustId: "",
      CustPassword: "",
      CustName: "",
      CustCompanyName: "",
      CustCompanyAddress: "",
      CustEmail: "",
      CustContact: "",
      CustDesignation: "",
    }

    this.loggedUserInfo$ = new Observable((observer)=>{
      observer.next(lUserInfo);
    })
    this._userName = '';
  }

  public get userName(): string {
    return this._userName;
  }

  login(userName: string, customerId:string, password: string): void {
    
    this.customersList.forEach(c => {
      if (c.CustId === customerId && c.CustPassword === password) {
        this.isUserLoggedIn.next(true);        

        let lUserInfo = {
          CustId: c.CustId,
          CustPassword: c.CustPassword,
          CustName: c.CustName,
          CustCompanyName: c.CustCompanyName,
          CustCompanyAddress: c.CustCompanyAddress,
          CustEmail: c.CustEmail,
          CustContact: c.CustContact,
          CustDesignation: c.CustDesignation,
        }

        this.customerInfo = lUserInfo;

        this.loogedCustomer = lUserInfo;

        this.loggedUserInfo$ = new Observable((observer)=>{
          observer.next(lUserInfo);
        })

        this.customerInfo = c;
        this._userName = c.CustName;
      }
    });

    this._userName = userName;
    this._customerId = customerId;
  }

}
