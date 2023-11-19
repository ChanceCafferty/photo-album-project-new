## Introduction

Photo Album Showcase is a React application designed to display a collection of photo ID's and titles from different albums. It fetches data from the jsonplaceholder.typicode.com API, allowing users to browse through up to 50 photos per album. The application provides functionality to navigate between albums and manually select an album to view.

## Features

- Album Navigation: Navigate through different albums using 'Next Album' and 'Previous Album' buttons.
- Manual Album Selection: Enter a specific album ID to view photo info from that album.
- Error Handling: Displays error messages for failed album loads or invalid input.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/ChanceCafferty/photo-album-project-new/
```

2. Navigate to the project directory:

```bash
cd photo-album-project-new
```

3. Install the dependencies:

```bash
npm install
```

## Usage

To run the application:

1. Start the application:

```bash
npm run dev
```

2. Open your web browser and navigate to http://localhost:5173

## Testing

To run automated tests:

```bash
npm run test
```

## Technology Stack

React: JS library for building user interfaces.
Axios: HTTP client for making HTTP requests.
CSS: For styling the application.

## Components

` App`: The main component that handles the application logic and renders the user interface.

`index.css` and `App.css`: CSS files for styling the application.

## API Integration

The application uses the jsonplaceholder.typicode.com API to fetch photo info based on the album ID.

## Limitations

- The application is limited to fetching photo info from albums with IDs between 1 and 100.
- API response times and availability might affect the performance.

## Deployment

- App is deployed at https://photo-album-showcase-crc.netlify.app