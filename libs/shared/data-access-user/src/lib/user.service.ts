import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import {map } from 'rxjs/add/operator/map';

export interface ICustomer {
  CustId: any;
  CustPassword: any;
  CustName: any;
  CustCompanyName: any;
  CustCompany1stAddress?: any;
  CustCompany2ndAddress?: any;
  CustCompany3rdAddress?: any;
  Cust1stEmail: any;
  Cust2ndEmail: any;
  Cust3rdEmail: any;
  Cust1stPhone?: any;
  Cust2ndPhone?: any;
  Cust3rdPhone?: any;
  Cust1stMobile?: any;
  Cust2ndMobile?: any;
  Cust3rdMobile?: any;
  CustDesignation?: any;
  SecurityQuestion1?: any;
  SecurityQuestion1Answer?: any;
  SecurityQuestion2?: any;
  SecurityQuestion2Answer?: any;
  SecurityQuestion3?: any;
  SecurityQuestion3Answer?: any;
  RegistrationDate?: any  
}


@Injectable({
  providedIn: 'root',
})
export class UserService {

  //webUrl = _spPageContextInfo.webServerRelativeUrl;

  private isUserLoggedIn = new BehaviorSubject(false);
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();
  loggedUserInfo$!: Observable<ICustomer>;

  loogedCustomer!: ICustomer;

  private _userName = '';
  private _customerId = '';

  customerInfo = {};

  // customersList:ICustomer[] = [
  //   {
  //     CustId: "1000",
  //     CustPassword: "demo",
  //     CustName: "Mostafa Kamal",
  //     CustCompanyName: "Berger Paints Bangladesh Limited",
  //     CustCompany1stAddress: "Uttara, Dhaka, Bangladesh",
  //     CustCompany2ndAddress: "Uttara, Dhaka, Bangladesh",
  //     CustCompany3rdAddress: "Uttara, Dhaka, Bangladesh",
  //     Cust1stEmail: "kamal@bergertech.com",
  //     Cust2ndEmail: "kamal@bergertech.com",
  //     Cust3rdEmail: "kamal@bergertech.com",
  //     Cust1stPhone: "0191324255310",
  //     Cust2ndPhone: "0191324255310",
  //     Cust3rdPhone: "0191324255310",
  //     Cust1stMobile: "0191324255310",
  //     Cust2ndMobile: "0191324255310",
  //     Cust3rdMobile: "0191324255310",
  //     CustDesignation: "Software Engineer",
  //     SecurityQuestion1: "",
  //     SecurityQuestion1Answer: "",
  //     SecurityQuestion2: "",
  //     SecurityQuestion2Answer: "",
  //     SecurityQuestion3: "",
  //     SecurityQuestion3Answer: "",
  //     RegistrationDate: ""
  //   },
  //   {
  //     CustId: "2000",
  //     CustPassword: "demo",
  //     CustName: "Mostafa Kamal",
  //     CustCompanyName: "Berger Paints Bangladesh Limited",
  //     CustCompany1stAddress: "Berger Paints Bangladesh Limited",
  //     CustCompany2ndAddress: "Berger Paints Bangladesh Limited",
  //     CustCompany3rdAddress: "Berger Paints Bangladesh Limited",
  //     Cust1stEmail: "kamal@bergertech.com",
  //     Cust2ndEmail: "kamal@bergertech.com",
  //     Cust3rdEmail: "kamal@bergertech.com",
  //     Cust1stPhone: "0191324255310",
  //     Cust2ndPhone: "0191324255310",
  //     Cust3rdPhone: "0191324255310",
  //     Cust1stMobile: "0191324255310",
  //     Cust2ndMobile: "0191324255310",
  //     Cust3rdMobile: "0191324255310",
  //     CustDesignation: "Software Engineer",
  //     SecurityQuestion1: "",
  //     SecurityQuestion1Answer: "",
  //     SecurityQuestion2: "",
  //     SecurityQuestion2Answer: "",
  //     SecurityQuestion3: "",
  //     SecurityQuestion3Answer: "",
  //     RegistrationDate: ""
  //   },
  //   {
  //     CustId: "3000",
  //     CustPassword: "demo",
  //     CustName: "Mostafa Kamal",
  //     CustCompanyName: "Berger Paints Bangladesh Limited",
  //     CustCompany1stAddress: "Uttara, Dhaka, Bangladesh",
  //     CustCompany2ndAddress: "Uttara, Dhaka, Bangladesh",
  //     CustCompany3rdAddress: "Uttara, Dhaka, Bangladesh",
  //     Cust1stEmail: "kamal@bergertech.com",
  //     Cust2ndEmail: "kamal@bergertech.com",
  //     Cust3rdEmail: "kamal@bergertech.com",
  //     Cust1stPhone: "0191324255310",
  //     Cust2ndPhone: "0191324255310",
  //     Cust3rdPhone: "0191324255310",
  //     Cust1stMobile: "0191324255310",
  //     Cust2ndMobile: "0191324255310",
  //     Cust3rdMobile: "0191324255310",
  //     CustDesignation: "Software Engineer",
  //     SecurityQuestion1: "",
  //     SecurityQuestion1Answer: "",
  //     SecurityQuestion2: "",
  //     SecurityQuestion2Answer: "",
  //     SecurityQuestion3: "",
  //     SecurityQuestion3Answer: "",
  //     RegistrationDate: ""
  //   }

