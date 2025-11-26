import React from 'react'

import './footer.css'

const Footer = (props) => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-diagonal-divider"></div>
        <div className="footer-background-image">
          <img
            alt="Athletic training background"
            src="https://images.pexels.com/photos/6253345/pexels-photo-6253345.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=200"
          />
        </div>
        <div className="footer-scrim"></div>
        <div className="footer-content-wrapper">
          <div className="footer-newsletter-section">
            <div className="footer-newsletter-header">
              <div className="footer-icon-wrapper">
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                    <rect x="2" y="4" rx="2" width="20" height="16"></rect>
                  </g>
                </svg>
              </div>
              <h2 className="section-title">Entrena Con Los Mejores</h2>
              <p className="footer-newsletter-subtitle">
                {' '}
                Recibe WODs exclusivos, reviews de equipamiento y consejos de
                rendimiento directamente en tu inbox
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <form
              action="/newsletter"
              method="POST"
              data-form-id="fb08d918-ee66-478a-bf39-2ea2c80540a7"
              className="footer-newsletter-form"
            >
              <div className="footer-form-group">
                <input
                  type="email"
                  id="newsletter-email"
                  name="textinput"
                  required
                  placeholder="tu@email.com"
                  data-form-field-id="newsletter-email"
                  className="footer-input"
                />
                <button
                  id="thq_button_H1Zt"
                  name="button"
                  type="submit"
                  data-form-field-id="thq_button_H1Zt"
                  className="btn btn-accent footer-submit-btn"
                >
                  <span>Suscribirse</span>
                  <svg
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m5 12l7-7l7 7m-7 7V5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
              <p className="footer-form-disclaimer">
                {' '}
                Únete a +10,000 atletas híbridos. Sin spam, solo contenido de
                alto rendimiento.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </form>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-main-content">
            <div className="footer-brand-column">
              <div className="footer-logo">
                <span className="footer-logo-text">HYBRIDFORCE</span>
              </div>
              <p className="footer-tagline">
                {' '}
                La plataforma nº1 para atletas híbridos, CrossFitters y
                deportistas de fitness funcional
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <div className="footer-social-links">
                <a href="#">
                  <div aria-label="Instagram" className="footer-social-link">
                    <svg
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                          width="20"
                          height="20"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01"></path>
                      </g>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div aria-label="Facebook" className="footer-social-link">
                    <svg
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div aria-label="Twitter" className="footer-social-link">
                    <svg
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6c2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4c-.9-4.2 4-6.6 7-3.8c1.1 0 3-1.2 3-1.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div aria-label="YouTube" className="footer-social-link">
                    <svg
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 17a24.1 24.1 0 0 1 0-10a2 2 0 0 1 1.4-1.4a49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10a2 2 0 0 1-1.4 1.4a49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                        <path d="m10 15l5-3l-5-3z"></path>
                      </g>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="footer-links-grid">
              <div className="footer-links-column">
                <h3 className="footer-column-title">Plataforma</h3>
                <ul className="footer-links-list">
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Comparador de Material</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Analizador de WODs</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Reviews de Equipamiento</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Guías de Entrenamiento</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h3 className="footer-column-title">Equipamiento</h3>
                <ul className="footer-links-list">
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Zapatillas Cross-Training</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Calleras y Grips</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Cinturones Funcionales</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Material Hyrox</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h3 className="footer-column-title">Comunidad</h3>
                <ul className="footer-links-list">
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Blog de Atletas</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Foro de Entrenamientos</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Eventos y Competiciones</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Embajadores</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h3 className="footer-column-title">Soporte</h3>
                <ul className="footer-links-list">
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Centro de Ayuda</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Contacto</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>FAQ</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="footer-link">
                        <span>Sobre Nosotros</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                {' '}
                © 2025 HYBRIDFORCE. Todos los derechos reservados.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <div className="footer-legal-links">
                <a href="#">
                  <div className="footer-legal-link">
                    <span>Política de Privacidad</span>
                  </div>
                </a>
                <span className="footer-legal-separator">|</span>
                <a href="#">
                  <div className="footer-legal-link">
                    <span>Términos de Servicio</span>
                  </div>
                </a>
                <span className="footer-legal-separator">|</span>
                <a href="#">
                  <div className="footer-legal-link">
                    <span>Cookies</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
