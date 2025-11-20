import React, { useState, useRef, useEffect } from 'react';
import { Upload, Sun, Moon, Download, RefreshCw, Edit2, Save, FileText, ImageIcon, File, ShieldCheck, Timer, CloudDownload } from 'lucide-react';
import './ui.css';

const ILoveWarranty = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, JPG, or PNG file');
      return;
    }

    setUploadedFile(file);
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }

    performOCR(file);
  };

  const performOCR = async (file) => {
    setProcessing(true);
    setEditing(false);
    
    // Simulate OCR processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate extracted data
    const mockData = {
      productName: file.type === 'application/pdf' ? 'Samsung 65" QLED TV' : 'Apple MacBook Pro 14"',
      purchaseDate: '2024-11-15',
      warrantyDuration: '24',
      warrantyUnit: 'months'
    };

    const purchaseDate = new Date(mockData.purchaseDate);
    const expiryDate = new Date(purchaseDate);
    
    if (mockData.warrantyUnit === 'months') {
      expiryDate.setMonth(expiryDate.getMonth() + parseInt(mockData.warrantyDuration));
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + parseInt(mockData.warrantyDuration));
    }

    setExtractedData({
      ...mockData,
      warrantyExpiry: expiryDate.toISOString().split('T')[0]
    });
    
    setProcessing(false);
  };

  const handleEdit = (field, value) => {
    const updated = { ...extractedData, [field]: value };
    
    if (field === 'purchaseDate' || field === 'warrantyDuration' || field === 'warrantyUnit') {
      const purchaseDate = new Date(updated.purchaseDate);
      const expiryDate = new Date(purchaseDate);
      
      if (updated.warrantyUnit === 'months') {
        expiryDate.setMonth(expiryDate.getMonth() + parseInt(updated.warrantyDuration));
      } else {
        expiryDate.setFullYear(expiryDate.getFullYear() + parseInt(updated.warrantyDuration));
      }
      
      updated.warrantyExpiry = expiryDate.toISOString().split('T')[0];
    }
    
    setExtractedData(updated);
  };

  const downloadPDF = () => {
    const content = `
I LOVE WARRANTY - Warranty Information

Product Name: ${extractedData.productName}
Purchase Date: ${extractedData.purchaseDate}
Warranty Duration: ${extractedData.warrantyDuration} ${extractedData.warrantyUnit}
Warranty Expiry: ${extractedData.warrantyExpiry}

Generated on: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'warranty_info.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const csv = `Product Name,Purchase Date,Warranty Duration,Warranty Expiry\n"${extractedData.productName}",${extractedData.purchaseDate},${extractedData.warrantyDuration} ${extractedData.warrantyUnit},${extractedData.warrantyExpiry}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'warranty_info.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = darkMode ? '#1f2937' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = darkMode ? '#ffffff' : '#000000';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('I LOVE WARRANTY', 50, 60);
    
    ctx.font = '20px Arial';
    ctx.fillText(`Product: ${extractedData.productName}`, 50, 150);
    ctx.fillText(`Purchase Date: ${extractedData.purchaseDate}`, 50, 200);
    ctx.fillText(`Warranty: ${extractedData.warrantyDuration} ${extractedData.warrantyUnit}`, 50, 250);
    ctx.fillText(`Expires: ${extractedData.warrantyExpiry}`, 50, 300);
    
    ctx.font = '16px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`Generated: ${new Date().toLocaleString()}`, 50, 500);
    
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'warranty_info.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const downloadEnhancedBill = () => {
    if (!previewUrl) {
      alert('No image available to download');
      return;
    }
    
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = 'enhanced_bill.png';
    a.click();
  };

  return (
    <div className={`app-root ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <FileText className="brand-icon" />
            <div>
              <h1 className="title">I Love Warranty</h1>
              <p className="subtitle">Extract warranty info from bills & cards — fast and simple</p>
            </div>
          </div>

          <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle" aria-label="Toggle theme">
            {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
          </button>
        </div>
      </header>

      <main className="container">
        {/* Upload Area */}
        {!uploadedFile && (
          <div style={{display:'grid', gap:'28px'}}>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            >
              <Upload className="upload-icon" />
              <h2 className="upload-title">Upload Your Bill or Warranty Card</h2>
              <p className="upload-sub">Drag & drop or browse (PDF, JPG, PNG)</p>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInput}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
              <button onClick={() => fileInputRef.current?.click()} className="btn btn-primary">Choose File</button>
            </div>
            {/* Feature companion section */}
            <div>
              <div className="features-grid">
                <div className="feature-card">
                  <ShieldCheck className="feature-icon" />
                  <h4 className="feature-title">Track Expiry Auto</h4>
                  <p className="feature-text">We calculate warranty end date instantly from purchase date & duration.</p>
                </div>
                <div className="feature-card">
                  <Timer className="feature-icon" />
                  <h4 className="feature-title">Fast OCR Mock</h4>
                  <p className="feature-text">Current demo simulates OCR in ~2s. Hook in real OCR anytime.</p>
                </div>
                <div className="feature-card">
                  <CloudDownload className="feature-icon" />
                  <h4 className="feature-title">Multiple Exports</h4>
                  <p className="feature-text">Download structured data as PDF text, CSV, or shareable image.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing & Results */}
        {uploadedFile && (
          <div className="results-grid">
            {/* Preview */}
            <div className={`card preview-card ${darkMode ? 'dark' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Uploaded File
                </h3>
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setPreviewUrl(null);
                    setExtractedData(null);
                  }}
                  className="btn btn-ghost"
                >
                  Upload New
                </button>
              </div>
              
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="preview-img" />
              ) : (
                <div className="preview-placeholder">
                  <File className="placeholder-icon" />
                </div>
              )}

              {previewUrl && (
                <button onClick={downloadEnhancedBill} className="btn btn-ghost w-full mt-4">Download Enhanced Bill</button>
              )}
            </div>

            {/* Extracted Data */}
            <div className={`card data-card ${darkMode ? 'dark' : ''}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Warranty Information
                </h3>
                {extractedData && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(!editing)}
                      className="btn btn-icon"
                    >
                      {editing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => performOCR(uploadedFile)}
                      className="btn btn-icon"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {processing ? (
                <div style={{display:'grid', gap:'14px'}} aria-live="polite">
                  <div className="skeleton-lg skeleton-block" />
                  <div className="skeleton-block" />
                  <div className="skeleton-block" />
                  <div className="skeleton-block" />
                  <div className="skeleton-block" />
                  <p style={{fontSize:'0.75rem', opacity:.7}}>Processing OCR demo…</p>
                </div>
              ) : extractedData ? (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Product Name
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={extractedData.productName}
                        onChange={(e) => handleEdit('productName', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      <p className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                        {extractedData.productName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Purchase Date
                    </label>
                    {editing ? (
                      <input
                        type="date"
                        value={extractedData.purchaseDate}
                        onChange={(e) => handleEdit('purchaseDate', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      <p className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                        {extractedData.purchaseDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Warranty Duration
                    </label>
                    {editing ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={extractedData.warrantyDuration}
                          onChange={(e) => handleEdit('warrantyDuration', e.target.value)}
                          className={`flex-1 px-3 py-2 rounded-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                        <select
                          value={extractedData.warrantyUnit}
                          onChange={(e) => handleEdit('warrantyUnit', e.target.value)}
                          className={`px-3 py-2 rounded-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="months">Months</option>
                          <option value="years">Years</option>
                        </select>
                      </div>
                    ) : (
                      <p className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                        {extractedData.warrantyDuration} {extractedData.warrantyUnit}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="field-label">Warranty Expiry</label>
                    <p className="expiry-pill">{extractedData.warrantyExpiry}</p>
                  </div>

                  {/* Export Buttons */}
                  <div className="export-wrap">
                    <p className="export-title">Export Data</p>
                    <div className="export-row">
                      <button onClick={downloadPDF} className="btn btn-export red">
                        <FileText /> <span>PDF</span>
                      </button>
                      <button onClick={downloadCSV} className="btn btn-export green">
                        <Download /> <span>CSV</span>
                      </button>
                      <button onClick={downloadImage} className="btn btn-export purple">
                        <ImageIcon /> <span>Image</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ILoveWarranty;