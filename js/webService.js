const ItemsUrl = "./js/items.json";
export class WebService{
    constructor(){}
    getItmes = () => fetch(ItemsUrl)
    .then(response => {
        if(!response.ok)
        throw response
        return response.json()
    });
}