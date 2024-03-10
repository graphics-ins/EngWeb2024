var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var compServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url)

    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /compositores --------------------------------------------------------------------
                if(req.url == '/compositores'){
                    axios.get('http://localhost:3000/compositores')
                        .then(response => {
                            res.writeHead(200, {'Content-Type' : 'text/html'})
                            res.end(templates.compositoresListPage(response.data,d ))
                        })
                        .catch( erro =>{
                            res.writeHead(520, {'Content-Type' : 'text/html'})
                            res.end(templates.errorPage(erro,d ))
                        })
                }
                // GET /compositores/:id --------------------------------------------------------------------
                else if(/\/compositores\/C[0-9]+$/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                        .then(response => {
                            res.writeHead(200, {'Content-Type' : 'text/html'})
                            res.end(templates.compositorPage(response.data,d ))
                        })
                        .catch( erro =>{
                            res.writeHead(520, {'Content-Type' : 'text/html'})
                            res.end(templates.errorPage(erro,d))
                        })

                }
                // GET /compositores/registo --------------------------------------------------------------------
                else if(req.url == '/compositores/registo'){
                    res.writeHead(200, {'Content-Type' : 'text/html'})
                    res.end(templates.compositorFormPage(d))
                }

                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C[0-9]+$/.test(req.url)){
                    var partes = req.url.split('/')
                    idCompositor = partes[partes.length - 1]

                    axios.get('http://localhost:3000/compositores/' + idCompositor)
                        .then(response => {
                            res.writeHead(200, {'Content-Type' : 'text/html'})
                            res.end(templates.compositorFormEditPage(response.data,d ))
                        })
                        .catch( erro =>{
                            res.writeHead(520, {'Content-Type' : 'text/html'})
                            res.end(templates.errorPage(erro,d ))
                        })

                }


                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if(/\/compositores\/delete\/C[0-9]+$/.test(req.url)){
                    var partes = req.url.split('/')
                    idCompositor = partes[partes.length - 1]
                    axios.delete('http://localhost:3000/compositores/' + idCompositor)
                        .then( response => {
                            res.writeHead(200, {'Content-Type' : 'text/html'})
                            res.end(templates.compositoresListPage(response.data,d ))
                        })
                        .catch(erro =>{
                            res.writeHead(521, {'Content-Type' : 'text/html'})
                            res.end(templates.errorPage(erro,d))
                        })
                }


                else if(req.url == "/"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.mainPage(d))
                    res.end()
                }

                else if(req.url == "/periodos"){
                    axios.get('http://localhost:3000/periodos')
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(templatesPeriodo.periodsListPage(response.data, d));
                        })
                        .catch(function(erro){
                            res.writeHead(520, {'Content-Type' : 'text/html'})
                            res.end(templates.errorPage(erro,d))
                        })

                }else if(/\/periodos\/.+$/.test(req.url)){
                    var partes = req.url.split('/')
                    idPeriodo = partes[partes.length - 1]
                    axios.get('http://localhost:3000/periodos/'+idPeriodo)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(templatesPeriodo.periodPage(response.data, d));
                        })
                        .catch(function(erro){
                            res.writeHead(521, {'Content-Type' : 'text/html'})
                            res.end(templates.errorPage(erro,d))
                        })
                }
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type' : 'text/html'})
                    res.end(templates.errorPage(`Pedido GET não suportado: ${req.url}`,d ))
                }
                break

            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if(req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/compositores', result)
                                .then(response => {
                                    res.writeHead(201, {'Content-Type' : 'text/html'})
                                    res.end(templates.compositorPage(response.data,d ))
                                })
                                .catch( erro =>{
                                    res.writeHead(520, {'Content-Type' : 'text/html'})
                                    res.end(templates.errorPage(erro,d ))
                                })
                        }
                        else{
                            res.writeHead(201, {'Content-Type' : 'text/html; charset-utf-8'})
                            res.write("<p>Unable to connect data from body...</p>")
                            res.end()
                        }

                        })
                }
                // POST /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C[0-9]+$/.test(req.url)){
                    var partes = req.url.split('/')
                    idCompositor = partes[partes.length - 1]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/compositores/' + idCompositor, result)
                                .then(response => {
                                    res.writeHead(201, {'Content-Type' : 'text/html'})
                                    res.end(templates.compositorPage(response.data,d ))
                                })
                                .catch( erro =>{
                                    res.writeHead(520, {'Content-Type' : 'text/html'})
                                    res.end(templates.errorPage(erro,d ))
                                })
                        }
                        else{
                            res.writeHead(201, {'Content-Type' : 'text/html; charset-utf-8'})
                            res.write("<p>Unable </p>")
                            res.end()
                        }
                    })
                }

                // POST ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type' : 'text/html'})
                    res.end(templates.errorPage(`Pedido POST não suportado: ${req.url}`,d ))
                }
            default: 
        }
    }
})

exports.mainPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositores</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Compositores</h1>
                </header>
                <div class="w3-container">
                    <p>HOME PAGE</p>
                </div>
                [<a class="w3-btn w3-round w3-teal" href="/compositores">Compositores</a>]
                [<a class="w3-btn w3-round w3-red" href="/periodos">Periodos</a>]
                <footer class="w3-container w3-blue">
                    <h5>Generated by JoaoGDFaria in ${d}</h5>
                </footer>
            </div>
        </body>
        `
}

compServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



