import { useContext } from "react"
import { AppContext } from "."
import { Tenant } from "../../types/Tenant"
import { User } from "../../types/User"
import { Actions } from "./types"

export const useAuthContext = () => {
    const { state, dispatch } = useContext(AppContext)

    return {
        ...state,
        setToken: (token: string) => {
            dispatch({
                type: Actions.SET_TOKEN,
                payload: { token: token }
            })
        },

        setUser: (user: User | null) => {
            dispatch({
                type: Actions.SET_USER,
                payload: { user: user }
            })
        }
    }
}
