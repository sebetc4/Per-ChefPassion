const { NODE_ENV } = process.env;

export const isProdEnv = NODE_ENV === 'production';
