# TaskZenith - Creative Upaay Assignment

Welcome to TaskZenith, a modern task management dashboard built with Next.js, Redux, and Tailwind CSS. This project is a submission for the Creative Upaay Full Stack Development Assignment.

The application provides a Kanban-style board to manage tasks across different stages, with features like task creation, drag-and-drop movement, filtering, and state persistence using Local Storage. It also includes an AI-powered tool to suggest task categories and priorities.

[Live Demo URL - To be added after deployment]

## Video Demonstration

[Link to Video - To be added]

## Features

-   **Kanban Board**: A beautiful and responsive three-column layout for "To Do", "In Progress", and "Done" tasks.
-   **Task Creation**: Add new tasks with a title, description, category, and priority through an intuitive modal.
-   **Drag & Drop**: Seamlessly move tasks between columns to update their status.
-   **Filtering**: Filter the tasks displayed on the board by their category or priority.
-   **State Persistence**: The application state is saved to the browser's Local Storage, so your tasks persist across sessions.
-   **AI Suggestions**: When creating a task, get intelligent suggestions for its category and priority based on the description, powered by a generative AI model.
-   **Responsive Design**: The UI is fully responsive and works great on both desktop and mobile devices.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (React)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
-   **State Persistence**: [Redux Persist](https://github.com/rt2zz/redux-persist)
-   **Drag & Drop**: [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
-   **AI**: [Genkit](https://firebase.google.com/docs/genkit) for AI flow management.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd [repository-folder]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

    ```
    GOOGLE_API_KEY=your_google_api_key_here
    ```

4.  **Run the development server:**

    The application runs on `http://localhost:9002`.

    ```bash
    npm run dev
    ```

## Approach and Assumptions

-   **UI:** The UI is heavily inspired by the provided Figma design but implemented using the specified color scheme (`#64B5F6`, `#F0F4F8`, `#FFAB40`). I used shadcn/ui components for building blocks to ensure quality and accessibility.
-   **State Management:** Redux Toolkit is used for a modern and efficient Redux implementation. The state is structured to be optimal for a Kanban board, separating tasks, columns, and their order.
-   **Persistence:** `redux-persist` is integrated to save the entire Redux state to Local Storage. A `PersistGate` is used to show a loading state and prevent hydration mismatches, which is crucial in a server-rendered framework like Next.js.
-   **Drag and Drop:** I chose `react-beautiful-dnd` which is a popular library for drag and drop in React.
-   **AI Feature:** The pre-existing Genkit flow `smartTaskSuggestion` is integrated into the "Add Task" dialog. It's triggered manually by the user via a "Suggest" button to give them control over the AI interaction.
-   **Simplifications:** As per the instructions, details like task assignees and due dates were simplified. Instead, I focused on implementing category and priority, which also serve as the basis for the filtering feature.
