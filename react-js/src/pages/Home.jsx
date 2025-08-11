import BookCard from "../components/BookCard";

function Home(){
    const books = [
        {id: 1, title: "The Great Gatsby", release_date: "2025"},
        {id: 2, title: "Animal Farm", release_date: "1890"},
        {id: 3, title: "The sun also rises", release_date: "1977"},
    ]

    const handleSearch = () =>{}

    return(
        <div className="home">
            <form onsSubmit = {handleSearch} className="Search-form">
                <input type="text" placeholder ="Search for books here" className="Search-input"/>
                <button type="submit" className="Search-button">Search</button>
            </form>

            <div className="books-grid">
                {books.map(book =>(<BookCard book = {book} key={book.id}/>))}
            </div>
        </div>
    );
};

export default Home;