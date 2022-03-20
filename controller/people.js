const People= require("../models/people")

exports.create_people = function(req,res){
    const people = new People({
        name: req.body.name,
        description:req.body.description,
        image: 'people/' + req.body.name + '.png',
        job_title:req.body.job_title,
        dob:req.body.dob
    })
    people.save().then((result)=>{
        res.send(result);
    }).catch((err)=> {
        res.status(500).send(err);
    });
}

exports.get_people = function(req,res){
    People.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
}
