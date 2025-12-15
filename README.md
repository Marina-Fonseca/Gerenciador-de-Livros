# Gerenciador de Livros

## Overview
Gerenciador de Livros is a web application designed to help users organize and track their reading habits. Users can register books they have read, are currently reading, and wish to read in the future. The application allows users to add new titles to their list and write reviews about completed books.

## Features
- Add books to your reading list
- Track books you are currently reading
- Keep a list of books you wish to read
- Write and submit reviews for completed books
- User-friendly interface for easy navigation

## Project Structure
```
gerenciador-de-livros
├── src
│   ├── index.html          # Main HTML file
│   ├── css
│   │   └── styles.css      # Styles for the application
│   ├── js
│   │   ├── app.js          # Main JavaScript file
│   │   ├── storage.js      # Data storage management
│   │   └── ui.js           # User interface updates
│   ├── data
│   │   └── books.json      # Initial book data
│   └── components
│       ├── book-card.html   # Template for book cards
│       └── review-modal.html # Template for review modal
├── .gitignore              # Files to ignore in version control
├── README.md               # Project documentation
└── LICENSE                 # Licensing information
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Open the `index.html` file in your web browser to view the application.
3. Ensure you have a local server running if you want to test features that require JavaScript.

## Usage Guidelines
- Use the interface to add books to your list.
- Click on a book card to view details and submit reviews.
- Manage your reading list by updating the status of books as you progress.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.