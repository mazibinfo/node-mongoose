const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://127.0.0.1:27017/confusion';
const connect = mongoose.connect(url);

connect.then(() => {
    console.log('Connect to the Server');

    Dishes.create({
        name: 'Uthapizza',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);
    
        return Dishes.findByIdAndUpdate(dish._id, {
            $set : {"description": "Updated test"}
        }, {
            new: true
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);
    
        dish.comments.push({
            rating: 5,
            comment:'i\'m getting a singking feeling!',
            author: 'Leonardo di Carpaccio'
        });
    
        return dish.save();
    })
    .then((dish) =>{
        console.log(dish)
    
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});

