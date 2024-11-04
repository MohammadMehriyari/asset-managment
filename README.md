# Asset Management System

[![Angular Version](https://img.shields.io/badge/Angular-17.x-brightgreen.svg)](https://angular.io/)
[![Django Version](https://img.shields.io/badge/Django-4.x-blue.svg)](https://www.djangoproject.com/)
[![MySQL Version](https://img.shields.io/badge/MySQL-8.x-lightblue.svg)](https://www.mysql.com/)


[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)



## Project Overview

AssetManagement is a comprehensive university property management system designed to streamline asset tracking, user management, and maintenance operations. Developed in collaboration with Zahra1380, this project leverages cutting-edge web technologies to provide an efficient and user-friendly interface.

### Key Features

- Master Data Management: Assets, Users, Buildings, Zones, and more
- Ticketing System: Facilitates support and maintenance requests
- Multi-level User Access Control:
  - Admin: Full system access and control
  - Support: Limited access for maintenance tasks
  - Normal User: Restricted access for general users

### Technologies Used

- Front-end: Angular (Version 17)
- Back-end: Django
- Database: MySQL
- Containerization: Docker

## Getting Started

This project uses Docker for easy deployment. Follow these steps to set up and run the project:

1. **Prerequisites**
   - Install Docker: Download from [here](https://www.docker.com/get-started)
   - Ensure you have Docker Compose installed

2. **Clone the Repository**
bash git clone https://github.com/your-username/AssetManagement.git


3. **Build and Run the Project**
bash cd AssetManagement docker-compose build docker-compose up


4. **Access the Application**
   Open your browser and navigate to [http://localhost:4200/](http://localhost:4200/)

### Development Setup

For local development:

1. Install Node.js and npm
2. Install Angular CLI globally:
bash npm install -g @angular/cli

3. Navigate to the project directory:
bash cd AssetManagement/frontend

4. Install dependencies:
bash npm install

5. Serve the application:
bash ng serve

   Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser

## Contributors

- [Mohammad Mehriyari](https://github.com/MohammadMehriyari)
- [Zahra1380](https://github.com/zahra1380)





## Acknowledgments

- Special thanks to Zahra1380 for her invaluable contributions to this project
- Thanks to the Angular and Django communities for their extensive documentation and support
