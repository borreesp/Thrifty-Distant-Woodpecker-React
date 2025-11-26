import React from 'react'

import Script from 'dangerous-html/react'

import './navigation.css'

const Navigation = (props) => {
  return (
    <div className="navigation-container1">
      <div className="navigation-container2">
        <div className="navigation-container3">
          <Script
            html={`<style>
@media (prefers-reduced-motion: reduce) {
.navigation, .navigation-logo, .navigation-menu-link, .navigation-toggle, .navigation-overlay-close, .navigation-overlay-menu-link {
  transition: none;
}
.navigation-overlay-menu-item {
  animation: none;
  opacity: 1;
  transform: none;
}
.navigation-overlay.active {
  animation: none;
}
}
</style>`}
          ></Script>
        </div>
      </div>
      <nav className="navigation">
        <div className="navigation-container">
          <a href="#">
            <div aria-label="HYBRIDFORCE - Inicio" className="navigation-logo">
              <svg
                width="32"
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 0 24 24"
                className="navigation-logo-icon"
              >
                <path
                  d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829zM2.5 21.5l1.4-1.4M20.1 3.9l1.4-1.4M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829zM9.6 14.4l4.8-4.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="section-title">HYBRIDFORCE</span>
            </div>
          </a>
          <ul className="navigation-menu">
            <li className="navigation-menu-item">
              <a href="#">
                <div className="navigation-menu-link">
                  <span>Comparador</span>
                </div>
              </a>
            </li>
            <li className="navigation-menu-item">
              <a href="#">
                <div className="navigation-menu-link">
                  <span>Analizador WODs</span>
                </div>
              </a>
            </li>
            <li className="navigation-menu-item">
              <a href="#">
                <div className="navigation-menu-link">
                  <span>Material</span>
                </div>
              </a>
            </li>
            <li className="navigation-menu-item">
              <a href="#">
                <div className="navigation-menu-link">
                  <span>Entrenamientos</span>
                </div>
              </a>
            </li>
            <li className="navigation-menu-item">
              <a href="#">
                <div className="navigation-menu-link">
                  <span>Comunidad</span>
                </div>
              </a>
            </li>
          </ul>
          <button
            aria-label="Abrir menú"
            aria-expanded="false"
            className="navigation-toggle"
          >
            <svg
              width="28"
              xmlns="http://www.w3.org/2000/svg"
              height="28"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 5h16M4 12h16M4 19h16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
      <div className="navigation-overlay">
        <div className="navigation-overlay-header">
          <a href="#">
            <div
              aria-label="HYBRIDFORCE - Inicio"
              className="navigation-overlay-logo"
            >
              <svg
                width="32"
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 0 24 24"
                className="navigation-overlay-logo-icon"
              >
                <path
                  d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829zM2.5 21.5l1.4-1.4M20.1 3.9l1.4-1.4M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829zM9.6 14.4l4.8-4.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="section-title">HYBRIDFORCE</span>
            </div>
          </a>
          <button aria-label="Cerrar menú" className="navigation-overlay-close">
            <svg
              width="32"
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="navigation-overlay-menu">
          <li className="navigation-overlay-menu-item">
            <a href="#">
              <div className="navigation-overlay-menu-link">
                <span>Comparador</span>
              </div>
            </a>
          </li>
          <li className="navigation-overlay-menu-item">
            <a href="#">
              <div className="navigation-overlay-menu-link">
                <span>Analizador WODs</span>
              </div>
            </a>
          </li>
          <li className="navigation-overlay-menu-item">
            <a href="#">
              <div className="navigation-overlay-menu-link">
                <span>Material</span>
              </div>
            </a>
          </li>
          <li className="navigation-overlay-menu-item">
            <a href="#">
              <div className="navigation-overlay-menu-link">
                <span>Entrenamientos</span>
              </div>
            </a>
          </li>
          <li className="navigation-overlay-menu-item">
            <a href="#">
              <div className="navigation-overlay-menu-link">
                <span>Comunidad</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div className="navigation-container4">
        <div className="navigation-container5">
          <Script
            html={`<style>
        @keyframes overlayFadeIn {from {opacity: 0;}
to {opacity: 1;}}@keyframes slideInStagger {to {opacity: 1;
transform: translateX(0);}}
        </style> `}
          ></Script>
        </div>
      </div>
      <div className="navigation-container6">
        <div className="navigation-container7">
          <Script
            html={`<script defer data-name="navigation-mobile-menu">
(function(){
  const navigationToggle = document.querySelector(".navigation-toggle")
  const navigationOverlay = document.querySelector(".navigation-overlay")
  const navigationOverlayClose = document.querySelector(
    ".navigation-overlay-close"
  )
  const navigationOverlayLinks = document.querySelectorAll(
    ".navigation-overlay-menu-link"
  )

  function openMenu() {
    navigationOverlay.classList.add("active")
    navigationToggle.setAttribute("aria-expanded", "true")
    document.body.style.overflow = "hidden"
  }

  function closeMenu() {
    navigationOverlay.classList.remove("active")
    navigationToggle.setAttribute("aria-expanded", "false")
    document.body.style.overflow = ""
  }

  navigationToggle.addEventListener("click", openMenu)
  navigationOverlayClose.addEventListener("click", closeMenu)

  navigationOverlayLinks.forEach((link) => {
    link.addEventListener("click", closeMenu)
  })

  navigationOverlay.addEventListener("click", (e) => {
    if (e.target === navigationOverlay) {
      closeMenu()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navigationOverlay.classList.contains("active")) {
      closeMenu()
    }
  })
})()
</script>`}
          ></Script>
        </div>
      </div>
    </div>
  )
}

export default Navigation
