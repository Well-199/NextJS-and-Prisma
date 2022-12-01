import { NextApiHandler } from "next"
import { Users } from "../../../utils/users"

const handlerGet: NextApiHandler = (req, res) => {
    res.json(Users)
}

const handlerPost: NextApiHandler = (req, res) => {
    res.json({ status: true })
}

const handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res)
            break
        case 'POST':
            handlerPost(req, res)
            break
    }
}

export default handler