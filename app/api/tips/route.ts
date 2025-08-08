import { NextResponse } from 'next/server';

const TIPS = [
  "You can ask the AI assistant anything from general knowledge to coding help.",
  "Try clicking on different parts of the interface to discover hidden features.",
  "The app remembers your name between page refreshes using Redux state management.",
  "All your conversations with the AI are processed securely in your browser.",
  "The UI is fully responsive and works great on both desktop and mobile devices.",
  "You can use markdown in your messages for better formatting.",
  "The app features smooth animations powered by Framer Motion.",
  "Try asking the AI about the weather, news, or for programming help.",
  "The sidebar updates with new tips periodically.",
  "Your data stays private and is never stored on our servers."
];

export async function GET() {
  try {
    // Shuffle the tips array to show different tips on each request
    const shuffledTips = [...TIPS].sort(() => 0.5 - Math.random());
    // Return a random selection of 5 tips
    const selectedTips = shuffledTips.slice(0, 5);

    return NextResponse.json(
      { 
        success: true,
        tips: selectedTips,
        lastUpdated: new Date().toISOString()
      },
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=3600, stale-while-revalidate'
        }
      }
    );
  } catch (error) {
    console.error('Failed to fetch tips:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to load tips',
        tips: [
          "Try refreshing the page to load new tips.",
          "The app is still fully functional without tips.",
          "You can continue using all features normally."
        ]
      },
      { status: 500 }
    );
  }
}
