# Mapbox Iframe Solution for Tilda Sites

This solution provides a way to embed Mapbox maps on Tilda websites while bypassing Content Security Policy (CSP) restrictions. It uses an iframe approach to load Mapbox resources from a separate domain, avoiding CSP conflicts.

## Key Features

- **CSP Bypass**: Loads Mapbox resources from a separate domain to avoid Tilda's CSP restrictions
- **Interactive Legend**: Includes a collapsible sidebar with layer toggles
- **Custom Styling**: Header and footer with customizable text
- **Layer Controls**: Toggle visibility of different map layers
- **Popups**: Display information when clicking on map features
- **Cross-Origin Communication**: Parent-iframe messaging for advanced control

## How It Works

1. The solution consists of two main components:
   - An HTML file (`index.html`) that loads the Mapbox map with all interactive features
   - A JavaScript file (`tilda-integration.js`) that handles the integration with your Tilda site

2. The iframe approach allows Mapbox resources to load without being blocked by Tilda's CSP restrictions.

3. Communication between your Tilda site and the Mapbox map is handled via the `postMessage` API.

## Setup Instructions

### Step 1: Host the Iframe Files

For this solution to work properly, you need to host the `index.html` file on a domain that:
- Has HTTPS enabled
- Allows cross-origin requests (has appropriate CORS headers)
- Is not restricted by Tilda's CSP

Options for hosting:
- GitHub Pages (free)
- Netlify (free tier available)
- Vercel (free tier available)
- Your own web hosting

Upload the `index.html` file to your chosen hosting provider.

### Step 2: Configure Your Mapbox Access Token

1. Sign up for a Mapbox account if you don't have one: https://account.mapbox.com/auth/signup/
2. Get your access token from your Mapbox account dashboard
3. Replace `YOUR_MAPBOX_ACCESS_TOKEN` in the `tilda-integration.js` file with your actual token

### Step 3: Add the Integration Script to Your Tilda Site

1. In your Tilda site editor, go to the page where you want to add the map
2. Add a new HTML/JavaScript block (T123 or similar)
3. Copy the contents of the `tilda-integration.js` file into this block
4. Update the configuration in the script:
   ```javascript
   const config = {
       accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN', // Your Mapbox token
       styleUrl: 'mapbox://styles/miigaik/cmb6asiwu00oc01s9ea9fag9w', // Your style URL
       center: [21.25, 54.8], // Initial center coordinates
       zoom: 7.7, // Initial zoom level
       minZoom: 7.7, // Minimum zoom level
       maxZoom: 15.5, // Maximum zoom level
       bearing: 0, // Map rotation
       pitch: 0, // Map tilt
       headerText: 'Туристская карта', // Header text
       footerText: 'Интерактивная карта', // Footer text
       iframeUrl: 'https://your-hosting-domain.com/index.html', // URL where you hosted the iframe HTML
       containerId: 'mapbox-container' // ID of the container element
   };
   ```

### Step 4: Add a Container for the Map

1. Add another HTML block in your Tilda site where you want the map to appear
2. Add this HTML code to create a container:
   ```html
   <div id="mapbox-container" style="width: 100%; height: 500px;"></div>
   ```
   Note: You can adjust the height as needed

## Controlling the Map

The integration provides JavaScript functions you can use to control the map from your Tilda site:

```javascript
// Fly to a specific location
window.flyToLocation(longitude, latitude, zoomLevel);

// Add a marker at a specific location
window.addMapMarker(longitude, latitude);

// Toggle a specific layer on/off
window.toggleMapLayer(layerId, visible);

// Toggle the legend sidebar
window.toggleMapSidebar();
```

You can call these functions from buttons or other interactive elements on your Tilda site.

## Layer IDs Reference

The following layer IDs can be used with the `toggleMapLayer` function:

- `castle` - Замки
- `fort` - Фортификационные сооружения
- `church` - Храмы, соборы, кирхи
- `museum` - Музеи
- `park` - Парки
- `beach` - Пляжи
- `hotel` - Отели
- `cafe` - Кафе и рестораны
- `info` - Информационные центры

Example:
```javascript
// Hide the museum layer
window.toggleMapLayer('museum', false);

// Show the beach layer
window.toggleMapLayer('beach', true);
```

## Customization

### Changing the Map Style

To use a different Mapbox style:
1. Create or select a style in your Mapbox Studio account
2. Copy the style URL (format: `mapbox://styles/username/styleid`)
3. Update the `styleUrl` in the configuration

### Modifying the Legend

The legend is defined in the `index.html` file. If you need to modify it:
1. Edit the HTML structure in the `<div id="legend">` section
2. Update the corresponding layer IDs in the JavaScript code

### Adding Custom Markers or Layers

For advanced customization, you can modify the `index.html` file to add custom markers, layers, or other Mapbox GL JS features. Refer to the [Mapbox GL JS documentation](https://docs.mapbox.com/mapbox-gl-js/guides/) for details.

## Troubleshooting

### Map Not Loading

1. Check browser console for errors
2. Verify your Mapbox access token is valid
3. Ensure the iframe URL is correct and accessible
4. Check that your hosting domain allows iframe embedding (X-Frame-Options header)

### CSP Issues Persist

If you still encounter CSP issues:
1. Try hosting the iframe on a different domain
2. Check if Tilda has updated their CSP policies
3. Contact Tilda support for assistance with CSP restrictions

### Cross-Origin Communication Not Working

If the communication between your Tilda site and the iframe is not working:
1. Ensure both domains use HTTPS (or both HTTP for testing)
2. Check browser console for cross-origin errors
3. Verify the postMessage code is executing correctly

### Local Testing Limitations

When testing locally:
1. Browser security restrictions may prevent the iframe from loading properly
2. File protocol URLs may not work as expected
3. For full testing, deploy the solution to a web server

## Limitations

- This solution requires hosting the iframe HTML file on a separate domain
- Some advanced Mapbox features may require additional customization
- The solution may need updates if Tilda changes their CSP policies
