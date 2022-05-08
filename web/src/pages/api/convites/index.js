export default function invitation(req, res) {

    if (req.method === 'POST') {
        const { name, status } = req.body

        if (!name || !status) {
            return res
                .status(401)
                .json({ msg: 'Todos os campos são obrigatórios' })
        }

        // const invitation = await invitation
        // console.log({ name, status })
        res.json({ msg: 'post' })
    }


}