import React, {useState, useEffect} from 'react';
import {Input, InputGroup} from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

const SearchBar = ({symbols, onSelect}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setSearchResults([]);
    }, [symbols]);

    const styles = {
        width: 1000,
        marginBottom: 10,
        height: 40,
        borderColor: "black",
        borderWidth: 2
    };


    const handleSearch = async (event) => {

        const value = event;
        setSearchTerm(value);

        if (event.length > 2) {
            // Perform search
            const results = await symbols.filter(symbol =>
                symbol.toLowerCase().includes(value.toLowerCase())
            );

            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };


    const handleSelectResult = (result) => {
        setSearchTerm(result);
        onSelect(result);
        setSearchResults([]);
    };

    return (
        <div className="search-container">
            <InputGroup className="search-input" style={styles}>
                <Input onChange={handleSearch} placeholder="Search for stocks" value={searchTerm}/>
                <InputGroup.Button>
                    <SearchIcon onClick={handleSearch} width={50} fill="blue"/>
                </InputGroup.Button>
            </InputGroup>
            <div className="search-results-card">
                <ul className="search-results">
                    {searchResults.map((result, index) => (
                        <li key={index} className="search-item" onClick={() => handleSelectResult(result)}>
                            {result}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default SearchBar;
