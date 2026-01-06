# TES_PBL - Password Weakness Analyzer

A client-side web application for analyzing password strength and encrypting passwords using AES-256-CBC.

## Features

- Password strength analysis with percentage score
- Security suggestions for weak passwords
- AES-256-CBC encryption with random keys
- Client-side processing (no data sent to servers)
- Responsive design
- Modular JavaScript architecture

## Files

- `html/index.html` - Main application HTML file
- `html/styles.css` - CSS styling
- `TES_PBL.js` - Main JavaScript application logic

## Deployment

This is a static web application that can be deployed to any web hosting service:

### Option 1: GitHub Pages
1. Upload all files to a GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from a branch" and choose main/master branch
4. Access at `https://yourusername.github.io/repository-name/html/`

### Option 2: Netlify/Vercel
1. Upload the `html/` folder contents and `TES_PBL.js` to the hosting service
2. Deploy directly - no build process needed

### Option 3: Traditional Web Hosting
1. Upload `html/index.html`, `html/styles.css`, and `TES_PBL.js` to your web server
2. Ensure the crypto-js CDN link works (it should)

## Usage

1. Open the HTML file in a web browser
2. Enter a password in the input field
3. Click "Password Enkripsi" to analyze and encrypt
4. View strength percentage, suggestions, and encrypted result

## Security Note

All processing happens client-side in the browser. Passwords and encryption keys are not sent to any server.
ynal# Password Weakness Analyzer

A client-side web application for analyzing password strength and encrypting passwords using Hashing.

## Features

- Password strength analysis with percentage score
- Security suggestions for weak passwords
- AES-256-CBC encryption with random keys
- Client-side processing (no data sent to servers)
- Responsive design

## Files

- `html/index.html` - Main application file
- `html/styles.css` - CSS styling
- `crypto_utils.js` - JavaScript utilities (optional, functionality embedded in HTML)

## Deployment

This is a static web application that can be deployed to any web hosting service:

### Option 1: GitHub Pages
1. Upload all files to a GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from a branch" and choose main/master branch
4. Access at `https://yourusername.github.io/repository-name/html/`

### Option 2: Netlify/Vercel
1. Upload the `html/` folder contents to the hosting service
2. Deploy directly - no build process needed

### Option 3: Traditional Web Hosting
1. Upload `index.html` and `styles.css` to your web server
2. Ensure the crypto-js CDN link works (it should)

## Usage

1. Open the HTML file in a web browser
2. Enter a password in the input field
3. Click "Password Enkripsi" to analyze and encrypt
4. View strength percentage, suggestions, and encrypted result

## Security Note

All processing happens client-side in the browser. Passwords and encryption keys are not sent to any server.


