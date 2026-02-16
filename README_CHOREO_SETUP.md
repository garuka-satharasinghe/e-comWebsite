# Choreo Deployment Setup

## Configuration in Choreo Console

### Step 1: Create Connection to Backend
1. In your frontend component in Choreo, go to **Dependencies** or **Connections**
2. Click **Create Connection**
3. Select your backend service (e.g., "merchmora-backend")
4. Save the connection

### Step 2: Add File Mount for API Configuration

In the Choreo **Deploy** page:

1. Go to **Configure and Deploy** section
2. Find **File Mounts** and click **Add File Mount**
3. Configure the file mount:
   - **Mount Path**: `/usr/share/nginx/html/config.js`
   - **Content**: 
     ```javascript
     window.configs = {
         apiUrl: '/choreo-apis/{YOUR_ORG}/{YOUR_BACKEND_SERVICE}/v1',
     };
     ```
   - Replace `{YOUR_ORG}` with your Choreo organization name
   - Replace `{YOUR_BACKEND_SERVICE}` with your backend service name

4. Save the file mount

### Step 3: Deploy

Click **Deploy** and your frontend will be configured to connect to the backend.

## Finding Your API Path

Your backend API path follows this pattern:
```
/choreo-apis/{organization-name}/{service-name}/{version}
```

To find it:
1. Go to your backend service in Choreo
2. Look at the endpoint URL (e.g., `https://xyz.choreoapis.dev/abc/backend/v1`)
3. Extract the path: `/abc/backend/v1`
4. Add the prefix: `/choreo-apis/abc/backend/v1`

## Local Development

For local development, the app will use the default config from `public/config.js` or the `REACT_APP_API_URL` environment variable.

Create a `.env.local` file:
```
REACT_APP_API_URL=http://localhost:8080/api/v1
```

## Testing the Connection

After deployment, open browser console and run:
```javascript
console.log(window.configs);
```

You should see your configured API URL.

## Troubleshooting

### CORS Errors
Make sure your backend has the correct CORS configuration with your frontend URL in the `CLIENT_URL` environment variable.

### 404 on API Calls
Verify the API path in the file mount matches your backend service name and organization.

### Configuration Not Loading
Check that the file mount path is exactly: `/usr/share/nginx/html/config.js`
