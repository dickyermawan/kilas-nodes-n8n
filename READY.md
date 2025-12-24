# 🚀 Kilas n8n Nodes - Ready to Publish!

## ✅ Status: READY FOR PRODUCTION

Package `n8n-nodes-kilas` v1.1.0 telah berhasil di-build dan siap untuk dipublish ke npm!

---

## 📦 Package Information

- **Name**: `n8n-nodes-kilas`
- **Version**: `1.1.0`
- **Size**: 14.1 kB (compressed)
- **Unpacked Size**: 92.7 kB
- **Total Files**: 17 files

### Package Contents:
```
✅ LICENSE
✅ README.md
✅ dist/credentials/KilasApi.credentials.js
✅ dist/nodes/Kilas/Kilas.node.js
✅ dist/nodes/KilasTrigger/KilasTrigger.node.js
✅ dist/nodes/*/kilas.svg (icons)
✅ All .d.ts and .map files
✅ package.json
```

---

## 🎯 Cara Install di n8n

### **Metode 1: Via npm (Setelah Publish) - RECOMMENDED**

#### Step 1: Publish ke npm
```bash
cd d:/Dev/App/poker-face/kilas-node

# Login ke npm (jika belum)
npm login

# Publish package
npm publish
```

#### Step 2: Install di n8n via UI
1. Buka n8n di browser (http://localhost:5678)
2. Klik **Settings** (⚙️) di sidebar kiri
3. Pilih **Community Nodes**
4. Klik tombol **Install**
5. Masukkan: `n8n-nodes-kilas`
6. Klik **Install**
7. Tunggu proses selesai (~30 detik)
8. **Restart n8n** (penting!)

#### Step 3: Verifikasi
1. Buat workflow baru
2. Klik **+** untuk add node
3. Search: **"Kilas"**
4. Harus muncul:
   - 💬 **Kilas** (regular node)
   - 💬 **Kilas Trigger** (webhook trigger)

---

### **Metode 2: Testing Lokal (Tanpa Publish)**

Untuk testing sebelum publish ke npm:

```bash
# 1. Link package secara global
cd d:/Dev/App/poker-face/kilas-node
npm link

# 2. Cari lokasi n8n
# Biasanya di salah satu:
# - %APPDATA%\npm\node_modules\n8n
# - C:\Users\it24j\.n8n

# 3. Link ke n8n (pilih salah satu sesuai lokasi n8n)
cd %APPDATA%\npm\node_modules\n8n
npm link n8n-nodes-kilas

# ATAU
cd C:\Users\it24j\.n8n
npm link n8n-nodes-kilas

# 4. Restart n8n
# Tekan Ctrl+C untuk stop
# Lalu start ulang:
n8n start
```

---

## 🔧 Setup Credentials di n8n

Setelah node terinstall:

1. Di workflow, add **Kilas** node
2. Klik pada **Credential to connect with**
3. Klik **Create New**
4. Pilih **Kilas API**
5. Isi:
   - **Base URL**: `http://localhost:3000` (atau URL Kilas Anda)
   - **API Key**: API key dari Kilas Gateway (atau kosongkan jika disabled)
6. Klik **Save**
7. Test connection dengan operasi "Get All Sessions"

---

## 📚 Fitur yang Tersedia

### Kilas Node (26 Operations)

#### 📨 Message (8 operations)
- ✅ Send Text
- ✅ Send Text with Quote/Reply (NEW v1.1.0)
- ✅ Send Image (binary/base64)
- ✅ Send Document (binary/base64)
- ✅ Send Location
- ✅ Start Typing (NEW v1.1.0)
- ✅ Stop Typing (NEW v1.1.0)

#### 👥 Session (3 operations)
- ✅ Get All
- ✅ Create
- ✅ Delete

#### 👨‍👩‍👧‍👦 Group (2 operations)
- ✅ Get All
- ✅ Create

#### 📇 Contact (1 operation)
- ✅ Get All

#### 📢 Status (1 operation)
- ✅ Post Text

#### 🔔 Webhook (4 operations)
- ✅ Configure
- ✅ Get Configuration
- ✅ Test
- ✅ Delete

### Kilas Trigger Node

- ✅ Webhook receiver untuk 11 event types
- ✅ Event filtering
- ✅ Group/Private message filtering
- ✅ Auto webhook registration/deregistration

---

## 🎬 Quick Start Example

### Example 1: Send WhatsApp Message
```
1. Add "Kilas" node
2. Resource: Message
3. Operation: Send Text
4. Session ID: MySession
5. Chat ID: 628123456789
6. Text: Hello from n8n! 🚀
7. Execute!
```

### Example 2: Auto-Reply Bot
```
1. Add "Kilas Trigger" node
   - Session ID: MySession
   - Events: Messages Upsert
   
2. Add "Kilas" node
   - Operation: Send Text
   - Chat ID: {{$json.data.messages[0].key.remoteJid}}
   - Text: Thanks for your message!
   - Quoted Message ID: {{$json.data.messages[0].key.id}}
   
3. Activate workflow!
```

---

## 🐛 Troubleshooting

### Node tidak muncul setelah install?

**Solusi 1: Clear cache**
```bash
# Stop n8n (Ctrl+C)
# Hapus cache
rm -rf ~/.n8n/cache
# Start ulang
n8n start
```

**Solusi 2: Reinstall**
```bash
# Via n8n UI:
# Settings > Community Nodes > Uninstall > Install lagi
```

### Error saat connect ke Kilas?

**Cek Kilas Gateway running:**
```bash
curl http://localhost:3000/api/sessions \
  -H "x-api-key: your_api_key"
```

**Cek credentials:**
- Base URL benar (http://localhost:3000)
- API Key sesuai (atau kosong jika disabled)

### Update ke versi baru?

**Via n8n UI:**
1. Settings > Community Nodes
2. Cari "n8n-nodes-kilas"
3. Klik **Update** (jika ada versi baru)

**Via npm:**
```bash
cd ~/.n8n/nodes
npm update n8n-nodes-kilas
```

---

## 📝 Changelog v1.1.0

### New Features
- ✨ Quote/Reply message support via `quotedMessageId`
- ✨ Typing indicator operations (Start/Stop)

### Improvements
- 📚 Enhanced documentation
- 🔧 Better error handling
- 🎨 Improved parameter descriptions

---

## 🔗 Resources

- **Kilas GitHub**: https://github.com/dickyermawan/kilas
- **Kilas API Docs**: https://github.com/dickyermawan/kilas#-api-documentation
- **n8n Docs**: https://docs.n8n.io/integrations/community-nodes/

---

## ✅ Pre-Publish Checklist

- [x] Build successful
- [x] TypeScript compilation OK
- [x] All icons included
- [x] package.json configured
- [x] README.md complete
- [x] LICENSE included
- [x] Dry-run successful
- [x] Version 1.1.0 set
- [ ] npm login done
- [ ] Ready to `npm publish`!

---

## 🚀 Next Steps

### To Publish:
```bash
npm login
npm publish
```

### To Test Locally:
```bash
npm link
cd <n8n-location>
npm link n8n-nodes-kilas
n8n start
```

**Package is ready! Happy automating! 🎉**
