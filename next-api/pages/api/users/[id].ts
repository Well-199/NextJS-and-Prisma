import { NextApiHandler } from "next"
import { Users } from "../../../utils/users"

const handler: NextApiHandler = (req, res) => {

    const { id } = req.query

    let myUser = null

    for(let i in Users){
        if(Users[i].id.toString() === id){
            myUser = Users[i]
            res.json(myUser)
            return
        }
    }

    res.json({ error: 'Usuário não encontrado' })
}

export default handler
