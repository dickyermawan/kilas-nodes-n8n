import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class KilasApi implements ICredentialType {
    name = 'kilasApi';
    displayName = 'Kilas API';
    documentationUrl = 'https://github.com/dickyermawan/kilas';
    properties: INodeProperties[] = [
        {
            displayName: 'Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'http://localhost:3000',
            placeholder: 'http://localhost:3000',
            description: 'The base URL of your Kilas WhatsApp Gateway instance',
            required: true,
        },
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            placeholder: 'your_secret_api_key',
            description: 'The API key for authentication (leave empty if authentication is disabled)',
            required: false,
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'x-api-key': '={{$credentials.apiKey}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.baseUrl}}',
            url: '/api/sessions',
            method: 'GET',
        },
    };
}
