# Dataset de filmes:
Neste trabalho, utilizou-se os dados referentes a filmes americanos. Neste pretende-se a geração dinâmica das páginas com a ajuda de um servidor em javascript que responde a pedidos http do tipo GET.

Assim, o servidor deverá ser capaz de responder às seguintes rotas com ajuda de um json server:

- GET /filmes

Retorna uma página com uma listagem dos filmes disponíveis. Os filmes são apresentados com links embutidos para suas páginas individuais.

- GET /filmes/\<filmeID\>

Retorna a página do filme correspondente ao \<filmeID\>. Esta página apresenta atributos do filme, como elenco, gênero, ano de lançamento.

- GET /atores

Retorna uma página com uma listagem dos atores presentes nos filmes. Os atores são listados com links embutidos para suas páginas individuais.

- GET /atores/<\atorID\>

Retorna a página do ator correspondente ao \<atorID\>. Esta página fornece informações específicas sobre o ator e os respetivos filmes em que participa.

- GET /generos

Retorna uma página com uma listagem dos gêneros disponíveis nos filmes.

- GET /generos/\<generoID\>

Retorna uma página com os filmes do gênero especificado por \<generoID\>. e os títulos do filmes que se enquadram nesse genero.
