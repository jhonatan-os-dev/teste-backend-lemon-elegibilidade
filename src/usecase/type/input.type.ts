
export type InputType = {
  numeroDoDocumento: string;
  tipoDeConexao: "monofasico" | "bifasico" | "trifasico";
  classeDeConsumo:
    | "residencial"
    | "industrial"
    | "comercial"
    | "rural"
    | "poderPublico";
  modalidadeTarifaria: "azul" | "branca" | "verde" | "convencional";
  historicoDeConsumo: Array<number>;
};
