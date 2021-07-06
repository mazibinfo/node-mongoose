const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://127.0.0.1:27017/confusion';
const connect = mongoose.connect(url);

connect.then((db) =>{
    console.log('Connect to the Server');

    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'test'
    });

    newDish.save()
    .then((dish) => {
        console.log(dish);

        return Dishes.find({});
    })
    .then((dishes) => {
        console.log(dishes);

        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    })
});

