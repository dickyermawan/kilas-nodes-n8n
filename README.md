# n8n-nodes-kilas

This is an n8n community node package for [Kilas WhatsApp Gateway](https://github.com/dickyermawan/kilas). It lets you integrate Kilas WhatsApp Gateway with your n8n workflows.

[Kilas](https://github.com/dickyermawan/kilas) is a modern, fast, and reliable WhatsApp Gateway built with Baileys, featuring a beautiful dashboard, multi-session support, and comprehensive REST API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `@dickyermawan/n8n-nodes-kilas` in **Enter npm package name**
4. Agree to the risks and install

### Manual Installation

```bash
cd ~/.n8n/nodes
npm install @dickyermawan/n8n-nodes-kilas
```

Restart n8n after installation.

## Credentials

This package provides the **Kilas API** credential:

- **Base URL**: The URL of your Kilas instance (default: `http://localhost:3000`)
- **API Key**: Your Kilas API key (leave empty if authentication is disabled)

## Nodes

### Kilas

The main node for interacting with Kilas WhatsApp Gateway.

#### Resources

**Message**
- Send Text - Send a text message
- Send Text with Quote/Reply - Reply to a specific message
- Send Image - Send an image (binary, base64, or **URL**)
- Send Document - Send a document (binary, base64, or **URL**)
- Send Location - Send a location with coordinates
- Start Typing - Show "typing..." indicator
- Stop Typing - Hide "typing..." indicator
- Check Message Status - Check delivery status (pending/sent/delivered/read)

**Session**
- Get All - Get all active sessions
- Create - Create a new WhatsApp session
- Delete - Delete a session

**Group**
- Get All - Get all groups for a session
- Create - Create a new WhatsApp group

**Contact**
- Get All - Get all contacts for a session

**Status**
- Post Text - Post a text status update

**Webhook**
- Configure - Configure webhook for a session
- Get Configuration - Get current webhook configuration
- Test - Test webhook connection
- Delete - Delete webhook configuration

### Kilas Trigger

Webhook trigger node that receives events from Kilas.

#### Features

- Receives real-time events from Kilas
- Supports all 11 event types:
  - Connection Update
  - Messages Upsert (new messages)
  - Messages Update
  - Messages Delete
  - Presence Update
  - Chats Upsert
  - Chats Update
  - Contacts Upsert
  - Groups Upsert
  - Group Participants Update
  - Call
- Filter group/private messages
- Automatic webhook registration/deregistration

## Usage Examples

### Send a WhatsApp Message

1. Add the **Kilas** node to your workflow
2. Select **Message** resource
3. Select **Send Text** operation
4. Enter your **Session ID**
5. Enter the recipient's **Chat ID** (phone number with country code, e.g., `628123456789`)
6. Enter your **Text** message
7. Execute the node

### Receive WhatsApp Messages

1. Add the **Kilas Trigger** node to your workflow
2. Enter your **Session ID**
3. Select the **Events** you want to receive (e.g., `Messages Upsert`)
4. Optionally enable filters for group/private messages
5. Activate the workflow
6. The trigger will automatically configure the webhook in Kilas

### Send Image from Previous Node

1. Use a node that outputs binary data (e.g., HTTP Request)
2. Add the **Kilas** node
3. Select **Message** > **Send Image**
4. Choose **Binary Data** as input type
5. Enter the binary property name (usually `data`)
6. Add a caption if desired
7. Execute the node

### Reply to a Message (Quote)

1. Add the **Kilas Trigger** node to receive messages (get message IDs)
2. Add the **Kilas** node
3. Select **Message** > **Send Text**
4. Enter your **Session ID**
5. Enter the recipient's **Chat ID**
6. Enter your **Text** message
7. In **Quoted Message ID**, enter the message ID from the trigger (e.g., `{{$json.data.messages[0].key.id}}`)
8. Execute the node

### Show Typing Indicator

1. Add the **Kilas** node
2. Select **Message** > **Start Typing**
3. Enter your **Session ID**
4. Enter the **Chat ID**
5. Execute the node (typing indicator will show for ~30 seconds or until stopped)

To stop manually:
1. Add another **Kilas** node
2. Select **Message** > **Stop Typing**
3. Use the same Session ID and Chat ID
4. Execute the node

## Compatibility

- Requires n8n version 0.198.0 or higher
- Compatible with Kilas WhatsApp Gateway v1.0.0+

## Resources

- [Kilas GitHub Repository](https://github.com/dickyermawan/kilas)
- [Kilas API Documentation](https://github.com/dickyermawan/kilas#-api-documentation)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)

## Support

For issues related to:
- **This n8n package**: Open an issue in this repository
- **Kilas WhatsApp Gateway**: Visit the [Kilas repository](https://github.com/dickyermawan/kilas)
- **n8n platform**: Visit [n8n community forum](https://community.n8n.io/)

## Version History

### 1.3.0
- Added URL input type for Send Image (use `imageUrl` parameter)
- Added URL input type for Send Document (use `documentUrl` parameter)
- Baileys downloads and sends media directly from URLs

### 1.2.0
- Added Check Message Status operation to check delivery status (pending/sent/delivered/read)

### 1.1.3
- Fixed Kilas Trigger authentication - API key now properly sent in webhook operations

### 1.1.2
- Changed package name to scoped package: `@dickyermawan/n8n-nodes-kilas`
- Updated node icon with new Kilas logo

### 1.1.1
- Fixed authentication issue - API key now properly sent in all requests

### 1.1.0
- Added Quote/Reply message support via `quotedMessageId` parameter
- Added typing indicator operations (Start Typing, Stop Typing)
- Enhanced message operations with more control

### 1.0.0
- Initial release
- Support for all Kilas API endpoints
- Webhook trigger with event filtering
- Binary and base64 support for media files
