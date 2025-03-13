import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [departments, setDepartments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
      .then((response) => response.json())
      .then((data) => setDepartments(data.departments))
  }, [])

  //console.log(departments)

  
  const departmentOptions = departments.map((department) => {
    return (
      <option key={department.departmentId} value={department.departmentId}>
        {department.displayName}
      </option>
    )
  })

  //console.log(departmentOptions)

  return (
    <>
      <section id="searchBox">
        <h1>Search the Met Museum Collection</h1>
        <form name="filterSearch">
          <label>Search:
          <input type="text" name="search" placeholder="Search" /></label>
          <label>Museum Department:
          <select name="department" defaultValue="">
            <option value="" disabled>Select a Department</option>
            { departmentOptions }
          </select></label>
          <input type="submit" value="Submit" />
        </form>
      </section>
      <section id="resultsWindow">

      </section>
    </>
  )
}

export default App
