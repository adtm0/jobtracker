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
      <h1>Dashboard</h1>
      <p>Stats will go here</p>
    </div>
  )
}