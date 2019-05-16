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
        console.log(this.webService);
        this.webService.getItmes()
            .then((data) => {
                this.items = data;
            })
            .catch(err => {
                err.text().then(errorMessage => {
                    console.error(errorMessage);
                })
            })
    }
}