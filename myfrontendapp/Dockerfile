# Use a Node.js base image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any necessary dependencies
RUN npm install


# Expose the port that the container will listen on
EXPOSE 8000

# Run the command to start the app
CMD ["npm", "start"]