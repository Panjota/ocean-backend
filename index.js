const express = require('express');
const app = express();
app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hello, World!');
});


app.get('/oi', function(req, res) {
    res.send('Olá, mundo!');
});

const lista =["Mulher Maravilhar", "Capitã Marvel", "Homem de Ferro"]

app.get('/lista', function(req, res) {
    res.send(lista.filter(Boolean));
});

app.post('/lista', function(req, res) {
    console.log(req.body);
    const item = req.body.nome;
    lista.push(item);
    res.send("Adicionado com sucesso!");    
});

app.get("/lista/:id", function(req, res){
    const id = req.params.id - 1;
    const item = lista[id];
    res.send(item);
})

app.put("/lista/:id", function(req, res){
    const id = req.params.id - 1;
    const item = req.body.nome;
    lista[id] = item;
    res.send("Alterado com sucesso!");
})

app.delete("/lista/:id", function(req, res){
    const id = req.params.id - 1;
    delete lista[id]
    res.send("Removido com sucesso!");
})

app.listen(3000)