const CURRENT_ENV = "development";

interface EnvConfig {
    BASE_URL: string;
    API_KEY: string;
}

const dev: EnvConfig = {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    API_KEY: 'your_dev_api_key_here',
};

const qa: EnvConfig = {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    API_KEY: 'your_qa_api_key_here',
};

const prod: EnvConfig = {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    API_KEY: 'your_prod_api_key_here',
};

let envConfig: EnvConfig;

switch (CURRENT_ENV) {
    case 'development':
        envConfig = dev;
        break;
    // case 'production':
    //     envConfig = prod;
    //     break;
    default:
        envConfig = qa;
}

export default envConfig;
