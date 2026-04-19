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
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginBottom: 24
      }}>
        {[
          {label: 'Total Applications', value: stats.total },
          {label: 'Interviews', value: stats.interview, sub: `${stats.response_rate}% response rate` },
          {label: 'Offers', value: stats.offer, sub: `${stats.offer_rate}% offer rate` },
          {label: 'Follow-up Due', value: stats.follow_up_due, sub: 'no reply in 10+ days' },
        ].map(({label, value, sub}) => (
          <div key={label} style={{
            background: '#fff',
            border: '1px solid #e5e4df',
            borderRadius: 10,
            padding: '16px 18px'
          }}>
            <div style={{fontSize: 12, color: '#6b6b67', fontWeight: 500, marginBottom: 6}}>
              {label}
            </div>
            <div style={{fontSize: 28, fontWeight: 600, lineHeight: 1}}>
              {value}
            </div>
              {sub && (
                <div style={{fontSize: 11, color: '#9d9d99', marginTop: 5}}>{sub}</div>
              )}
          </div>
        ))}
      </div>

      {/* bottom section */}
      <div>

        {/*  */}
        <div>
          <h3>Applications by status</h3>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}