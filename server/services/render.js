const axios = require ('axios');

exports.homeRoutes = (req,res) =>{
    //Make get request to /api/plants

    axios.get('http://localhost:3000/api/plants')
    .then(function(response){
        res.render('index', {plantes_list : response.data});
    })
    .catch(err =>{
        res.send(err)
    })
}

exports.add_plant = (req,res) =>{
    res.render('add_plant');
}

exports.update_plant = (req,res) =>{
    axios.get('http://localhost:3000/api/plants', {params : {id : req.query.id}})
    .then(function(plantdata){
        res.render('update_plant',{ plantes_list : plantdata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}