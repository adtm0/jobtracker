import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core'
import api from '../services/api'

const COLUMNS = [
  { id: 'applied',   label: 'Applied',   color: '#378ADD', bg: '#E6F1FB' },
  { id: 'interview', label: 'Interview', color: '#EF9F27', bg: '#FAEEDA' },
  { id: 'offer',     label: 'Offer',     color: '#639922', bg: '#EAF3DE' },
  { id: 'rejected',  label: 'Rejected',  color: '#E24B4A', bg: '#FCEBEB' },
]

function DraggableCard({ job, isDragging }) {
  const navigate = useNavigate()
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: job.id })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.3 : 1,
  } : { opacity: isDragging ? 0.3 : 1 }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div
        onClick={() => navigate(`/jobs/${job.id}/edit`)}
        style={{
          background: '#fff',
          border: '1px solid #e5e4df',
          borderRadius: 8,
          padding: '10px 12px',
          marginBottom: 8,
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        <div style={{ fontWeight: 500, fontSize: 13 }}>{job.company}</div>
        <div style={{ color: '#6b6b67', fontSize: 12, marginTop: 2 }}>{job.role}</div>
        <div style={{ color: '#9d9d99', fontSize: 11, marginTop: 6 }}>
          {job.date_applied}
        </div>
      </div>
    </div>
  )
}

function DroppableColumn({ col, jobs, activeId }) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        background: isOver ? '#f0efea' : '#f9f9f8',
        borderRadius: 10,
        padding: 12,
        minHeight: 300,
        border: isOver ? '2px dashed #c8c7c2' : '2px solid transparent',
        transition: 'background 0.15s, border 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: col.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {col.label}
        </span>
        <span style={{ fontSize: 11, background: col.bg, color: col.color, borderRadius: 20, padding: '2px 8px', fontWeight: 500 }}>
          {jobs.length}
        </span>
      </div>
      {jobs.map(job => (
        <DraggableCard key={job.id} job={job} isDragging={activeId === job.id} />
      ))}
      {jobs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '30px 0', color: '#9d9d99', fontSize: 12 }}>
          Drop here
        </div>
      )}
    </div>
  )
}

function FloatingCard({ job }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #c8c7c2',
      borderRadius: 8,
      padding: '10px 12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      cursor: 'grabbing',
      width: 220,
      pointerEvents: 'none',
    }}>
      <div style={{ fontWeight: 500, fontSize: 13 }}>{job.company}</div>
      <div style={{ color: '#6b6b67', fontSize: 12, marginTop: 2 }}>{job.role}</div>
    </div>
  )
}

export default function Kanban() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  useEffect(() => {
    api.get('/jobs/').then(({ data }) => setJobs(data)).finally(() => setLoading(false))
  }, [])

  const activeJob = jobs.find(j => j.id === activeId)

  const handleDragStart = ({ active }) => setActiveId(active.id)

  const handleDragEnd = async ({ active, over }) => {
    setActiveId(null)
    if (!over) return

    const draggedJob = jobs.find(j => j.id === active.id)
    if (!draggedJob) return

    const targetStatus = COLUMNS.find(c => c.id === over.id)?.id
    if (!targetStatus || draggedJob.status === targetStatus) return

    setJobs(prev => prev.map(j => j.id === active.id ? { ...j, status: targetStatus } : j))
    try {
      await api.patch(`/jobs/${active.id}/`, { status: targetStatus })
    } catch {
      setJobs(prev => prev.map(j => j.id === active.id ? { ...j, status: draggedJob.status } : j))
    }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: 60, color: '#9d9d99' }}>Loading...</div>

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Kanban Board</h2>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {COLUMNS.map(col => (
            <DroppableColumn
              key={col.id}
              col={col}
              jobs={jobs.filter(j => j.status === col.id)}
              activeId={activeId}
            />
          ))}
        </div>
        <DragOverlay>
          {activeJob ? <FloatingCard job={activeJob} /> : null}
        </DragOverlay>
      </DndContext>
      <p style={{ marginTop: 14, fontSize: 12, color: '#9d9d99' }}>
        Drag cards between columns to update status instantly.
      </p>
    </div>
  )
}