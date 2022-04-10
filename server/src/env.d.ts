declare namespace NodeJS {
  interface ProcessEnv {
    COOKIE_NAME: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PORT: int;
    DB_PSW: string;
    DB_USER: string;
    REDIS_SECRET: string;
    FORGET_PASSWORD_PREFIX: string;
    REDIS_URL: string;
    NODE_ENV: string;
    URI: string;
  }
}