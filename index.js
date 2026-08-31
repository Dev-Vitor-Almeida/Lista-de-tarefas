const tarefa = document.getElementById("tarefa");
const btnAdicionar = document.getElementById("adicionarTarefa");
const areaTarefas = document.getElementById("areaTarefas");

const tarefas = [];

btnAdicionar.addEventListener("click", function(){
    const tarefaDigitada = tarefa.value;
    
    areaTarefas.innerHTML = ""
    
    if(tarefaDigitada.trim() !== ""){
        tarefas.push(tarefaDigitada) 
        
        tarefas.forEach(function(itemtarefa){
        areaTarefas.innerHTML += `<li>${itemtarefa}</li>`
    })
    }else{
        alert("Digite uma tarefa")
    } 
    tarefa.value = ""
})    





