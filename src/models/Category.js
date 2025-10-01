// Criando o molde de uma "seção" da padaria
class Category{
    // função que roda quando criamos uma nova seção
    constructor(id, name, description, icon){
        // informações para preencher a seção
        this.id = id;
        this.name = name;
        this.description = description;
        this.icon = icon;

        // informações que o programa preenche sozinho
        this.active = true;
        this.createdAt = new Date();
        this.productCount = 0;
    }

    // funções úteis
    
    // salva o arquivo em JSON
    toJSON(){
        return{
            id: this.id,
            name: this.name,
            description: this.description,
            icon: this.icon,
            active: this.active,
            createdAt: this.createdAt,
            productCount: this.productCount
        };
    }

    // função para editar informações
    update(newData){
        // só muda o que a pessoa selecionou
        if (newData.name) this.name = newData.name;
        if (newData.description) this.description = newData.description;
        if (newData.icon) this.icon = newData.icon;
        if (newData.active !== undefined) this.active = newData.active;
    }

    // função para colocar um produto na seção
    addProduct(){
        this.productCount++;
    }

    // função para remover um produto da seção
    removeProduct(){
        if (this.productCount > 0){
            this.productCount--;
        }
    }
}

module.exports = Category;