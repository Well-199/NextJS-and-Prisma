export const useFormatter = () => ({

    formatPrice: (price: number) => {
        return price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            style: 'currency', 
            currency: 'BRL'
        })
    },

    formatQuantity: (qt: number, digits: number) => {

        if(qt < 10){
            return `${'0'.repeat(digits)}${qt}`
        } 
        else{
            return qt
        }
    }

})
