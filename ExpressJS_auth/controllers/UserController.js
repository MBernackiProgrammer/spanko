const static = require('../constants/static');
const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken');


const transporter = nodemailer.createTransport({
   host: "smtp.poczta.onet.pl",
   port: 465,
   secure: true, // use false for STARTTLS; true for SSL on port 465
   auth: {
    
       user: static.shared.email_user,
       pass: static.shared.email_password
   },
    authMethod: 'LOGIN'
});

const generateAccessToken = (account_id) => {
  return jwt.sign({account_id:account_id}, static.shared.key, { expiresIn: '1800s' });
}


const activeSession = async (req, res) => {
    {

        const authHeader = req.headers['authorization'];
        const tokenJ = authHeader && authHeader.split(' ')[1];

        if (tokenJ == null) return res.sendStatus(401);

        return jwt.verify(tokenJ, static.shared.key, (err, user) => {
            console.log(err)

            if (err) return;

            console.log(user)
            req.user = user

            return;
        });

        ///////////////////////////////////////////////////////////////
        /*
        const token = req.cookies.expressSession.toString().substring(1, req.cookies.expressSession.toString().length-1);
            
        const query = `SELECT * from public.session where session_token='${token}';`;
    
        console.log(query)

        return db.oneOrNone(query)
        .then((data) => {
            console.log('success');
    
            if(data){
                return data;               
            }else{                
                res.clearCookie('expressSession', { httpOnly: true });
                return -1;
            }
        })
        .catch((error) => {
            console.log('ERROR', error)
            return -1;
        });
        */
    }
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


exports.getCurrentAccount = async (req,res)=>{
    {

        const pgp = require('pg-promise')(/* options */)
        const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)
    
        
        activeSession(req, res).then(()=>{
            if(req.user){
    
                const query = `select * from public.user where id=${req.user.account_id};`;
                console.log(query)
                
                db.one(query).then((data)=>{
                    
                    res.json(data);
    
                }).catch((error)=>{
                    console.log(error);
                    res.json(false);
                });    
                
            }else{
                res.json(false);
            }
        }).catch((e)=>console.log(e));
    }
}

exports.editAccount = async (req,res)=>{
    {

        const pgp = require('pg-promise')(/* options */)
        const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)
    
        
        activeSession(req, res).then(()=>{
            if(req.user){
    
                const query = `update public.user set username='${req.body.username}', email='${req.body.email}', phone='${req.body.phone}' where id=${req.user.account_id};`;
                console.log(query)
                
                db.none(query).then(()=>{
                    
                    res.json(true);
    
                }).catch((error)=>{
                    console.log(error);
                    res.json(false);
                });    
                
            }else{
                res.json(false);
            }
        }).catch((e)=>console.log(e));
    }
}

exports.updatePassword = async (req, res)=>{
    {

        const crypto = require('crypto');

        const changeData = {
            oldPassword:crypto.createHash("sha256").update(req.body.oldPassword).digest("hex"),
            password: crypto.createHash("sha256").update(req.body.password).digest("hex")
        }

        const pgp = require('pg-promise')(/* options */)
        const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)
    
        
        activeSession(req, res).then(()=>{
            if(req.user){
    
                const query = `update public.user set password='${changeData.password}' where id=${req.user.account_id} AND password='${changeData.oldPassword}';`;
                console.log(query)
                
                db.none(query).then(()=>{
                    
                    res.json(true);
    
                }).catch((error)=>{
                    console.log(error);
                    res.json(false);
                });    
                
            }else{
                res.json(false);
            }
        }).catch((e)=>console.log(e));
    }
}



exports.login = async (req,res)=>{

    const crypto = require('crypto');

    const userData = {
        username:req.body.username,
        password: crypto.createHash("sha256").update(req.body.password).digest("hex")
    }

    const pgp = require('pg-promise')(/* options */)
    const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)

    const username = "'"+userData.username+"'";
    const password = "'"+userData.password+"'";
    const query = "SELECT * from public.user where username="+username+" AND password="+password+";";

    console.log(query)
    db.one(query)
    .then((data) => {
        console.log('success');

        if(data){
            const jwtToken = generateAccessToken(data.id);

            res.json({token:jwtToken});

            /*
            const token = crypto.randomBytes(20).toString('hex')+data.id;
            const params = "'"+token+"','"+data.id+"'";

            db.none("INSERT into session (session_token,account_id) values ("+params+");").then(()=>{
                
                // var date = new Date();                
                // res.cookie("expressSession", JSON.stringify(token), {
                //     secure: process.env.NODE_ENV !== "development",
                //     httpOnly: true,
                //     expires: date.addDays(30),
                // });


            }).catch((error)=>{
                console.log(error);
                res.json(-1);
            });
            */
            
        }else{
            res.json(-1);
        }
    })
    .catch((error) => {
        console.log('ERROR')
        res.json(-1);
    });
}



