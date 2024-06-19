import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const DatabaseJSON = require('../database/db.json');
const getName = (req,res) => {
    console.log('llegaste aqui');
    const{q} = req.query;
    console.log(q);
    const resultado = DatabaseJSON.fruits.filter(el => el.name === q)
    try {
        if(resultado.length){
            console.log(resultado);
            return res.status(200).json({data: resultado})
            
        }
        throw('La fruta no existe')
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

export {getName};