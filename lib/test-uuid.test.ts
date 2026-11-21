import { testUUID } from "./test-uuid";

describe("testUUID", () => {
  it("retorna true para UUIDs válidos (v1-v5, minúsculas y mayúsculas)", () => {
    expect(testUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(testUUID("550E8400-E29B-41D4-A716-446655440000")).toBe(true);
    expect(testUUID("6ba7b810-9dad-11d1-80b4-00c04fd430c8")).toBe(true);
  });

  it("retorna false para strings vacíos o texto arbitrario", () => {
    expect(testUUID("")).toBe(false);
    expect(testUUID("no-es-un-uuid")).toBe(false);
    expect(testUUID("12345")).toBe(false);
  });

  it("retorna false si la versión o variante del UUID es inválida", () => {
    // Versión 6 (fuera de 1-5)
    expect(testUUID("550e8400-e29b-61d4-a716-446655440000")).toBe(false);
    // Variante 'c' (fuera de 8, 9, a, b)
    expect(testUUID("550e8400-e29b-41d4-c716-446655440000")).toBe(false);
  });

  it("retorna false si faltan guiones o la longitud es incorrecta", () => {
    expect(testUUID("550e8400e29b41d4a716446655440000")).toBe(false);
    expect(testUUID("550e8400-e29b-41d4-a716-44665544000")).toBe(false);
  });
});
