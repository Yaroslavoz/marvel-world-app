
import img from './error.gif';

const ErrorMessage = () => {

    // return (
    //   <img src={process.env.PUBLIC_URL + '/error.gif'} style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }}/>
    // )

    return (
      <img src={img} alt='Error' style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }}/>
    )

  // return (
  //   <div>
  //     <div style={{position:"relative"}}><iframe title="111" src="https://giphy.com/embed/iJCo9daAP0xugHhhfb" style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
  //   </div>
  // )
}

export default ErrorMessage;
