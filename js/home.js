import { WebService } from "./webService.js"
export class Home {
    constructor() {
        this.items = [];
        this.cartList = [];
        this.webService = new WebService();
        this.init();
    }


    init = () => {
        this.getItems();
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

    generateView = (data) =>{
        console.log('Generate View',data)
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
}