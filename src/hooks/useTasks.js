import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const API='tasks'

// رسالة السيرفر لو موجودة، وإلا رسالة axios
const getMessage = (err) => err.response?.data?.error || err.message

export default function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [assignee, setAssignee] = useState('')

  // ---------- جلب المهام ----------
  const loadTasks = async () => {
    try {
      setError('')
      const { data } = await axios.get(API)
      setTasks(data)
    } catch (err) {
      setError(getMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  // ---------- إضافة ----------
  const addTask = async (body) => {
    try {
      setError('')
      const { data } = await axios.post(`${API}/add-task`, body)
      setTasks((prev) => [...prev, data])
      return true
    } catch (err) {
      setError(getMessage(err))
      return false
    }
  }

  // ---------- تعديل ----------
  const updateTask = async (id, body) => {
    try {
      setError('')
      const { data } = await axios.patch(`${API}/update/${id}`, body)
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)))
      return true
    } catch (err) {
      setError(getMessage(err))
      return false
    }
  }

  // ---------- مسح ----------
  const deleteTask = async (id) => {
    try {
      setError('')
      await axios.delete(`${API}/delete/${id}`)
      setTasks((prev) => prev.filter((t) => t._id !== id))
      return true
    } catch (err) {
      setError(getMessage(err))
      return false
    }
  }

  // ---------- نقل ----------
  const moveTask = (id, status) => updateTask(id, { status })

  // ---------- البحث والفلتر ----------
  const assignees = useMemo(
    () => [...new Set(tasks.map((t) => t.assignee).filter(Boolean))],
    [tasks]
  )

  const activeAssignee = assignees.includes(assignee) ? assignee : ''

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) &&
        (!activeAssignee || t.assignee === activeAssignee)
    )
  }, [tasks, search, activeAssignee])

  return {
    filteredTasks,
    assignees,
    loading,
    error,
    retry: loadTasks,
    search,
    setSearch,
    assignee: activeAssignee,
    setAssignee,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  }
}