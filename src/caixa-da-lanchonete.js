class CaixaDaLanchonete {

    constructor() {
        // Construtor para inicializar o menu
        this.cardapio = new Map([
            ['cafe', 3.00],
            ['chantily', 1.50],
            ['suco', 6.20],
            ['sanduiche', 6.50],
            ['queijo', 2.00],
            ['salgado', 7.25],
            ['combo1', 9.50],
            ['combo2', 7.50]
        ]);
    }

    calcularValorDaCompra(metodoDePagamento, Menu) {
        // Definir métodos de pagamento válidos
        const formasPagamento = ['dinheiro', 'debito', 'credito'];

        // Verificar se o método de pagamento é válido
        if (!formasPagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        // Verificar se o carrinho está vazio
        if (Menu.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Inicializar o valor total
        let valorTotal = 0;

        // Calcular o valor total com base nos itens do menu e suas quantidades
        for (const item of Menu) {
            const words = item.split(",");
            const itemInfo = this.cardapio.get(words[0]);
            
            // Verificar se o item do menu é válido
            if (!itemInfo) {
                return "Item inválido!";
            }

            const quantItem = words[1];

            // Verificar se a quantidade é válida
            if (quantItem <= 0) {
                return "Quantidade inválida!";
            }

            valorTotal += itemInfo * quantItem;
        }

        // Rastrear os itens principais para validação
        let Pedidos = [];

        // Validar itens extras pedidos sem os itens principais correspondentes
        for (const item of Menu) {
            const words = item.split(",");
            Pedidos.push(words[0]);
            
            if (['chantily', 'queijo'].includes(words[0])) {
                const itemPrincipal = words[0] === 'chantily' ? 'cafe' : 'sanduiche';
                
                // Verificar se os itens extras são pedidos sem seus itens principais
                if (!Pedidos.includes(itemPrincipal)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }

        // Aplicar descontos ou acréscimos com base no método de pagamento
        if (metodoDePagamento === 'dinheiro') {
            valorTotal = valorTotal * 0.95; // Desconto de 5%
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03; // Acréscimo de 3%
        }

        // Formatar e retornar o valor total
        const result = "R$ " + valorTotal.toFixed(2);
        return result.replace('.', ',');
    }
}

export { CaixaDaLanchonete };
