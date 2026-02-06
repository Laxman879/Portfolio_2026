# Smart Technology System - User Guide

## ✨ Features

### 1. **Auto Icon Detection**
When you type a technology name, the system automatically detects and assigns the appropriate icon.

**Supported Technologies (Auto-Detected):**
- **Frontend:** React, Next.js, Vue, Angular, Svelte
- **Backend:** Node.js, Express, NestJS, Django, Flask, Laravel
- **Languages:** JavaScript, TypeScript, Python, Java, Go, Rust
- **Databases:** MongoDB, MySQL, PostgreSQL, Redis, Firebase
- **Cloud:** AWS, Azure, GCP, Docker, Kubernetes
- **Automation:** N8N, Zapier, Make
- **CSS:** Tailwind, Sass, Bootstrap
- **Tools:** Git, GitHub, GitLab, Figma, VS Code

### 2. **Custom Icon Upload**
If auto-detection doesn't work or you want a custom icon:
1. Select "Upload Image" option
2. Upload your icon/logo
3. Icon is saved permanently
4. Reused automatically for that technology

### 3. **Smart Fallback System**
The system uses intelligent priority:
1. **First Priority:** Uploaded custom image
2. **Second Priority:** Auto-detected icon
3. **Third Priority:** Default code icon

## 🚀 How to Use

### Adding a Technology

#### Method 1: Auto Icon (Recommended)
1. Go to **Admin → Technologies**
2. Type technology name (e.g., "React")
3. Icon auto-detected ✓
4. Click "Add Technology"

#### Method 2: Custom Upload
1. Go to **Admin → Technologies**
2. Type technology name (e.g., "Custom Tool")
3. Select "Upload Image"
4. Upload icon/logo
5. Click "Add Technology"

### Using Technologies in Projects
1. Go to **Admin → Project**
2. Fill project details
3. Select technologies from list (multiple selection)
4. Technologies display with their icons automatically

### Frontend Display
- Technologies appear as beautiful chip UI
- Circular icon background
- Technology name label
- Consistent design for all icon types

## 🎯 Examples

### Auto-Detected Technologies
```
Type "React" → Auto assigns FaReact icon
Type "Next.js" → Auto assigns SiNextdotjs icon
Type "MongoDB" → Auto assigns SiMongodb icon
Type "N8N" → Auto assigns SiN8n icon
```

### Custom Technologies
```
Type "Custom CRM" → Upload custom logo
Type "Internal Tool" → Upload company icon
```

## 💡 Tips

1. **Use lowercase or proper case** - System normalizes automatically
2. **Common variations work** - "Next.js", "NextJS", "nextjs" all work
3. **Upload once, reuse forever** - Uploaded icons saved permanently
4. **Edit anytime** - Update icons or names from Technologies tab
5. **No duplicates** - System prevents duplicate technology names

## 🔧 Technical Details

### Icon Priority Logic
```javascript
IF uploaded_image EXISTS
  → Use uploaded image
ELSE IF icon_identifier EXISTS
  → Render dynamic icon from library
ELSE
  → Show default fallback icon
```

### Supported Icon Libraries
- Font Awesome (Fa*)
- Simple Icons (Si*)
- 1000+ icons available

### Image Upload
- Formats: PNG, JPG, SVG, WebP
- Stored as base64 in database
- Automatically optimized by Next.js Image component
