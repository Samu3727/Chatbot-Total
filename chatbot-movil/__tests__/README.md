# Testing

Este directorio contiene los tests unitarios y de integración del proyecto.

## Estructura

```
__tests__/
├── components/     # Tests de componentes React
├── hooks/          # Tests de hooks personalizados
└── services/       # Tests de servicios
```

## Ejecutar Tests

```bash
# Todos los tests
npm test

# Watch mode (desarrollo)
npm run test:watch

# Con cobertura
npm run test:coverage
```

## Escribir Tests

Los tests siguen el patrón AAA (Arrange, Act, Assert):

```typescript
it('debe hacer algo específico', () => {
  // Arrange: Preparar
  const mockFn = jest.fn();
  
  // Act: Ejecutar
  const result = myFunction(mockFn);
  
  // Assert: Verificar
  expect(result).toBe(expected);
});
```
