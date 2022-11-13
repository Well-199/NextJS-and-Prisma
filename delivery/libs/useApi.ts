import { Tenant } from "../types/Tenant"

export const useApi = () => ({

    // retorna false type boolean ou retorna os dado types getTanantResponse 
    getTenant: (tenantSlug: string): boolean | Tenant  => {

        switch(tenantSlug) {

            case 'delivery':
                return {
                    slug: 'delivery',
                    name: 'Best Burger Well',
                    mainColor: '#D35400',
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

    }

})
