# I Love Warranty

A lightweight utility that extracts warranty information from purchase bills or warranty cards and instantly calculates expiry dates.  
Originally built from the Vite + React template, the project now includes a custom UI, theme support, export options, and enhanced usability features.

---

## 🚀 Features

- Upload PDF or image files (JPG/PNG) with simulated OCR extraction  
- Automatic warranty expiry calculation (duration + unit)  
- Inline editing of extracted values:
  - Product name
  - Purchase date
  - Warranty duration
- Export options:
  - **TXT** – simple text summary
  - **CSV** – structured single-row data
  - **PNG** – snapshot of rendered details
  - **Bill Image** – enhanced version of the uploaded bill
- Light/Dark theme toggle  
- Skeleton loader during processing  
- Clean empty-state screens with feature highlights  

---

## 🛠 Tech Stack

- **React 19**  
- **Vite 7**  
- **lucide-react** icons  
- **Plain CSS (`ui.css`)** for theming and layout  

---

## 📦 Getting Started

```bash
npm install
npm run dev
