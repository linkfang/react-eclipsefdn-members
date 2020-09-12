import React from 'react';

/* eslint-disable jsx-a11y/anchor-is-valid */

export default function AppFooter() {
  return (
    <div>
      <p id="back-to-top">
        <a className="visible-xs" href="#top">
          Back to the top
        </a>
      </p>
      {/* Sign Up to our Newsletter */}
      <div
        className="featured-footer featured-footer-newsletter"
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://eclipse.org/home/images/eclipse-ide-2020-03.jpg)',
          borderBottom: '1px solid #ccc',
          borderTop: '1px solid #ccc',
          backgroundPosition: 'bottom',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-24">
              <h2 className="margin-top-30">
                <strong>Join us for EclipseCon 2020</strong>
              </h2>
              <p>
                EclipseCon 2020 is a free virtual event for the Eclipse
                community. Join us October 19-22!
              </p>
              <a
                className="btn btn-primary btn-lg"
                href="https://www.eclipsecon.org/2020/registration"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer id="solstice-footer">
        <div className="container">
          <div className="row">
            <section
              className="col-sm-6 hidden-print"
              id="footer-eclipse-foundation"
            >
              <h2 className="section-title">Eclipse Foundation</h2>
              <ul className="nav">
                <li>
                  <a href="https://www.eclipse.org/org/">About Us</a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/org/foundation/contact.php">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/donate">Donate</a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/membership/">Members</a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/org/documents/">
                    Governance
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/org/documents/Community_Code_of_Conduct.php">
                    Code of Conduct
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/artwork/">
                    Logo and Artwork
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/org/foundation/directors.php">
                    Board of Directors
                  </a>
                </li>
              </ul>{' '}
            </section>
            <section className="col-sm-6 hidden-print" id="footer-legal">
              <h2 className="section-title">Legal</h2>
              <ul className="nav">
                <li>
                  <a href="https://www.eclipse.org/legal/privacy.php">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/legal/termsofuse.php">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/legal/copyright.php">
                    Copyright Agent
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/legal/epl-2.0/">
                    Eclipse Public License
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/legal/">Legal Resources</a>
                </li>
              </ul>{' '}
            </section>
            <section className="col-sm-6 hidden-print" id="footer-useful-links">
              <h2 className="section-title">Useful Links</h2>
              <ul className="nav">
                <li>
                  <a href="https://bugs.eclipse.org/bugs/">Report a Bug</a>
                </li>
                <li>
                  <a href="//help.eclipse.org/">Documentation</a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/contribute/">
                    How to Contribute
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/mail/">Mailing Lists</a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/forums/">Forums</a>
                </li>
                <li>
                  <a href="//marketplace.eclipse.org">Marketplace</a>
                </li>
              </ul>{' '}
            </section>
            <section className="col-sm-6 hidden-print" id="footer-other">
              <h2 className="section-title">Other</h2>
              <ul className="nav">
                <li>
                  <a href="https://www.eclipse.org/ide/">IDE and Tools</a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/projects">Projects</a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/org/workinggroups/">
                    Working Groups
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/org/research/">
                    Research@Eclipse
                  </a>
                </li>
                <li>
                  <a href="https://www.eclipse.org/security/">
                    Report a Vulnerability
                  </a>
                </li>
                <li>
                  <a href="https://status.eclipse.org">Service Status</a>
                </li>
              </ul>{' '}
            </section>
            <div className="col-sm-24 margin-top-20">
              <div className="row">
                <div id="copyright" className="col-md-16">
                  <p id="copyright-text">
                    Copyright © Eclipse Foundation, Inc. All Rights Reserved.
                  </p>
                </div>
                <div className="col-md-8 social-media">
                  <ul className="list-inline">
                    <li>
                      <a
                        className="social-media-link fa-stack fa-lg"
                        href="https://twitter.com/EclipseFdn"
                      >
                        <i className="fa fa-circle-thin fa-stack-2x" />
                        <i className="fa fa-twitter fa-stack-1x" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="social-media-link fa-stack fa-lg"
                        href="https://www.facebook.com/eclipse.org"
                      >
                        <i className="fa fa-circle-thin fa-stack-2x" />
                        <i className="fa fa-facebook fa-stack-1x" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="social-media-link fa-stack fa-lg"
                        href="https://www.youtube.com/user/EclipseFdn"
                      >
                        <i className="fa fa-circle-thin fa-stack-2x" />
                        <i className="fa fa-youtube fa-stack-1x" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="social-media-link fa-stack fa-lg"
                        href="https://www.linkedin.com/company/eclipse-foundation"
                      >
                        <i className="fa fa-circle-thin fa-stack-2x" />
                        <i className="fa fa-linkedin fa-stack-1x" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>{' '}
            <a href="#" className="scrollup">
              Back to the top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
