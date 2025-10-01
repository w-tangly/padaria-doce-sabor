const Product = require('../models/Product');
const FileHelper = require('../utils/fileHelper');
const path = require('path');

class ProductController{
    constructor(){
        this.dataPath = path.join(__dirname, '..', 'data', 'product.json');
        this.fileHelper = new FileHelper();
    }

    // cria um produto
    async createProduct(productData) {
        try{
            // carregar produtos existentes
            const products = await this.getAllProducts();

            // cria novo produto
            const newProduct = new Product(
                productData.name,
                productData.price,
                productData.category,
                productData.description,
            );

            // adiciona a lista
            products.push(newProduct);

            // salva no arquivo
            await this.fileHelper.writeJSON(this.dataPath, products);
            console.log(`Produto "${newProduct.name}" criado com sucesso!`);
            return newProduct;
        }catch (error){
            console.error('Erro ao criar o produto:', error.message);
            throw error;
        }
    }

    // lista todos os produtos
    async getAllProducts(){
        try{
            const products = await this.fileHelper.readJSON(this.dataPath);
            return products || [];
        }catch (error){
            console.log('Arquivo de produtos não encontrado, criando novo...');
            return [];
        }
    }

    // atualizar produto
    async updateProduct(id, updateData) {
        try{
            const products = await this.getAllProducts();
            const productIndex = products.findIndex(p => p.id === id);

            if (productIndex === -1){
                throw new Error(`Produto com ID ${id} não encontrado`);
            }

            // atualizar dados
            products[productIndex] = {...products[productIndex], ...updateData};

            // salvar no arquivo
            await this.fileHelper.writeJSON(this.dataPath, products);
            console.log(`Produto "${products[productIndex].name}" atualizado!`);
            return products[productIndex];
        } catch(error) {
            console.error('Erro ao atualizar produto:', error.message);
            throw error;
        }
    }

    // deleta o produto
    async deleteProduct(id){
        try{
            const products = await this.getAllProducts();
            const productIndex = products.findIndex(p => p.id === id);

            if(productIndex === -1){
                throw new Error(`Produto com ID ${id} não encontrado`);
            }

            const deletedProduct = products.splice(productIndex, 1)[0];

            // salva no arquivo
            await this.fileHelper.writeJSON(this.dataPath, products);
            console.log(`Produto "${deletedProduct.name}" deletado!`);
            return deletedProduct;
        } catch (error){
            console.error('Erro ao deletar produto:', error.message);
            throw error;
        }
    }

    // Busca produtos por categoria
    async getProductsByCategory (categoryName){
        try{
            const products = await this.getAllProducts();
            return products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
        } catch (error) {
            console.error('Erro ao buscar produtos por categoria:', error.message);
            throw error;
        }
    }
}

module.exports = ProductController;