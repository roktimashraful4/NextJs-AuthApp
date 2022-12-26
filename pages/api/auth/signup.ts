import connectMongo from '../../../database/connection';
import Users from '../../../model/Schema' 
import {hash} from 'bcryptjs'
export default async function handler(req:any,res:any) {
    connectMongo().catch(error =>res.json({
        error: "connection Failed !"
    }))

 // only post method is accepted 
 if(req.method === "POST") { 

    if(!req.body)return res.status(404).json({error:"Don't have from data "}); 

    const {username, email, password} = req.body;

    // check duplicate users 
    const chackexisting = await Users.findOne({email}); 
    if(chackexisting) return res.status(422).json({message: "User already exist ...!!" })

    // hash password 
    Users.create({username, email, password:await hash(password,12)}, function(error:any, data:any){ 
        if(error)return res.status(404).json({error})
        res.status(201).json({status: true,user:data })
    })



 }else { 
    res.status(500).json({message:"HTTP method not valid only post accepted "})
 }
}  