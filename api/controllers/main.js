const db = require('../config/db')
const jwt = require('jsonwebtoken');

exports.addOpt = async (req, res) => {
    const { opt_name, opt_image, opt_descr } = req.body;
    const opt_votes = 0;
    const opt_add = "Insert into voptions (opt_name,opt_descr,opt_image,opt_votes) VALUES ($1,$2,$3,$4)"
    db.query(opt_add, [opt_name, opt_descr, opt_image, opt_votes], (err, result) => {
        if (err) {
            console.log(err)
            res.status(401).json({ message: "There was an error adding the option" })
        } else {
            res.status(201).json({ message: "Option added!" })
        }
    })
}
exports.sign = async (req, res) => {
    const { name, id, email } = req.body;
    const vt_add = "Insert into voter (id,email,name) VALUES ($1,$2,$3)"

    db.query(vt_add, [id, email, name], (err, result) => {
        if (err) {
            console.log(err)
            res.status(401).json({ message: "There was an error signing in" })
        } else {
            const tkn_key = jwt.sign({
                name: name,
                id: id,
            },
                process.env.TKN_KEY || "kjc7w7IWU&kj)buci", {
                algorithm: "HS512",
                expiresIn: "10s"
            })
            res.status(201).json({ message: tkn_key })
        }
    })
}
exports.vote = async (req, res) => {
    const { id, opt_vote } = req.params;

    db.query("Select * from voter where id = $1", [id], (errVer, resVer) => {
        if (errVer) {
            console.log(errVer)
            res.status(400).json({ message: "Error verifying Identity" })
        }
        else {
            if (resVer.rowCount > 0) {
                db.query("SELECT * FROM voptions WHERE opt_id = $1", [opt_vote], (err, result) => {
                    if (err) {
                        res.status(400).json({ message: "Option not found" })
                    }
                    else {
                        var votes = result.rows[0].opt_votes + 1;
                        db.query("Update voptions set opt_votes = $1 where opt_id = $2", [votes, opt_vote], (errUpdate, resultUpdate) => {
                            if (errUpdate) {
                                res.status(401).json({ message: "Error submitting your vote" })
                            }
                            else {
                                res.status(201).json({ message: "Your vote has been submitted" })
                            }
                        })
                    }
                })
            }else{
                res.status(400).json({ message: "Identity number not found"})
            }
        }

    })

}