const Dev = require('../models/dev');

module.exports = {
    async store(req, res) {
        const { devId} = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: "Dev not exists."});
        }

        if (loggedDev.likes.includes(targetDev._id)) {
            return res.json({ "Mensagem": "Ja deu like nesse" });
        }

        if (targetDev.dislikes.includes(devId)) {
            console.log("Deu match");
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev) ;
    }
};
