const ID_OFFSET = 151; // Since your database IDs start from 152

export const toBackendId = (frontendId: number | string): number => {
  return Number(frontendId) + ID_OFFSET;
};

export const toFrontendId = (backendId: number | string): number => {
  return Number(backendId) - ID_OFFSET;
};
