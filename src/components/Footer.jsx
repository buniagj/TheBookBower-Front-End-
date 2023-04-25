import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


function Footer() {
    return (
    <footer>
        <div className="social-media">
            <a href="https://www.facebook.com"><FaFacebook /></a>
            <a href="https://www.twitter.com"><FaTwitter /></a>
            <a href="https://www.instagram.com"><FaInstagram /></a>
        </div>
        <div className="container">
            <p>© 2023 The Book Bower. All rights reserved.</p>
        </div>
    </footer>
        );
    }
    
export default Footer;