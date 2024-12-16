let listaDeNumerosSorteados = []; 
let numeroLimite = 1000;
let numeroaleatorio = gerarNumeroAleatorio();
let tentativas = 1;


function aparecerTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.8;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador");
    }
} 

function exibirMensagemInicial() {
    aparecerTextoNaTela('h1','Número Secreto');
    aparecerTextoNaTela('p','Escolha um número entre 1 e 1000');

}
 exibirMensagemInicial();   

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroaleatorio) {
        aparecerTextoNaTela('h1','Parabéns, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        aparecerTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); 
    } else {
        if(chute > numeroaleatorio) {
            aparecerTextoNaTela('p','O número secreto é menor');
        } else {
            aparecerTextoNaTela('p','O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt (Math.random() *numeroLimite + 1); 
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroaleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
