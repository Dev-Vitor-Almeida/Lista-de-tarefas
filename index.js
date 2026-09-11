const tarefa = document.getElementById("tarefa");
const btnAdicionar = document.getElementById("adicionarTarefa");
const areaTarefas = document.getElementById("areaTarefas");
const prioridade = document.getElementById("prioridade")

const tarefas = []; 

function mostrarTarefas(){
    areaTarefas.innerHTML = ""
    
    tarefas.forEach(function(itemtarefa){
        const li = document.createElement("li");
        li.textContent = itemtarefa.texto;

        const prioridadeTexto = document.createElement("span");
        prioridadeTexto.textContent = itemtarefa.prioridade
        li.appendChild(prioridadeTexto)

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Remover"

        li.appendChild(botaoExcluir)

        areaTarefas.appendChild(li)

        botaoExcluir.addEventListener("click", function(){
            const indice = tarefas.findIndex(function(tarefa){
                return tarefa.texto === itemtarefa.texto
            })

            tarefas.splice(indice, 1)
            mostrarTarefas()

            const stringTarefas = JSON.stringify(tarefas)
            localStorage.setItem("tarefas", stringTarefas)
            
        })  


        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"
        li.prepend(checkbox)

        checkbox.checked = itemtarefa.concluida

            if(itemtarefa.concluida === true){
                li.style.textDecoration = "line-through"
            }else{
                li.style.textDecoration = "none"
            }

        checkbox.addEventListener("change",function(){
            itemtarefa.concluida = checkbox.checked

            const stringTarefas = JSON.stringify(tarefas)
            localStorage.setItem("tarefas", stringTarefas)
            
            if(itemtarefa.concluida === true){
                li.style.textDecoration = "line-through"
            }else{
                li.style.textDecoration = "none"
            }

        })

    })
}

function adicionarTarefa(){
    console.log("ENTREI NA FUNÇÂO")
    
    const tarefaDigitada = tarefa.value;

    console.log("Tarefa", tarefaDigitada)
    console.log("Prioridade", prioridade.value)
    
    if(tarefaDigitada.trim() !== "" && prioridade.value !== ""){
        const tarefaNova = {
            texto: tarefaDigitada,
            concluida: false,
            prioridade: prioridade.value
        }    
        tarefas.push(tarefaNova) 
        mostrarTarefas()
        
    }else if(prioridade.value === ""){
        alert("Prioridade não selecionada")
    }else{
        alert ("Digite uma tarefa")
    }
    
    tarefa.value = "";
    prioridade.value = ""; 

    const stringTarefas = JSON.stringify(tarefas)
        localStorage.setItem("tarefas", stringTarefas)

}        


const retornoTarefas = localStorage.getItem("tarefas")        
        if(retornoTarefas !== null){
            const objetoTarefa = JSON.parse(retornoTarefas)
             
            objetoTarefa.forEach(function(itemtarefa){
            tarefas.push(itemtarefa)
            })

            mostrarTarefas()
        }


tarefa.addEventListener("keydown", function(evento){
        if(evento.key === "Enter"){
            adicionarTarefa()
        }     
})


btnAdicionar.addEventListener("click", function(){
   adicionarTarefa()
})   




