# Publishing Guide for n8n-nodes-kilas

This guide will help you publish the Kilas n8n community nodes package to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/) if you don't have one
2. **npm CLI**: Make sure npm is installed and you're logged in:
   ```bash
   npm login
   ```

## Pre-Publishing Checklist

- [x] Package built successfully (`npm run build`)
- [x] All TypeScript files compile without errors
- [x] Icons copied to dist folder
- [ ] Update package.json with correct author information
- [ ] Test the package locally in n8n
- [ ] Create GitHub repository (optional but recommended)

## Steps to Publish

### 1. Update Package Information

Edit `package.json` and update:
- `author.email`: Your actual email address
- `repository.url`: Your GitHub repository URL (if you create one)

### 2. Test Locally (Optional but Recommended)

Before publishing, test the package in your local n8n instance:

```bash
# In the kilas-node directory
npm link

# In your n8n installation directory (usually ~/.n8n)
cd ~/.n8n
npm link n8n-nodes-kilas

# Restart n8n
n8n start
```

### 3. Publish to npm

```bash
# Make sure you're in the kilas-node directory
cd d:/Dev/App/poker-face/kilas-node

# Publish to npm
npm publish
```

If this is your first time publishing, you might need to verify your email first.

### 4. Verify Publication

After publishing, verify your package:
- Visit: https://www.npmjs.com/package/n8n-nodes-kilas
- Check that all files are included
- Verify the version number

## Post-Publishing

### Update Version for Future Releases

When you make changes and want to publish a new version:

```bash
# Increment patch version (1.0.0 -> 1.0.1)
npm version patch

# Or increment minor version (1.0.0 -> 1.1.0)
npm version minor

# Or increment major version (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish
```

### Create GitHub Repository (Recommended)

1. Create a new repository on GitHub: `n8n-nodes-kilas`
2. Initialize git and push:

```bash
cd d:/Dev/App/poker-face/kilas-node
git init
git add .
git commit -m "Initial commit: Kilas n8n community nodes"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/n8n-nodes-kilas.git
git push -u origin main
```

3. Update the repository URL in `package.json`

## Installation for Users

After publishing, users can install your package in n8n:

### Via n8n UI (Recommended)
1. Go to **Settings > Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-kilas`
4. Click **Install**

### Via Command Line
```bash
cd ~/.n8n/nodes
npm install n8n-nodes-kilas
```

## Troubleshooting

### "Package name already exists"
If someone else has already published `n8n-nodes-kilas`, you'll need to:
1. Choose a different name (e.g., `n8n-nodes-kilas-gateway`)
2. Update the `name` field in `package.json`
3. Update all references in the README

### "You must verify your email"
1. Check your email for verification link from npm
2. Click the link to verify
3. Try publishing again

### "You do not have permission to publish"
Make sure you're logged in:
```bash
npm whoami  # Check current user
npm login   # Login if needed
```

## Support

For issues with:
- **Publishing**: Check [npm documentation](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- **n8n Community Nodes**: Visit [n8n community nodes docs](https://docs.n8n.io/integrations/community-nodes/)
- **Kilas Gateway**: Visit [Kilas repository](https://github.com/dickyermawan/kilas)

## Version History

### 1.0.0 (Initial Release)
- Kilas node with all API operations
- Kilas Trigger node with webhook support
- Support for messages, sessions, groups, contacts, status, and webhooks
- Binary and base64 support for media files
