import axios from 'axios';
import React, { useState } from 'react';
import './App.css';


function App() {
  const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [dropdownOptions, setDropdownOptions] = useState([]);

    const port = process.env.PORT || 1110;

    // Function to handle JSON submission and call backend API
    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput); 
            const res = await axios.post('http://localhost:1110/bfhl', parsedInput); 
            setResponse(res.data);
            // console.log(response);
        } catch (error) {
            alert('Invalid JSON or request failed');
        }
    };

    // Function to handle the dropdown change
    const handleDropdownChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);  
        setDropdownOptions(selectedOptions);  
    };

    // Function to render filtered response based on selected dropdown options
    const renderResponse = () => {
        if (!response) return null;  

        let filteredResponse = {};
        if (dropdownOptions.includes("Alphabets")) { 
            filteredResponse.alphabets = response.alphabets;
        }
        if (dropdownOptions.includes("Numbers")) {  
            filteredResponse.numbers = response.numbers;
        }
        if (dropdownOptions.includes("Highest lowercase alphabet")) {  
            filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        }

        return (
            <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>  
        );
    };

    return (
        <div>
            <h1>API Input</h1>
            <textarea
                rows="5"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}  
                placeholder="Enter JSON"
            />
            <button onClick={handleSubmit}>Submit</button> 

            {response && ( 
                <>
                    <h2>Multi Filter</h2>
                    <select multiple onChange={handleDropdownChange}> 
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    <div className="filtered-response">
                        {renderResponse()}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
