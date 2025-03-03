# Collaborative Document Editing App

## Getting Started

Follow these steps to set up the project locally:

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
   - Get the `.env` file from [this link](https://drive.google.com/file/d/1-IUv832alefSpzIpCByz92HlAybYJtqf/view?usp=sharing) and place it in the root of the project.

4. **Run the Next.js server:**
   ```sh
   npm run dev
   ```

5. **Install and start the WebSocket server:**
   - Ensure WebSockets are installed and set up.
   - Run the WebSocket server on port `1234`.
   ```sh
   npm run websocket
   ```

## Features

- User authentication
- Create and manage documents
- Invite collaborators to documents
- Real-time collaborative text editing
- Secure APIs with authentication checks

## Technologies Used

- **Next.js** - For the frontend and backend
- **TypeScript** - For type safety
- **WebSockets (y-websocket)** - For real-time collaboration
- **Prisma** - For database management
- **PostgreSQL** - As the database
- **Tailwind CSS** - For styling
- **Better Auth** - For authentication

## Future Improvements

Given more time, I could have:
- Implemented better real-time presence tracking (e.g., showing who is currently editing)
- Added more granular permission controls for document access
- Improved the overall UI/UX with animations and better designs
- Optimized API performance and database queries
- Refactored and cleaned up the code for better maintainability

## Contributing

If you want to suggest changes or improvements, feel free to **open an issue** in this repository. I appreciate all contributions! 🚀

## Contact

If you have any questions, feel free to reach out to me at **aadil.shabir13@gmail.com**.

## Support

If you've made it this far, please **star this repo** ⭐️ to show your support! It helps me know that you've reviewed it, and I truly appreciate the effort I've put into this. 😊