  // ];

  customersList:ICustomer[] = [];
  
  //apiUrl = `https://bergerpaintsbd.sharepoint.com/sites/kamalportal/_api/web/lists/getByTitle('customerregistration')/items?&$top=200&$select=*`;
  apiUrl = 'http://localhost:3000/customerregistration';




  constructor(
    private _http:HttpClient
    ){
    this.getAllCustomers().subscribe((res:any)=>{
      console.log(res);
      this.customersList = res.data;
    });
  }  

  getAllCustomers():any{
    // const username:string = 'kamal@bergerbd.com';
    // const password: string = 'Bismillah@Aug22';
    // let headers = new HttpHeaders();

    // headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    // headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('cache-control', 'no-cache');
    // headers = headers.append('Access-Control-Allow-Origin', '*');

    //return this._http.get(this.apiUrl,{ headers:headers })

    return this._http.get(`${this.apiUrl}`);
  }

  checkCredentials(username: string, customerId:string, password: string) {

    this.customersList.forEach(c => {
      if (c.CustId === customerId && c.CustPassword === password) {
        this.isUserLoggedIn.next(true);        

        let lUserInfo = {
          CustId: c.CustId,
          CustPassword: c.CustPassword,
          CustName: c.CustName,
          CustCompanyName: c.CustCompanyName,
          CustCompany1stAddress: c.CustCompany1stAddress,
          CustCompany2ndAddress: c.CustCompany2ndAddress,
          CustCompany3rdAddress: c.CustCompany3rdAddress,
          Cust1stEmail: c.Cust1stEmail,
          Cust2ndEmail: c.Cust2ndEmail,
          Cust3rdEmail: c.Cust3rdEmail,
          Cust1stPhone: c.Cust1stPhone,
          Cust2ndPhone: c.Cust2ndPhone,
          Cust3rdPhone: c.Cust3rdPhone,
          Cust1stMobile: c.Cust1stMobile,
          Cust2ndMobile: c.Cust2ndMobile,
          Cust3rdMobile: c.Cust3rdMobile,
          CustDesignation: c.CustDesignation,
          SecurityQuestion1: c.SecurityQuestion1,
          SecurityQuestion1Answer: c.SecurityQuestion1Answer,
          SecurityQuestion2: c.SecurityQuestion2,
          SecurityQuestion2Answer: c.SecurityQuestion2Answer,
          SecurityQuestion3: c.SecurityQuestion3,
          SecurityQuestion3Answer: c.SecurityQuestion3Answer,
          RegistrationDate: c.RegistrationDate
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
      CustCompany1stAddress: "",
      CustCompany2ndAddress: "",
      CustCompany3rdAddress: "",
      Cust1stEmail: "",
      Cust2ndEmail: "",
      Cust3rdEmail: "",
      Cust1stPhone: "",
      Cust2ndPhone: "",
      Cust3rdPhone: "",
      Cust1stMobile: "",
      Cust2ndMobile: "",
      Cust3rdMobile: "",
      CustDesignation: "",
      SecurityQuestion1: "",
      SecurityQuestion1Answer: "",
      SecurityQuestion2: "",
      SecurityQuestion2Answer: "",
      SecurityQuestion3: "",
      SecurityQuestion3Answer: "",
      RegistrationDate: ""
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
          CustCompany1stAddress: c.CustCompany1stAddress,
          CustCompany2ndAddress: c.CustCompany2ndAddress,
          CustCompany3rdAddress: c.CustCompany3rdAddress,
          Cust1stEmail: c.Cust1stEmail,
          Cust2ndEmail: c.Cust2ndEmail,
          Cust3rdEmail: c.Cust3rdEmail,
          Cust1stPhone: c.Cust1stPhone,
          Cust2ndPhone: c.Cust2ndPhone,
          Cust3rdPhone: c.Cust3rdPhone,
          Cust1stMobile: c.Cust1stMobile,
          Cust2ndMobile: c.Cust2ndMobile,
          Cust3rdMobile: c.Cust3rdMobile,
          CustDesignation: c.CustDesignation,
          SecurityQuestion1: c.SecurityQuestion1,
          SecurityQuestion1Answer: c.SecurityQuestion1Answer,
          SecurityQuestion2: c.SecurityQuestion2,
          SecurityQuestion2Answer: c.SecurityQuestion2Answer,
          SecurityQuestion3: c.SecurityQuestion3,
          SecurityQuestion3Answer: c.SecurityQuestion3Answer,
          RegistrationDate: c.RegistrationDate
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
