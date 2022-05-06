// constants.js: A collection of constants used across the SAL website
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 5 May 2022

// Whether or not the website is running in developer mode
const DEVELOPER_MODE = true

// The address of the host of the server
export const HOST = DEVELOPER_MODE ? "127.0.0.1" : "HOST"

// The port of the host of the server
export const PORT = DEVELOPER_MODE ? "5000" : "PORT"
