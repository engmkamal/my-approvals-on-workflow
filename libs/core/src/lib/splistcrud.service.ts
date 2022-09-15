// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SplistcrudService {

//   constructor() { }
// }
//====================================
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { 
  from,
  map, tap, catchError
} from 'rxjs';
//import { map, tap, catchError } from 'rxjs/operators';

//import { spfi, SPFx } from "@pnp/sp";
//import { Web } from "@pnp/sp/webs";
// import "@pnp/sp/lists/web";
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import { ILists } from "@pnp/sp/lists";
//import { PnpNode, IPnpNodeSettings } from 'sp-pnp-node';

export interface ListItems {  
  Id?: number;  
  Title: string;  
}


@Injectable({
  providedIn: 'root'
})
export class SplistcrudService{

  //public webAbsoluteUrl = window.location.origin + "/leaveauto";
  public webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto"; //uncomment for localhost //PendingApproval

  //sp = spfi(this.webAbsoluteUrl);

  

  //lists: ILists = this.sp.web.lists;

  // private getConfigInfo(){
  //   const mySP = sp.configure({
  //     headers:{
  //       "Accept": "application/json; odata=verbose"
  //     }
  //   }, this.webAbsoluteUrl);
  //   //console.log("Returned config: "+ mySP);
  //   return mySP;
  // };

  constructor(private http: HttpClient) { }

  async getSPLoggedInUser():Promise<any>{   
    let userADId;
    const apiUrl = this.webAbsoluteUrl + "/_api/web/currentuser?$expand=Groups"; 
    await this.http
        .get(apiUrl)
        .toPromise()
        .then(
        (res:any) => {
          userADId = res.Id;
          }            
          ).catch(
            (res)=>{
              const sringify = JSON.stringify(res);
              userADId = "";
            }
          );
    return Number(userADId);
    //return +userADId; 
  }


  //=========fetching list items with filter (filter by ADId)options ================
  public async getItemsWithFilterExpand(list?: any, user?: any):Promise<any>{
    // let output:any;
    // const web = Web(this.webAbsoluteUrl);
    // const userADId = user;  
    
    // const items: any[] = await this.sp.web.lists.getByTitle("BergerEmployeeInformation").items.top(1)();
    // console.log(items);

    // const lists: ILists = this.sp.web.lists;

    // const data = await lists.getByTitle(list.name).select(list.select).expand(list.expand)();
    
    // // await from(web.lists
    // //     .getByTitle(list.name) 
    // //     //.items
    // //     .select(list.select)
    // //     .expand(list.expand)
    // //     //.filter(list.filterBy+" eq '"+Number(userADId)+"'")
    // //     //.orderBy('Created', false)
    // //     //.top(Number(list.top))  
    // //     .get()
    // //     .then((res:any)=>{
    // //       output = res;          
    // //     })
    // //     .catch((rej:any)=>{
    // //       console.log(rej.message);
    // //     })         
    // //     );        
    // //       //console.log("Fetched data by getItemsWithFilterExpand service: "+ JSON.stringify(data));
    // // //return data;
    // // return output;

    //return data;
  }

  public async getListItems(query: any):Promise<any> {  
    return this.http.get<any>(`${this.webAbsoluteUrl}/_api/web/lists/${query}`).pipe(  
      map((response:any) => response.value as ListItems[])  
    ).toPromise();  
  } 

}

