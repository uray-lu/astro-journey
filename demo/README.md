# astro-journey Demo

A demo site showcasing the astro-journey timeline component.

## Running the Demo

```bash
# From the repo root
cd demo
npm install
npm run dev
```

Open http://localhost:4321 to see the timeline in action.

## What's Included

The demo showcases:

- **Mixed date formats** - Different date formats in a single timeline
- **Proportional spacing** - Visual gaps based on actual time differences
- **Custom colors** - Example with custom line, dot, and text colors
- **Images** - Timeline entries with images

## Demo Data

```typescript
const journeyItems = [
  {
    date: '2024-08',
    title: 'Senior Backend Engineer',
    description: 'Leading API architecture and system design.',
    link: 'https://example.com/backend',
    image: 'https://picsum.photos/400/200'
  },
  {
    date: 'July 31, 2024',
    title: 'Promoted to Tech Lead',
    description: 'Started leading a team of 5 engineers.'
  },
  {
    date: '2023-06-13',
    title: 'ML Engineer',
    description: 'Built recommendation systems and deployed ML models.',
    image: '/machinelearningdemo.jpg'
  },
  {
    date: 'Mar 15, 2020',
    title: 'Full Stack Developer',
    description: 'Developed web applications using React, Node.js, and PostgreSQL.',
    image: 'https://picsum.photos/200/400'
  },
  {
    date: '2018',
    title: 'Computer Science Degree',
    description: 'Graduated with honors, focused on distributed systems.'
  }
];
```

## Screenshots

![Demo Screenshot](../assets/demo-screenshot.png)
