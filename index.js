const tarefa = document.getElementById("tarefa");
const btnAdicionar = document.getElementById("adicionarTarefa");
const areaTarefas = document.getElementById("areaTarefas");
const prioridade = document.getElementById("prioridade");
const contadorTarefas = document.getElementById("contadorTarefas");
const filtroTarefas = document.getElementById("filtroTarefas")
const btnLimparConcluidas = document.getElementById("btnConcluidas")
const btnLimparTodas = document.getElementById("btn-limparTodas");

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
            if(confirm("Deseja realmente excluir essa tarefa?")){
                tarefas.splice(indice, 1)
            }
            
            mostrarTarefas()
            salvarTarefas()
        })  

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        li.appendChild(botaoEditar);

        const inputEditar = document.createElement("input")
        inputEditar.value = itemtarefa.texto

        botaoEditar.addEventListener("click",function(){
            edicaoClique()
        });
            
        textoTarefa.addEventListener("dblclick", function(){
            edicaoClique()
        })

        function edicaoClique(){
            li.appendChild(inputEditar)
            inputEditar.focus()
            textoTarefa.style.display = "none"
            botaoCancelar.style.display = "inline";
            botaoSalvar.style.display = "inline";
            botaoEditar.style.display = "none"
            selectEditar.style.display = "inline"
        }

        const botaoCancelar = document.createElement("button")
        botaoCancelar.textContent = "Cancelar"
        li.appendChild(botaoCancelar)
        botaoCancelar.style.display = "none"


        function cancelarEdicao(){
            fecharEdicao(inputEditar, textoTarefa, botaoCancelar, botaoSalvar, selectEditar);
            botaoEditar.style.display = "inline"
        }

        botaoCancelar.addEventListener("click",function(){
            cancelarEdicao()
        })

        inputEditar.addEventListener("keydown", function(evento){
            if(evento.key === "Escape"){
                cancelarEdicao()
            }
            
        })

        const botaoSalvar = document.createElement("button");
        botaoSalvar.textContent = "Salvar"
        li.appendChild(botaoSalvar)
        botaoSalvar.style.display = "none"

        botaoSalvar.addEventListener("click", function(){
            salvarEdicao()
        })


         function salvarEdicao(){
            if(inputEditar.value.trim() === ""){
                alert("Digite uma tarefa")
                return
            }

            const indiceEncontrado = tarefas.findIndex(function(itemtarefa){
              return itemtarefa.texto.trim().toLowerCase() === inputEditar.value.trim().toLowerCase()
            })    

            if(indiceEncontrado !== -1 && indiceEncontrado != indice){
                alert("Tarefa já existente!")
                return
            }
            itemtarefa.texto = inputEditar.value
            itemtarefa.prioridade = selectEditar.value

            salvarTarefas()
            mostrarTarefas()
        }

        inputEditar.addEventListener("keydown", function(evento){
            if(evento.key === "Enter"){
            salvarEdicao()
            }
        }) 

        const selectEditar = document.createElement("select");
        const opcaoAlta = document.createElement("option");
        opcaoAlta.value = "alta"
        opcaoAlta.textContent = "Alta"

        const opcaoMedia = document.createElement("option");
        opcaoMedia.value = "media"
        opcaoMedia.textContent = "Média"

        const opcaoBaixa = document.createElement("option");
        opcaoBaixa.value = "baixa"
        opcaoBaixa.textContent = "Baixa"

        selectEditar.appendChild(opcaoAlta)
        selectEditar.appendChild(opcaoMedia)
        selectEditar.appendChild(opcaoBaixa)

        li.appendChild(selectEditar)

        selectEditar.style.display = "none"
        selectEditar.value = itemtarefa.prioridade

        selectEditar.addEventListener("change", function(){
        if(selectEditar.value === "alta"){
        selectEditar.style.backgroundColor = "red"
        }else if(selectEditar.value ==="media"){
        selectEditar.style.backgroundColor = "yellow"
        }else{
        selectEditar.style.backgroundColor = "green"
        }
        });

       

        
        
        function contarTarefas(){
        let concluidas = 0;
        
         tarefas.forEach(function(itemtarefa){
         if(itemtarefa.concluida === true){
            concluidas++
            }
        })
            return concluidas
        } 

        let tarefasConcluidas = contarTarefas()

        contadorTarefas.textContent = `Concluidas: ${tarefasConcluidas} | Pendentes: ${tarefas.length - tarefasConcluidas}`

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"
        li.prepend(checkbox)

        checkbox.checked = itemtarefa.concluida

            if(itemtarefa.concluida === true){
                li.style.textDecoration = "line-through"
                li.style.opacity = "0.5"
            }else{
                li.style.textDecoration = "none"
                li.style.opacity = "1"
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

        const indice = tarefas.findIndex(function(itemtarefa){
            return itemtarefa.texto.trim().toLowerCase() === tarefaDigitada.trim().toLowerCase()
        })

        if(indice === -1){
            tarefas.push(tarefaNova)
        }else{
            alert("Tarefa já existente!")
        }
        mostrarTarefas()

        const stringTarefas = JSON.stringify(tarefas)
        localStorage.setItem("tarefas", stringTarefas)
        
    }else if(prioridade.value === ""){
        alert("Prioridade não selecionada")
    }else{
        alert ("Digite uma tarefa")
    }
    
    tarefa.value = "";
    tarefa.focus()
    prioridade.value = ""; 
    prioridade.style.backgroundColor = "";
}        

function limparTarefasConcluidas(){
    const existeConcluida = tarefas.some(function(itemtarefa){
    return itemtarefa.concluida === true
    })
    
    
    if (existeConcluida ===false) {
    alert("Não há tarefas concluídas para limpar")
    return
    }
    
    if(confirm("Deseja realmente limpar todas as tarefas concluídas?")){
        tarefas = tarefas.filter(function(itemtarefa){
        return itemtarefa.concluida === false
    })
    }
    
    
    mostrarTarefas()
    salvarTarefas()
}



btnLimparConcluidas.addEventListener("click", function(){
    limparTarefasConcluidas()
})

btnLimparTodas.addEventListener("click", function(){
    limparTodasTarefas()
})

function fecharEdicao(inputEditar, textoTarefa,botaoCancelar,botaoSalvar, selectEditar){
    inputEditar.remove();
    textoTarefa.style.display = "inline";
    botaoCancelar.style.display = "none";
    botaoSalvar.style.display = "none";
    selectEditar.style.display = "none"
}

function limparTodasTarefas(){
    if(confirm("Deseja realmente limpar todas as tarefas?")){
        tarefas.splice(0, tarefas.length);
    }
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

