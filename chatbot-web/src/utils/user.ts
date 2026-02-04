export const getUserId = (): string => {
  const storedId = localStorage.getItem('usuario_id');

  if (storedId) return storedId;

  const newId = crypto.randomUUID();
  localStorage.setItem('usuario_id', newId);

  return newId;
};
