// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
// header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 1110


// middleware
app.use(bodyParser.json())

// process logs in console
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(cors({
    origin: ["https://bfhl-frontend-sigma-pied.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
    }
));

//Get endpoint
app.get('/bfhl', (req, res) =>{
    res.status(200).json({
        operation_code: 1
    })
});


app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "john_doe_17091999";
    const roll_number = "ABCD123";
    const email = "john@xyz.com";

    let numbers = [], alphabets = [], highest_lowercase_alphabet = null;

    data.forEach((item) => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else {
            alphabets.push(item);
            if (item === item.toLowerCase() && (!highest_lowercase_alphabet || item > highest_lowercase_alphabet)) {
                highest_lowercase_alphabet = item;
            }
        }
    });

    // File Handling
    let file_valid = false;
    let file_size_kb = null;
    let file_mime_type = null;
    if (file_b64) {
        try {
            const buffer = Buffer.from(file_b64, 'base64');
            file_size_kb = (buffer.length / 1024).toFixed(2);
            file_valid = true;
            file_mime_type = "image/png";
        } catch (e) {
            file_valid = false;
        }
    }

    res.json({
        is_success: true,
        user_id: user_id,
        email : email,
        roll_number:roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
        file_valid: file_valid,
        file_mime_type: file_mime_type,
        file_size_kb: file_size_kb
    });
});

// app.use('/api/', dataRoutes)

// listen for requests
app.listen(1110, 
    () => {console.log("Listening to port no.", 1110)}
)


