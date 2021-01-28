import React from 'react';

/* eslint-disable jsx-a11y/anchor-is-valid */

export default function AppHeader() {
  return (
    <header className="header-wrapper" id="header-wrapper">
      <div className="clearfix toolbar-container-wrapper">
        <div className="container">
          <div className="text-right toolbar-row row hidden-print">
            <div className="col-md-24 row-toolbar-col">
              <ul className="list-inline">
                <li className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    // aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Welcome <span className="caret" />
                  </a>
                  <ul
                    className="dropdown-menu toolbar-dropdown-menu"
                    aria-labelledby="dropdownMenu1"
                  >
                    <li>
                      <a href="https://www.eclipse.org/user">
                        <i className="fa fa-user" /> View Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://accounts.eclipse.org/user/edit"
                        data-tab-destination="tab-profile"
                      >
                        <i className="fa fa-edit" /> Edit Profile
                      </a>
                    </li>
                    <li className="divider" />
                    <li>
                      <a className="toolbar-manage-cookies dropdown-toggle">
                        <i className="fa fa-wrench" /> Manage Cookies
                      </a>
                    </li>
                    <li className="divider" />
                    <li>
                      <a href="https://accounts.eclipse.org/user/logout">
                        <i className="fa fa-sign-out" /> Log out
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>{' '}
      <div className="container">
        <div className="row" id="header-row">
          <div className="col-sm-5 col-md-4" id="header-left">
            <div className="wrapper-logo-default">
              <a href="https://www.eclipse.org/">
                <img
                  className="logo-eclipse-default hidden-xs"
                  alt="Eclipse.org logo"
                  width={160}
                  src="//www.eclipse.org/eclipse.org-common/themes/solstice/public/images/logo/eclipse-foundation-white-orange.svg"
                />
              </a>
            </div>
          </div>{' '}
          <div
            className="col-sm-19 col-md-20 margin-top-10"
            id="main-menu-wrapper"
          >
            <div className="float-right hidden-xs" id="btn-call-for-action">
              <a href="/downloads/" className="btn btn-huge btn-warning">
                <i className="fa fa-download" /> Download
              </a>
            </div>{' '}
            <div className="navbar yamm float-sm-right" id="main-menu">
              <div className="navbar-collapse collapse" id="navbar-main-menu">
                <ul className="nav navbar-nav">
                  <li>
                    <a href="https://www.eclipse.org/projects/" target="_self">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.eclipse.org/org/workinggroups/"
                      target="_self"
                    >
                      Working Groups
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.eclipse.org/membership/"
                      target="_self"
                    >
                      Members
                    </a>
                  </li>{' '}
                  <li className="dropdown visible-xs">
                    <a
                      href="#"
                      data-toggle="dropdown"
                      className="dropdown-toggle"
                    >
                      Community <b className="caret" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="http://marketplace.eclipse.org">Marketplace</a>
                      </li>
                      <li>
                        <a href="http://events.eclipse.org">Events</a>
                      </li>
                      <li>
                        <a href="http://www.planeteclipse.org/">
                          Planet Eclipse
                        </a>
                      </li>
                      <li>
                        <a href="https://www.eclipse.org/community/eclipse_newsletter/">
                          Newsletter
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/user/EclipseFdn">
                          Videos
                        </a>
                      </li>
                      <li>
                        <a href="https://blogs.eclipse.org">Blogs</a>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown visible-xs">
                    <a
                      href="#"
                      data-toggle="dropdown"
                      className="dropdown-toggle"
                    >
                      Participate <b className="caret" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="https://bugs.eclipse.org/bugs/">
                          Report a Bug
                        </a>
                      </li>
                      <li>
                        <a href="https://www.eclipse.org/forums/">Forums</a>
                      </li>
                      <li>
                        <a href="https://www.eclipse.org/mail/">
                          Mailing Lists
                        </a>
                      </li>
                      <li>
                        <a href="https://wiki.eclipse.org/">Wiki</a>
                      </li>
                      <li>
                        <a href="https://wiki.eclipse.org/IRC">IRC</a>
                      </li>
                      <li>
                        <a href="https://www.eclipse.org/org/research/">
                          Research
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown visible-xs">
                    <a
                      href="#"
                      data-toggle="dropdown"
                      className="dropdown-toggle"
                    >
                      Eclipse IDE <b className="caret" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="https://www.eclipse.org/downloads">Download</a>
                      </li>
                      <li>
                        <a href="https://www.eclipse.org/eclipseide">
                          Learn More
                        </a>
                      </li>
                      <li>
                        <a href="https://help.eclipse.org">Documentation</a>
                      </li>
                      <li>
                        <a href="https://www.eclipse.org/getting_started">
                          Getting Started / Support
                        </a>
                      </li>
                      <li>
                        <a href="https://www.eclipse.org/contribute/">
                          How to Contribute
                        </a>
                      </li>
                      <li>
                        <a href="https://www.eclipse.org/ide/">IDE and Tools</a>
                      </li>
                      <li>
                        <a href="https://www.eclipse.org/forums/index.php/f/89/">
                          Newcomer Forum
                        </a>
                      </li>
                    </ul>
                  </li>{' '}
                  {/* More */}
                  <li className="dropdown eclipse-more hidden-xs">
                    <a
                      data-toggle="dropdown"
                      className="dropdown-toggle"
                      role="button"
                    >
                      More
                      <b className="caret" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        {/* Content container to add padding */}
                        <div className="yamm-content">
                          <div className="row">
                            <ul className="col-sm-8 list-unstyled">
                              <li>
                                <p>
                                  <strong>Community</strong>
                                </p>
                              </li>
                              <li>
                                <a href="http://marketplace.eclipse.org">
                                  Marketplace
                                </a>
                              </li>
                              <li>
                                <a href="http://events.eclipse.org">Events</a>
                              </li>
                              <li>
                                <a href="http://www.planeteclipse.org/">
                                  Planet Eclipse
                                </a>
                              </li>
                              <li>
                                <a href="https://www.eclipse.org/community/eclipse_newsletter/">
                                  Newsletter
                                </a>
                              </li>
                              <li>
                                <a href="https://www.youtube.com/user/EclipseFdn">
                                  Videos
                                </a>
                              </li>
                              <li>
                                <a href="https://blogs.eclipse.org">Blogs</a>
                              </li>
                            </ul>
                            <ul className="col-sm-8 list-unstyled">
                              <li>
                                <p>
                                  <strong>Participate</strong>
                                </p>
                              </li>
                              <li>
                                <a href="https://bugs.eclipse.org/bugs/">
                                  Report a Bug
                                </a>
                              </li>
                              <li>
                                <a href="https://www.eclipse.org/forums/">
                                  Forums
                                </a>
                              </li>
                              <li>
                                <a href="https://www.eclipse.org/mail/">
                                  Mailing Lists
                                </a>
                              </li>
                              <li>
                                <a href="https://wiki.eclipse.org/">Wiki</a>
                              </li>
                              <li>
                                <a href="https://wiki.eclipse.org/IRC">IRC</a>
                              </li>
                              <li>
                                <a href="https://www.eclipse.org/org/research/">
                                  Research
                                </a>
                              </li>
                            </ul>
                            <ul className="col-sm-8 list-unstyled">
                              <li>
                                <p>
                                  <strong>Eclipse IDE</strong>
                                </p>
                              </li>
                              <li>
                                <a href="https://www.eclipse.org/downloads">
                                  Download
                                </a>
                              </li>
                              <li>
                                <a href="https://www.eclipse.org/eclipseide">
                                  Learn More
                                </a>
                              </li>
                              <li>
                                <a href="https://help.eclipse.org">
                                  Documentation
                                </a>
                              </li>
                              <li>
                                <a href="https://www.eclipse.org/getting_started">
                                  Getting Started / Support
                                </a>
                              </li>
                              <li>
                                <a href="https://www.eclipse.org/contribute/">
                                  How to Contribute
                                </a>
                              </li>
                              <li>
                                <a href="https://www.eclipse.org/ide/">
                                  IDE and Tools
                                </a>
                              </li>
                              <li>
                                <a href="https://www.eclipse.org/forums/index.php/f/89/">
                                  Newcomer Forum
                                </a>
                              </li>
                            </ul>{' '}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#navbar-main-menu"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <div className="wrapper-logo-mobile">
                  <a
                    className="navbar-brand visible-xs"
                    href="https://www.eclipse.org/"
                  >
                    <img
                      className="logo-eclipse-default-mobile img-responsive"
                      alt="Eclipse.org logo"
                      width={160}
                      src="//www.eclipse.org/eclipse.org-common/themes/solstice/public/images/logo/eclipse-foundation-white-orange.svg"
                    />
                  </a>
                </div>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
