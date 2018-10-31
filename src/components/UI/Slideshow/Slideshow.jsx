import Component from 'inferno-component';
import Image from './Image';

class Slideshow extends Component {
	constructor(props) {
		super(props);
		
		let bgImages = [
			<Image type={0} />
		];
		
		this.state = {
			bgImgCntr: 0,
			bgImages: bgImages
		};
		
		this.rotationTimeout = null;
	}
	
	componentDidMount() {
		this.rotationTimeout = setTimeout(() => this.rotateImage(), 5000);
	}
	
	componentDidUnmount() {
		if (this.rotationTimeout != null)
			clearTimeout(this.rotationTimeout);
	}
	
	rotateImage() {
		const counter = (this.state.bgImgCntr + 1) % this.props.cap;
		const bgImages = this.state.bgImages.slice(); // Clone bgImages
		bgImages.push(<Image type={counter} />);
		
		this.setState({
			bgImgCntr: counter,
			bgImages: bgImages
		});
		
		// Rotate the next image
		this.rotationTimeout = setTimeout(() => this.removeImage(), 1000);
	}
	
	removeImage() {
		// Cut out the bottom image
		this.setState({bgImages: this.state.bgImages.slice(1)});
		this.rotationTimeout = setTimeout(() => this.rotateImage(), 4000);
	}
	
	render() {
		return (
			<div className='login-background-image-cntr'>
				{this.state.bgImages}
			</div>
		);
	}
}

export default Slideshow;
