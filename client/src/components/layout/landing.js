import React, { Component } from "react";
import Card from "./card";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <section className="text-center">
          {/* <h1>Marvin Informatics</h1> */}
          <h1>Providing IT services to your business</h1>
          <p>
            ...where many supply just the brickwork, we provide the mortar
            too...
          </p>
          <h2>be informed</h2>
        </section>
        <h2 className="section-title text-center">Explore our services</h2>
        <div className="card-container">
          <div className="info-cards">
            <Card
              cardTitle="Business Analysis"
              cardImage="analysis"
              flipText="Our Business Analyst service is designed to aid you drive your business change whilst ever delivering tangible value to your organisation."
            />
            <Card
              cardTitle="Web Hosting"
              cardImage="hosting"
              flipText="Our hosting service guarantees deployment to fast cloud based servers goegraphically located for optimisation. We use global providers that can be relied upon to deliver security ensuring your site is safe."
            />
            <Card
              cardTitle="Software Development"
              cardImage="development"
              flipText="When it comes to bespoke software development you’ll find us to be the perfect partner when cultivating solutions and systems for problems that plague today's modern business"
            />
            <Card
              cardTitle="IT Service Management"
              cardImage="management"
              flipText="Our Service Management Package provides ongoing service availability to ensure you are getting the maximum benefit from your IT solutions"
            />
            <Card
              cardTitle="Third Party Software Consultancy"
              cardImage="3rd-party"
              flipText="When embarking on provisioning a 3rd party solution let us aid you by tapping into our debth of knowledge in software vendors and their offerings."
            />
            <Card
              cardTitle="Web Design"
              cardImage="design"
              flipText="We offer a range of website design services. Using ground breaking technologies our energetic web team have a fantastic view of this digital channel and how you can get the most out if it. "
            />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
