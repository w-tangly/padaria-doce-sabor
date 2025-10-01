const PadariaSystem = require('./app');
const ProductController = require('./src/controllers/productController');
const CategoryController = require('./src/controllers/categoryController');
const Logger = require('./src/utils/logger');

async function runTests(){
    console.log('=== 🧪 EXECUTANDO TESTES ===');

    try{
        // teste 1: cria controllers
        console.log('\n Teste 1: Criando controllers...');
        const productController = new ProductController();
        const categoryController = new CategoryController();
        const logger = new Logger();
        console.log('Controllers criados com sucesso!');

        // teste 2: criar categorias
        console.log('\nTeste 2: Criando categoria de teste...');
        const testCategory = await categoryController.createCategory({
            name: 'Teste',
            description: 'Categoria para testes'
        });
        console.log('Categoria para testes criada!');

        // teste 3: criar produto
        console.log('\nTeste 3: Criando produto de teste...');
        const testProduct = await categoryController.createProduct({
            name: 'Produto teste',
            price: 5.99,
            category: 'Teste',
            description: 'Produto para testes'
        });
        console.log('Produto de teste criado!');
        
        // teste 4: listar produtos
        console.log('\nTeste 4: listando produtos...');
        const products = await productController.getAllProducts();
        console.log(`${products.length} produtos encontrados!`);

        // teste 5: sistema completo
        console.log('\nTeste 5: testando sistema completo...');
        const sistema = new PadariaSystem();
        await sistema.init();
        console.log('Sistema completo testado!');

        console.log('\n=== 🎉 TODOS OS TESTES PASSARAM ===');
        console.log('O sistema está funcionando perfeitamente!');
        console.log('Você pode executar: node app.js');

    } catch(error) {
        console.error('Erro durante os testes:', error.message);
        console.error('Verifique se todos os arquivos foram criados corretamente');
    }
}

// executar testes
if (require.main === module) {
    runTests()
}

module.exports = runTests;