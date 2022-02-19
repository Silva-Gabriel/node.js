const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((requisicao,resposta) => {

    const file = requisicao.url === '/' ? 'index.html' : requisicao.url
    const filePath = path.join(__dirname,'Public',file)

    fs.readFile(
        filePath,
        (erro,conteudo) => {
            if(erro) throw erro

            resposta.end(conteudo)
        })

}).listen(5000, () => console.log('Servidor tá de pé!!!'))