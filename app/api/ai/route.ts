import { NextResponse } from 'next/server';

// In-memory conversation history (in a real app, use a database)
const conversationHistory: Record<string, Array<{role: string, content: string}>> = {};

// Simple AI responses for common queries
const RESPONSES: Record<string, string> = {
  'hello': "Hello! How can I assist you today?",
  'hi': "Hi there! What can I help you with?",
  'help': "I can help with general questions, coding problems, or just have a friendly chat. What would you like to know?",
  'who are you': "I'm an AI assistant here to help answer your questions and assist with various tasks. How can I help you today?",
  'what can you do': "I can answer questions, help with coding problems, provide explanations, and engage in general conversation. What would you like to know?",
  'thanks': "You're welcome! Let me know if there's anything else I can help with.",
  'thank you': "You're welcome! I'm here to help with anything you need.",
  'bye': "Goodbye! Feel free to come back if you have more questions.",
  'goodbye': "Goodbye! Have a great day!"
};

function getSimpleResponse(message: string): string | null {
  const lowerMessage = message.toLowerCase().trim();
  
  // Check for exact matches
  if (RESPONSES[lowerMessage]) {
    return RESPONSES[lowerMessage];
  }
  
  // Check for partial matches
  for (const [key, response] of Object.entries(RESPONSES)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return null;
}

export async function POST(request: Request) {
  try {
    const { message, conversationId = 'default' } = await request.json();

    // Input validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Initialize conversation if it doesn't exist
    if (!conversationHistory[conversationId]) {
      conversationHistory[conversationId] = [];
    }

    // Add user message to conversation history
    conversationHistory[conversationId].push({ role: 'user', content: message });

    // Get a simple response if available
    const simpleResponse = getSimpleResponse(message);
    if (simpleResponse) {
      conversationHistory[conversationId].push({ role: 'assistant', content: simpleResponse });
      return NextResponse.json({ 
        response: simpleResponse,
        conversationId 
      });
    }

    // For more complex queries, you would typically call an AI API here
    // For now, we'll provide a generic response
    const genericResponses = [
      "I'm not sure how to respond to that. Could you rephrase or ask something else?",
      "That's an interesting question. Could you provide more details?",
      "I'm still learning! Could you try asking that in a different way?",
      "I don't have enough information to answer that. Could you be more specific?",
      "I'm designed to be helpful, but I'm not sure how to respond to that.",
      "I'm not sure I understand. Could you try rephrasing your question?",
      "That's a great question! I'm still learning, so I might not have the best answer for that.",
      "I'm sorry, I don't have enough information to provide a good response to that."
    ];
    
    const randomResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
    
    // Add AI response to conversation history
    conversationHistory[conversationId].push({ role: 'assistant', content: randomResponse });
    
    // Return the response
    return NextResponse.json({ 
      response: randomResponse,
      conversationId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to process your request',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
