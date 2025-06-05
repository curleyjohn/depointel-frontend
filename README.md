# DepoIntel Frontend

A React-based frontend application for DepoIntel that provides a modern, responsive interface for managing and analyzing case data.

## Features

### Case Management
- View and filter cases with advanced search capabilities
- Detailed case information display
- Support for multiple jurisdictions
- Real-time data updates
- CSV export functionality with selected rows

### User Interface
- Modern, responsive design using Tailwind CSS
- Interactive data tables with sorting and filtering
- Loading states and error handling
- Mobile-friendly layout
- Dark/Light mode support

### Data Visualization
- Case statistics and metrics
- Filtered data views
- Export capabilities
- Data validation and error handling

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see Backend README)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd depointel/Frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file with the following variables:
```env
REACT_APP_API_URL=http://localhost:3001
```

4. Start the development server
```bash
npm start
```

## Development

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
Frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   └── styles/        # Global styles
├── public/            # Static files
└── tests/             # Test files
```

## Key Components

### CaseList
- Displays all cases in a table format
- Supports filtering and sorting
- Row selection for bulk operations
- CSV export functionality

### CaseDetails
- Shows detailed case information
- Displays judge and parties information
- Handles sensitive data with proper security
- Error handling and loading states

## State Management
- React Context for global state
- Local state for component-specific data
- API integration with error handling

## Error Handling
- Comprehensive error boundaries
- User-friendly error messages
- Loading states and fallbacks
- Network error handling

## Future Enhancements

- [ ] Add data visualization charts
- [ ] Implement advanced search filters
- [ ] Add user authentication
- [ ] Implement real-time updates
- [ ] Add case comparison feature
- [ ] Implement case notes and comments
- [ ] Add export to other formats
- [ ] Implement keyboard shortcuts

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC
