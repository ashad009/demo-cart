import { WebService } from "./webService.js"
import { Item } from "./item.js"
export class Home {
    constructor() {
        this.items = [];
        this.cartList = [];
        this.webService = new WebService();
        this.init();
    }


    init = () => {
        this.getItems();
        this.buttonOnClickListener();
    }

    getItems = () => {
        this.webService.getItmes()
            .then((data) => {
                this.items = data;
                let view = this.generateView(this.items);
                document.getElementById("items").innerHTML = view;
                console.log('Then here',view);
            })
            .catch(err => {
                err.text().then(errorMessage => {
                    console.error(errorMessage);
                })
            });
    }

    buttonOnClickListener = () =>{
        document.addEventListener('click', (event)=>{
            let button = event.target;
            let className = button.getAttribute('class');
            let id = button.getAttribute('id');
            let name = button.getAttribute('name');
            let price = button.getAttribute('price');
            let quantity = button.getAttribute('quantity');
            let singleItem = new Item(id, name, price, quantity);
            if(className === 'addbtn'){
                this.addItem(singleItem);
                document.getElementById('cartItem').innerHTML = this.generateCartListView(this.cartList);
            }
        })
    }
    generateView = (data) =>{
        let view =`
        <h2>Select your items</h2>
        ${data.map((item)=>{
            return `
            <div> ${item.name} </div>
            <div> ${item.price} </div>
            <div> ${item.quantity} </div>
            <button class = "addbtn" id = "${item.id}" name = "${item.name}" price = "${item.price}" quantity = "${item.quantity}">Add Item</button>
           `;
        }).join('')}
        `;
        return view;
    }

    addItem = (item) =>{
        let cartItem = this.cartList.find(i => i.id === item.id);
        if(cartItem){
            cartItem.increaseQuantity();
        }else{
            this.cartList.push(item);
        }
    }

    generateCartListView = (data) =>{
        let view =`
        <h2> Items are here </h2>
        ${data.map((item) =>{
            return `
            <div>${ item.name }</div>
            <div>${ item.price }</div>
            <div>${ item.quantity }</div>
            `
        }).join('')}
        `;
        return view;
    }




}