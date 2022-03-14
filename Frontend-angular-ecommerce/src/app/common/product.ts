export class Product {

    id:number=0;
    sku:String="";
    name:String="";
    description:String="";
    unitPrice:number=0;
    imageUrl:String="";
    active:boolean=false;
    unitsInStock:number=0;
    dateCreated!: Date;
    lastUpdated!: Date;

}
