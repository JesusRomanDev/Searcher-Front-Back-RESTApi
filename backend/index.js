import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getName } from './controller/getName.js';

const app = express();
dotenv.config();
app.use(express.json());

const dominiosPermitios = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        if(!origin){
            return callback(null,true)
        }

        if(dominiosPermitios.indexOf(origin) !== -1){
            //El Origen del Request esta permitido
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.get('/search', getName)

// app.post('/search', getName);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Escuchando desde el puerto ${PORT}`);
})