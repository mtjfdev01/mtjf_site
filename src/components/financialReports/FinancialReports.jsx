import './FinancialReports.css'
import reportCover2324 from '../../assets/img/reports/report_1_img.png'
import reportCover2425 from '../../assets/img/reports/report_b.png'
import reportCover2223 from '../../assets/img/reports/report_c.png'
import book from '../../assets/img/reports/book.png'

/** Encode paths that may contain spaces (public PDFs). */
const safeUrl = (path) => (path ? encodeURI(path) : '')

/* Paths must match filenames in public/pdfs/reports/ exactly */
const FINANCIAL_REPORTS = [
    {
    id: 4,
    title: 'گلدستہ اہلِ بیت. تصحیح شدہ ایڈیشن 2025ء',
    pdfUrl: 'https://drive.google.com/file/d/13lJx9oPj13XmGUkFp0RoW1m7o3KbY96D/view',
    imageUrl: book,

  },
  {
    id: 3,
    title: 'Annual Report 2022–2023',
    pdfUrl: '/pdfs/reports/Annual Report 22-23.pdf',
    imageUrl: reportCover2425,

  },
  {
    id: 1,
    title: 'Annual Report 2023–2024',
    pdfUrl: '/pdfs/reports/MTJF Annual Report 2023-24.pdf',
    imageUrl: reportCover2324,
  },
  {
    id: 2,
    title: 'Annual Report 2024–2025',
    pdfUrl: '/pdfs/reports/MTJF Annual Report 24-25 (1).pdf',
    imageUrl: reportCover2223,
  },

]

/** Book card (گلدستہ) — downloads page only */
const BOOK_CARD_ID = 4

export default function FinancialReports({
  showTitle = true,
  isDownloads = false,
}) {
  const filteredReports = isDownloads
    ? FINANCIAL_REPORTS
    : FINANCIAL_REPORTS.filter((report) => report.id !== BOOK_CARD_ID)

  return (
    <section className="financial-reports-section" aria-labelledby="financial-reports-heading">
      <div className="container py-48">
        {showTitle && (
          <header className="financial-reports-header text-center">
            <h2 id="financial-reports-heading" className="heading-secondary">
              Financial Reports
            </h2>
            <p className="financial-reports-subheading mt-0">
              Transparency you can trust
            </p>
          </header>
        )}

        <div className={`financial-reports-grid ${isDownloads ? 'is-downloads-grid': ''}`}>
          {filteredReports.map((d) => {
            const href = safeUrl(d.pdfUrl)
            const imgSrc = d.imageUrl ? safeUrl(d.imageUrl) : ''
            const safeFilename = `${(d.title || 'report').replace(/\s+/g, '_')}.pdf`
            return (
              <article className="financial-reports-card" key={d.id}>
                <div className="financial-reports-card-media">
                  {imgSrc ? (
                    <img src={imgSrc} alt={d.title} loading="lazy" />
                  ) : (
                    <div className="financial-reports-card-media-placeholder" aria-hidden />
                  )}
                </div>
                <div className="financial-reports-card-body">
                  <h3 className="financial-reports-card-title">{d.title}</h3>
                  <div className="financial-reports-actions">
                    <a
                      className="financial-reports-btn financial-reports-btn--outline"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        e.preventDefault()
                        window.open(href, '_blank', 'noopener,noreferrer')
                      }}
                    >
                      View
                    </a>
                    {/* <a
                      className="financial-reports-btn financial-reports-btn--primary"
                      href={href}
                      download={safeFilename}
                      onClick={(e) => {
                        const link = document.createElement('a')
                        link.href = href
                        link.download = safeFilename
                        link.target = '_blank'
                        link.rel = 'noopener noreferrer'
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        e.preventDefault()
                      }}
                    >
                      Download
                    </a> */}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
