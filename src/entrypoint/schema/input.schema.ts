import { Schema } from "ajv";
import { AjvConfig } from "src/config/SchemaConfig";
import {
  classesDeConsumo,
  cnpj,
  cpf,
  modalidadesTarifarias,
  tiposDeConexao,
} from "./tipos";

const enumOf = (values: string[]) => ({
  type: typeof values[0],
  enum: values,
});

export const input: Schema = {
  type: "object",
  additionalProperties: false,
  required: [
    "numeroDoDocumento",
    "tipoDeConexao",
    "classeDeConsumo",
    "modalidadeTarifaria",
    "historicoDeConsumo",
  ],
  properties: {
    numeroDoDocumento: { oneOf: [cpf, cnpj] },
    tipoDeConexao: enumOf(tiposDeConexao),
    classeDeConsumo: enumOf(classesDeConsumo),
    modalidadeTarifaria: enumOf(modalidadesTarifarias),
    historicoDeConsumo: {
      type: "array",
      minItems: 3,
      maxItems: 12,
      items: {
        type: "integer",
        minimum: 0,
        maximum: 9999,
      },
    },
  },
};

export const validateInput = AjvConfig.compile(input);
