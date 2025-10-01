// pega as coisas necessárias para o programa
const fs = require('fs').promises;
const path = require('path');

// static = funções que funcionam sem precisar criar um objeto primeiro
class FileHelper{
    // função pra ler JSON
    static async readJSON(filePath){
        try{
            // lê o arquivo como um texto normal
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error){
            console.error('Ops! Não pude ler o arquivo:', error);
            return null;
        }
    }

    // função pra escrever um arquivo em JSON
    static async writeJSON(filePath, data){
        try{
            // traduz JSON para texto comum
            const jsonData = JSON.stringify(data, null, 2);
            // salva o texto no arquivo
            await fs.writeFile(filePath, jsonData, 'utf8');
            return true;
        } catch (error) {
            console.error('Ops! Não pude salvar o arquivo:', error);
            return false;
        }
    }

    // função para criar a pasta
    static async ensureDirectory(dirPath){
        try{
            // cria as pastas
            // recursive = vai criando pastas uma dentro da outra conforme a necessidade
            await fs.mkdir(dirPath, {recursive: true});
            return true;
        } catch (error) {
            console.error('Ops! Não pude criar a pasta:', error);
            return false;
        }
    }
}

module.exports = FileHelper;