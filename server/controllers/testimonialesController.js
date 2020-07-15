const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales =  (req, res)=>{
    Testimonial.findAll()
        .then(testimoniales => res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        }))
        .catch(error =>console.log(error));
}

exports.agregarTestimonial = (req, res) =>{
    // validar que todos los campos estan llenos 
    let {nombre, correo, mensaje} = req.body;

    let errores =[];

    if(!nombre){
        errores.push({'mensaje' : 'Agrega un nombre'})       
    }
    if(!correo){
     errores.push({'mensaje' : 'Agrega un correo'})       
    }
    if(!mensaje){
     errores.push({'mensaje' : 'Agrega un mensaje'})       
    }

    // revisar por errores
    if(errores.length > 0 ){
        //mostrar la vista con errores
        res.render('testimoniales',{
             errores,
             nombre,
             correo,
             mensaje
        });
    }else{
        // agregar info en la base de datos 
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
         .then(testimonial => res.redirect('/testimoniales'))
         .catch(error => console.log(error));

    }

 }