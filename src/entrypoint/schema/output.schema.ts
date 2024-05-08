import { AjvConfig } from "src/config/SchemaConfig";

const enumOf = (values: boolean[]) => ({
  type: typeof values[0],
  enum: values,
});

export const output = {
  oneOf: [
    {
      type: "object",
      additionalProperties: false,
      required: ["elegivel", "economiaAnualDeCO2"],
      properties: {
        elegivel: enumOf([true]), // always true
        economiaAnualDeCO2: { type: "number", minimum: 0 },
      },
    },
    {
      type: "object",
      additionalProperties: false,
      required: ["elegivel", "razoesDeInelegibilidade"],
      properties: {
        elegivel: enumOf([false]), // always false
        razoesDeInelegibilidade: {
          type: "array",
          uniqueItems: true,
          items: {
            type: "string",
            enum: [
              "Classe de consumo não aceita",
              "Modalidade tarifária não aceita",
              "Consumo muito baixo para tipo de conexão",
            ],
          },
        },
      },
    },
  ],
};

export const validateOutput = AjvConfig.compile(output);
