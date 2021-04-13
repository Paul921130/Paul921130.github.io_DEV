// 不同環境需要使用不同資源的變數都放在這裡管理

export type TServer = 'dev' | 'rel' | 'prod';
interface IConfig {
    baseUrl: string;
}

const envConfig: { [key: string]: IConfig } = {
    dev: { baseUrl: '' },
    rel: { baseUrl: '' },
    prod: { baseUrl: '' },
};

const getEnvConfig = (env: TServer): IConfig => envConfig[env];

export default getEnvConfig;
