# Jogo de Cartas: Memória JS

Jogo da memória feito com HTML, CSS e JavaScript puro. Em vez de imagens, os pares combinam **termos de JavaScript** com o que cada um faz, então dá para jogar e revisar a matéria ao mesmo tempo.

## Como jogar

1. Clique em uma carta para virá-la e depois em uma segunda carta.
2. Se as duas formarem um par (o termo e a explicação dele), elas ficam verdes e travadas.
3. Se não formarem, as cartas desviram sozinhas e você tenta de novo.
4. O jogo termina quando você encontra todos os 10 pares.

O cronômetro começa na primeira carta virada e para quando o último par é encontrado. O botão **Reiniciar** embaralha as cartas e zera o placar.

## Funcionalidades

- Cartas que viram com animação 3D em CSS
- Comparação de pares a cada jogada
- Cronômetro em formato mm:ss
- Contador de jogadas
- Melhor tempo salvo no navegador (`localStorage`)
- Cartas embaralhadas a cada partida
- Jogável também pelo teclado (Tab para escolher a carta, Enter ou Espaço para virar)
- Layout adaptado para telas pequenas

## Pares do jogo

| Termo | O que faz |
|---|---|
| `getElementById` | Pega um elemento da página pelo id |
| `addEventListener` | Executa uma função quando acontece um evento |
| `classList.toggle` | Liga ou desliga uma classe CSS |
| `fetch` | Busca dados de uma API |
| `async / await` | Espera uma resposta sem travar a página |
| `try / catch` | Captura e trata erros do código |
| `class` | Molde para criar objetos com constructor |
| `filter` | Cria um novo array só com os itens que passam no teste |
| `localStorage` | Guarda dados no navegador, mesmo após recarregar |
| `import / export` | Compartilha código entre arquivos (módulos) |

## Tecnologias

- HTML5
- CSS3
- JavaScript (sem frameworks nem bibliotecas)

## Como rodar

Não precisa instalar nada.

1. Baixe ou clone o repositório:
   ```bash
   git clone https://github.com/macielzxz/NOME-DO-REPOSITORIO.git
   ```
2. Abra a pasta do projeto.
3. Dê dois cliques no `index.html` para abrir no navegador.

## Estrutura do projeto

```
.
├── index.html   # estrutura da página
├── style.css    # visual e animação das cartas
├── script.js    # lógica do jogo
└── README.md
```

## Como funciona o JavaScript

- **`pares`**: lista com os termos e as explicações. O `id` liga o termo à sua explicação.
- **`montarTabuleiro`**: cria um baralho com 2 cartas por par e chama o `embaralhar`.
- **`criarCarta`**: monta o elemento de cada carta, com a face de trás (`?`) e a da frente (o texto).
- **`virarCarta`**: vira a carta clicada, ignorando cliques enquanto duas cartas estão sendo comparadas.
- **`compararCartas`**: compara o `data-id` das duas cartas viradas. Se for igual, marca como acertada; se não, desvira depois de 900 ms.
- **`iniciarTimer` e `pararTimer`**: controlam o cronômetro com `setInterval`.
- **`terminarJogo`**: mostra a mensagem de vitória e salva o melhor tempo no `localStorage`.

## Personalizando

Para trocar ou acrescentar assuntos, edite a lista `pares` no início do `script.js`. Cada item precisa de um `id` diferente dos outros:

```js
{id: 11, termo: 'map', descricao: 'Cria um novo array transformando cada item'}
```

O tabuleiro se ajusta sozinho ao número de pares.

## Autor

Feito por [macielzxz](https://github.com/macielzxz).
