var pares = [
    {id: 1, termo: 'getElementById', descricao: 'Pega um elemento da página pelo id'},
    {id: 2, termo: 'addEventListener', descricao: 'Executa uma função quando acontece um evento'},
    {id: 3, termo: 'classList.toggle', descricao: 'Liga ou desliga uma classe CSS'},
    {id: 4, termo: 'fetch', descricao: 'Busca dados de uma API'},
    {id: 5, termo: 'async / await', descricao: 'Espera uma resposta sem travar a página'},
    {id: 6, termo: 'try / catch', descricao: 'Captura e trata erros do código'},
    {id: 7, termo: 'class', descricao: 'Molde para criar objetos com constructor'},
    {id: 8, termo: 'filter', descricao: 'Cria um novo array só com os itens que passam no teste'},
    {id: 9, termo: 'localStorage', descricao: 'Guarda dados no navegador, mesmo após recarregar'},
    {id: 10, termo: 'import / export', descricao: 'Compartilha código entre arquivos (módulos)'}
];

var tabuleiro = document.getElementById('tabuleiro');
var elTempo = document.getElementById('tempo');
var elJogadas = document.getElementById('jogadas');
var elMelhor = document.getElementById('melhor');
var elMensagem = document.getElementById('mensagem');
var btnReiniciar = document.getElementById('btnReiniciar');

var primeira = null;
var segunda = null;
var bloqueado = false;
var acertos = 0;
var jogadas = 0;
var segundos = 0;
var intervalo = null;

function formatarTempo(total) {
    var minutos = Math.floor(total / 60);
    var resto = total % 60;
    var texto = '';
    if (minutos < 10) {
        texto += '0';
    }
    texto += minutos + ':';
    if (resto < 10) {
        texto += '0';
    }
    texto += resto;
    return texto;
}

function embaralhar(lista) {
    for (var i = lista.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = lista[i];
        lista[i] = lista[j];
        lista[j] = temp;
    }
    return lista;
}

function mostrarMelhorTempo() {
    var melhor = localStorage.getItem('memoria_melhor');
    if (melhor === null) {
        elMelhor.textContent = '--:--';
    } else {
        elMelhor.textContent = formatarTempo(Number(melhor));
    }
}

function iniciarTimer() {
    if (intervalo !== null) {
        return;
    }
    intervalo = setInterval(function() {
        segundos++;
        elTempo.textContent = formatarTempo(segundos);
    }, 1000);
}

function pararTimer() {
    clearInterval(intervalo);
    intervalo = null;
}

function criarCarta(dados) {
    var carta = document.createElement('div');
    carta.className = 'carta';
    carta.setAttribute('data-id', dados.id);
    carta.setAttribute('role', 'button');
    carta.setAttribute('tabindex', '0');

    carta.innerHTML =
     '<div class="carta-interna">' +
        '<div class="face verso">?</div>' +
        '<div class="face frente ' + dados.tipo + '"></div>' +
     '</div>';

    carta.querySelector('.frente').textContent = dados.texto;

    carta.addEventListener('click', function () {
        virarCarta(carta);
    });
    carta.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            virarCarta(carta);
        }
    });

    return carta;
}

function montarTabuleiro() {
    var baralho = [];
    for (var i = 0; i < pares.length; i++) {
        baralho.push({id: pares[i].id, tipo: 'termo', texto: pares[i].termo});
        baralho.push({id: pares[i].id, tipo: 'descricao', texto: pares[i].descricao});
    }
    embaralhar(baralho);

    tabuleiro.innerHTML = '';
    for (var j = 0; j < baralho.length; j++) {
        tabuleiro.appendChild(criarCarta(baralho[j]));
    }
}

function virarCarta(carta) {
    if (bloqueado) {
        return;
    }
    if (carta.classList.contains('virada') || carta.classList.contains('acertada')) {
        return;
    }

    iniciarTimer();
    carta.classList.add('virada');

    if (primeira === null) {
        primeira = carta;
        return;
    }

    segunda = carta;
    jogadas++;
    elJogadas.textContent = jogadas;
    compararCartas();
}

function compararCartas() {
    var mesmoPar = primeira.getAttribute('data-id') === segunda.getAttribute('data-id');

    if (mesmoPar) {
        primeira.classList.remove('virada');
        segunda.classList.remove('virada');
        primeira.classList.add('acertada');
        segunda.classList.add('acertada');
        limparJogada();

        acertos++;
        if (acertos === pares.length) {
            terminarJogo();
        }

        return;
    }

    bloqueado = true;
    setTimeout(function () {
        primeira.classList.remove('virada');
        segunda.classList.remove('virada');
        limparJogada();
    }, 900);
}

function limparJogada() {
    primeira = null;
    segunda = null;
    bloqueado = false;
}

function terminarJogo() {
    pararTimer();

    var texto = 'Parabéns! Você terminou em ' + formatarTempo(segundos) + ' com ' + jogadas + ' jogadas.';

    var melhor = localStorage.getItem('memoria_melhor');
    if (melhor === null || segundos < Number(melhor)) {
        localStorage.setItem('memoria_melhor', segundos);
        texto += ' Novo melhor tempo!';
        mostrarMelhorTempo();
    }

    elMensagem.textContent = texto;
}

function novoJogo() {
    pararTimer();
    primeira = null;
    segunda = null;
    bloqueado = false;
    acertos = 0;
    jogadas = 0;
    segundos = 0;

    elTempo.textContent = '00:00';
    elJogadas.textContent = '0';
    elMensagem.textContent = '';

    montarTabuleiro();
}

btnReiniciar.addEventListener('click', novoJogo);

mostrarMelhorTempo();
novoJogo();