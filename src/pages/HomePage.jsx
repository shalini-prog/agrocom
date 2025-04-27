import { Link } from "react-router-dom";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid";
import "./HomePage.css"; // Link to the CSS file

const HomePage = () => {
  const features = [
    { title: "Organic Produce", desc: "Fresh, local produce from verified farmers." },
    { title: "Efficient Logistics", desc: "Seamless coordination between users and admins." },
    { title: "Role-Based Access", desc: "Custom dashboards for users, farmers, and admins." }
  ];

  return (
    <div className="homepage-container">
      <div className="homepage-wrapper">
        {/* Header */}
        <div className="homepage-header">
          <h1 className="homepage-title">Welcome to AGRI E-Commerce</h1>
          <p className="homepage-subtitle">
            A platform connecting users, farmers, and admins in one powerful marketplace.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="homepage-buttons">
          <Link to="/login" className="btn-primary">
            <UserIcon className="icon" /> Login
          </Link>
          <Link to="/register" className="btn-secondary">
            <UserIcon className="icon" /> Register
          </Link>
        </div>

        {/* Featured Section */}
        <div className="homepage-features">
          {features.map((item, index) => (
            <div key={index} className="feature-card">
              <ShoppingBagIcon className="feature-icon" />
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
