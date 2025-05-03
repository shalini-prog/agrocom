import './Footer.css'; // Make sure this CSS file exists

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          © {new Date().getFullYear()} Built by 'Shalini K'{" "}
          <a
            href="https://github.com/shalini-prog"
            target="_blank"
            rel="noopener noreferrer"
          >
            gitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
