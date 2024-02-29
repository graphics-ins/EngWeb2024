import json

data = []

# Carregar os dados do arquivo JSON
with open('filmes.json') as file:
    for line in file:
        entry = json.loads(line)
        data.append(entry)


# Função para criar o dataset de ocorrências
def create_filmes(data):
    return {"filmes": data}

def create_generos(data):
    generos = []
    for entry in data:
        if 'genres' in entry:
            for genero in entry['genres']:
                found = False
                for item in generos:
                    if item['genero'] == genero:
                        item['filmes'].append(entry['title'])
                        found = True
                        break
                if not found:
                    generos.append({"id": f"g{len(generos)+1}", "genero": genero, "filmes": [entry['title']]})
    return {"generos": generos}

# Função para criar o dataset de animais
def create_atores(data):
    atores = []
    for entry in data:
        if 'cast' in entry:
            for ator in entry['cast']:
                found = False
                for item in atores:
                    if item['ator'] == ator:
                        item['filmes'].append(entry['title'])
                        found = True
                        break
                if not found:
                    atores.append({"id": f"a{len(atores)+1}", "ator": ator, "filmes": [entry['title']]})
    return {"atores": atores}
# Combinar todos os datasets em um único JSON
combined_data = {**create_filmes(data), **create_generos(data), **create_atores(data)}

# Salvar os dados combinados em um novo arquivo JSON
with open('filmes_formatados.json', 'w') as file:
    json.dump(combined_data, file, indent=4)