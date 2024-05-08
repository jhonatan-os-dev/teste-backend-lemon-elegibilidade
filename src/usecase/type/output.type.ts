export type OutputType = {
  elegivel: boolean;
  razoesDeInelegibilidade?: Array<"Classe de consumo não aceita" | "Modalidade tarifária não aceita" | "Consumo muito baixo para tipo de conexão">
  economiaAnualDeCO2?: number;
};




