# Todo List App - Copilot Instructions

## Project Overview
This is a simple full-stack todo list application built with:
- **Backend**: FastAPI (Python) with in-memory storage
- **Frontend**: React with TypeScript and Vite

## Key Features
- Add new todos with title and optional description
- Mark todos as complete/incomplete
- Edit existing todos inline
- Delete todos
- Simple, clean UI with responsive design

## Architecture
- FastAPI backend serves REST API endpoints
- React frontend consumes the API
- CORS enabled for local development
- No database - uses in-memory storage (resets on restart)

## Development Setup
1. **Backend**: `cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload`
2. **Frontend**: `cd frontend && npm install && npm run dev`

## API Endpoints
- `GET /todos` - Get all todos
- `POST /todos` - Create new todo
- `PUT /todos/{id}` - Update todo
- `DELETE /todos/{id}` - Delete todo

## Code Style
- Use TypeScript for type safety
- Keep components simple and functional
- Handle errors gracefully
- Use async/await for API calls
- Follow React hooks patterns

## Future Enhancements
- Add database persistence
- User authentication
- Todo categories/tags
- Due dates
- Search and filtering