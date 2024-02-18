import os
import xml.etree.ElementTree as ET
 
 def markdown_to_html(md):
     

    # re.sub(pattern, repl, string, count=0, flags=0)
     
    # Headers
    # Cabeçalhos: linhas iniciadas por "# texto", ou "## texto" ou "### texto"
    # In: # Exemplo
    # Out: <h1>Exemplo</h1>
    
    md = re.sub(r'^#\s(.*)$', r'<h1>\1</h1>', md, flags=re.MULTILINE)
    
    md = re.sub(r'^##\s(.*)$', r'<h2>\1</h2>', markdown, flags=re.MULTILINE)
    md = re.sub(r'^###\s(.*)$', r'<h3>\1</h3>', markdown, flags=re.MULTILINE)

    # Bold - pedaços de texto entre "**":
    # In: Este é um **exemplo** ...
    # Out: Este é um <b>exemplo</b> ...
    
    md = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', md)

    # Italic - pedaços de texto entre "*":
    # In: Este é um *exemplo* ...
    # Out: Este é um <i>exemplo</i> ...
    
    md = re.sub(r'\*(.*?)\*', r'<i>\1</i>', md)

    # Numbered List
    # In:
    # 1. Primeiro item
    # 2. Segundo item
    # 3. Terceiro item
    # Out:
    # <ol>
    #   <li>Primeiro item</li>
    #   <li>Segundo item</li>
    #   <li>Terceiro item</li>
    # </ol>
    
    md = re.sub(r'^(\d+)\.\s(.*?)$', r'<li>\2</li>', md, flags=re.MULTILINE)
    md = '<ol>\n' + md + '\n</ol>'

    # Link - [texto](endereço URL)
    # In: Como pode ser consultado em [página da UC](http://www.uc.pt)
    # Out: Como pode ser consultado em <a href="http://www.uc.pt">página da UC</a>
    
    md = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2">\1</a>', md)

    # Image - ![texto alternativo](path para a imagem)
    # In: Como se vê na imagem seguinte: ![imagem dum coelho](http://www.coellho.com) ...
    # Out: Como se vê na imagem seguinte: <img src="http://www.coellho.com" alt="imagem dum coelho"/> ... 
    
    md = re.sub(r'!\[(.*?)\]\((.*?)\)', r'<img src="\2" alt="\1"/>', md)

    return md

# Teste
markdown_text = """
# Título
Este é um **exemplo** de conversor de Markdown para HTML.

## Lista
1. Item 1
2. Item 2

## Links e Imagens
Como pode ser consultado em [página da UC](http://www.uc.pt)

Como se vê na imagem seguinte: ![imagem de um coelho](http://www.coellho.com)
"""

html_output = markdown_to_html(markdown_text)
print(html_output)
