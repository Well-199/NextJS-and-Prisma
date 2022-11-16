import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant"

const TEMPORARYoneProduct: Product = {
    id: 2,
	image: '/tmp/Golden-Burger.png',
	categoryName: 'Tradicional',
	name: 'Texas Burger',
	price: 25.50,
    description: `2 Blends de carne de 150g, Queijo Cheddar,
    Bacon Caramelizado, Salada, Molho da casa,
    Pão brioche artesanal,`
}

export const useApi = (tenantSlug: string) => ({

    // retorna false type boolean ou retorna os dado types getTanantResponse 
    getTenant: async () => {

        switch(tenantSlug) {

            case 'delivery':
                return {
                    slug: 'delivery',
                    name: 'Best Burger Well',
                    mainColor: '#FB9400',
                    secondColor: '#E67E22'
                }
            break;

            case 'b7burger':
                return {
                    slug: 'b7burger',
                    name: 'B7Burger',
                    mainColor: '#FF0000',
                    secondColor: '#00FF00'
                }
            break;

            case 'b7pizza':
                return {
                    slug: 'b7pizza',
                    name: 'B7pizza',
                    mainColor: '#0000FF',
                    secondColor: '#FF0000'
                }
            break;

            default: return false
        }

    },

    getAllProducts: async () => {
        
        let products = []

        for(let i = 0; i < 10; i++){
            products.push(TEMPORARYoneProduct)
        }

        return products
    },

    getProduct: async (id: string) => {
        return TEMPORARYoneProduct
    }

})
