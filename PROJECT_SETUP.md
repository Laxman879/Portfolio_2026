# Project Setup Instructions

## Initial Setup - Seed Default Categories

Before adding projects, you need to seed the default categories.

### Method 1: Using API (Recommended)
Make a POST request to seed default categories:
```bash
curl -X POST http://localhost:3000/api/category/seed
```

Or visit in browser and use browser console:
```javascript
fetch('/api/category/seed', { method: 'POST' })
  .then(res => res.json())
  .then(data => console.log(data));
```

### Method 2: Using Admin Panel
1. Go to Admin Panel → Categories tab
2. Manually add these categories:
   - Name: `frontend`, Label: `Frontend`
   - Name: `backend`, Label: `Backend`
   - Name: `fullstack`, Label: `Fullstack`
   - Name: `css`, Label: `UI / CSS`

## Default Categories

The system comes with 4 main categories:
- **All** (default - shows all projects)
- **Frontend**
- **Backend**
- **Fullstack**
- **UI / CSS**

## Adding More Categories

You can add additional categories from the Admin Panel:
- React / Next.js Projects
- Animation / Interactive UI
- API / Microservices
- Performance Optimization
- AI / Automation
- etc.

These additional categories will appear when users click "More Categories" button.

## Project Features

### Admin Panel:
- Upload project images
- Add multiple technologies with icons (emojis)
- Assign category
- Add live demo and GitHub links
- Edit/Delete projects

### Frontend Display:
- Dynamic category tabs
- "More Categories" button for additional categories
- Technology chips with icons
- Project images
- Responsive grid layout
