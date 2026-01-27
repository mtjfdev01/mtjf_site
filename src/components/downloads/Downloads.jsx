import React, { useState, useMemo } from 'react'
import './Downloads.css'

const documents = [
  {
    id: 1,
    title: "Palestine Relief Report Jan 09, 2026",
    desc: "Download the Report of Alkhidmat Foundation Pakistan's Activities & Response in Palestine",
    category: "Reports",
    pdfUrl: "/pdfs/reports/pdf_1.pdf",
    thumbUrl: "/pdfs/reports/thumb_1.webp",
  },
  {
    id: 2,
    title: "Palestine Relief Report Nov 18, 2025",
    desc: "Download the Report of Alkhidmat Foundation Pakistan's Activities & Response in Palestine",
    category: "Reports",
    pdfUrl: "/pdfs/reports/pdf_2.pdf",
    thumbUrl: "/pdfs/reports/thumb_2.webp",
  },
  {
    id: 3,
    title: "Palestine Relief Report Nov 06, 2025",
    desc: "Download the Report of Alkhidmat Foundation Pakistan's Activities & Response in Palestine.",
    category: "Reports",
    pdfUrl: "/pdfs/reports/pdf_3.pdf",
    thumbUrl: "/pdfs/reports/thumb_3.webp",
  },
  {
    id: 5,
    title: "Alkhidmat's Audit Report 2024",
    desc: "Review Alkhidmat's Audit Report 2024 to see how transparency and trust drive every act of service.",
    category: "Audit",
    pdfUrl: "/pdfs/reports/pdf_5.pdf",
    thumbUrl: "/pdfs/reports/thumb_5.webp",
  },
  {
    id: 6,
    title: "Alkhidmat's Annual Report 2025",
    desc: "Review Alkhidmat's Annual Report 2025 to see how transparency and trust drive every act of service.",
    category: "Annual Report",
    pdfUrl: "/pdfs/reports/pdf_6.pdf",
    thumbUrl: "/pdfs/reports/thumb_6.webp",
  },
];

export default function ImportantDocuments() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Get unique categories
  const categories = useMemo(() => {
    return ['Reports', 'Audit']
  }, [])

  // Filter documents based on search and category
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesKeyword = searchKeyword === '' || 
        doc.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        doc.desc.toLowerCase().includes(searchKeyword.toLowerCase())
      const matchesCategory = selectedCategory === '' || doc.category === selectedCategory
      return matchesKeyword && matchesCategory
    })
  }, [searchKeyword, selectedCategory])

  return (
    <section className="docs-wrap">
      <h1 className="docs-title">Important Document</h1>

      <div className="docs-filters">
        <input 
          className="docs-input" 
          placeholder="Enter Keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <select 
          className="docs-select" 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="docs-grid">
        {filteredDocuments.map((d) => (
          <article className="doc-card" key={d.id}>
            <div className="doc-thumb">
              <img src={d.thumbUrl} alt={`${d.title} thumbnail`} loading="lazy" />
            </div>

            <div className="doc-body">
              <h3 className="doc-title">{d.title}</h3>
              <p className="doc-desc">{d.desc}</p>

              <div className="doc-actions">
                {/* View in new tab - opens complete PDF */}
                <a 
                  className="btn btn-outline" 
                  href={d.pdfUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(d.pdfUrl, '_blank', 'noopener,noreferrer')
                  }}
                >
                  View
                </a>

                {/* Download (same file) */}
                <a 
                  className="btn btn-primary" 
                  href={d.pdfUrl} 
                  download
                  onClick={(e) => {
                    // Ensure download works even if browser tries to open PDF
                    const link = document.createElement('a')
                    link.href = d.pdfUrl
                    link.download = d.title.replace(/\s+/g, '_') + '.pdf'
                    link.target = '_blank'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    e.preventDefault()
                  }}
                >
                  Download Now
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
