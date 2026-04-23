let rowCount = 0;
const container = document.getElementById('modifiers-container');
const btnAdd = document.getElementById('btnAdd');

function addRow() {
    if (rowCount >= 10) return;
    rowCount++;
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = `
            <select class="type">
                <option value="desconto">Desconto %</option>
                <option value="aumento">Aumento %</option>
            </select>
            <input type="number" class="percent" placeholder="%" step="0.1">
            <button class="btn btn-remove" onclick="removeRow(this)">✕</button>
        `;
    container.appendChild(div);
    if (rowCount === 10) btnAdd.disabled = true;
    }

function removeRow(btn) {
    btn.parentElement.remove();
    rowCount--;
    btnAdd.disabled = false;
}

    // A FUNÇÃO EXTRA SOLICITADA
function verificar_ajuste_final(preco_inicial, preco_resultante) {
    const elemento = document.getElementById('displayComparativo');
        
    if (preco_inicial === preco_resultante) {
            elemento.innerText = "sem diferença";
    } else {
         const a = preco_resultante / preco_inicial;
        if (a < 1) {
                // Se a < 1, é um desconto. Ex: 0.85 significa 15% de desconto.
            const percentualDesconto = ((1 - a) * 100).toFixed(2);
            elemento.innerText = `Variação: desconto real de ${percentualDesconto}%`;
            } else {
                // Se a > 1, é um aumento. Ex: 1.10 significa 10% de aumento.
             const percentualAumento = ((a - 1) * 100).toFixed(2);
            elemento.innerText = `Variação: aumento real de ${percentualAumento}%`;
            }
        }
    }

function verificar_compravel(saldo_inicial, preco_resultante) {
    const elemento = document.getElementById('displayCompravel');
        
    if (saldo_inicial === preco_resultante) {
        elemento.style.color = "blue";
        elemento.innerText = "Valor exato";
    } else {
        if(preco_resultante <= saldo_inicial) {
            elemento.style.color = "green";
            elemento.innerText = "O produto é comprável com o saldo disponível.";
        } else {
            elemento.style.color = "red";
            elemento.innerText = "O produto NÃO é comprável com o saldo disponível.";
         }
            /*const a = preco_resultante / preco_inicial;
            if (a < 1) {
                // Se a < 1, é um desconto. Ex: 0.85 significa 15% de desconto.
                const percentualDesconto = ((1 - a) * 100).toFixed(2);
                elemento.innerText = `Variação: desconto real de ${percentualDesconto}%`;
            } else {
                // Se a > 1, é um aumento. Ex: 1.10 significa 10% de aumento.
                const percentualAumento = ((a - 1) * 100).toFixed(2);
                elemento.innerText = `Variação: aumento real de ${percentualAumento}%`;
            } */
        } 
    }

function calculate() {
    const initialPriceInput = document.getElementById('initialPrice').value;
    const initialPrice = parseFloat(initialPriceInput);
    const saldo = parseFloat(document.getElementById('saldo').value);

    if (isNaN(initialPrice)) {
        alert("Por favor, insira o preço inicial.");
        return;
        }

    let finalPrice = initialPrice;
    const rows = document.querySelectorAll('.row');

    rows.forEach(row => {
        const type = row.querySelector('.type').value;
        const percent = parseFloat(row.querySelector('.percent').value);

        if (!isNaN(percent)) {
            if (type === 'desconto') {
                finalPrice *= (100 - percent) / 100;
            } else {
                 finalPrice *= (100 + percent) / 100;
            }
            }
  });

        // Exibição do Preço Final
    const resultArea = document.getElementById('result-area');
    const displayResult = document.getElementById('displayResult');
        
    resultArea.style.display = 'flex';
    displayResult.innerText = `R$ ${finalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        // Chamada da função de comparação
    verificar_ajuste_final(initialPrice, finalPrice);
    verificar_compravel(saldo, finalPrice);
}