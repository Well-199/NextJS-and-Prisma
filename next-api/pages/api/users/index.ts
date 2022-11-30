import { NextApiHandler } from "next"
import { Users } from "../../../utils/users"

const handler: NextApiHandler = (req, res) => {

    res.json(Users)
}

export default handler