// Ficha de produto

// criação da classe ("molde")
class Product{
    // o 'constructor' é como preencher essa "ficha de produto"
    // quando alguém for criar um produto, precisara preencher essas informações
    constructor(id, name, description, price, categoryId, imageUrl){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.imageUrl = imageUrl;

        // essa parte o programa preenche sozinho
        this.avaible = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // funções para trabalhar com o produto

    // função para salvar no arquivo
    toJSON(){
        // JSON é como uma "lista organizada" que o computador entende
        return{
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            categoryId: this.categoryId,
            imageUrl: this.imageUrl,
            avaible: this.avaible,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    // função para editar as informações do produto
    update(newData){
        // só muda o que a pessoa selecionou
        if (newData.name) this.name = newData.name;
        if (newData.description) this.description = newData.description;
        if (newData.price) this.price = newData.price;
        if (newData.categoryId) this.categoryId = newData.categoryId;
        if (newData.imageUrl) this.imageUrl = newData.imageUrl;
        if (newData.avaible !== undefined) this.avaible = newData.avaible;

        // marca quando foi a ultima alteração
        this.updatedAt = new Date();
    }

    // função para mostrar o preço com duas casas
    getFormattedPrice(){
        return `R$ ${this.price.toFixed(2).replace('.', ',')}`;
    }

    // função pra ver se o produto esta disponivel
    isAvaible(){
        return this.avaible === true;
    }
}

// exporta o arquivo
module.exports = Product;