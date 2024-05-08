export const cpf = {
  type: "string",
  pattern: "^\\d{11}$",
};

export const cnpj = {
  type: "string",
  pattern: "^\\d{14}$",
};

export const tiposDeConexao = ["monofasico", "bifasico", "trifasico"];

export const classesDeConsumo = [
  "residencial",
  "industrial",
  "comercial",
  "rural",
  "poderPublico",
];

export const modalidadesTarifarias = [
  "azul",
  "branca",
  "verde",
  "convencional",
];
