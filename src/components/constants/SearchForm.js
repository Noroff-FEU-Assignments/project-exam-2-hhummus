function SearchForm(props) {
  return (
    <div className="row searchContainer">
    <input type="text" 
    placeholder="search for users by name" 
    id="searchPosts" 
    onChange = {props.search} ></input>
</div>
    
  )
}

export default SearchForm;