import React from "react";

export default () => {
  return (
    <div className="about-us">
      {/* <h2 className="page-title">About us</h2> */}
      <div className="about-section">
        <div className="card mission">
          <h3 className="section-title">Our mission</h3>
          <div className="section-text">
            To be the software partner of choice for small and medium
            organisations. Let our actions do the talking and watch your
            business operation streamline
          </div>
        </div>
        <div className="card essence">
          <h3 className="section-title">Our essence</h3>
          <div className="section-text">
            To produce software solutions that flow and are truly intuitive.
            Quality and simplicity is our essential quality
          </div>
        </div>
      </div>
      <div className="about-section">
        <div className="card promise">
          <h3 className="section-title">Our promise</h3>
          <div className="section-text">
            To cater for your individual needs.
            <br />
            Our service is completely bespoke and tailored to each customer
          </div>
        </div>
        <div className="card vibe">
          <h3 className="section-title">Our vibe</h3>
          <div className="section-text">
            We love what we do and we enjoy seeing our solutions help grow your
            business
          </div>
        </div>
      </div>
      <div className="email-footer">
        <a href="mailto: info@marvininformatics.com">
          info@marvininformatics.com
        </a>
      </div>
    </div>
  );
};
