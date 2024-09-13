
async function obterEstados() {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    const response = await fetch(url);
    const estados = await response.json();
    return estados;
}


async function obterCidades(estadoId) {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`;
    const response = await fetch(url);
    const cidades = await response.json();
    return cidades;
}


async function preencherEstados() {
    const estados = await obterEstados();
    const selectEstados = document.getElementById('estados');

    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.id;
        option.textContent = estado.nome;
        selectEstados.appendChild(option);
    });
}

async function preencherCidades(estadoId) {
    const cidades = await obterCidades(estadoId);
    const listaCidades = document.getElementById('cidades');
    listaCidades.innerHTML = ''; // Limpa a lista de cidades

    cidades.forEach(cidade => {
        const li = document.createElement('li');
        li.textContent = cidade.nome;
        listaCidades.appendChild(li);
    });
}


document.getElementById('estados').addEventListener('change', function() {
    const estadoId = this.value;
    if (estadoId) {
        preencherCidades(estadoId);
    } else {
        document.getElementById('cidades').innerHTML = '';
    }
});


preencherEstados();
