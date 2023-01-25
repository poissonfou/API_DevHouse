const multer = require('multer');//é um pacote que facilita o processo de upload de arquivos pelo Node.
const path = require('path'); //exporta path do node para poder trabalhar com paths de arquivos

module.exports = {
    storage: multer.diskStorage({ //permite controlar como arquivos serão salvos em disco
        destination: path.resolve(__dirname, '..', '..', 'uploads'), //destination define onde vai ser guardado
        //resolve tranforma um sequença de caminhos/seguimentos de caminhos em um caminho absoluto
        filename: (req, file, cb) => { //parâmetro file é usado para tratar o arquivo, e é callback, chamada depois de tudo feito
            //filename define o nome do arquivo
            const ext = path.extname(file.originalname); //recebe uma string e retorna a extensão do arquivo a partir da
            //última ocorrência do ponto final. Original name acessa o nome do arquivo no computador que esta fazendo upload
            const name = path.basename(file.originalname, ext);
            //basename retorna a última porção de uma path. O primeiro parâmetro é o path, o segundo é um sufixo
            //opcional que se quer remover. É case-sensitive

            cb(null, `${name}-${Date.now()}${ext}`)//concatena nome com a data atual, além da extensão
            //cb é uma callback function, sendo executada depois que tratados req e file.
            //sua estrutura já esta definida 
            //O primeiro argumento é null porque se refere a estruturas de erro, como não temos nenhuma aqui null
            //cbs que lidam com erros são comuns em funções assíncronas. O segundo parâmetro é o retorno se naõ houver
            //erro.
        },
    }) //define que os arquivos vão ser salvos localmente
};