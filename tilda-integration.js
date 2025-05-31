/**
 * Mapbox iframe integration for Tilda sites
 * This script helps embed a Mapbox map on Tilda sites while bypassing CSP restrictions
 */

(function() {
    // Configuration - Replace these values with your own
    const config = {
        // Your Mapbox access token - IMPORTANT: Replace with your actual token
        accessToken: 'pk.eyJ1IjoibWlpZ2FpayIsImEiOiJjbWI2YXNpd3UwMG9jMDFzOWVhOWZhZzl3In0.example',
        
        // The Mapbox style URL (default is the one provided)
        styleUrl: 'mapbox://styles/miigaik/cmb6asiwu00oc01s9ea9fag9w',
        
        // Initial map center coordinates
        center: [21.25, 54.8],
        
        // Initial zoom level
        zoom: 7.7,
        
        // Min zoom level
        minZoom: 7.7,
        
        // Max zoom level
        maxZoom: 15.5,
        
        // Map rotation in degrees
        bearing: 0,
        
        // Map tilt in degrees
        pitch: 0,
        
        
        // URL where the iframe HTML file is hosted
        // IMPORTANT: Host this on a domain that allows iframe embedding
        iframeUrl: 'https://garyperiscope.github.io/alga/index.html',
        
        // ID of the container element where the map should be placed
        containerId: 'mapbox-container'
    };
    
    // Create container if it doesn't exist
    function createMapContainer() {
        if (!document.getElementById(config.containerId)) {
            const container = document.createElement('div');
            container.id = config.containerId;
            container.style.width = '100%';
            container.style.height = '500px'; // Default height, can be changed
            container.style.position = 'relative';
            
            // Find a suitable place to insert the container
            // This is just an example - adjust according to your Tilda site structure
            const targetElement = document.querySelector('.t-container') || document.body;
            targetElement.appendChild(container);
        }
        return document.getElementById(config.containerId);
    }
    
    // Create and insert the iframe
    function createMapIframe(container) {
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.allow = 'geolocation; fullscreen';
        
        // Build the iframe URL with all parameters
        let url;
        if (config.iframeUrl.startsWith('http')) {
            url = new URL(config.iframeUrl);
        } else {
            // For local testing
            url = new URL(config.iframeUrl, window.location.href);
        }
        
        url.searchParams.append('access_token', config.accessToken);
        url.searchParams.append('style', config.styleUrl);
        url.searchParams.append('lng', config.center[0]);
        url.searchParams.append('lat', config.center[1]);
        url.searchParams.append('zoom', config.zoom);
        url.searchParams.append('minZoom', config.minZoom);
        url.searchParams.append('maxZoom', config.maxZoom);
        url.searchParams.append('bearing', config.bearing);
        url.searchParams.append('pitch', config.pitch);
        url.searchParams.append('header', config.headerText);
        url.searchParams.append('footer', config.footerText);
        
        iframe.src = url.toString();
        container.appendChild(iframe);
        
        return iframe;
    }
    
    // Initialize the map
    function initMap() {
        const container = createMapContainer();
        const iframe = createMapIframe(container);
        
        // Store iframe reference for later use
        window.mapboxIframe = iframe;
        
        // Listen for messages from the iframe
        window.addEventListener('message', function(event) {
            // You can add origin verification if needed
            // if (event.origin !== 'https://your-trusted-domain.com') return;
            
            const data = event.data;
            if (data.type === 'mapLoaded') {
                console.log('Mapbox map loaded successfully in iframe');
                // You can trigger any post-load actions here
            } else if (data.type === 'layerToggle') {
                console.log(`Layer ${data.layerId} visibility changed to ${data.visible ? 'visible' : 'hidden'}`);
                // You can handle layer visibility changes here
            } else if (data.type === 'featureClick') {
                console.log('Feature clicked:', data.feature);
                // You can handle feature clicks here, e.g., show additional information
            }
        });
    }
    
    // Helper function to send messages to the iframe
    window.sendToMapbox = function(message) {
        if (window.mapboxIframe && window.mapboxIframe.contentWindow) {
            window.mapboxIframe.contentWindow.postMessage(message, '*');
        }
    };
    
    // Example functions to control the map from the parent page
    window.flyToLocation = function(lng, lat, zoom) {
        sendToMapbox({
            type: 'flyTo',
            lng: lng,
            lat: lat,
            zoom: zoom
        });
    };
    
    window.addMapMarker = function(lng, lat) {
        sendToMapbox({
            type: 'addMarker',
            lng: lng,
            lat: lat
        });
    };
    
    window.toggleMapLayer = function(layerId, visible) {
        sendToMapbox({
            type: 'toggleLayer',
            layerId: layerId,
            visible: visible
        });
    };
    
    window.toggleMapSidebar = function() {
        sendToMapbox({
            type: 'toggleSidebar'
        });
    };
    
    // Initialize when the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMap);
    } else {
        initMap();
    }
})();
