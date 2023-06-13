import 'dotenv/config';
import express from 'express';
import * as vinyl from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/vinyl', (req,res) => { 
    movies.createVinyl(
        req.body.title,
        req.body.artist, 
        req.body.year, 
        req.body.length
        )
        .then(vinyl => {
            res.status(201).json(movie);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Could not enter a new vinyl record' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/vinyl', (req, res) => {
    movies.retrieveVinyl()
        .then(vinyl => { 
            if (vinyl !== null) {
                res.json(vinyl);
            } else {
                res.status(404).json({ Error: 'Vinyl record not found.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Failed to retrieve vinyl record entry.' });
        });
});


// RETRIEVE by ID controller
app.get('/vinyl/:_id', (req, res) => {
    movies.retrieveVinylByID(req.params._id)
    .then(vinyl => { 
        if (vinyl !== null) {
            res.json(vinyl);
        } else {
            res.status(404).json({ Error: 'Vinyl record not found.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Failed to retrieve vinyl record entry.' });
    });

});


// UPDATE controller ************************************
app.put('/vinyl/:_id', (req, res) => {
    vinyl.updateVinyl(
        req.params._id, 
        req.body.title,
        req.body.artist, 
        req.body.year, 
        req.body.length
    )
    .then(vinyl => {
        res.json(vinyl);
    })
    .catch(error => {
        console.log(vinyl);
        res.status(400).json({ error: 'Failed to update vinyl record entry' });
    });
});


// DELETE Controller ******************************
app.delete('/vinyl/:_id', (req, res) => {
    movies.deleteVinylById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Vinyl entry no longer exists.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Failed to delete vinyl entry' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});