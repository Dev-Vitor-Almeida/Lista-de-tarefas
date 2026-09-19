const tarefa = document.getElementById("tarefa");
const btnAdicionar = document.getElementById("adicionarTarefa");
const areaTarefas = document.getElementById("areaTarefas");
const prioridade = document.getElementById("prioridade");
const contadorTarefas = document.getElementById("contadorTarefas");
const filtroTarefas = document.getElementById("filtroTarefas")
const btnLimparConcluidas = document.getElementById("btnConcluidas")
const bntLimparTodas = document.getElementById("btn-limparTodas");

let tarefas = []; 

function mostrarTarefas(){
    const filtro = filtroTarefas.value

    areaTarefas.innerHTML = ""
    

    tarefas.forEach(function(itemtarefa, indice){
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
        botaoExcluir.textContent = "Excluir"

        li.appendChild(botaoExcluir)

        areaTarefas.appendChild(li)

        botaoExcluir.addEventListener("click", function(){
            tarefas.splice(indice, 1)
            mostrarTarefas()
            salvarTarefas()
        })  

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        li.appendChild(botaoEditar);

        const inputEditar = document.createElement("input")
        inputEditar.value = itemtarefa.texto

        botaoEditar.addEventListener("click",function(){
            li.appendChild(inputEditar)
            textoTarefa.style.display = "none"
            botaoCancelar.style.display = "inline";
            botaoSalvar.style.display = "inline";
            botaoEditar.style.display = "none"
        });

        const botaoCancelar = document.createElement("button")
        botaoCancelar.textContent = "Cancelar"
        li.appendChild(botaoCancelar)
        botaoCancelar.style.display = "none"

        botaoCancelar.addEventListener("click",function(){
            fecharEdicao(inputEditar, textoTarefa, botaoCancelar, botaoSalvar);
            botaoEditar.style.display = "inline"
        })

        const botaoSalvar = document.createElement("button");
        botaoSalvar.textContent = "Salvar"
        li.appendChild(botaoSalvar)
        botaoSalvar.style.display = "none"

        botaoSalvar.addEventListener("click", function(){
            if(inputEditar.value.trim() === ""){
                alert("Digite uma tarefa")
                return
            }
            itemtarefa.texto = inputEditar.value

            salvarTarefas()
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

            salvarTarefas()
            
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

function salvarTarefas(){
    const stringTarefas = JSON.stringify(tarefas)
    localStorage.setItem("tarefas", stringTarefas)
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

function limparTarefasConcluidas(){
    tarefas = tarefas.filter(function(itemtarefa){
        return itemtarefa.concluida === false
    })
    mostrarTarefas()
    salvarTarefas()
}

btnLimparConcluidas.addEventListener("click", function(){
    limparTarefasConcluidas()
})

bntLimparTodas.addEventListener("click", function(){
    limparTodasTarefas()
})

function fecharEdicao(inputEditar, textoTarefa,botaoCancelar,botaoSalvar){
    inputEditar.remove();
    textoTarefa.style.display = "inline";
    botaoCancelar.style.display = "none";
    botaoSalvar.style.display = "none";
}

function limparTodasTarefas(){
    tarefas.splice(0, tarefas.length);
    mostrarTarefas();
    salvarTarefas()
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



