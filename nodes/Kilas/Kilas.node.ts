import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IDataObject,
    NodeOperationError,
} from 'n8n-workflow';

export class Kilas implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Kilas',
        name: 'kilas',
        icon: 'file:kilas.png',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with Kilas WhatsApp Gateway API',
        defaults: {
            name: 'Kilas',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'kilasApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Message',
                        value: 'message',
                    },
                    {
                        name: 'Session',
                        value: 'session',
                    },
                    {
                        name: 'Group',
                        value: 'group',
                    },
                    {
                        name: 'Contact',
                        value: 'contact',
                    },
                    {
                        name: 'Status',
                        value: 'status',
                    },
                    {
                        name: 'Webhook',
                        value: 'webhook',
                    },
                ],
                default: 'message',
            },

            // Message Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                    },
                },
                options: [
                    {
                        name: 'Send Text',
                        value: 'sendText',
                        description: 'Send a text message',
                        action: 'Send a text message',
                    },
                    {
                        name: 'Send Image',
                        value: 'sendImage',
                        description: 'Send an image',
                        action: 'Send an image',
                    },
                    {
                        name: 'Send Document',
                        value: 'sendDocument',
                        description: 'Send a document',
                        action: 'Send a document',
                    },
                    {
                        name: 'Send Location',
                        value: 'sendLocation',
                        description: 'Send a location',
                        action: 'Send a location',
                    },
                    {
                        name: 'Start Typing',
                        value: 'startTyping',
                        description: 'Show typing indicator',
                        action: 'Start typing indicator',
                    },
                    {
                        name: 'Stop Typing',
                        value: 'stopTyping',
                        description: 'Stop typing indicator',
                        action: 'Stop typing indicator',
                    },
                    {
                        name: 'Check Message Status',
                        value: 'checkStatus',
                        description: 'Check delivery status of a sent message',
                        action: 'Check message status',
                    },
                ],
                default: 'sendText',
            },

            // Session Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['session'],
                    },
                },
                options: [
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all sessions',
                        action: 'Get all sessions',
                    },
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create a new session',
                        action: 'Create a session',
                    },
                    {
                        name: 'Delete',
                        value: 'delete',
                        description: 'Delete a session',
                        action: 'Delete a session',
                    },
                ],
                default: 'getAll',
            },

            // Group Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['group'],
                    },
                },
                options: [
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all groups',
                        action: 'Get all groups',
                    },
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create a new group',
                        action: 'Create a group',
                    },
                ],
                default: 'getAll',
            },

            // Contact Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['contact'],
                    },
                },
                options: [
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Get all contacts',
                        action: 'Get all contacts',
                    },
                ],
                default: 'getAll',
            },

            // Status Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['status'],
                    },
                },
                options: [
                    {
                        name: 'Post Text',
                        value: 'postText',
                        description: 'Post a text status update',
                        action: 'Post a text status',
                    },
                ],
                default: 'postText',
            },

            // Webhook Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                    },
                },
                options: [
                    {
                        name: 'Configure',
                        value: 'configure',
                        description: 'Configure webhook for a session',
                        action: 'Configure webhook',
                    },
                    {
                        name: 'Get Configuration',
                        value: 'getConfig',
                        description: 'Get webhook configuration',
                        action: 'Get webhook configuration',
                    },
                    {
                        name: 'Test',
                        value: 'test',
                        description: 'Test webhook',
                        action: 'Test webhook',
                    },
                    {
                        name: 'Delete',
                        value: 'delete',
                        description: 'Delete webhook configuration',
                        action: 'Delete webhook',
                    },
                ],
                default: 'configure',
            },

            // Common Fields - Session ID
            {
                displayName: 'Session ID',
                name: 'sessionId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message', 'group', 'contact', 'status', 'webhook'],
                    },
                    hide: {
                        resource: ['session'],
                        operation: ['getAll'],
                    },
                },
                default: '',
                placeholder: 'MySession',
                description: 'The session ID to use',
            },

            // Message Fields - Send Text
            {
                displayName: 'Chat ID',
                name: 'chatId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendText', 'sendImage', 'sendDocument', 'sendLocation', 'startTyping', 'stopTyping'],
                    },
                },
                default: '',
                placeholder: '628123456789',
                description: 'The recipient phone number (with country code, without +)',
            },
            {
                displayName: 'Text',
                name: 'text',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendText'],
                    },
                },
                default: '',
                placeholder: 'Hello from n8n! 🚀',
                description: 'The text message to send',
                typeOptions: {
                    rows: 4,
                },
            },
            {
                displayName: 'Quoted Message ID',
                name: 'quotedMessageId',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendText'],
                    },
                },
                default: '',
                placeholder: '3EB0123456789ABCDEF',
                description: 'Optional: Message ID to quote/reply to (get from webhook events)',
            },
            {
                displayName: 'Message ID',
                name: 'messageId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['checkStatus'],
                    },
                },
                default: '',
                placeholder: '3EB0ABC123XYZ',
                description: 'The message ID to check status for (from send response or webhook events)',
            },

            // Message Fields - Send Image
            {
                displayName: 'Input Type',
                name: 'imageInputType',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendImage'],
                    },
                },
                options: [
                    {
                        name: 'Binary Data',
                        value: 'binary',
                    },
                    {
                        name: 'Base64 String',
                        value: 'base64',
                    },
                    {
                        name: 'URL',
                        value: 'url',
                    },
                ],
                default: 'binary',
                description: 'How to provide the image data',
            },
            {
                displayName: 'Binary Property',
                name: 'binaryPropertyName',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendImage'],
                        imageInputType: ['binary'],
                    },
                },
                default: 'data',
                description: 'Name of the binary property containing the image',
            },
            {
                displayName: 'Base64 Image',
                name: 'base64Image',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendImage'],
                        imageInputType: ['base64'],
                    },
                },
                default: '',
                placeholder: 'data:image/jpeg;base64,/9j/4AAQ...',
                description: 'Base64 encoded image with data URI prefix',
                typeOptions: {
                    rows: 4,
                },
            },
            {
                displayName: 'Image URL',
                name: 'imageUrl',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendImage'],
                        imageInputType: ['url'],
                    },
                },
                default: '',
                placeholder: 'https://example.com/image.jpg',
                description: 'URL of the image to send (Baileys will download and send automatically)',
            },
            {
                displayName: 'Caption',
                name: 'caption',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendImage', 'sendDocument'],
                    },
                },
                default: '',
                placeholder: 'Check out this image!',
                description: 'Optional caption for the image or document',
            },

            // Message Fields - Send Document
            {
                displayName: 'Input Type',
                name: 'documentInputType',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendDocument'],
                    },
                },
                options: [
                    {
                        name: 'Binary Data',
                        value: 'binary',
                    },
                    {
                        name: 'Base64 String',
                        value: 'base64',
                    },
                    {
                        name: 'URL',
                        value: 'url',
                    },
                ],
                default: 'binary',
                description: 'How to provide the document data',
            },
            {
                displayName: 'Binary Property',
                name: 'binaryPropertyName',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendDocument'],
                        documentInputType: ['binary'],
                    },
                },
                default: 'data',
                description: 'Name of the binary property containing the document',
            },
            {
                displayName: 'Base64 Document',
                name: 'base64Document',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendDocument'],
                        documentInputType: ['base64'],
                    },
                },
                default: '',
                placeholder: 'data:application/pdf;base64,JVBERi0x...',
                description: 'Base64 encoded document with data URI prefix',
                typeOptions: {
                    rows: 4,
                },
            },
            {
                displayName: 'Document URL',
                name: 'documentUrl',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendDocument'],
                        documentInputType: ['url'],
                    },
                },
                default: '',
                placeholder: 'https://example.com/document.pdf',
                description: 'URL of the document to send (Baileys will download and send automatically)',
            },
            {
                displayName: 'Filename',
                name: 'filename',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendDocument'],
                        documentInputType: ['base64', 'url'],
                    },
                },
                default: '',
                placeholder: 'document.pdf',
                description: 'Filename for the document (required for base64/URL)',
            },
            {
                displayName: 'MIME Type',
                name: 'mimetype',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendDocument'],
                        documentInputType: ['base64', 'url'],
                    },
                },
                default: '',
                placeholder: 'application/pdf',
                description: 'MIME type of the document (required for base64)',
            },

            // Message Fields - Send Location
            {
                displayName: 'Latitude',
                name: 'latitude',
                type: 'number',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendLocation'],
                    },
                },
                default: 0,
                placeholder: '-6.200000',
                description: 'Latitude coordinate',
            },
            {
                displayName: 'Longitude',
                name: 'longitude',
                type: 'number',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendLocation'],
                    },
                },
                default: 0,
                placeholder: '106.816666',
                description: 'Longitude coordinate',
            },
            {
                displayName: 'Address',
                name: 'address',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['sendLocation'],
                    },
                },
                default: '',
                placeholder: 'Jakarta, Indonesia',
                description: 'Optional address description',
            },

            // Session Fields - Create
            {
                displayName: 'Session ID',
                name: 'sessionId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['session'],
                        operation: ['create', 'delete'],
                    },
                },
                default: '',
                placeholder: 'MySession',
                description: 'The session ID to create or delete',
            },

            // Group Fields - Get All
            {
                displayName: 'Session ID',
                name: 'sessionId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['group'],
                        operation: ['getAll'],
                    },
                },
                default: '',
                placeholder: 'MySession',
                description: 'The session ID to get groups from',
            },

            // Group Fields - Create
            {
                displayName: 'Group Name',
                name: 'subject',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['group'],
                        operation: ['create'],
                    },
                },
                default: '',
                placeholder: 'My New Group',
                description: 'The name of the group',
            },
            {
                displayName: 'Participants',
                name: 'participants',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['group'],
                        operation: ['create'],
                    },
                },
                default: '',
                placeholder: '628123456789,628987654321',
                description: 'Comma-separated list of participant phone numbers',
            },

            // Contact Fields - Get All
            {
                displayName: 'Session ID',
                name: 'sessionId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['contact'],
                        operation: ['getAll'],
                    },
                },
                default: '',
                placeholder: 'MySession',
                description: 'The session ID to get contacts from',
            },

            // Status Fields - Post Text
            {
                displayName: 'Text',
                name: 'text',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['status'],
                        operation: ['postText'],
                    },
                },
                default: '',
                placeholder: 'My Status Update 🚀',
                description: 'The text for the status update',
                typeOptions: {
                    rows: 4,
                },
            },
            {
                displayName: 'Background Color',
                name: 'backgroundColor',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['status'],
                        operation: ['postText'],
                    },
                },
                default: '0xff1a1f3a',
                placeholder: '0xff1a1f3a',
                description: 'Background color in hex format (e.g., 0xff1a1f3a)',
            },
            {
                displayName: 'Font',
                name: 'font',
                type: 'number',
                displayOptions: {
                    show: {
                        resource: ['status'],
                        operation: ['postText'],
                    },
                },
                default: 1,
                description: 'Font style (0-5)',
            },

            // Webhook Fields - Configure
            {
                displayName: 'Webhook URL',
                name: 'webhookUrl',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['configure'],
                    },
                },
                default: '',
                placeholder: 'https://your-webhook-url.com/endpoint',
                description: 'The URL to receive webhook events',
            },
            {
                displayName: 'Events',
                name: 'events',
                type: 'multiOptions',
                displayOptions: {
                    show: {
                        resource: ['webhook'],
                        operation: ['configure'],
                    },
                },
                options: [
                    {
                        name: 'Connection Update',
                        value: 'connection.update',
                    },
                    {
                        name: 'Messages Upsert',
                        value: 'messages.upsert',
                    },
                    {
                        name: 'Messages Update',
                        value: 'messages.update',
                    },
                    {
                        name: 'Messages Delete',
                        value: 'messages.delete',
                    },
                    {
                        name: 'Presence Update',
                        value: 'presence.update',
                    },
                    {
                        name: 'Chats Upsert',
                        value: 'chats.upsert',
                    },
                    {
                        name: 'Chats Update',
                        value: 'chats.update',
                    },
                    {
                        name: 'Contacts Upsert',
                        value: 'contacts.upsert',
                    },
                    {
                        name: 'Groups Upsert',
                        value: 'groups.upsert',
                    },
                    {
                        name: 'Group Participants Update',
                        value: 'group-participants.update',
                    },
                    {
                        name: 'Call',
                        value: 'call',
                    },
                ],
                default: ['messages.upsert'],
                description: 'Events to subscribe to',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: IDataObject[] = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        const credentials = await this.getCredentials('kilasApi');
        // Remove trailing slash to prevent double slash in URL
        const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');
        const apiKey = credentials.apiKey as string;

        // Prepare headers with API key if provided
        const defaultHeaders: IDataObject = {
            'Content-Type': 'application/json',
        };
        if (apiKey) {
            defaultHeaders['x-api-key'] = apiKey;
        }

        // Default request options with 120 second timeout
        const requestOptions = {
            timeout: 120000, // 120 seconds
        };

        for (let i = 0; i < items.length; i++) {
            try {
                let responseData: IDataObject = {};

                if (resource === 'message') {
                    const sessionId = this.getNodeParameter('sessionId', i) as string;
                    const chatId = this.getNodeParameter('chatId', i) as string;

                    if (operation === 'sendText') {
                        const text = this.getNodeParameter('text', i) as string;
                        const quotedMessageId = this.getNodeParameter('quotedMessageId', i, '') as string;

                        const body: IDataObject = {
                            sessionId,
                            chatId,
                            text,
                        };

                        // Add quotedMessageId only if provided
                        if (quotedMessageId) {
                            body.quotedMessageId = quotedMessageId;
                        }

                        responseData = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/messages/send-text`,
                            body,
                            headers: defaultHeaders,
                            json: true,
                            timeout: requestOptions.timeout,
                        });
                    } else if (operation === 'sendImage') {
                        const inputType = this.getNodeParameter('imageInputType', i) as string;
                        const caption = this.getNodeParameter('caption', i, '') as string;

                        if (inputType === 'binary') {
                            const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
                            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);

                            const formData = {
                                sessionId,
                                chatId,
                                caption,
                                image: {
                                    value: Buffer.from(binaryData.data, 'base64'),
                                    options: {
                                        filename: binaryData.fileName || 'image.jpg',
                                        contentType: binaryData.mimeType,
                                    },
                                },
                            };

                            responseData = await this.helpers.request({
                                method: 'POST',
                                url: `${baseUrl}/api/messages/send-image`,
                                formData,
                                headers: defaultHeaders,
                                json: true,
                                timeout: requestOptions.timeout,
                            });
                        } else if (inputType === 'base64') {
                            const base64Image = this.getNodeParameter('base64Image', i) as string;

                            responseData = await this.helpers.request({
                                method: 'POST',
                                url: `${baseUrl}/api/messages/send-image`,
                                body: {
                                    sessionId,
                                    chatId,
                                    caption,
                                    image: base64Image,
                                },
                                headers: defaultHeaders,
                                json: true,
                            });
                        } else if (inputType === 'url') {
                            const imageUrl = this.getNodeParameter('imageUrl', i) as string;

                            responseData = await this.helpers.request({
                                method: 'POST',
                                url: `${baseUrl}/api/messages/send-image`,
                                body: {
                                    sessionId,
                                    chatId,
                                    caption,
                                    imageUrl,
                                },
                                headers: defaultHeaders,
                                json: true,
                            });
                        }
                    } else if (operation === 'sendDocument') {
                        const inputType = this.getNodeParameter('documentInputType', i) as string;
                        const caption = this.getNodeParameter('caption', i, '') as string;

                        if (inputType === 'binary') {
                            const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
                            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);

                            const formData = {
                                sessionId,
                                chatId,
                                caption,
                                document: {
                                    value: Buffer.from(binaryData.data, 'base64'),
                                    options: {
                                        filename: binaryData.fileName || 'document.pdf',
                                        contentType: binaryData.mimeType,
                                    },
                                },
                            };

                            responseData = await this.helpers.request({
                                method: 'POST',
                                url: `${baseUrl}/api/messages/send-document`,
                                formData,
                                headers: defaultHeaders,
                                json: true,
                            });
                        } else if (inputType === 'base64') {
                            const base64Document = this.getNodeParameter('base64Document', i) as string;
                            const filename = this.getNodeParameter('filename', i) as string;
                            const mimetype = this.getNodeParameter('mimetype', i) as string;

                            responseData = await this.helpers.request({
                                method: 'POST',
                                url: `${baseUrl}/api/messages/send-document`,
                                body: {
                                    sessionId,
                                    chatId,
                                    caption,
                                    filename,
                                    mimetype,
                                    document: base64Document,
                                },
                                headers: defaultHeaders,
                                json: true,
                            });
                        } else if (inputType === 'url') {
                            const documentUrl = this.getNodeParameter('documentUrl', i) as string;
                            const filename = this.getNodeParameter('filename', i, '') as string;
                            const mimetype = this.getNodeParameter('mimetype', i, '') as string;

                            responseData = await this.helpers.request({
                                method: 'POST',
                                url: `${baseUrl}/api/messages/send-document`,
                                body: {
                                    sessionId,
                                    chatId,
                                    caption,
                                    documentUrl,
                                    filename,
                                    mimetype,
                                },
                                headers: defaultHeaders,
                                json: true,
                            });
                        }
                    } else if (operation === 'sendLocation') {
                        const latitude = this.getNodeParameter('latitude', i) as number;
                        const longitude = this.getNodeParameter('longitude', i) as number;
                        const address = this.getNodeParameter('address', i, '') as string;

                        responseData = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/messages/send-location`,
                            body: {
                                sessionId,
                                chatId,
                                latitude,
                                longitude,
                                address,
                            },
                            headers: defaultHeaders,
                            json: true,
                        });
                    } else if (operation === 'startTyping') {
                        responseData = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/messages/typing/start`,
                            body: {
                                sessionId,
                                chatId,
                            },
                            headers: defaultHeaders,
                            json: true,
                        });
                    } else if (operation === 'stopTyping') {
                        responseData = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/messages/typing/stop`,
                            body: {
                                sessionId,
                                chatId,
                            },
                            headers: defaultHeaders,
                            json: true,
                        });
                    } else if (operation === 'checkStatus') {
                        const messageId = this.getNodeParameter('messageId', i) as string;

                        responseData = await this.helpers.request({
                            method: 'GET',
                            url: `${baseUrl}/api/messages/status/${messageId}`,
                            headers: defaultHeaders,
                            json: true,
                        });
                    }
                } else if (resource === 'session') {
                    if (operation === 'getAll') {
                        responseData = await this.helpers.request({
                            method: 'GET',
                            url: `${baseUrl}/api/sessions`,
                            headers: defaultHeaders,
                            json: true,
                        });
                    } else if (operation === 'create') {
                        const sessionId = this.getNodeParameter('sessionId', i) as string;

                        responseData = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/sessions/create`,
                            body: {
                                sessionId,
                            },
                            headers: defaultHeaders,
                            json: true,
                        });
                    } else if (operation === 'delete') {
                        const sessionId = this.getNodeParameter('sessionId', i) as string;

                        responseData = await this.helpers.request({
                            method: 'DELETE',
                            url: `${baseUrl}/api/sessions/${sessionId}`,
                            headers: defaultHeaders,
                            json: true,
                        });
                    }
                } else if (resource === 'group') {
                    const sessionId = this.getNodeParameter('sessionId', i) as string;

                    if (operation === 'getAll') {
                        responseData = await this.helpers.request({
                            method: 'GET',
                            url: `${baseUrl}/api/groups/${sessionId}`,
                            headers: defaultHeaders,
                            json: true,
                        });
                    } else if (operation === 'create') {
                        const subject = this.getNodeParameter('subject', i) as string;
                        const participantsStr = this.getNodeParameter('participants', i) as string;
                        const participants = participantsStr.split(',').map((p) => p.trim());

                        responseData = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/groups/create`,
                            body: {
                                sessionId,
                                subject,
                                participants,
                            },
                            headers: defaultHeaders,
                            json: true,
                        });
                    }
                } else if (resource === 'contact') {
                    const sessionId = this.getNodeParameter('sessionId', i) as string;

                    if (operation === 'getAll') {
                        responseData = await this.helpers.request({
                            method: 'GET',
                            url: `${baseUrl}/api/contacts/${sessionId}`,
                            headers: defaultHeaders,
                            json: true,
                        });
                    }
                } else if (resource === 'status') {
                    const sessionId = this.getNodeParameter('sessionId', i) as string;

                    if (operation === 'postText') {
                        const text = this.getNodeParameter('text', i) as string;
                        const backgroundColor = this.getNodeParameter('backgroundColor', i, '0xff1a1f3a') as string;
                        const font = this.getNodeParameter('font', i, 1) as number;

                        // Convert hex string to number
                        const bgColorNum = parseInt(backgroundColor.replace('0x', ''), 16);

                        responseData = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/status/post/text`,
                            body: {
                                sessionId,
                                text,
                                backgroundColor: bgColorNum,
                                font,
                            },
                            headers: defaultHeaders,
                            json: true,
                        });
                    }
                } else if (resource === 'webhook') {
                    const sessionId = this.getNodeParameter('sessionId', i) as string;

                    if (operation === 'configure') {
                        const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
                        const events = this.getNodeParameter('events', i) as string[];

                        responseData = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/webhook/${sessionId}`,
                            body: {
                                webhookUrl,
                                events,
                            },
                            headers: defaultHeaders,
                            json: true,
                        });
                    } else if (operation === 'getConfig') {
                        responseData = await this.helpers.request({
                            method: 'GET',
                            url: `${baseUrl}/api/webhook/${sessionId}`,
                            headers: defaultHeaders,
                            json: true,
                        });
                    } else if (operation === 'test') {
                        responseData = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/webhook/${sessionId}/test`,
                            headers: defaultHeaders,
                            json: true,
                        });
                    } else if (operation === 'delete') {
                        responseData = await this.helpers.request({
                            method: 'DELETE',
                            url: `${baseUrl}/api/webhook/${sessionId}`,
                            headers: defaultHeaders,
                            json: true,
                        });
                    }
                }

                returnData.push(responseData);
            } catch (error) {
                if (this.continueOnFail()) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    returnData.push({ error: errorMessage });
                    continue;
                }
                const nodeError = error instanceof Error ? error : new Error(String(error));
                throw new NodeOperationError(this.getNode(), nodeError);
            }
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}
