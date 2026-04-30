function calcularInversao() {
    const tipo = document.getElementById('inversorTipo').value;
    const percentual = parseFloat(document.getElementById('percentualInput').value);
    const area = document.getElementById('resultado-inversao');
    const texto = document.getElementById('textoInversao');

    if (isNaN(percentual) || percentual <= 0) {
        area.style.display = 'none';
        return;
    }

    let resultado = 0;
    let acaoNecessaria = "";

    if (tipo === 'desconto') {
        // Se cair 50% (0.5), preciso subir 100% (1.0) para voltar
        if (percentual >= 100) {
            texto.innerText = "Impossível retornar: um desconto de 100% zera o valor.";
            area.style.display = 'block';
            return;
        }
        resultado = (1 / (1 - (percentual / 100)) - 1) * 100;
        acaoNecessaria = "Aumento";
    } else {
        // Se subir 100% (1.0), preciso descer 50% (0.5) para voltar
        resultado = (1 - 1 / (1 + (percentual / 100))) * 100;
        acaoNecessaria = "Desconto";
    }

    area.style.display = 'block';
    texto.innerHTML = `Para retornar ao valor original, você precisa de um <br> 
                       <strong style="font-size: 1.4rem;">${acaoNecessaria} de ${resultado.toFixed(2)}%</strong>`;
}