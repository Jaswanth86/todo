# **App Name**: TaskZenith

## Core Features:

- UI Replication: Faithfully replicate the dashboard UI from the provided Figma file, ensuring pixel-perfect accuracy in layout, spacing, fonts, and colors.
- Task Creation: Enable users to create new tasks within each section (To Do, In Progress, Done), with fields for dynamic task names and descriptions.
- Task Management: Implement functionality to move tasks between sections using drag-and-drop or dropdown controls.
- Filtering: Provide a filtering feature allowing users to filter tasks based on criteria such as category, priority, or due date.
- State Management: Utilize Redux for centralized state management, ensuring predictable updates and easy persistence.
- Local Storage Persistence: Implement Local Storage integration to persist the application state, ensuring tasks and their states remain intact after a page refresh.
- Smart Suggestion Tool: AI tool suggesting potential task categories or priorities based on the task description. Uses a large language model to provide contextually relevant suggestions, assisting the user to properly categorize a given task, to promote dashboard organization. It will use reasoning to suggest categories or priorities based on description contents, and if uncertain it can make no suggestions.

## Style Guidelines:

- Primary color: A calming blue (#64B5F6) to evoke a sense of productivity and focus.  The concept for the color is evoking a sense of clarity for task completion, avoiding direct color associations such as 'red=bad', but instead instilling optimism.
- Background color: A light gray (#F0F4F8) for a clean and modern look, creating a comfortable viewing experience without distraction.
- Accent color: A vibrant orange (#FFAB40) to highlight important actions and calls to action, adding a touch of energy to the interface. This selection will help elements that need quick recognition for task completeness pop out to the end user.
- Body and headline font: 'Inter' sans-serif font for a modern, objective, and neutral feel that is highly readable, for both headlines and body text.
- Use minimalist and consistent icons to represent task categories and priorities.
- Maintain a clean and organized layout with clear visual hierarchy, using the Kanban-style board with three sections for task management.
- Incorporate subtle transitions and animations for task movements and updates to enhance user experience.