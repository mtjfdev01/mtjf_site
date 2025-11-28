import "./Pagination.css"

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <>
      {/* Pagination */}
      <div className="careers-pagination flex justify-center items-center gap-12">
        <button
          className={`careers-pagination-btn ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1
          return (
            <button
              key={pageNum}
              className={`careers-pagination-page ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {String(pageNum).padStart(2, '0')}
            </button>
          )
        })}

        <button
          className="careers-pagination-btn"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </>
  )
}

export default Pagination