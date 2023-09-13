# Remote Interaction with Plant Factory Product

## Front-end Development
- **Framework**: WeChat applet
- **Languages**: JavaScript, wxml (similar to HTML), wxss (similar to CSS)

## Back-end Development
- **Framework**: WeChat cloud development
- **Services**: File storage, database, APIs for front-end

## WeChat Applet Structure
1. **Index Page** 
   - Data monitoring and control
   - Data and commands sent to cloud server database
   - Users can control switches to send commands to Raspberry Pi.
<div align="center">
  <img src="https://github.com/cyrus-huang/Smart-PlantFactory/assets/65390675/e3e21000-3a32-4d31-a922-960d01bc5291"  width="20%" height="20%" alt="Image 1" />
  <br />
</div>

2. **Camera Image Page** 
   - Displays real-time images from the camera
   - Refreshes images every 3 seconds for optimal performance.

3. **Image Recognition Page** 
   - Users can take/upload plant photos to the cloud server.
   - Server sends images to machine learning model and displays results.
   - Provides basic plant state information.
<div align="center">
  <img src="https://github.com/cyrus-huang/Smart-PlantFactory/assets/65390675/f8b7f1d9-7e4c-4317-938e-f1be2af76ea4"  width="20%" height="20%" alt="Image 2" />
  <br />
</div>

4. **Data Chart Page**
   - Tracks latest data trends.
   - Regularly reads data from cloud database for chart updates.
   - Allows users to select items for detailed information.
<div align="center">
  <img src="https://github.com/cyrus-huang/Smart-PlantFactory/assets/65390675/29237025-32a2-4d0f-b200-8444509fed56"  width="20%" height="20%" alt="Image 2" />
  <br />
</div>

## Data Visualization
- Utilizes open-source graphic tool Echart for data visualization.
