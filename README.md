# Modern Kwizzer

A modern rewrite of the classic Kwizzer app, now featuring a sleek UI, smooth animations, and TypeScript support. This version represents a complete modernization of the [original Kwizzer](https://github.com/MrRyanAlexander/Kwizzer) project, rebuilt from the ground up using current best practices and modern web technologies.

## About

Kwizzer was originally built using Parse as its backend service. After Parse was acquired by Facebook and subsequently shut down (with the core being open-sourced), the original version became outdated. This new version has been completely refactored using [Bolt.new](https://bolt.new), embracing modern web development practices and technologies.

## Features

- 🎨 Modern, responsive UI with smooth animations
- 📱 Works seamlessly on desktop and mobile devices
- ⚡ Immediate feedback on answers
- 📊 Detailed statistics and progress tracking
- ⌛ Time tracking for each quiz session
- 🎯 Accuracy calculations
- 🔄 Smooth transitions between questions

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite
- Lucide React Icons

## Potential Expansions

The question system is designed to be easily expandable. Some potential ways to enhance the quiz content:

1. **AI Integration**
   - OpenAI API integration for dynamic question generation
   - AI-powered difficulty adjustment
   - Natural language processing for answer validation

2. **Category System**
   - Subject-based categories (Science, History, Arts, etc.)
   - Difficulty levels
   - Time-based challenges

3. **User Content**
   - User-submitted questions
   - Community voting system
   - Question review system

4. **API Integration**
   - Integration with trivia APIs
   - Real-time multiplayer support
   - Leaderboards and rankings

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT

## Acknowledgments

- Original Kwizzer project that inspired this modern remake
- [Bolt.new](https://bolt.new) for providing the development environment
- The open-source community for the amazing tools and libraries