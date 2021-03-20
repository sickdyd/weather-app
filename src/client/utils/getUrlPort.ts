export const getUrlPort = (): string => (process.env.NODE_ENV === 'development' ? ':3000' : '')
