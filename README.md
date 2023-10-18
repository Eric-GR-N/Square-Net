# Rutnät (Square Net)<br>



## Welcome to Rutnät, also known as Square Net! <br><br>Dive into our user-friendly application, designed to allow you to create, edit, and manage square nets with a modern touch.

## Installation
Follow these steps to get the app up and running:

1. Prerequisites:
Ensure you have the .NET SDK for .NET 6 installed.

2. Repository Setup:
Clone the repository to your local machine.

3. Environment Configuration:
Navigate to the root directory and locate the .env.example file.
Create a new .env file in the same directory.<br>
Copy the contents from .env.example to the .env file.
Define your new db password of choice in the .env file, adhering to the following criteria:

<br>
   - Length: Minimum of 8 characters.<br>
   - Complexity: The password should encompass characters from at least three of these categories:<br>
   - Uppercase letters (A-Z)<br>
   - Lowercase letters (a-z)<br>
   - Base 10 digits (0-9)<br>
   - Non-alphanumeric characters: (!, $, #, %, etc.)<br>
   - Safety: Refrain from using easily guessable passwords such as "password", "12345678", or "abcdefg".<br>
<br>
  

5. Docker Setup:
If you have Visual Studio Code installed, right-click on the docker-compose file and select 'Compose Up'.
Alternatively, execute the docker-compose up command in the root directory using a terminal.

6. Database Configuration:
Navigate to `appsettings
.json` in the Presentation Layer.
Replace the placeholder password in the connection string with the password you set in the .env file.

7. Backend Launch:
Using a terminal, navigate to the Presentation Layer.
Run the command: dotnet run
(Alternatively, in Visual Studio, ensure "Presentation" is selected and click the "Run" button.)

8. Frontend Setup:
Navigate to the React/TypeScript app directory (client-app) using a terminal.
Run the command: "npm install" to install necessary packages.
Once completed, execute "npm start".

Congratulations! The app should now be operational.

## Usage


### Authentication:

The landing page is a login portal. New users should select 'Register' to create an account.
Interface Introduction:

After logging in, an empty square net container and a list will be presented. Use the button on top to create your first square net.

### Square Net Management:

A newly created square net will initially showcase grey squares.
You can navigate through various square nets via the list below the container.
Selecting a square net from the list provides options for editing or deletion.

If you click "Edit" on a sqaure net in the list, the app will be in "Edit Mode" and you can click on squares to alter their colors. 

You can also rename your square net by using the input field beside the 'Save' button. Leaving the input field blank keeps the current name of the sqaure net.

Hitting 'Save' records your modifications and reverts the app back to 'Read Mode' where you can't select squares and accidently ruin your beautiful pattern.

### Multi-user Support:

The app facilitates multiple user accounts. Use the 'Sign Out' button to switch between or create new accounts.

## Tech Stack

### Client App:

React/TypeScript<br>
oidc-client

### Database:


MSSQL

### Backend:

HTTPS protocol<br>
.NET 6 with CLEAN architecture<br>
Entity Framework<br>
IdentityServer<br>
ASP.NET Core Identity<br>
Bearer Token Protection for square net-related endpoints<br>
Role handling prepared for future integration<br>
Razor Pages/Handlers for user creation<br>

# Note
 - The database password mechanism is configured for development scenarios.<br>
 - Always override this in a production environment, especially if deploying on platforms like Azure Web Services.<br>
 - For this scenario we're using in memory stores for identity server, use real db support if deploying application

