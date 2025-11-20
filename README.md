# I Love Warranty

Extract warranty information from your purchase bills or warranty cards and quickly calculate expiry dates. This project started from the Vite React template and has been restyled with a custom UI (light/dark modes, feature cards, skeleton loading, export options).

## Features
- Upload PDF or image (JPG/PNG) mock OCR processing (currently simulated)
- Auto warranty expiry calculation (duration + unit)
- Inline editing of extracted fields (product name, dates, duration)
- Multiple export formats: TXT (pseudo-PDF), CSV, image snapshot, enhanced bill image download
- Light / Dark theme toggle
- Skeleton loader while processing
- Empty state feature highlights

## Tech Stack
- React 19 + Vite 7
- `lucide-react` icons
- Plain CSS (`ui.css`) for theming and layout

## Getting Started
```bash
npm install
npm run dev
``` 
Visit the printed local URL (typically http://localhost:5173 or fallback port) in your browser.

## Export Formats
| Format   | File Name              | Notes |
|----------|------------------------|-------|
| Text     | `warranty_info.txt`    | Plain text summary (simulating simple PDF) |
| CSV      | `warranty_info.csv`    | Single-row structured data |
| Image    | `warranty_info.png`    | Rendered canvas snapshot |
| Bill Img | `enhanced_bill.png`    | Original uploaded image for reference |

## Roadmap / Ideas
- Integrate real OCR (e.g. Tesseract.js or server API)
- User accounts & cloud sync of warranties
- Notifications before expiry (email / push)
- Tagging & searching warranties
- More export formats (PDF generation library)

## Contributing
PRs and issues welcome. Please run `npm run build` before submitting to ensure a clean build.

## License
MIT (add a LICENSE file if distributing publicly)

---
Generated and evolved from the base Vite React template.
