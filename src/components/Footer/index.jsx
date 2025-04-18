import classes from './footer.module.css'
const Footer = () => {
  return (
    <footer className="text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>CUSTOMER SERVICES</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light">
                  Help & Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Online Stores
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>COMPANY</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light">
                  What We Do
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Available Services
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Latest Posts
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>SOCIAL MEDIA</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
