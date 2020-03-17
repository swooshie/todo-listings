var bodyParser =  require('body-parser');
var mongoose = require('mongoose');
//connect to database
mongoose.connect('mongodb+srv://user:user@cluster0-xh6kg.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//create a scheme
var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo',todoSchema);

//var data =  [{item: 'get milk'},{item: 'walk dog'},{item: 'coding'}];
var urlencodedParser =  bodyParser.urlencoded({extended: false});




module.exports = function(app){

    app.get('/todo',function(req,res){
        //get data from mongoDB and pass it to the view
        Todo.find({}, function(err,data){
            if(err) throw err;
            res.render('todo',{todos: data});
        })
        
    });

    app.post('/todo', urlencodedParser ,function(req,res){
        //get data from the view and add it to mongoDB
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item',function(req,res){
        //delete 
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });

}