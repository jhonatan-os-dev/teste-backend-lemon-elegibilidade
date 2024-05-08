import request from "supertest";
import app from "../../src/app";

describe("Test check.route", () => {
  test("When all required properties are invalids must return error", async () => {
    const res = await request(app).post("/v1/check/eligibility");

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      code: 400,
      errors: [
        {
          message: "must have required property 'numeroDoDocumento'",
          param: "numeroDoDocumento",
          value: null,
        },
        {
          message: "must have required property 'tipoDeConexao'",
          param: "tipoDeConexao",
          value: null,
        },
        {
          message: "must have required property 'classeDeConsumo'",
          param: "classeDeConsumo",
          value: null,
        },
        {
          message: "must have required property 'modalidadeTarifaria'",
          param: "modalidadeTarifaria",
          value: null,
        },
        {
          message: "must have required property 'historicoDeConsumo'",
          param: "historicoDeConsumo",
          value: null,
        },
      ],
      status: "InvalidRequest",
    });
  });

  test("When property 'tipoDeConexao' with invalid value must return error", async () => {
    const res = await request(app)
      .post("/v1/check/eligibility")
      .send({
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "bifasico123",
        classeDeConsumo: "comercial",
        modalidadeTarifaria: "convencional",
        historicoDeConsumo: [3878, 9760, 5976],
      });

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      code: 400,
      errors: [
        {
          message: "must be equal to one of the allowed values",
          param: "/tipoDeConexao",
          value: "bifasico123",
        },
      ],
      status: "InvalidRequest",
    });
  });
});

test("When property 'classeDeConsumo' with invalid value must return error", async () => {
  const res = await request(app)
    .post("/v1/check/eligibility")
    .send({
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comerciala",
      modalidadeTarifaria: "convencional",
      historicoDeConsumo: [3878, 9760, 5976],
    });

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({
    code: 400,
    errors: [
      {
        message: "must be equal to one of the allowed values",
        param: "/classeDeConsumo",
        value: "comerciala",
      },
    ],
    status: "InvalidRequest",
  });
});

test("When property 'modalidadeTarifaria' with invalid value must return error", async () => {
  const res = await request(app)
    .post("/v1/check/eligibility")
    .send({
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "convencional2",
      historicoDeConsumo: [3878, 9760, 5976],
    });

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({
    code: 400,
    errors: [
      {
        message: "must be equal to one of the allowed values",
        param: "/modalidadeTarifaria",
        value: "convencional2",
      },
    ],
    status: "InvalidRequest",
  });
});

test("When property 'historicoDeConsumo' size lesser than 3 must return error", async () => {
  const res = await request(app)
    .post("/v1/check/eligibility")
    .send({
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "convencional",
      historicoDeConsumo: [3878, 9760],
    });

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({
    code: 400,
    errors: [
      {
        message: "must NOT have fewer than 3 items",
        param: "/historicoDeConsumo",
        value: [3878, 9760],
      },
    ],
    status: "InvalidRequest",
  });
});

test("When property 'classeDeConsumo' and 'modalidadeTarifaria' is not eligible must return eligibility reason", async () => {
  const res = await request(app)
    .post("/v1/check/eligibility")
    .send({
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "rural",
      modalidadeTarifaria: "verde",
      historicoDeConsumo: [3878, 9760, 123],
    });

  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    elegivel:false,
    razoesDeInelegibilidade: ["Classe de consumo não aceita", "Modalidade tarifária não aceita"]
  });
});

test("When does not have the minimum consumption must return that is not eligible and eligibility reason", async () => {
  const res = await request(app)
    .post("/v1/check/eligibility")
    .send({
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "branca",
      historicoDeConsumo: [200, 150, 200, 100],
    });

  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    elegivel:false,
    razoesDeInelegibilidade: ["Consumo muito baixo para tipo de conexão"]
  });
});

test("When success must return yearly CO2 savings", async () => {
  const res = await request(app)
    .post("/v1/check/eligibility")
    .send({
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "convencional",
      historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
    });

  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    elegivel:true,
    economiaAnualDeCO2: 5553.24
  });
});




