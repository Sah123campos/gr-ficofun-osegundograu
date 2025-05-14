let chart;

function gerarGrafico() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const c = parseFloat(document.getElementById("c").value);
  const corGrafico = document.getElementById("corGrafico").value;
  const corPontos = document.getElementById("corPontos").value;

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    alert("Preencha todos os coeficientes corretamente!");
    return;
  }

  if (a === 0) {
    alert("O coeficiente 'a' deve ser diferente de zero!");
    return;
  }

  const xVals = [];
  const yVals = [];
  const xMin = -10, xMax = 10, step = 0.1;

  for (let x = xMin; x <= xMax; x += step) {
    const y = a * x * x + b * x + c;
    xVals.push(x);
    yVals.push(y);
  }

  const verticeX = -b / (2 * a);
  const verticeY = a * verticeX * verticeX + b * verticeX + c;
  const interseccaoY = { x: 0, y: c };

  let pontosPrincipais = [
    { x: verticeX, y: verticeY },
    interseccaoY
  ];

  const delta = b * b - 4 * a * c;
  let raiz1, raiz2;

  if (delta >= 0) {
    raiz1 = (-b + Math.sqrt(delta)) / (2 * a);
    raiz2 = (-b - Math.sqrt(delta)) / (2 * a);
    pontosPrincipais.push({ x: raiz1, y: 0 });
    pontosPrincipais.push({ x: raiz2, y: 0 });
  }

  const ctx = document.getElementById('grafico').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xVals,
      datasets: [
        {
          label: 'f(x) = ax² + bx + c',
          data: yVals,
          borderColor: corGrafico,
          borderWidth: 2,
          fill: false,
          pointRadius: 0
        },
        {
          type: 'scatter',
          label: 'Pontos Principais',
          data: pontosPrincipais,
          backgroundColor: corPontos,
          pointRadius: 6,
          showLine: false
        }
      ]
    },
    options: {
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          min: -10,
          max: 10,
          ticks: { stepSize: 1 },
          position: 'center',
          grid: { color: '#ccc', lineWidth: 1 },
          border: { color: '#000', width: 3 },
          title: {
            display: true,
            text: 'x'
          }
        },
        y: {
          min: -10,
          max: 10,
          ticks: { stepSize: 1 },
          position: 'center',
          grid: { color: '#ccc', lineWidth: 1 },
          border: { color: '#000', width: 3 }
        }
      },
      plugins: {
        legend: { display: true },
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            speed: 10,
            threshold: 10
          },
          zoom: {
            enabled: true,
            mode: 'xy',
            speed: 0.1,
            sensitivity: 3
          }
        }
      }
    }
  });

  
  const infoDiv = document.getElementById("info-equacao");
  let infoHTML = `<h3>Informações da Equação</h3>`;
  infoHTML += `<p><strong>Equação:</strong> f(x) = ${a}x² + ${b}x + ${c}</p>`;
  infoHTML += `<p><strong>Δ (delta):</strong> ${delta}</p>`;

  if (delta > 0) {
    infoHTML += `<p><strong>Condições de existência:</strong> Duas raízes reais distintas.</p>`;
    infoHTML += `<p><strong>Raízes:</strong> x₁ = ${raiz1.toFixed(2)}, x₂ = ${raiz2.toFixed(2)}</p>`;
    infoHTML += `<p><strong>Interceptos com o eixo x:</strong> (${raiz1.toFixed(2)}, 0) e (${raiz2.toFixed(2)}, 0)</p>`;
  } else if (delta === 0) {
    infoHTML += `<p><strong>Condições de existência:</strong> Uma raiz real (raiz dupla).</p>`;
    infoHTML += `<p><strong>Raiz:</strong> x = ${verticeX.toFixed(2)}</p>`;
    infoHTML += `<p><strong>Intercepto com o eixo x:</strong> (${verticeX.toFixed(2)}, 0)</p>`;
  } else {
    infoHTML += `<p><strong>Condições de existência:</strong> Nenhuma raiz real (raízes complexas).</p>`;
    infoHTML += `<p><strong>Não há interceptos reais com o eixo x.</strong></p>`;
  }

  infoHTML += `<p><strong>Intercepto com o eixo y:</strong> (0, ${c})</p>`;
  infoHTML += `<p><strong>Vértice:</strong> (${verticeX.toFixed(2)}, ${verticeY.toFixed(2)})</p>`;

  infoDiv.innerHTML = infoHTML;
}
