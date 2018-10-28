import Component from 'inferno-component';

const CLICK_CAP = 100;

const Button = ({children, id, label, setRef, onClick}) => (
	<div className='material-button' id={id} onClick={onClick}
		ref={node => setRef(node)}>
		{children}
		{label}
	</div>
);

const clickAnimation = (x, y) => {
	let div = document.createElement("div");
	div.className  = 'click';
	div.style.left = `${x}px`;
	div.style.top  = `${y}px`;
	return div;
};

export default class MaterialButton extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			clicks: []
		}
		
		this.timeouts = [];
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return this.state.clicks.length != nextState.clicks.length;
	}
	
	componentDidUnmount() {
		for (let i = 0; i < this.timeouts.length; ++i)
			clearTimeout(this.timeouts[i]);
	}
	
	onClick(evt) {
		const rect = this.node.getBoundingClientRect();
		const x = evt.clientX - rect.left;
		const y = evt.clientY - rect.top;
		this.node.appendChild(clickAnimation(x, y));
		
		this.timeouts.push(setTimeout(() => {
			// Get rid of reference to timer and delete click
			this.timeouts = this.timeouts.slice(1);
			this.node.removeChild(this.node.childNodes[1]);
		}, 1500));
	}
	
	render() {
		return (
			<Button
				id={this.props.id}
				label={this.props.children}
				onClick={evt => this.onClick(evt)}
				setRef={node => this.node = node}>
				{this.state.clicks}
			</Button>
		);
	}
}
