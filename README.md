# UrbanClimbers 🧗‍♂️

A modern web application for urban climbing enthusiasts to discover, share, and manage climbing routes in urban environments. Built with Angular 20 and Supabase for a seamless user experience.

## Description

UrbanClimbers is a community-driven platform where climbers can:
- Discover new urban climbing spots and routes
- Share their favorite climbing locations with detailed descriptions
- Rate routes based on fun factor (1-5 stars)
- Manage their personal collection of routes

## Main Features

### Authentication System
- **User Registration & Login**: Secure authentication with email validation
- **Protected Routes**: Access control for authenticated users
- **Session Management**: Persistent login sessions with automatic logout

### Route Management
- **Browse All Routes**: Public feed of all climbing routes shared by the community
- **Personal Dashboard**: Manage your own climbing routes
- **Add New Routes**: Create detailed route entries with:
  - Title and description
  - Fun rating (1-5 stars)
  - Photo uploads
- **Edit & Delete**: Full CRUD operations for your routes

### Interactive Features
- **Route Details**: Comprehensive view of each climbing spot
- **Maps Integration**: Direct links to Google Maps for navigation
- **Image Gallery**: Visual representation of climbing spots
- **Responsive Design**: Optimized for desktop and mobile devices

### User Experience
- **Modern UI**: Clean, intuitive interface with Bootstrap styling
- **Real-time Notifications**: Toast notifications for user actions
- **Loading States**: Smooth loading indicators
- **Form Validation**: Comprehensive client-side validation

## Technology Stack

- **Frontend**: Angular 20 with TypeScript
- **Backend**: Supabase (PostgreSQL database + Authentication)
- **Styling**: Bootstrap 5 + Bootswatch themes
- **Notifications**: NGX-Toastr
- **Testing**: Jasmine + Karma
- **Build Tool**: Angular CLI

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UrbanClimbers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create environment files for Supabase configuration
   - Add your Supabase project URL and API key

4. **Database Setup**
   - Configure your Supabase project
   - Set up the posts table with required fields
   - Configure authentication settings

## Execution

### Development Server

```bash
# Start the development server
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200/`

### Custom Port

```bash
# Run on a specific port
ng serve --port 4201
```

### Production Build

```bash
# Build for production
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Testing

```bash
# Run unit tests
npm test
# or
ng test
```

## Project Structure

```
src/app/
├── core/                    # Core services and guards
│   ├── auth/               # Authentication service and guards
│   └── supabase_service/   # Database service
├── features/               # Feature modules
│   ├── login/             # Login component
│   ├── register/          # Registration component
│   └── posts/             # Post-related components
│       ├── home/          # User dashboard
│       ├── post-feed/     # Public route feed
│       ├── post-view/     # Route details
│       └── add-edit-post/ # Route creation/editing
├── shared/                # Shared components
│   └── ui/               # UI components (navbar, etc.)
└── environments/         # Environment configurations
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Getting Started

1. **Register an Account**: Create your climber profile
2. **Explore Routes**: Browse the community feed to discover new spots
3. **Add Your Routes**: Share your favorite climbing locations
4. **Rate & Review**: Help others by rating routes you've tried
5. **Navigate**: Use integrated maps to find your way to new spots

## Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License.

---

**Happy Climbing!**
