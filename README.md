# Fer Lodge - A Realm of Scripts and Crazy Shit

A Twin Peaks-inspired movie selection game built with Next.js, where users must select the correct 5 movies assigned to their name.

## Features

- **Twin Peaks-inspired UI**: Atmospheric home page with animated door and intermittent lighting effects
- **Movie Gallery**: Interactive carousel of movie posters with hover details
- **User Authentication**: Four predefined users (Ornella, Mariel, Florencia, Paola) with specific movie assignments
- **Game Logic**: Progressive difficulty with encouraging messages and victory celebration
- **Local Storage**: User progress persists in the browser
- **Responsive Design**: Mobile-friendly interface with smooth animations

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context + Local Storage
- **Language**: TypeScript

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   └── Modals/         # Modal components
├── data/               # JSON data files
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Data Structure

### Users
- **Ornella**: Ninotchka (1939), A Pigeon Sat on a Branch Reflecting on Existence (2014), Barbara (2012), To Be or Not to Be (1942), The Lives of Others (2006)
- **Mariel**: Milk (2008), Nazareno Cruz y el Lobo (1975), Inherit the Wind (1960), The Wind That Shakes the Barley (2006), Esperando la Carroza (1985)
- **Florencia**: Paddington (2014), Phantom Thread (2017), Legally Blonde (2001), Flow (2024), The Devil Wears Prada (2006)
- **Paola**: Fantastic Planet (1973), It's Such a Beautiful Day (2012), Nostalgia for the Light (2010), Another Round (2020), After Life (1998)

### Movies
- 20 user-assigned movies (5 per user)
- 10 additional movies for the carousel
- Each movie includes: title, year, image, director, actors, synopsis

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Game Rules

1. Enter one of the four valid user names
2. Select exactly 5 movies from the carousel
3. Confirm your selection
4. If incorrect, try again (max 3 attempts)
5. Victory celebration with balloons and fireworks when correct!

## Development

- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`
- **Type Check**: `npm run type-check`

## Contributing

This is a personal project, but feel free to fork and modify for your own use.

## License

Personal project - all rights reserved.
