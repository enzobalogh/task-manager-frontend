const API_URL = "https://task-manager-backend-77ro.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    carregarTarefas();

    const form = document.getElementById("taskForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const descricao = document.getElementById("descricao").value;
        const status = document.getElementById("status").value;

        await criarTarefa({
            title: titulo,
            description: descricao,
            status: status
        });

        form.reset();
        carregarTarefas();
    });
});

async function carregarTarefas() {
    try {
        const response = await fetch(API_URL);
        const tarefas = await response.json();

        const lista = document.getElementById("taskList");
        lista.innerHTML = "";

        tarefas.forEach(task => {
            const div = document.createElement("div");
            div.classList.add("task-item");

            const titulo = document.createElement("p");
            titulo.innerHTML = `<strong>${task.title}</strong>`
            titulo.classList.add("task-title");

            const descricao = document.createElement("p");
            descricao.textContent = task.description;
            descricao.classList.add("task-desc");

            const status = document.createElement("span");
            status.textContent = task.status;
            status.classList.add("task-status");

            if (task.status === "PENDENTE") {
                status.classList.add("status-pendente")
            } else if (task.status === "EM_ANDAMENTO") {
                status.classList.add("status-andamento")
                status.textContent = "EM ANDAMENTO";
            } else if(task.status === "CONCLUIDA") {
                status.classList.add("status-concluida")
            }

            const data = document.createElement("p");
            data.textContent = task.date;
            data.classList.add("task-desc");

            const buttonDelete = document.createElement("button");
            buttonDelete.textContent = "Deletar";

            const buttonComplete = document.createElement("button");
            buttonComplete.textContent = task.status === "CONCLUIDA" ? "Desmarcar" : "Concluir";

            const buttonComecar = document.createElement("button");
            if (task.status === "PENDENTE") {
                buttonComecar.textContent = task.status === "PENDENTE" ? "Começar" : "Concluir";
                
            }




            buttonDelete.addEventListener("click", () => {
                deletarTarefa(task.id);
                console.log(task.id);
            })



            buttonComplete.addEventListener("click", () => {
                completarTarefa(task);
            })

            buttonComecar.addEventListener("click", ()=>{
                comecarTarefa(task);
            } )

            div.appendChild(titulo);
            div.appendChild(descricao);
            div.appendChild(status);
            div.appendChild(data)
            div.appendChild(buttonDelete);
            div.appendChild(buttonComplete);
            div.appendChild(buttonComecar);


            lista.appendChild(div);
        });

    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
    }
}

async function criarTarefa(task) {
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
    }
}

async function deletarTarefa(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        carregarTarefas();
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
    }
}

async function completarTarefa(task) {
    try {
        const novoStatus = task.status === "CONCLUIDA" ? "PENDENTE" : "CONCLUIDA";

        const response = await fetch(`${API_URL}/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                status: novoStatus
            })
        });
        if (!response.ok) {
            console.log("Erro ao atualizar tarefa: ", response.status);
            return;
        }
        carregarTarefas();
    } catch (error) {
        console.error("Erro ao completar a tarefa: ", error);
    }

}

    async function comecarTarefa(task) {
    try {
        const novoStatus = task.status === "PENDENTE" ? "EM_ANDAMENTO" : "CONCLUIDA";

        const response = await fetch(`${API_URL}/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                status: novoStatus
            })
        });
        if (!response.ok) {
            console.log("Erro ao atualizar tarefa: ", response.status);
            return;
        }
        carregarTarefas();
    } catch (error) {
        console.error("Erro ao completar a tarefa: ", error);
    }

}
/*async function desmarcarTarefa(task){
    try {
        const novoStatus = task.status === "PENDENTE" ? "CONCLUIDA" : "PENDENTE";

        const response = await fetch(`${API_URL}/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                status: novoStatus
            })
        });
        if (!response.ok) {
            console.log("Erro ao atualizar tarefa: ", response.status);
            return;
        }
        carregarTarefas();
    } catch (error) {
        console.error("Erro ao completar a tarefa: ", error);
    }
}*/