exports.logout = async (req,res)=>{

    {

        const pgp = require('pg-promise')(/* options */)
        const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)
    

        activeSession(req, res).then(()=>{
            if(req.user){
    
                // const deleteQuery = "DELETE from session where id="+req.user.account_id+";";
                // console.log(deleteQuery)

                // db.none(deleteQuery).then(()=>{
                    
                //     res.clearCookie('expressSession', { httpOnly: true });
                //     res.json(true);
    
                // }).catch((error)=>{
                //     console.log(error);
                //     res.json(false);
                // });    
                res.json(true);
                
            }else{
                res.json(false);
            }
        }).catch((e)=>console.log(e));

    }
}







exports.createAccount = async (req,res)=>{

    const crypto = require('crypto');

    const newUser = {
        username:req.body.username,
        password: crypto.createHash("sha256").update(req.body.password).digest("hex"),
        phone:req.body.phone,
        email:req.body.email
    }

    const pgp = require('pg-promise')(/* options */)
    const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)

    const params = "'"+newUser.username+"','"+newUser.password+"','"+newUser.phone+"','"+newUser.email+"'";

    db.none("INSERT INTO public.user (username,password,phone,email) values ("+params+");")
    .then(() => {
        console.log('success')
        res.json(newUser.username);
    })
    .catch((error) => {
        console.log('ERROR',error)
        res.json(false);
    });
}

exports.getAllAccount = async (req,res) => {
    const pgp = require('pg-promise')(/* options */)
    const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)

    db.manyOrNone('SELECT * FROM public.user;')
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log('ERROR:', error)
        res.json(false);
    });
}


exports.forgotPassword = async (req,res) =>{

    const crypto = require('crypto');
    const pgp = require('pg-promise')(/* options */)
    const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`);

    console.log(req.body)
    db.oneOrNone(`SELECT * from public.user where email='${req.body.email}';`)
    .then(async (data) => {
        if(data){
            const code = crypto.randomBytes(3).toString('hex');

            db.none(`INSERT into public.confirmation_code (code,account_id) values ('${code}','${data.id}');`).then(async ()=>{
                
                const mailOptions = {
                    from: static.shared.email_user, // Sender address from environment variables.
                    to: `"${data.username}" <${data.email}>`, // Recipient's name and email address.
                    replyTo: static.shared.email_user, // Sets the email address for recipient responses.
                    subject: "Forgot email", // Subject line.
                    text: `Odzyskiwanie hasła, oto twój kod: ${code}` // Plaintext body.
                };
            
            
                // Send email and log the response.
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent:', info.response);
    
                res.json(true);
            })
            .catch((error)=>{
                console.log(error);
                res.json(false);
            });
        
            
        }else{
            res.json(false);
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}


exports.setPassword = async (req, res)=>{
    const crypto = require('crypto');
    const pgp = require('pg-promise')(/* options */)
    const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`);

    db.oneOrNone(`SELECT * from public.user where email='${req.body.email}';`)
    .then(async (data) => {
        if(data){

            db.oneOrNone(`SELECT * from public.confirmation_code where account_id='${data.id}' AND code='${req.body.code}';`)
            .then((confirmation_code) => {
                if(confirmation_code){

                    const passwd = crypto.createHash("sha256").update(req.body.password).digest("hex")
                    const query = `update public.user set password='${passwd}' where id=${data.id};`;

                    db.none(query).then(()=>{
                        db.none(`delete from confirmation_code where id=${confirmation_code.id}`).then(()=>{
                            res.json(true);
                        })
                        .catch((error)=>{
                            console.log(error);
                            res.json(false);
                        });
                        
                    })
                    .catch((error)=>{
                        console.log(error);
                        res.json(false);
                    });                
                    
                }else{
                    res.json(false);
                }
            })
            .catch((error)=>{
                console.log(error);
            });        
            
        }else{
            res.json(false);
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}