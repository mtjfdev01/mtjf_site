import './Stats.css'

const STATS_DATA = [
  {
    id: 'floods',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l3-3m0 0l3 3m-3-3v9"></path>
        <path d="M12 3l3 3m-3-3v9"></path>
        <path d="M21 12l-3-3m0 0l-3 3m3-3v9"></path>
        <path d="M12 21l-3-3m0 0l-3 3m3-3H6"></path>
        <rect x="6" y="6" width="12" height="12" rx="2"></rect>
      </svg>
    ),
    statistic: '100,000+',
    description: 'People helped during floods of Pakistan',
    iconColor: '#5EC9C9'
  },
  {
    id: 'health',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    ),
    statistic: '100,000+',
    description: 'Free of cost test and medicine',
    iconColor: '#FFD700'
  },
  {
    id: 'homes',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
        <path d="M8 12h8"></path>
        <path d="M8 8h8"></path>
        <path d="M8 4h8"></path>
      </svg>
    ),
    statistic: '750+',
    description: 'Construction of homes',
    iconColor: '#FFA500'
  },
  {
    id: 'water',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2s6 6.5 6 10a6 6 0 1 1-12 0c0-3.5 6-10 6-10z"></path>
        <path d="M12 12v8"></path>
        <path d="M8 20h8"></path>
      </svg>
    ),
    statistic: '250,000+',
    description: 'With 24/7 clean water access',
    iconColor: '#90EE90'
  },
  {
    id: 'education',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
      </svg>
    ),
    statistic: '50,000+',
    description: 'Students provided education',
    iconColor: '#87CEEB'
  },
  {
    id: 'scholarship',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ),
    statistic: '5,000+',
    description: 'Scholarships awarded',
    iconColor: '#FF8C00'
  },
  {
    id: 'aid',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="14" rx="2"></rect>
        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
        <path d="M12 12v4"></path>
        <path d="M8 14h8"></path>
      </svg>
    ),
    statistic: '200,000+',
    description: 'Aid packages distributed',
    iconColor: '#FF6347'
  },
  {
    id: 'food',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
        <path d="M12 6v6l4 2"></path>
      </svg>
    ),
    statistic: '150,000+',
    description: 'Meals provided to families',
    iconColor: '#20B2AA'
  }
]

const Stats = () => {
  return (
    <section className="stats-section container py-64">
      <div className="stats-header text-center mb-48">
        <h1 className="heading-secondary mb-16">Since 2019 We Have:</h1>
        <h2 className="h1">
          Helped (600,000+ People Across Pakistan
        </h2>
      </div>

      <div className="stats-grid grid grid-4 gap-24">
        {STATS_DATA.map((stat) => (
          <div key={stat.id} className="stat-card card text-center">
            <div
              className="stat-icon-container"
              style={{ backgroundColor: stat.iconColor }}
            >
              <div className="stat-icon" style={{ color: 'white' }}>
                {stat.icon}
              </div>
            </div>
            <h3 className="stat-number bold mb-8">{stat.statistic}</h3>
            <p className="stat-description text-sm muted">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats

