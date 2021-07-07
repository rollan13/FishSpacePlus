import React, { Component } from 'react';

export class VideoConvert extends Component{
	render () {
		return (
			<div>
				<div className="about-ccres-content p-0">
				<label className="font-size-4 black-text about-text">Convert Video to .mp4 format</label>
				<label className="font-size-1 help-text black-text"> 
					<b>6.0 Getting Started </b>
					<p>Go online to CloudConvert.com.</p>
					<p></p>
					<p></p>
					<b>6.1 How to convert </b>
					<p>Step 1 : Click Select Files. The Open dialog box appears. Navigate to the folder that contains the video file you want to convert.</p>
					<img src="assets/help/video_file.png"/>
					<p>Alternatively, to select a file stored in the cloud, select the arrow next to Select Files, and choose the cloud system (Box, Dropbox, Google Drive, or OneDrive) where your media file is stored.</p>
					<p></p>
					<p>Step 2 : Select the media file and then click Open. </p>
					<p>The name of your selected media file and its format are shown on the page.</p>
					<img src="assets/help/video_file_selected.png"/>
					<p></p>
					<p>Step 3 : Click the Format button, and choose the mp4 format.</p>
					<img src="assets/help/video_format.png"/>
					<p></p>
					<p>Step 4 : Click the Conversion Options button.</p>
					<p>Step 5 : Select H264 as the Video Codec and Click Okay</p>
					<img src="assets/help/video_settings.png"/>
					<p>(There are other options available in the dialog box to choose from for people who have more expertise with media files.)</p>
					<p>The web page now summarizes the conversion: The format you're starting with is named on the left side, and the format that it'll be converted to is named on the right. </p>
					<p>Step 6 : Click the red Start Conversion button at the bottom of the page. </p>
					<p>When the conversion is complete, a green Download button appears on the page.</p>
					<p>Step 7 : Click Download. </p>
					<img src="assets/help/video_done.png"/>
					<p>The file is copied to your Windows Downloads folder. You can then move it to any folder you like. It's ready to be inserted in your PowerPoint presentation</p>
				</label>
            		</div>
            	</div>
		)
	}
}