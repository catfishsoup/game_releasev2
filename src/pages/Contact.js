import styled from 'styled-components'
import marker from '../img/address-marker.svg'
import printer from '../img/outline-email.svg'
import phone from '../img/round-phone.svg'
const Address = styled.p` 
    margin-bottom: 1em;
    &:before {
        content: url(${props => props.$icon});
        padding-right: 10px;
        vertical-align: middle
    }
`
const Contact = () => {

    return(

    <section className='contact-sect'>
           <section className='contact-info'>
            <h1>Contact Us</h1>
            <p>Please enter the required information to get in touch with us.<br/> 
            We are happy to answer any feedback or questions from you!</p>
            <small style={{color: '#d83e4f', fontWeight: '500'}}>Field with * is required.</small>
            <h2>Other ways to connect:</h2>
            <section className="site-address">
                <Address $icon={marker}>
                    844 Honey Creek St. Springfield, PA 19064
                </Address>
                <Address $icon={phone} className="contact-num">(123) 456-7890</Address>
                <Address $icon={printer} className="contact-num contact-num-2">videabusiness@gmail.com</Address>
            </section>
        </section>

        <section className='contact-form'>
            <form>
                <div className='basic-info'>
                   <label>Name</label>
                    <input type='text'/> 
                </div>
                   
                <div className='basic-info'>
                   <label>Email Address *</label>
                    <input type='email' required/>  
                </div>
                    
                

                <label style={{display: 'block'}} >Subject *</label>
                <input className='subject' required/>

                <label style={{display: 'block'}}>Message *</label>
                <textarea cols="59" rows="10" required>

                </textarea>
                <button className='submit-btn'>Submit It</button>
            </form>
        </section> 
    </section>
        
    )
}

export default Contact