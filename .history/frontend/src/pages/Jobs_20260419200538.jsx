import { useState } from "react";
import { Link } from "react-router-dom";

const STATUSES = ['all', 'applied', 'interview', 'offer', 'rejected']

const MOCK_JOBS = [
  {id: 1, company: 'Stripe', role: 'Frontend Engineer', status: 'applied', date_applied: '2026-04-14', notes: 'Referral from Jane'},
  {id: 2, company: 'Notion', role: 'Software Engineer', status: 'interview', date_applied: '2026-04-08', notes: 'Technical round next week'},
  {id: 3, company: 'Anthropic', role: 'Software Engineer', status: 'offer', date_applied: '2026-03-30', notes: 'Deadline Apr 25'},
  {id: 4, company: 'Apple', role: 'iOS Engineer', status: 'rejected', date_applied: '2026-03-20', notes: ''}
]

const BADGE_COLORS = {
  applied: {bg: '#E6F1FB', color: '#185FA5'},
  interview: {bg: '#FAEEDA', color: '#854F0B'},
  offer: {bg: '#EAF3DE', color: '#3B6D11'},
  rejected: {bg: '#FCEBEB', color: '#A32D2D'},
}
export default function Jobs() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = MOCK_JOBS
    .filter(j => filter === 'all' || j.status === filter)
    .filter(j =>
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.role.toLowerCase().includes(search.toLowerCase())
    )
    
  return (
    <div>
      <div></div>
    </div>
  )
}