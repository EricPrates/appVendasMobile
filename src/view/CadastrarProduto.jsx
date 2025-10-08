import EntradadeTexto from "./EntradadeTexto";
import ViewBase from "./ViewBase";

export default function CadastrarProduto() {
    return (
        <ViewBase tabAtiva="cadastrarProduto">
            <Text>Cadastrar Produto</Text>
            <EntradadeTexto text = "nome do produto" />
        </ViewBase>
    );
}