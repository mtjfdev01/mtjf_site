import './FinancialReports.css'

const FINANCIAL_REPORTS = [
  {
    id: 1,
    title: 'Annual Financial Statements FY 2024–25',
    desc: 'Audited statement of financial position, comprehensive income, and cash flows for the fiscal year ending June 30, 2025.',
    pdfUrl: '/pdfs/reports/pdf_1.pdf',
  },
  {
    id: 2,
    title: 'Independent Auditor’s Report — Q2 2025',
    desc: 'Summary of review procedures and key findings for the second quarter, prepared in line with applicable reporting standards.',
    pdfUrl: '/pdfs/reports/pdf_6.pdf',
  },
  {
    id: 3,
    title: 'Donation Utilization & Program Expenditure Summary',
    desc: 'High-level breakdown of how funds were allocated across programs, operations, and compliance during the reporting period.',
    pdfUrl: '/pdfs/reports/pdf_1.pdf',
  },
]

export default function FinancialReports() {
  return (
    <section className="financial-reports-section" aria-labelledby="financial-reports-heading">
      <div className="container py-48">
        <header className="financial-reports-header text-center">
          <h2 id="financial-reports-heading" className="heading-secondary">
            Financial Reports
          </h2>
          <p className="financial-reports-subheading mt-0">
            Transparency you can trust
          </p>
        </header>

        <div className="financial-reports-grid">
          {FINANCIAL_REPORTS.map((d) => (
            <article className="financial-reports-card" key={d.id}>
              <div className="financial-reports-card-body">
                <h3 className="financial-reports-card-title">{d.title}</h3>
                <p className="financial-reports-card-desc">{d.desc}</p>

                <div className="financial-reports-actions">
                  <a
                    className="financial-reports-btn financial-reports-btn--outline"
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
                  <a
                    className="financial-reports-btn financial-reports-btn--primary"
                    href={d.pdfUrl}
                    download
                    onClick={(e) => {
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
      </div>
    </section>
  )
}
