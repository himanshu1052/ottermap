# Ottermap Frontend Developer Task

This project is a React application built as part of the technical assessment for the Frontend Developer Intern position at Ottermap.

## Live Demo

[View Live Demo](https://ottermap-1ivx.onrender.com/)

## Project Overview

This application demonstrates integration of OpenLayers map library with React, implementing a two-route application with form data handling and map polygon drawing capabilities.

### Features

- **Route 1**: Home page with a form to collect first name and mobile number
- **Route 2**: Map page displaying:
  - User's name in the header
  - OpenLayers map integration
  - Tools for drawing, editing, and deleting polygons

## Technologies Used

- React.js
- React Router
- OpenLayers
- CSS for styling
- Render for deployment

## Setup and Installation

To run this project locally:

1. Clone the repository
   ```
   git clone https://github.com/himanshu1052/ottermap.git
   ```

2. Navigate to the project directory
   ```
   cd ottermap
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Application Usage

### Home Page
1. Enter your first name and mobile number in the form
2. Click "Submit" to save the information and navigate to the map page

### Map Page
1. Your name will be displayed in the header
2. Use the map control buttons to:
   - Draw new polygons by clicking "Draw" and then clicking points on the map
   - Edit existing polygons by clicking "Edit" and then modifying polygon vertices
   - Delete polygons by clicking "Delete" and then selecting the polygon
3. Click "Back" to return to the home page

## Code Structure

- `src/components/` - Contains React components
- `src/App.js` - Main application component with routing
- `src/pages/` - Page components for different routes

## Future Improvements

- Add form validation for inputs
- Implement more advanced map features
- Add ability to save drawn polygons
- Improve responsive design for mobile devices

## Contact

For questions about this project, please contact:

Himasnhu -> rjattsingh41@gmail.com
