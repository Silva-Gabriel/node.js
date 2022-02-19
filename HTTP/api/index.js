const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')
const data = require('./urls.json')

function writeFile(callback)
{
    fs.writeFile(path.join(__dirname, 'urls.json'),JSON.stringify(data, null, 2 ),
            erro => {
                if(erro) throw erro

                callback.end(JSON.stringify({message:'OK'}))
            }
        )
}

http.createServer((requisicao,resposta) => {
        const { name, url, del } = URL.parse(requisicao.url,true).query

        if(!name || !url)
            return resposta.end('Mostrar todos')

        if(del){
            data.urls = data.urls.filter(item => String(item.url) != String(url))  
            return writeFile((message) => {
                resposta.end(message)
            })
    }
    data.urls.push({name, url})

    return writeFile((message) => resposta.end(message))
}).listen(3000, () => console.log('API tá de pé!!!'))