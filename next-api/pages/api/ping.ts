import { NextApiHandler } from "next"

const handler: NextApiHandler = (req, res) => {

    res.json({ pong: true })
}

export default handler
