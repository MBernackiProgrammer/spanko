const static = require('../constants/static');
const jwt = require('jsonwebtoken');



const activeSession = async (req, res) => {
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
}



exports.saveSleep = async (req,res)=>{
    {

        const pgp = require('pg-promise')(/* options */)
        const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)
    
        
        activeSession(req, res).then(()=>{
            if(req.user){
    
                const query = `insert into public.sleep (account_id,start_time,end_time,hours) values ('${req.user.account_id}','${req.body.start_time}','${req.body.end_time}','${req.body.hours}');`;
                
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


exports.history = async (req,res)=>{
    {

        const pgp = require('pg-promise')(/* options */)
        const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)
    
        
        activeSession(req, res).then(()=>{
            if(req.user){
    
                const query = `select * from public.sleep where account_id=${req.user.account_id} order by end_time desc;`;
                
                console.log(query)
                
                db.manyOrNone(query).then((result)=>{
                    
                    res.json(result);
    
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


exports.stats = async (req,res)=>{
    {

        const pgp = require('pg-promise')(/* options */)
        const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)
    
        let return_obj = {
            longest:[],
            last: {}
        }
        
        activeSession(req, res).then(()=>{
            if(req.user){
    
                const query = `select * from public.sleep where account_id=${req.user.account_id} AND hours in (select max(hours) from public.sleep where account_id=${req.user.account_id});`;
                
                console.log(query)
                
                db.manyOrNone(query).then((result)=>{
                    
                    return_obj.longest = result;

                    const query_2 = `select * from public.sleep where account_id=${req.user.account_id} AND end_time in (select max(end_time) from public.sleep where account_id=${req.user.account_id}) limit 1;`;
                
                    db.oneOrNone(query_2).then((result_2)=>{
                        return_obj.last = result_2;

                        res.json(return_obj);
                    }).catch((err)=>{
                        console.log(err);
                        res.json(false);
                    })
    
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


exports.allData = async (req,res)=>{
    {

        const pgp = require('pg-promise')(/* options */)
        const db = pgp(`postgres://${static.shared.db_user}:${static.shared.db_password}@${static.shared.db_address}/expressjs`)
    
        let return_obj = {
            accounts:[]
        }
        
        activeSession(req, res).then(()=>{
            if(req.user){
    
                const query = `select * from public.user join public.sleep on public.user.id=public.sleep.account_id;`;
                
                console.log(query)
                
                db.manyOrNone(query).then((result)=>{
                    
                    return_obj.accounts = result;
                    res.json(return_obj);
    
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
