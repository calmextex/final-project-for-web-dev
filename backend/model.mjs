// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Vinyl records collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const vinylSchema = mongoose.Schema({
	title:    { type: String, required: true },
    artist:   { type: String, required: true},
	year:     { type: date, required: true },
	length:   { type: number, required: true, default: Date.now }
});

// Compile the model from the schema.
const Vinyl = mongoose.model('Vinyl', vinylSchema);


// CREATE model *****************************************
const createVinyl = async (title, artist, year, length) => {
    const vinyl = new Vinyl({ 
        title: title,
        artist: artist, 
        year: year, 
        length: length 
    });
    return vinyl.save();
}


// RETRIEVE models *****************************************
// Retrieve based on a filter and return a promise.
const retrieveVinyl = async () => {
    const query = Vynil.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveVinylByID = async (_id) => {
    const query = Vinyl.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteVinylById = async (_id) => {
    const result = await Vinyl.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateVinyl = async (_id, title, artist, year, length) => {
    const result = await Vinyl.replaceOne({_id: _id }, {
        title: title,
        artist: artist,
        year: year,
        length: length
    });
    return { 
        _id: _id, 
        title: title,
        artist: artist,
        year: year,
        length: length
    }
}



// Export our variables for use in the controller file.
export { createVinyl, retrieveVinyl, retrieveVinylByID, updateVinyl, deleteVinylById }