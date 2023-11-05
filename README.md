# The Protein Project

The Protein Project is a powerful application designed to help you discover the most optimal combination of foods that maximize your protein intake while adhering to your specified calorie limit.

## Overview

We've harnessed the potential of a comprehensive fast-food dataset from the USA, which we've supplemented with manually added entries to enhance the variety and accuracy of our recommendations. This rich dataset forms the foundation of our application, allowing you to make informed dietary choices.

## How it Works

1. **Objective Function**: The core of The Protein Project is its ability to generate personalized recommendations based on your maximum calorie limit. We use the power of mathematical optimization to create an objective function that seeks to maximize protein intake while adhering to your calorie constraints.

2. **Frontend**: The frontend of the application is built using JavaScript, providing a user-friendly interface for entering your calorie limit and receiving dietary recommendations.

3. **Backend Server**: The communication between the JavaScript frontend and the Python script responsible for optimizing your diet is facilitated by our backend server. This server, powered by Node.js, plays a crucial role in passing user inputs and delivering the optimized results.

## Installation Instructions

To run The Protein Project on your local machine, follow these steps:

1. **Fork and Star the Repository**: Start by forking the repository to your GitHub account and giving it a star to show your support.

2. **Clone the Repository**: Clone the repository to your local computer using Git:

   ```bash
   git clone https://github.com/yourusername/TheProteinProject.git
   ```

3. **Navigate to the Backend Directory**: Move into the `backend` directory:

   ```bash
   cd TheProteinProject/backend
   ```

4. **Install Dependencies**: Install the necessary dependencies for the backend. In this case, you'll need Node.js, npm, and a few packages to run the server:

   ```bash
   npm install node nodemon morgan cors express
   ```

5. **Start the Server**: Launch the Node.js server:

   ```bash
   npm run dev
   ```

The server is now running, waiting to serve the frontend.

6. **Launch the Application**: Open the `index.html` file in your web browser. The frontend will automatically connect to the backend server.

7. **Input Your Preferences**: Provide your maximum calorie limit in the user-friendly interface and run the application.

8. **Optimized Diet Recommendations**: Our Python script, fueled by the fast food dataset and your preferences, will work its magic and provide you with dietary recommendations that maximize your protein intake while staying within your calorie limit.

Please note that our dataset is continually undergoing refinement and processing to address exceptions and outliers, ensuring the most practical and accurate recommendations for your diet.

Thank you for using The Protein Project! Your feedback and contributions are greatly appreciated as we work to enhance this valuable tool for dietary optimization.
