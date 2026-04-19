const MOCK_STATS = {
  total: 24,
  applied: 11,
  interview: 6,
  offer: 2,
  rejected: 5,
  response_rate: 25,
  offer_rate: 8,
  follow_up_due: 3,
  best_role: 'Frontend Engineer'
}
export default function Dashboard() {
  const stats = MOCK_STATS

  return (
    <div>
      <div style={{marginBottom: 24}}>
        <h2 style={{fontSize: 20, fontWeight: 600}}>Dashboard</h2>
        <p style={{color: '#6b6b67', marginTop: 4}}>Your job search at a glance</p>
      </div>

      {/* stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)'
      }}>
        {[
          {label: 'Total Applications', value: stats.total },
          {label: 'Interviews', value: stats.interview, sub: `${stats.response_rate}% response rate` },
          {label: 'Offers', value: stats.offer, sub: `${stats.offer_rate}% offer rate` },
          {label: 'Follow-up Due', value: stats.offer, sub: `${stats.offer_rate}% offer rate` },
        ].map(({label, value, sub}) => (
          <div key={label} style={{
            background: '#fff',
            border: '1px solid #e5e4df',
            borderRadius: 10,
            padding: '16px 18px'
          }}>
            <div>
              {label}
            </div>
            <div>
              {value}
            </div>
            <div>
              {sub}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}