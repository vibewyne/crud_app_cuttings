const axios = require ('axios');

exports.homeRoutes = (req,res) =>{

    // https://crudappcuttings.herokuapp.com
    // http://localhost:3000
    axios.get('https://crudappcuttings.herokuapp.com/api/plants')
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
    axios.get('https://crudappcuttings.herokuapp.com/api/plants', {params : {id : req.query.id}})
    .then(function(plantdata){
        res.render('update_plant',{ plantes_list : plantdata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}