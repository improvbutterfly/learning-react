import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [departments, setDepartments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // Get the department information from the Met API and store it in the
  // departments state
  useEffect(() => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
      .then((response) => response.json())
      .then((data) => setDepartments(data.departments))
  }, [])

  // When the form is submitted, prevent the default form submission behavior
  // and fetch the search results from the Met API
  function handleSearchSubmit(event) {
    event.preventDefault()

    const selectedDepartment = event.target.department.value
    console.log(selectedDepartment)
    const searchString = (
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`
      + (selectedDepartment ? `&departmentId=${selectedDepartment}` : "")
    )

    fetch(searchString)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))

    console.log(searchResults)
  }

  // When the search term changes, update the searchTerm state
  function handleSearchChange(event) {
    setSearchTerm(event.target.value)
    //console.log(searchTerm)
  }

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
        <form name="filterSearch" onSubmit={handleSearchSubmit}>
          <label>Search:
          <input 
            type="text" 
            name="search" 
            placeholder="Search" 
            value={searchTerm}
            onChange={handleSearchChange}
          /></label>
          <label>Museum Department:
          <select name="department" defaultValue="">
            <option value="" disabled>Select a Department</option>
            <option value="" disabled>--</option>
            <option value="">None</option>
            { departmentOptions }
          </select></label>
          <input type="submit" value="Submit"/>
        </form>
      </section>
      <section id="resultsWindow">

      </section>
    </>
  )
}

export default App
