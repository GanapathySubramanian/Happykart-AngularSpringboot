import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';
@Injectable({
  providedIn: 'root'
})
export class CartService {
 

  cartItems:CartItem[]=[];

  totalPrice:Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity:Subject<number> = new BehaviorSubject<number>(0);

  // storage:Storage=sessionStorage;
  storage:Storage=localStorage;

  constructor() {

    let data=JSON.parse(this.storage.getItem('cartItems'));

    if(data!=null){
      this.cartItems=data;
    
      //compute total based on the data that is read from storage
      this.computeCartTools();
    }
   }

  addToCart(theCartItem:CartItem){
    
      //check if we already have the item in our cart
      let alreadyExistsInCart:boolean=false;
      let existingCartItem!:CartItem;      

      if(this.cartItems.length>0){

      //find the item in the cart based on item id
        // existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id ); (or)

        for(let tempCartItem of this.cartItems){
            if(tempCartItem.id===theCartItem.id){
                existingCartItem=tempCartItem;
                break;
            }
          }

          //check if we found it
          alreadyExistsInCart = (existingCartItem != undefined);
      }

        
        
        if(alreadyExistsInCart){
          //increment the quantity
          existingCartItem.quantity++;
        } else{
          //just add the item to the array
          this.cartItems.push(theCartItem);
        }
        console.log(this.cartItems);
        
        //compute cart total price and total quantity
        this.computeCartTools();
   }

   
   
  computeCartTools() {
    
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue+=currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue+=currentCartItem.quantity;
    }

    //publish the new values ... all the subscribers will receive the new data

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugg

    this.logCartData(totalPriceValue,totalQuantityValue);

    //persist cart data
    this.persistCartItem();
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`contenets of the cart`);
    for(let tempCartItem of this.cartItems){
      const subTotalPrice=tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`name:${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }
   console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity:${totalQuantityValue}`);
    console.log('----');
    
  }


  persistCartItem(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }

  decrementQuantity(theCartItem: CartItem) {
    
    theCartItem.quantity--;

    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }else{
      this.computeCartTools()
    }
  }
  
  remove(theCartItem: CartItem){
      // get index of item in the array
      const itemIndex=this.cartItems.findIndex(tempCartItem=>tempCartItem.id===theCartItem.id);

      //if found, remove the item from the array at the given index
      if(itemIndex > -1){
        this.cartItems.splice(itemIndex,1);

        this.computeCartTools();
      }
  }
}
