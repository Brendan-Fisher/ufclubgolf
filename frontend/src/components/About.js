import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div id="container" className="container valign-wrapper">
        <div className="grid col s12">
          <div className="exec-heading col s12">
            <h4>
              <span style={{ fontFamily: "monospace" }}>
                <b>Executive Board Members of the UF Golf Club</b>
              </span>
            </h4>
          </div>
          <div className="vp-image"></div>
          <div className="vp-desc">
            <h3>
              <b>Blake Simmons</b>
              <br />
            </h3>
            <h4>Vice President</h4>
            <h5>
              Blake is Majoring in Microbiology and in his free time he enjoys
              playing basketball and free diving. His favorite golfer is Justin
              Thomas.
            </h5>
          </div>
          <div className="tr-image"></div>
          <div className="tr-desc">
            <h3>
              <b>Jackson Wiesbrot</b>
            </h3>
            <h4>Treasurer</h4>
            <h5>
              Jackson is currently getting his Masters in Accounting. In his
              free time, Jackson enjoys playing basketball and tennis. His
              favorite golfer is Tiger Woods and his favorite course is Sebonack
              Golf Club.
            </h5>
          </div>
          <div className="pr1-image"></div>
          <div className="pr1-desc">
            <h3>
              <b>Mombo Ngu</b>
            </h3>
            <h4>Public Relations</h4>
            <h5>
              Mombo is currently studying Sociology on the Pre-Med track. Her
              favorite golfers are Cheyenne Woods and Matthew Wolff and she
              enjoys being able to volunteer at the team tournaments and
              utilizing Mark Bostick Golf Course for practice.
            </h5>
          </div>
          <div className="pr2-image"></div>
          <div className="pr2-desc">
            <h3>
              <b>Dhruv Patel</b>
            </h3>
            <h4>Public Relations</h4>
            <h5>
              Dhruv is currently studying Computer Science and in his free time
              he enjoys playing ultimate frisbee and watching sports. His
              favorite golfers are Justin Rose and Collin Morikawa and his
              favorite course is the TPC Sawgrass Valley Course
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
