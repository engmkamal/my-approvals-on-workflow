// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketService {

//   constructor() { }
// }
//=============================================
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { io, Socket } from 'socket.io-client';

//==========suscribe webhooks ==========
// import { spfi } from "@pnp/sp";
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";

// import { Subscriptions, ISubscriptions} from "@pnp/sp/subscriptions";
//import "@pnp/sp/subscriptions/list";
//-------------------------
import * as pnp from "sp-pnp-js";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  //private socket: Socket;
  private webAbsoluteUrl = window.location.origin;
  //private webAbsoluteUrl = 'https://localhost';
  private port = 3000;
  private url = this.webAbsoluteUrl +":"+ this.port; // your server local path

  private connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  //const ENDPOINT = "URL"; 
  

  constructor() {
   // this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  // listen(eventName: string){
  //   return new Observable((subscriber)=>{
  //     this.socket.on(eventName, (data:any)=>{
  //       subscriber.next(data);
  //     })
  //   })
  // }
  
  // emit(eventName:string, data:any, config:any){
  //   this.socket.emit(eventName, data, config)
  // }

  // joinRoom(data): void {
  //   this.socket.emit('join', data);
  // }

  // sendMessage(data): void {
  //   this.socket.emit('message', data);
  // }

  // getMessage(): Observable<any> {
  //   return new Observable<{user: string, message: string}>(observer => {
  //     this.socket.on('new message', (data) => {
  //       observer.next(data);
  //     });

  //     return () => {
  //       this.socket.disconnect();
  //     }
  //   });
  // }

  // getStorage() {
  //   const storage: string = localStorage.getItem('chats');
  //   return storage ? JSON.parse(storage) : [];
  // }

  // setStorage(data) {
  //   localStorage.setItem('chats', JSON.stringify(data));
  // }


  
 

  private getConfigInfo(){
    const mySP = pnp.sp.configure({
      headers:{
        "Accept": "application/json; odata=verbose"
      }
    }, this.webAbsoluteUrl);
    //console.log("Returned config: "+ mySP);
    return mySP;
  };  

  async subscribe(){
    

    // This is the URL which will be called by SharePoint when there is a change in the list
    const notificationUrl = "https://portaldv.bergerbd.com:3000/";

    // Set the expiry date to 180 days from now, which is the maximum allowed for the webhook expiry date.
    const expiryDate = "2021-11-14T18:00:00Z";

    // Adds a webhook to the Documents library
    
    //var res = 
    //await 
    this.getConfigInfo().web.lists.getByTitle("ReimburseMaster").subscriptions.add(notificationUrl,expiryDate)
    .then((res:any)=>{
      console.log(JSON.stringify(res));
    });

    //console.log(JSON.stringify(res.data));
  }

}


