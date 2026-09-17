const tarefa = document.getElementById("tarefa");
const btnAdicionar = document.getElementById("adicionarTarefa");
const areaTarefas = document.getElementById("areaTarefas");
const prioridade = document.getElementById("prioridade");
const contadorTarefas = document.getElementById("contadorTarefas");
const filtroTarefas = document.getElementById("filtroTarefas")

const tarefas = []; 

function mostrarTarefas(){
    const filtro = filtroTarefas.value

    areaTarefas.innerHTML = ""
    

    tarefas.forEach(function(itemtarefa){
        if(filtro === "concluidas" && itemtarefa.concluida === false){
            return;
        }
        
        if(filtro === "pendentes" && itemtarefa.concluida === true){
            return;
        }

        const textoTarefa = document.createElement("span")
        
        const li = document.createElement("li");
        
        textoTarefa.textContent = itemtarefa.texto;
        li.appendChild(textoTarefa)

        //const prioridadeTexto = document.createElement("span");
        //prioridadeTexto.textContent = itemtarefa.prioridade
        //li.appendChild(prioridadeTexto)

        //prioridadeTexto.classList.add(itemtarefa.prioridade);
        li.classList.add(itemtarefa.prioridade)

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

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        li.appendChild(botaoEditar);

        const inputEditar = document.createElement("input")
        inputEditar.value = itemtarefa.texto

        botaoEditar.addEventListener("click",function(){
            li.appendChild(inputEditar)
            textoTarefa.style.display = "none"
            itemtarefa.texto = inputEditar.value
        })

        const botaoSalvar = document.createElement("button");
        botaoSalvar.textContent = "Salvar"

        li.appendChild(botaoSalvar)

        botaoSalvar.addEventListener("click", function(){
            itemtarefa.texto = inputEditar.value
            
            const stringTarefas = JSON.stringify(tarefas);
            localStorage.setItem("tarefas", stringTarefas)

            mostrarTarefas()
        })

        function contarTarefas(){
        let concluidas = 0;
        
         tarefas.forEach(function(itemtarefa){
         if(itemtarefa.concluida === true){
            concluidas++
            }
        })
            return concluidas
        } 

        contadorTarefas.textContent = `Concluidas: ${contarTarefas()} | Pendentes: ${tarefas.length - contarTarefas()}`

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
                li.style.opacity = "0.5";
            }else{
                li.style.textDecoration = "none";
                li.style.opacity = "1"
            }

            contadorTarefas.textContent = `Concluidas: ${contarTarefas()} | Pendentes: ${tarefas.length - contarTarefas()}`
        })

    })
}

function adicionarTarefa(){    
    const tarefaDigitada = tarefa.value;
    
    if(tarefaDigitada.trim() !== "" && prioridade.value !== ""){
        const tarefaNova = {
            texto: tarefaDigitada,
            concluida: false,
            prioridade: prioridade.value
        }    
        tarefas.push(tarefaNova) 
        mostrarTarefas()

        const stringTarefas = JSON.stringify(tarefas)
        localStorage.setItem("tarefas", stringTarefas)
        
    }else if(prioridade.value === ""){
        alert("Prioridade não selecionada")
    }else{
        alert ("Digite uma tarefa")
    }
    
    tarefa.value = "";
    prioridade.value = ""; 
    prioridade.style.backgroundColor = "";

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

prioridade.addEventListener("change", function(){
    if(prioridade.value === "alta"){
        prioridade.style.backgroundColor = "red"
    }else if(prioridade.value ==="media"){
        prioridade.style.backgroundColor = "yellow"
    }else{
        prioridade.style.backgroundColor = "green"
    }
});

filtroTarefas.addEventListener("change", function(){
    const filtro = filtroTarefas.value;
    mostrarTarefas()
})  



