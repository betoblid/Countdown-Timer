//pegando elementos do DOM
const days = document.getElementById('day');
const hors = document.getElementById('hors');
const minuts = document.getElementById('minut');
const seconds = document.getElementById('second');
const cxemail = document.getElementById('cxemail');
const cxnome = document.getElementById('cxnome');
const cxtel = document.getElementById('cxtel');
const closer = document.getElementById("close");
const formu = document.getElementById("form-cadastro");
const inscrever = document.getElementById("inscrever");
const enviar = document.getElementById("concluido");
const AlertAviso = document.getElementById("mensagem");
const popUpCard = document.getElementById("pop-up-alert");

//function responsavel por fazer a conveção
function DateTime() {

    //pegando a data atual
    const dataatual = new Date();
    //inserindo a data de lançamento
    const lançamento = new Date('2024-12-31');
    //fazendo o calculo da diferença de segundos
    const totalSecond = (lançamento - dataatual) / 1000;

    //dividindo o total da conta por 3600 que é equivalente a minutos de um dia todo e dividindo por 24 que é o equivalente de horas que tem em um dia
    let yeas = Math.floor(totalSecond / 3600 / 24);
    //divide o total por minutos de um dia todo e faz a divição sobre esse valor e mostre o resto da divição de 24
    let hor = Math.floor(totalSecond / 3600) % 24;
    //pega o total divide por 60 que é o equivalente a uma hora em minutos e divide por 60 de novo e mostre o resto da divição por 60
    let min = Math.floor(totalSecond / 60) % 60;
    //nós segundos apenas faz a divição e mostre o resto da divição de 60
    let seg = Math.floor(totalSecond % 60);

    //fazendo uma validação para que caso hora, minutos, segundos ou dias for menos que 10 concatena com 0 para que sempre fique dois caracteres, poderiamos usar o toFixed(2) para que sempre mostre duas casinhas mas preferi a validação para não aver bugs no futuro
    days.textContent = yeas < 10 ? `0${yeas}` : yeas ;
    hors.textContent = hor < 10 ? `0${hor}` : hor;
    minuts.textContent = min < 10 ? `0${min}` : min;
    seconds.textContent = seg < 10 ? `0${seg}` : seg;
}
//execute essa função repetida mente a cada 1segundo
setInterval(DateTime, 1000);


//validando formulario
function validaremail(email){
    let teste = /\S+@\S+\.\S+/;
    if(teste.test(email) === false){
        //controle de alerta para não aver bugs
        if(controlAlert == false){
            AlertMensagem("Digite o email Corretamente")
        }  
        return false
    }else{
        return true
    }
}
function validarName(){
    if(cxnome.value.length > 4){
        return true
    }else{
         //controle de alerta para não aver bugs
        if(controlAlert == false){
            AlertMensagem("Digite um Nome Valido")
        }
        return false
    }
}

//variavel de controle do alertmensagem
let controlAlert = false
//function para chamar uma mensagem
function AlertMensagem(mensagem) {

    popUpCard.classList.remove("off")
    popUpCard.classList.add("alert-mensagns")
    controlAlert = true

    setTimeout(() => {
        popUpCard.classList.remove("alert-mensagns")
        popUpCard.classList.add("off")
        controlAlert = false
   
    },4000)

    AlertAviso.textContent = mensagem
}
//function responsavel por fechar o formulario
function btnclose(){
    if(formu.classList.contains("form-pop-up")){
        formu.classList.remove("form-pop-up")
        formu.classList.add("off")
    }else{
        formu.classList.remove("off")
        formu.classList.add("form-pop-up")
        
    }
}
//function que envia dados, futuramente enviará para uma api
function enviarDados(event){
   if(validaremail(cxemail.value) && validarName()){
    if(controlAlert == false){
        AlertMensagem("Cadastro concluido")
        popUpCard.style.background = 'green'

        btnclose()
        cxemail.value = ""
        cxnome.value = ""
        cxtel.value = ""
        setTimeout(() => {
            popUpCard.style.background = '#858585'
        },4000)
    }
   }

   event.preventDefault()
   

}
closer.addEventListener("click", btnclose)
inscrever.addEventListener("click", btnclose)
cxnome.addEventListener("blur", validarName)
