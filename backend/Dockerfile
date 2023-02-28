# Use a Python base image
FROM python:3.9-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any necessary dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set the environment variable for Flask
ENV FLASK_APP=app.py

# Expose the port that the container will listen on
EXPOSE 5000

# Run the command to start Flask
CMD ["flask", "run", "--host=0.0.0.0"]