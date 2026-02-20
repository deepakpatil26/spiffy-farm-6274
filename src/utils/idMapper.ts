const ID_OFFSET = 0; // Reset to 0 for the fresh database

export const toBackendId = (frontendId: number | string): number => {
  return Number(frontendId) + ID_OFFSET;
};

export const toFrontendId = (backendId: number | string): number => {
  return Number(backendId) - ID_OFFSET;
};
