
import { NextFunction, Request, Response } from "express";
import { InputType } from "./type/input.type";
import { OutputType } from "./type/output.type";
import { PropType } from "./type/prop.type";
import { calculateAverage, calculateCO2Savings, calculateTotal } from "src/util/math.util";

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const requestObject: InputType = request.body;
    var outputObject: OutputType;

    // Verifica Classe de Consumo e Tarifa
    outputObject = checkCustomerClassConsumptionAndTariffEligibility(
      requestObject.classeDeConsumo,
      requestObject.modalidadeTarifaria
    );

    //Verifica consumo minimo
    if (!outputObject) {
      outputObject = checkCustomerMinConsumption(
        requestObject.tipoDeConexao,
        requestObject.historicoDeConsumo
      );
    }

    // Response
    response.status(200).json(outputObject);
  } catch (error) {
    console.log(error);
  }
};

function checkCustomerMinConsumption(
  tipoDeConexao: PropType<InputType, "tipoDeConexao">,
  historicoDeConsumo: Array<number>
): OutputType {
  const average = calculateAverage(historicoDeConsumo);

  if (
    (tipoDeConexao === "monofasico" && average < 400) ||
    (tipoDeConexao === "bifasico" && average < 500) ||
    (tipoDeConexao === "trifasico" && average < 750)
  ) {
    return {
      elegivel: false,
      razoesDeInelegibilidade: ["Consumo muito baixo para tipo de conexão"],
    };
  } else {
    const totalConsumption = calculateTotal(historicoDeConsumo);
    const annualCO2Savings = calculateCO2Savings(totalConsumption);

    return {
      elegivel: true,
      economiaAnualDeCO2: annualCO2Savings,
    };
  }
}

function checkCustomerClassConsumption(
  classeDeConsumo: PropType<InputType, "classeDeConsumo">
) {
  return (
    classeDeConsumo === "comercial" ||
    classeDeConsumo === "residencial" ||
    classeDeConsumo === "industrial"
  );
}
function checkCustomerTariffModality(
  modalidadeTarifaria: PropType<InputType, "modalidadeTarifaria">
) {
  return (
    modalidadeTarifaria === "convencional" || modalidadeTarifaria === "branca"
  );
}

function checkCustomerClassConsumptionAndTariffEligibility(
  classeDeConsumo: PropType<InputType, "classeDeConsumo">,
  modalidadeTarifaria: PropType<InputType, "modalidadeTarifaria">
) {
  //Verifica Classe de consumo da cliente
  const customerConsumptionClassEligible =
    checkCustomerClassConsumption(classeDeConsumo);

  //Modalidade tarifária
  const customerTariffModalityEligible =
    checkCustomerTariffModality(modalidadeTarifaria);

  //Retorna se não elegivel
  return generateNotEligibleResponse(
    customerConsumptionClassEligible,
    customerTariffModalityEligible
  );
}

function generateNotEligibleResponse(
  customerConsumptionClassEligible: boolean,
  customerTariffModalityEligible: boolean
): OutputType {
  const elegivel = false;
  const razoesDeInelegibilidade: PropType<
    OutputType,
    "razoesDeInelegibilidade"
  > = [];

  if (!customerConsumptionClassEligible) {
    razoesDeInelegibilidade.push("Classe de consumo não aceita");
  }

  if (!customerTariffModalityEligible) {
    razoesDeInelegibilidade.push("Modalidade tarifária não aceita");
  }

  if (razoesDeInelegibilidade.length > 0) {
    return { elegivel, razoesDeInelegibilidade };
  }
}
