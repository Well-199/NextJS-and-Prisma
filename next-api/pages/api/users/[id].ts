import { NextApiHandler } from "next"
import { Users } from "../../../utils/users"

const handler: NextApiHandler = (req, res) => {

    const { id } = req.query

    res.json(Users)
}

export default handler