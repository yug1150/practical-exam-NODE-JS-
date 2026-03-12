import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', age: '', city: '' })
  const [editingId, setEditingId] = useState(null)

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/get')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/update/${editingId}`, formData)
        setEditingId(null)
      } else {
        await axios.post('http://localhost:3000/add', formData)
      }
      setFormData({ name: '', email: '', age: '', city: '' })
      fetchUsers()
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  const handleEdit = (user) => {
    setEditingId(user._id)
    setFormData({ name: user.name, email: user.email, age: user.age, city: user.city })
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`)
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <div className="container">
      <h1>User Management</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} User</button>
      </form>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
