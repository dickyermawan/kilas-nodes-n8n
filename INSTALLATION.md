# Cara Install Kilas n8n Community Nodes

## Metode 1: Install dari npm (Setelah Publish)

### Langkah 1: Publish ke npm

```bash
# Login ke npm (jika belum)
npm login

# Publish package
cd d:/Dev/App/poker-face/kilas-node
npm publish
```

### Langkah 2: Install di n8n via UI

1. Buka n8n di browser
2. Klik **Settings** (ikon gear) di sidebar kiri
3. Pilih **Community Nodes**
4. Klik tombol **Install**
5. Masukkan nama package: `n8n-nodes-kilas`
6. Klik **Install**
7. Tunggu proses instalasi selesai
8. Restart n8n jika diminta

### Langkah 3: Verifikasi

1. Buat workflow baru
2. Klik tombol **+** untuk add node
3. Search "Kilas"
4. Anda akan melihat:
   - **Kilas** (regular node)
   - **Kilas Trigger** (trigger node)

---

## Metode 2: Install Lokal (Testing Sebelum Publish)

### Langkah 1: Link Package Secara Global

```bash
# Di directory kilas-node
cd d:/Dev/App/poker-face/kilas-node
npm link
```

### Langkah 2: Link ke n8n

```bash
# Cari lokasi instalasi n8n
# Biasanya di salah satu lokasi berikut:

# Windows (global npm):
cd %APPDATA%\npm\node_modules\n8n
npm link n8n-nodes-kilas

# Atau jika n8n di-install via npx/local:
cd C:\Users\it24j\.n8n
npm link n8n-nodes-kilas
```

### Langkah 3: Restart n8n

```bash
# Stop n8n (Ctrl+C jika running)
# Start ulang
n8n start

# Atau jika menggunakan npx:
npx n8n
```

### Langkah 4: Verifikasi

1. Buka n8n di browser (biasanya http://localhost:5678)
2. Buat workflow baru
3. Search "Kilas" di node list
4. Node Kilas dan Kilas Trigger harus muncul

---

## Metode 3: Install Manual (Alternatif)

### Langkah 1: Copy Package ke n8n

```bash
# Buat direktori custom nodes jika belum ada
mkdir -p ~/.n8n/custom

# Copy seluruh folder dist ke custom nodes
cp -r d:/Dev/App/poker-face/kilas-node/dist ~/.n8n/custom/n8n-nodes-kilas
```

### Langkah 2: Install Dependencies

```bash
cd ~/.n8n/custom/n8n-nodes-kilas
npm install --production
```

### Langkah 3: Restart n8n

```bash
n8n start
```

---

## Troubleshooting

### Node Tidak Muncul Setelah Install

1. **Clear cache n8n:**
   ```bash
   # Stop n8n
   # Hapus cache
   rm -rf ~/.n8n/cache
   # Start ulang
   n8n start
   ```

2. **Cek instalasi:**
   ```bash
   # Lihat list community nodes yang terinstall
   cd ~/.n8n/nodes
   ls -la
   ```

3. **Cek log n8n:**
   - Lihat console output saat n8n start
   - Cari error message terkait "kilas"

### Error "Package not found" saat Install via UI

- Package belum di-publish ke npm
- Gunakan Metode 2 (Install Lokal) untuk testing

### Error "Version mismatch"

```bash
# Update n8n ke versi terbaru
npm update -g n8n

# Atau install ulang
npm install -g n8n@latest
```

### Node Muncul tapi Error saat Digunakan

1. **Cek credentials:**
   - Pastikan Kilas API credentials sudah dikonfigurasi
   - Test connection di credentials settings

2. **Cek Kilas Gateway:**
   - Pastikan Kilas WhatsApp Gateway running
   - Test dengan curl:
     ```bash
     curl http://localhost:3000/api/sessions \
       -H "x-api-key: your_api_key"
     ```

---

## Uninstall

### Via n8n UI:
1. Settings > Community Nodes
2. Cari "n8n-nodes-kilas"
3. Klik tombol **Uninstall**

### Via Command Line:
```bash
cd ~/.n8n/nodes
npm uninstall n8n-nodes-kilas
```

### Unlink (jika menggunakan npm link):
```bash
# Di directory kilas-node
npm unlink

# Di directory n8n
cd ~/.n8n
npm unlink n8n-nodes-kilas
```

---

## Tips

1. **Development Mode:**
   - Gunakan `npm link` untuk testing
   - Setiap perubahan code, run `npm run build`
   - Restart n8n untuk load perubahan

2. **Production:**
   - Publish ke npm dengan version yang benar
   - Install via n8n UI untuk kemudahan

3. **Update Package:**
   - Increment version di package.json
   - Run `npm run build`
   - Publish ulang ke npm
   - User bisa update via n8n UI

---

## Checklist Sebelum Publish

- [ ] Build berhasil (`npm run build`)
- [ ] Test lokal dengan `npm link`
- [ ] Semua operasi berfungsi
- [ ] Credentials test berhasil
- [ ] README.md lengkap
- [ ] package.json sudah benar (author, repo, dll)
- [ ] Version number sesuai (semantic versioning)
- [ ] LICENSE file ada

Setelah semua checklist ✅, siap publish dengan `npm publish`!
