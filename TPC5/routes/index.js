var express = require('express')
var router = express.Router()
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  res.render('index', { title: 'Compositores e Períodos', data: d });
});

/* GET /compositores -------------------------------------------------------------------- */
router.get('/compositores', function(req, res) {
  
  axios.get('http://localhost:3000/compositores')
    .then( resposta => {
      var d = new Date().toISOString().substring(0,16)
      res.render('listaCompositores', {lista: resposta.data, data: d, titulo: "Lista de Compositores"});
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro ao recuperar os compositores."})
    })
});

/* GET /periodos -------------------------------------------------------------------- */
router.get('/periodos', function(req, res) {
  
  axios.get('http://localhost:3000/periodos')
    .then( resposta => {
      var d = new Date().toISOString().substring(0,16)
      res.render('listaPeriodos', {lista: resposta.data, data: d, titulo: "Lista de Períodos"});
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro ao recuperar os períodos."})
    })
});

// GET /compositores/registo --------------------------------------------------------------------
router.get('/compositores/registo', function(req, res) {
  var d = new Date().toISOString().substring(0,16)
  res.render('registoCompositor', {data: d, titulo: "Registo de Compositores"});
});

// GET /compositores/:id --------------------------------------------------------------------
router.get('/compositores/:id', function(req, res) {
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then( resposta => {
      var d = new Date().toISOString().substring(0,16)
      res.render('compositor', {comp: resposta.data, data: d, titulo: "Consulta do Compositor"});
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro ao recuperar o compositor."})
    })
});

// GET /periodos/:id --------------------------------------------------------------------
router.get('/periodos/:id', function (req, res) {
	var d = new Date().toISOString().substring(0, 16);
	axios.get('http://localhost:3000/periodos/' + req.params.id)
		.then(resposta => {
			res.render('periodo', { titulo: 'Consulta do Periodo', periodo: resposta.data, data: d });
		})
		.catch(erro => {
			res.render('error', { message: 'Erro ao recuperar o periodo.', data: d })
		})
});

// POST /compositores/registo --------------------------------------------------------------------
router.post('/compositores/registo', function(req, res){
  var d = new Date().toISOString().substring(0,16)
  console.log(JSON.stringify(req.body))
  axios.post('http://localhost:3000/compositores', req.body)
    .then( resposta => {
      res.redirect('/compositores')
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro ao gravar um compositor novo."})
    })
})


// GET /compositores/edit/:id --------------------------------------------------------------------
router.get('/compositores/edit/:id', function(req, res) {
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then( resposta => {
      var d = new Date().toISOString().substring(0,16)
      res.render('editarCompositor', {comp: resposta.data, data: d, titulo: "Editar Compositor"});
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro ao editar o compositor."})
    })
})


// POST /compositores/edit/:id --------------------------------------------------------------------
router.post('/compositores/edit/:id', function(req, res){
  var d = new Date().toISOString().substring(0,16)
  console.log(JSON.stringify(req.body))
  axios.put('http://localhost:3000/compositores/' + req.params.id, req.body)
    .then( resposta => {
      res.redirect('/compositores')
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro ao editar um compositor."})
    })
})


// GET /alunos/delete/:id --------------------------------------------------------------------
router.get('/compositores/delete/:id', function(req, res){
  console.log(JSON.stringify(req.body))
  axios.delete('http://localhost:3000/compositores/' + req.params.id)
      .then( response => {
        res.redirect('/compositores')
      })
      .catch(erro =>{
        res.render('error', {error: erro, message: "Erro ao eliminar o compositor."})
      })
})


module.exports = router;