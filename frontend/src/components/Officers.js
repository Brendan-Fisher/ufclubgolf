import "./styles/Officers.css";

import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="main-wrap">
        <div className="header-wrap">
          <div className="officer-header-image"><img id="officer-header" alt="Mark Bostick GC"></img></div>
          <div className="header-text-wrap">
            <div className="header-text">
              <h1>Get to Know Your Club Officers</h1>
            </div>
          </div>
        </div>
        <div className="content-wrap">
          <div className="container">
            <div className="row aside">
              <h1 className="page-title">Club Officers</h1>
              <div className="grid col s12">
                <div className="p-image"></div>
                <div className="p-desc">
                  <h2>
                    <b>Nick Althammer</b>
                  </h2>
                  <h3>President</h3>
                  <p>
                    Nick is currently studying Civil Engineering. 
                    His favorite golfers is Rory McIlroy and his
                    favorite course is the Bears Club Course
                  </p>
                </div>
                <div className="vp-image"></div>
                <div className="vp-desc">
                  <h2>
                    <b>Blake Simmons</b>
                    <br />
                  </h2>
                  <h3>Vice President</h3>
                  <p>
                    Blake is Majoring in Microbiology and in his free time he enjoys
                    playing basketball and free diving. His favorite golfer is Justin
                    Thomas.
                  </p>
                </div>
                <div className="tr-image"></div>
                <div className="tr-desc">
                  <h2>
                    <b>Jackson Wiesbrot</b>
                  </h2>
                  <h3>Treasurer</h3>
                  <p>
                    Jackson is currently getting his Masters in Accounting. In his
                    free time, Jackson enjoys playing basketball and tennis. His
                    favorite golfer is Tiger Woods and his favorite course is Sebonack
                    Golf Club.
                  </p>
                </div>
                <div className="pr1-image"></div>
                <div className="pr1-desc">
                  <h2>
                    <b>Mombo Ngu</b>
                  </h2>
                  <h3>Public Relations</h3>
                  <p>
                    Mombo is currently studying Sociology on the Pre-Med track. Her
                    favorite golfers are Cheyenne Woods and Matthew Wolff and she
                    enjoys being able to volunteer at the team tournaments and
                    utilizing Mark Bostick Golf Course for practice.
                  </p>
                </div>
                <div className="pr2-image"></div>
                <div className="pr2-desc">
                  <h2>
                    <b>Dhruv Patel</b>
                  </h2>
                  <h3>Player Relations</h3>
                  <p>
                    Dhruv is currently studying Computer Science and in his free time
                    he enjoys playing ultimate frisbee and watching sports. His
                    favorite golfers are Justin Rose and Collin Morikawa and his
                    favorite course is the TPC Sawgrass Valley Course
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
