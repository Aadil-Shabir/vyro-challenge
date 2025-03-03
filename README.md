# Collaborative Document Editing App

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
- Node.js (>= 16.x)
- PostgreSQL (NeonDB used as the database)
- Prisma (used for database ORM)
- WebSockets (for real-time collaboration)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Aadil-Shabir/vyro-challenge.git
   cd vyro-challenge
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Get the `.env` file from [this LINK](https://drive.google.com/file/d/1-IUv832alefSpzIpCByz92HlAybYJtqf/view?usp=sharing) and place it in the root directory.

4. **Apply database migrations:**
   ```sh
   npx prisma migrate dev --name init
   ```

5. **Start the Next.js server:**
   ```sh
   npm run dev
   ```

6. **Install and run the WebSocket server:**
   ```sh
   npm install -g y-websocket
   y-websocket --port 1234
   ```

## Features

- **User Authentication**: Secure login and signup.
- **Create Documents**: Users can create documents.
- **Invite Collaborators**: Share documents with others for collaboration.
- **Real-Time Editing**: Multiple users can edit a document simultaneously with changes reflecting in real-time.
- **Authentication Checks**: All APIs ensure that users are authenticated before performing actions.

## Technologies Used

- **Next.js** (React framework for the frontend and backend API routes)
- **TypeScript** (Strongly-typed JavaScript for better maintainability)
- **Prisma** (ORM for database interactions)
- **PostgreSQL** (NeonDB as the database provider)
- **WebSockets** (Real-time collaboration with `y-websocket` and `yjs`)
- **TailwindCSS** (For styling the UI)

## Future Enhancements

If more time were available, the following improvements could have been made:
- **Better Code Structure**: Refactoring for more optimized and scalable code.
- **More Robust Permission System**: Implementing role-based access control for documents.
- **Offline Editing Support**: Allowing users to make changes offline and sync later.
- **More UI Enhancements**: Smoother user experience with better animations and interactions.

## Contributing

If you want to suggest improvements or report issues, feel free to [open an issue](#) in this repository. Contributions are welcome!

## Contact

If you have any questions, feel free to reach out:
📧 **aadil.shabir13@gmail.com**

## Support

⭐ If you've made it this far, please **star this repo** to show your support. It helps me know that people find it useful! 🚀
