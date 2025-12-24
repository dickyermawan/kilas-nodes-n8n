import {
    IHookFunctions,
    IWebhookFunctions,
    IDataObject,
    INodeType,
    INodeTypeDescription,
    IWebhookResponseData,
    NodeOperationError,
} from 'n8n-workflow';

export class KilasTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Kilas Trigger',
        name: 'kilasTrigger',
        icon: 'file:kilas.png',
        group: ['trigger'],
        version: 1,
        subtitle: '={{$parameter["events"].join(", ")}}',
        description: 'Starts the workflow when Kilas webhook events are received',
        defaults: {
            name: 'Kilas Trigger',
        },
        inputs: [],
        outputs: ['main'],
        credentials: [
            {
                name: 'kilasApi',
                required: true,
            },
        ],
        webhooks: [
            {
                name: 'default',
                httpMethod: 'POST',
                responseMode: 'onReceived',
                path: 'webhook',
            },
        ],
        properties: [
            {
                displayName: 'Session ID',
                name: 'sessionId',
                type: 'string',
                required: true,
                default: '',
                placeholder: 'MySession',
                description: 'The session ID to receive events from',
            },
            {
                displayName: 'Events',
                name: 'events',
                type: 'multiOptions',
                required: true,
                options: [
                    {
                        name: 'Connection Update',
                        value: 'connection.update',
                        description: 'Connection status changes',
                    },
                    {
                        name: 'Messages Upsert',
                        value: 'messages.upsert',
                        description: 'New messages received',
                    },
                    {
                        name: 'Messages Update',
                        value: 'messages.update',
                        description: 'Message updates (read receipts, edits)',
                    },
                    {
                        name: 'Messages Delete',
                        value: 'messages.delete',
                        description: 'Deleted messages',
                    },
                    {
                        name: 'Presence Update',
                        value: 'presence.update',
                        description: 'User presence (online/offline)',
                    },
                    {
                        name: 'Chats Upsert',
                        value: 'chats.upsert',
                        description: 'New chats',
                    },
                    {
                        name: 'Chats Update',
                        value: 'chats.update',
                        description: 'Chat updates',
                    },
                    {
                        name: 'Contacts Upsert',
                        value: 'contacts.upsert',
                        description: 'Contact updates',
                    },
                    {
                        name: 'Groups Upsert',
                        value: 'groups.upsert',
                        description: 'New groups',
                    },
                    {
                        name: 'Group Participants Update',
                        value: 'group-participants.update',
                        description: 'Group participant changes',
                    },
                    {
                        name: 'Call',
                        value: 'call',
                        description: 'Incoming calls',
                    },
                ],
                default: ['messages.upsert'],
                description: 'The events to listen for',
            },
            {
                displayName: 'Filter Group Messages',
                name: 'filterGroupMessages',
                type: 'boolean',
                default: false,
                description: 'Whether to filter out group messages (only receive private messages)',
                displayOptions: {
                    show: {
                        events: ['messages.upsert'],
                    },
                },
            },
            {
                displayName: 'Filter Private Messages',
                name: 'filterPrivateMessages',
                type: 'boolean',
                default: false,
                description: 'Whether to filter out private messages (only receive group messages)',
                displayOptions: {
                    show: {
                        events: ['messages.upsert'],
                    },
                },
            },
        ],
    };

    webhookMethods = {
        default: {
            async checkExists(this: IHookFunctions): Promise<boolean> {
                const webhookUrl = this.getNodeWebhookUrl('default');
                const sessionId = this.getNodeParameter('sessionId') as string;
                const credentials = await this.getCredentials('kilasApi');
                const baseUrl = credentials.baseUrl as string;

                try {
                    const response = await this.helpers.request({
                        method: 'GET',
                        url: `${baseUrl}/api/webhook/${sessionId}`,
                        json: true,
                    });

                    return response.webhookUrl === webhookUrl;
                } catch (error) {
                    return false;
                }
            },
            async create(this: IHookFunctions): Promise<boolean> {
                const webhookUrl = this.getNodeWebhookUrl('default');
                const sessionId = this.getNodeParameter('sessionId') as string;
                const events = this.getNodeParameter('events') as string[];
                const credentials = await this.getCredentials('kilasApi');
                const baseUrl = credentials.baseUrl as string;

                try {
                    await this.helpers.request({
                        method: 'POST',
                        url: `${baseUrl}/api/webhook/${sessionId}`,
                        body: {
                            webhookUrl,
                            events,
                        },
                        json: true,
                    });

                    return true;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    throw new NodeOperationError(this.getNode(), `Failed to create webhook: ${errorMessage}`);
                }
            },
            async delete(this: IHookFunctions): Promise<boolean> {
                const sessionId = this.getNodeParameter('sessionId') as string;
                const credentials = await this.getCredentials('kilasApi');
                const baseUrl = credentials.baseUrl as string;

                try {
                    await this.helpers.request({
                        method: 'DELETE',
                        url: `${baseUrl}/api/webhook/${sessionId}`,
                        json: true,
                    });

                    return true;
                } catch (error) {
                    return false;
                }
            },
        },
    };

    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const bodyData = this.getBodyData() as IDataObject;
        const filterGroupMessages = this.getNodeParameter('filterGroupMessages', false) as boolean;
        const filterPrivateMessages = this.getNodeParameter('filterPrivateMessages', false) as boolean;

        // Apply filters for message events
        if (bodyData.event === 'messages.upsert' && bodyData.data) {
            const data = bodyData.data as IDataObject;
            const isGroup = data.isGroup as boolean;

            // Filter group messages if enabled
            if (filterGroupMessages && isGroup) {
                return {
                    workflowData: [[]],
                };
            }

            // Filter private messages if enabled
            if (filterPrivateMessages && !isGroup) {
                return {
                    workflowData: [[]],
                };
            }
        }

        return {
            workflowData: [this.helpers.returnJsonArray(bodyData)],
        };
    }
}
