function calcularProbabilidade() {
        const chance = parseFloat(document.getElementById('chanceIndividual').value);
        const n = parseInt(document.getElementById('numTentativas').value);
        const area = document.getElementById('resultadoArea');
        const display = document.getElementById('displayResultado');
        const explicacao = document.getElementById('explicacaoLogica');

        // Validação básica
        if (isNaN(chance) || isNaN(n) || chance <= 0 || n <= 0) {
            area.style.display = 'none';
            return;
        }

        if (chance > 100) {
            display.innerText = "Erro: Chance > 100%";
            area.style.display = 'block';
            return;
        }

        // LÓGICA MATEMÁTICA:
        // A probabilidade de ocorrer pelo menos uma vez é 1 - (chance de falhar em todas)
        // Fórmula: 1 - ( (1 - p)^n )
        const p = chance / 100;
        const chanceFalhaIndividual = 1 - p;
        const chanceFalhaTotal = Math.pow(chanceFalhaIndividual, n);
        const probabilidadeFinal = (1 - chanceFalhaTotal) * 100;

        // Exibição
        area.style.display = 'block';
        display.innerText = probabilidadeFinal.toFixed(2) + "%";

        // Explicação pedagógica (o diferencial da sua calculadora específica)
        if (probabilidadeFinal > 99.999) {
            explicacao.innerText = "Matematicamente quase garantido, mas nunca 100% absoluto.";
        } else {
            explicacao.innerText = `Isso ocorre porque a chance de falhar ${n} vezes seguidas é de ${(chanceFalhaTotal * 100).toFixed(2)}%.`;
        }
    }