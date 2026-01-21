# 🎓 MSc Application Tracker

A beautiful, privacy-first web application for tracking your Master's degree applications, deadlines, and recommenders. Built with Nuxt 3, powered by Google Sheets, and designed with a stunning glassmorphism UI.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/azizjail2003/applications-tracker)

## ✨ Features

### 📊 Core Functionality
- **Application Management**: Track unlimited university applications with detailed information
- **Smart Checklists**: Create customizable to-do lists for each application (SOP, CV, transcripts, etc.)
- **Recommender Tracking**: Manage recommendation letters and nudge reminders
- **Progress Automation**: Auto-calculated progress based on checklist completion
- **Deadline Management**: Visual deadline tracking with upcoming alerts

### 🎨 Premium UX
- **3D Tilt Effects**: Interactive glassmorphism cards with parallax hover effects
- **Fluid Animations**: Spring-based entrance animations powered by @vueuse/motion
- **Dark Mode**: Seamless light/dark theme switching
- **Progressive Web App**: Install on any device, works offline
- **Mobile Optimized**: Fully responsive design

### 🔒 Privacy & Security
- **100% Client-Side**: Your data never touches our servers
- **Google Sheets Backend**: All data stored in YOUR Google account
- **Read-Only Sharing**: Share your progress without edit permissions
- **Zero Tracking**: No analytics, no cookies, no surveillance

### 🤖 Automation
- **Email Reminders**: Google Apps Script automatically emails you 7, 3, and 1 day before deadlines
- **Auto-Save**: Changes sync immediately to your Google Sheet
- **Smart Suggestions**: AI-powered checklist item recommendations

### 🌍 Localization
- Multi-language support (English, French, Arabic)
- Auto-detects browser language preference

## 🚀 Quick Start

### For Users (No Coding Required)

1. **Create Your Database**
   - Go to [sheets.new](https://sheets.new)
   - Create 3 tabs: `applications`, `checklist`, `recommenders`
   - Copy the headers from our [Setup Page](https://applications-tracker.vercel.app/setup)

2. **Deploy the Backend Script**
   - In your Sheet, go to **Extensions > Apps Script**
   - Copy the code from our Setup Page
   - Replace `SHEET_ID` with your Sheet's ID (found in the URL)
   - Click **Deploy > New deployment** (Web App, access: Anyone)
   - Copy the deployment URL

3. **Connect & Start**
   - Visit [applications-tracker.vercel.app](https://applications-tracker.vercel.app)
   - Paste your deployment URL
   - Start tracking!

📺 **Full video tutorial coming soon!**

## 💻 For Developers

### Tech Stack
- **Frontend**: Nuxt 3, Vue 3, TypeScript, Tailwind CSS
- **Animations**: @vueuse/motion, vanilla-tilt
- **Backend**: Google Apps Script (serverless)
- **Storage**: Google Sheets API
- **Hosting**: Vercel (recommended)

### Local Development

```bash
# Clone the repository
git clone https://github.com/azizjail2003/applications-tracker.git
cd applications-tracker

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:3000`

### Environment Variables

Create a `.env` file:

```env
NUXT_PUBLIC_API_BASE=your_google_apps_script_deployment_url
```

### Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set `NUXT_PUBLIC_API_BASE` environment variable
4. Deploy!

## 📁 Project Structure

```
Msc-app/
├── assets/              # Global styles, Tailwind config
├── components/          # Reusable Vue components
│   ├── AppHeader.vue
│   ├── ConfirmModal.vue
│   ├── ProgressBar.vue
│   └── StatusBadge.vue
├── composables/         # Vue composables (shared logic)
│   ├── useApi.ts       # API communication
│   ├── useApplications.ts  # State management
│   ├── useConfirm.ts   # Modal system
│   ├── useTheme.ts     # Dark mode
│   └── useTranslation.ts   # i18n
├── google-apps-script/  # Backend code (paste into Google)
│   └── Code.js
├── i18n/               # Translation files
│   ├── en.ts
│   ├── fr.ts
│   └── ar.ts
├── pages/              # Nuxt routes
│   ├── index.vue       # Home/Dashboard
│   ├── setup.vue       # Setup wizard
│   └── applications/
│       ├── index.vue   # Application list
│       └── [id].vue    # Application detail
├── plugins/            # Nuxt plugins
│   └── tilt.ts        # 3D tilt directive
├── public/             # Static assets
└── types/              # TypeScript definitions
```

## 🎯 Key Design Decisions

### Why Google Sheets?
- **Zero backend costs**: No database, no server maintenance
- **Data ownership**: Users keep 100% control of their data
- **Collaboration**: Built-in sharing and real-time sync
- **Accessibility**: Works anywhere, on any device

### Why No Database?
- **Privacy-first**: We never see your data
- **Free forever**: No expensive database hosting
- **Portable**: Export to Excel/CSV anytime
- **Transparent**: Users can see exactly what's stored

## 🐛 Known Issues & Solutions

### CORS Error on First Setup
**Symptom**: "Failed to fetch" error when connecting

**Solution**:
1. Open Google Apps Script editor
2. Select `sendTestEmail` function
3. Click **Run**
4. Click **Review Permissions** and **Allow**

This only needs to be done once per user.

### Duplicate Rows Created
**Fixed in latest version!** If you're on an older version, pull the latest changes.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is **open source** and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Abdelaziz Jail**
- Website: [jailabdelaziz.online](https://jailabdelaziz.online)
- Email: jailabdelaziz@icloud.com
- GitHub: [@azizjail2003](https://github.com/azizjail2003)

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [@vueuse/motion](https://motion.vueuse.org/) for beautiful animations
- Google for Apps Script and Sheets API

---

<div align="center">

**⭐ Star this repo if it helped you!**

[View Demo](https://applications-tracker.vercel.app) · [Report Bug](https://github.com/azizjail2003/applications-tracker/issues) · [Request Feature](https://github.com/azizjail2003/applications-tracker/issues)

</div>
