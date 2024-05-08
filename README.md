
# Case Back End - Lemon Energia
- Collection Postman: Lemon-Collection.postman_collection.json

## Instalação

```bash
  yarn -i  
```

## Rodar testes

```bash
  yarn test 
```

## Rodar aplicação 

```bash
  yarn dev 
```
    
## Documentação da API

#### Health Check

```http
  GET /healths
```

#### Checar a elegibilidade

```http
  POST /v1/check/eligibility
```

- Cenario: Elegivel

Requisição 
```JSON
{
    "numeroDoDocumento": "14041737706",
    "tipoDeConexao": "bifasico",
    "classeDeConsumo": "comercial",
    "modalidadeTarifaria": "convencional",
    "historicoDeConsumo": [
        3878, // mes atual
        9760, // mes anterior
        5976, // 2 meses atras
        2797, // 3 meses atras
        2481, // 4 meses atras
        5731, // 5 meses atras
        7538, // 6 meses atras
        4392, // 7 meses atras
        7859, // 8 meses atras
        4160, // 9 meses atras
        6941, // 10 meses atras
        4597 // 11 meses atras
    ]
}
```

Resposta
```JSON
{
    "elegivel": true,
    "economiaAnualDeCO2": 5553.24
}
```

- Cenario: Não Elegivel
    - Atributo 'classeDeConsumo' com valor não elegivel
    - Atributo 'modalidadeTarifaria' com valor não elegivel

Requisição 
```JSON
{
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "rural",
  "modalidadeTarifaria": "verde",
  "historicoDeConsumo": [
    3878, // mes atual
    9760, // mes anterior
    5976, // 2 meses atras
    2797, // 3 meses atras
    2481, // 4 meses atras
    5731, // 5 meses atras
    7538, // 6 meses atras
    4392, // 7 meses atras
    7859, // 8 meses atras
    4160 // 9 meses atras
  ]
}
```

Resposta
```JSON
{
    "elegivel": false,
    "razoesDeInelegibilidade": [
        "Classe de consumo não aceita",
        "Modalidade tarifária não aceita"
    ]
}
```

- Cenario: Não Elegivel por não atingir o consumo minimo

Requisição 
```JSON
{
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "branca",
  "historicoDeConsumo": [
    200, // mes atual
    150, // mes anterior
    110, // 2 meses atras
    200, // 3 meses atras
    101 // 4 meses atras

  ]
}
```

Resposta
```JSON
{
    "elegivel": false,
    "razoesDeInelegibilidade": [
        "Consumo muito baixo para tipo de conexão"
    ]
}
```

