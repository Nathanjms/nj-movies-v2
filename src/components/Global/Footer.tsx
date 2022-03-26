import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaGithub, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div id="footer">
      <Container className="text-start">
        <Row>
          <Col sm={6}>
            <h4 style={{ paddingBottom: "20px" }}>Contact</h4>
            <div className="contact">
              <ul className="footerList list-unstyled">
                <li>Nathan James</li>
                <li style={{ paddingBottom: "5px" }}>nathan@nathanjms.co.uk</li>
                <li>
                  <a
                    className="footerLogos"
                    href="https://github.com/Nathanjms/"
                  >
                    <FaGithub />
                  </a>
                  <a
                    className="footerLogos"
                    href="https://www.youtube.com/channel/UCWL6DjV5c8oMBhOSzpvilmw"
                  >
                    <FaYoutube />
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col sm={6}>
            <h4 style={{ paddingBottom: "20px" }}>More</h4>
            <div className="contact">
              <ul className="footerList list-unstyled">
                <li>
                  <a href="https://www.nathanjms.co.uk">Go To Main Site</a>
                </li>
                <li>
                  <a href="https://tools.nathanjms.co.uk">Tools</a>
                </li>
                <li>Last updated: 26th March 2022</li>
                <li>
                  Film Images provided by{" "}
                  <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/tmdbLogo.svg"
                      alt="tmdb Logo"
                      style={{ maxHeight: "1rem", maxWidth: "50%" }}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
