import { createContext, ReactNode, useContext, useState } from "react"
import { Tenant } from "../types/Tenant"

// o tipo inicialmente vem nulo pro isso o Tenant | (ou) null
type appContextType = {
    tenant: Tenant | null
    setTenant: (newTenant: Tenant) => void
}

const defaultValues: appContextType = {
    tenant: null,
    setTenant: () => null
}

// Metodo => createContext - Tipo do retorno => <appContextType> - Parametros =>(defaultValues)

const appContext = createContext<appContextType>(defaultValues)

export const useAppContext = () => useContext(appContext)

type Props = {
    children: ReactNode
}

export const AppContextProvider = ({ children }: Props) => {

    const [tenant, setTenant] = useState<Tenant | null>(null)

    return (
        <appContext.Provider value={{ tenant, setTenant }}>
            {children}
        </appContext.Provider>
    )
}
