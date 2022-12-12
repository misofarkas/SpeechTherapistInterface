# SpeechTherapistInterface
## Table of contents
* [VPN](#vpn)
* [Node.js](#nodejs)
* [Application](#application)

Therapist Interface for Speech therapist application, developed by Michal Farkaš

For the purpose of trying out the application, a configured therapist account is provided:
email: john.doe@example.com
password: 123456789

Setting up the application consists of three parts:

# VPN
in order to access APIs, which are hosted on the university network, a VPN must be used.
1. Follow the steps on how to install a VPN client from [here](https://it.muni.cz/en/services/vpn).
2. Instead of using the default configuration file provided in the VPN's setup guide above, download and import the configuration file from [here](https://www.fi.muni.cz/tech/unix/vpn.html.en). After clicking _Download VPN configuration_, select _all the connections(recommended)_ option.
3. Make sure you are connected to the VPN when running the application.

# Node.js
1. Download the Node.js installer for your operating system from the [official website](https://nodejs.org/en/download/).
2. Run the installer and follow the on-screen instructions to install Node.js.
3. Verify that Node.js was successfully installed by opening a terminal or command prompt and running the command `node -v`. This should print the version number of Node.js that you have installed.

# Application
1. Open a terminal or command prompt and navigate to the folder where you have downloaded the application using the `cd` command.
2. Install the required dependencies by running the command `npm install`.
3. Start the application by running the command `npm start`. This should open a new browser window with the application running.