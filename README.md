# Task Management Prototype

TaskNest is a compact browser task workspace built around fast capture, clear state and low-friction review.

## Highlights

- Add, complete and remove tasks without leaving the page
- Persist the current task list in browser storage
- Keep interaction keyboard-friendly with semantic form controls
- Render user input as text, keeping the interface predictable
- Stay dependency-free and easy to run locally

## Technical approach

The interface is driven by a small state collection. Each change updates the state, persists it and renders the current view. The implementation keeps the data model visible so the interaction flow is easy to extend.

## Run locally

Open index.html in a modern browser. There is no build step or server requirement.

TaskNest is designed as a focused client-side project for exploring the foundations of task products: capture, completion state, persistence and feedback.
