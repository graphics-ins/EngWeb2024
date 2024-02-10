import os
import xml.etree.ElementTree as ET

def gerar_html_ruas():
    preHTML = """
    <!DOCTYPE html>
    <html lang="pt">
        <head>
            <title>Ruas de Braga</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1" >
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-grey">
                    <h3>Ruas de Braga</h3>
                </header>
                <div class="w3-container">
                    <ul class="w3-ul w3-card-4" style="width:50%">
    """

    posHTML = """
                    </ul>
                </div>
                <footer class="w3-container w3-light-grey">
                    <h5>Gerado por RuasDeBraga::EngWeb2024::A95458</h5>
                </footer>
            </div>
        </body>
    </html>
    """

    ruas = []
    diretorio_xml = './MapaRuas - MB/texto'
    conteudo = ""
    for nome_arquivo in os.listdir(diretorio_xml):
        if nome_arquivo.endswith('.xml'):
            caminho_arquivo = os.path.join(diretorio_xml, nome_arquivo)
            
            arvore = ET.parse(caminho_arquivo)
            raiz = arvore.getroot()
            
            numero_rua = raiz.find('.//meta/número').text
            nome_rua = raiz.find('.//meta/nome').text
            
            ruas.append((int(numero_rua), nome_rua, nome_arquivo))

    ruas_ordenadas = sorted(ruas, key=lambda x: x[1])

    for numero_rua, nome_rua, nome_arquivo in ruas_ordenadas:
        item_lista = f'<li><a href="{numero_rua}-{nome_rua.replace(" ", "")}.html">{nome_rua}</a></li>\n'
        conteudo += item_lista

    pagina_html = preHTML + conteudo + posHTML

    with open('./RuasPages/index.html', 'w') as f:
        f.write(pagina_html)

gerar_html_ruas()
