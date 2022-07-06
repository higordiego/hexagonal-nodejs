 
 export const getEnv = (env: string, defaultValue: string = ''): string => process.env[env] || defaultValue