import React from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'

import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container1">
      <Helmet>
        <title>Thrifty Distant Woodpecker</title>
        <meta property="og:title" content="Thrifty Distant Woodpecker" />
        <link
          rel="canonical"
          href="https://thrifty-distant-woodpecker-ne0gsv.teleporthq.app/"
        />
      </Helmet>
      <Navigation></Navigation>
      <div className="home-container2">
        <div className="home-container3">
          <Script
            html={`<style>
@media (prefers-reduced-motion: reduce) {
.hero-trust, .hero-title, .hero-subtitle, .hero-cta-group, .hero-microcopy {
  animation: none;
}
.features-card:hover, .services-item:hover, .stats-card:hover {
  transform: none;
}
.gallery-card:hover .gallery-card-image img {
  transform: none;
}
}
</style>`}
          ></Script>
        </div>
      </div>
      <div className="hero-section">
        <div className="hero-background">
          <img
            alt="Atleta entrenando con intensidad"
            src="https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-trust">
            <div className="hero-trust-badge">
              <svg
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16"></path>
                  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6"></path>
                </g>
              </svg>
              <span>Plataforma #1 para Atletas Híbridos</span>
            </div>
          </div>
          <h1 className="hero-title home-hero-title">
            <span className="home-hero-title-main">HYBRIDFORCE</span>
            <span className="home-hero-title-sub">
              ENTRENA. COMPARA. DOMINA.
            </span>
          </h1>
          <p className="hero-subtitle home-hero-subtitle">
            {' '}
            La plataforma definitiva para CrossFitters, atletas Hyrox y
            deportistas de fitness funcional. Compara equipamiento, analiza WODs
            y lleva tu rendimiento al siguiente nivel.
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </p>
          <div className="hero-cta-group">
            <button className="btn btn-lg hero-cta-primary btn-primary">
              <svg
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle r="3" cx="18" cy="18"></circle>
                  <circle r="3" cx="6" cy="6"></circle>
                  <path d="M13 6h3a2 2 0 0 1 2 2v7m-7 3H8a2 2 0 0 1-2-2V9"></path>
                </g>
              </svg>
              <span>
                {' '}
                Comparar Productos
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </button>
            <button className="btn btn-lg hero-cta-secondary btn-secondary">
              <svg
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                  <path d="m19 9l-5 5l-4-4l-3 3"></path>
                </g>
              </svg>
              <span>
                {' '}
                Analizar WOD
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </button>
          </div>
          <div className="hero-microcopy">
            <div className="hero-microcopy-item">
              <svg
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span>Comparador de equipamiento profesional</span>
            </div>
            <div className="hero-microcopy-item">
              <svg
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span>Análisis automático de WODs</span>
            </div>
            <div className="hero-microcopy-item">
              <svg
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span>Guías curadas de equipamiento</span>
            </div>
          </div>
        </div>
        <div className="hero-accent-bar"></div>
      </div>
      <div className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="section-title">Herramientas Premium</h2>
            <p className="section-subtitle">
              {' '}
              Acceso directo a las mejores herramientas para optimizar tu
              entrenamiento híbrido
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
          </div>
          <div className="features-grid">
            <div className="features-card-primary features-card">
              <div className="features-card-icon">
                <svg
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle r="3" cx="18" cy="18"></circle>
                    <circle r="3" cx="6" cy="6"></circle>
                    <path d="M13 6h3a2 2 0 0 1 2 2v7m-7 3H8a2 2 0 0 1-2-2V9"></path>
                  </g>
                </svg>
              </div>
              <h3 className="features-card-title">Comparador de Productos</h3>
              <p className="features-card-description">
                {' '}
                Compara zapatillas de cross-training, calleras, cinturones,
                rodilleras y equipamiento Hyrox. Encuentra el mejor material
                para tu rendimiento.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <button className="btn btn-accent features-card-cta">
                Comparar Ahora
              </button>
            </div>
            <div className="features-card-primary features-card">
              <div className="features-card-icon">
                <svg
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                    <path d="m19 9l-5 5l-4-4l-3 3"></path>
                  </g>
                </svg>
              </div>
              <h3 className="features-card-title">Analizador de WODs</h3>
              <p className="features-card-description">
                {' '}
                Evalúa tus entrenamientos automáticamente. Obtén insights
                detallados sobre intensidad, volumen y recomendaciones de
                recuperación.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <button className="btn btn-accent features-card-cta">
                {' '}
                Analizar Workout
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </button>
            </div>
            <div className="features-card">
              <div className="features-card-icon">
                <svg
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="0 0 24 24"
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
              </div>
              <h3 className="features-card-title">Guías de Equipamiento</h3>
              <p className="features-card-description">
                {' '}
                Guías curadas por expertos. Descubre el equipamiento esencial
                para CrossFit, Hyrox y OCR.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <button className="btn features-card-cta btn-outline">
                Ver Guías
              </button>
            </div>
            <div className="features-card">
              <div className="features-card-icon">
                <svg
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle r="10" cx="12" cy="12"></circle>
                    <circle r="6" cx="12" cy="12"></circle>
                    <circle r="2" cx="12" cy="12"></circle>
                  </g>
                </svg>
              </div>
              <h3 className="features-card-title">
                Recomendaciones Personalizadas
              </h3>
              <p className="features-card-description">
                {' '}
                Recibe sugerencias de productos basadas en tu disciplina, nivel
                y objetivos de entrenamiento.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <button className="btn features-card-cta btn-outline">
                Descubrir
              </button>
            </div>
            <div className="features-card">
              <div className="features-card-icon">
                <svg
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h3 className="features-card-title">Métricas de Rendimiento</h3>
              <p className="features-card-description">
                {' '}
                Trackea tu progreso, analiza tendencias y optimiza tu
                programación con datos precisos.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <button className="btn features-card-cta btn-outline">
                Ver Métricas
              </button>
            </div>
            <div className="features-card">
              <div className="features-card-icon">
                <svg
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <circle r="4" cx="9" cy="7"></circle>
                  </g>
                </svg>
              </div>
              <h3 className="features-card-title">Comunidad Híbrida</h3>
              <p className="features-card-description">
                {' '}
                Únete a miles de atletas. Comparte resultados, compara
                equipamiento y mejora juntos.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <button className="btn features-card-cta btn-outline">
                Unirse
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2 className="section-title">Funcionalidades Esenciales</h2>
            <p className="section-subtitle">
              {' '}
              Todo lo que necesitas para tomar decisiones informadas y maximizar
              tu rendimiento
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
          </div>
          <div className="services-grid">
            <div className="services-item">
              <div className="services-item-visual">
                <div className="services-item-icon">
                  <svg
                    width="56"
                    xmlns="http://www.w3.org/2000/svg"
                    height="56"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle r="3" cx="18" cy="18"></circle>
                      <circle r="3" cx="6" cy="6"></circle>
                      <path d="M13 6h3a2 2 0 0 1 2 2v7m-7 3H8a2 2 0 0 1-2-2V9"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="services-item-content">
                <h3 className="services-item-title">
                  Motor de Comparación Avanzado
                </h3>
                <p className="services-item-description">
                  {' '}
                  Compara zapatillas de cross-training, calleras, cinturones y
                  grips lado a lado. Filtros inteligentes por precio, marca,
                  características técnicas y valoraciones de la comunidad.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <ul className="services-item-features">
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Comparación de hasta 4 productos simultáneos
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Filtros por disciplina: CrossFit, Hyrox, OCR
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Análisis de relación calidad-precio
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="services-item">
              <div className="services-item-visual">
                <div className="services-item-icon">
                  <svg
                    width="56"
                    xmlns="http://www.w3.org/2000/svg"
                    height="56"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                      <path d="m19 9l-5 5l-4-4l-3 3"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="services-item-content">
                <h3 className="services-item-title">
                  Analizador de WODs Inteligente
                </h3>
                <p className="services-item-description">
                  {' '}
                  Introduce tu workout y obtén análisis automático de
                  intensidad, volumen, zonas metabólicas y recomendaciones de
                  recuperación. Powered by IA especializada en fitness
                  funcional.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <ul className="services-item-features">
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Scoring automático de intensidad y complejidad
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Identificación de zonas metabólicas dominantes
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Sugerencias de recuperación post-WOD
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="services-item">
              <div className="services-item-visual">
                <div className="services-item-icon">
                  <svg
                    width="56"
                    xmlns="http://www.w3.org/2000/svg"
                    height="56"
                    viewBox="0 0 24 24"
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
                </div>
              </div>
              <div className="services-item-content">
                <h3 className="services-item-title">
                  Guías Curadas de Equipamiento
                </h3>
                <p className="services-item-description">
                  {' '}
                  Accede a guías completas creadas por atletas profesionales y
                  coaches certificados. Desde principiante hasta élite,
                  encuentra el equipamiento ideal para cada disciplina y nivel.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <ul className="services-item-features">
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Top picks por categoría y presupuesto
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Reviews detalladas de productos premium
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Actualizaciones con nuevos lanzamientos
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="services-item">
              <div className="services-item-visual">
                <div className="services-item-icon">
                  <svg
                    width="56"
                    xmlns="http://www.w3.org/2000/svg"
                    height="56"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle r="10" cx="12" cy="12"></circle>
                      <circle r="6" cx="12" cy="12"></circle>
                      <circle r="2" cx="12" cy="12"></circle>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="services-item-content">
                <h3 className="services-item-title">
                  Sistema de Recomendación IA
                </h3>
                <p className="services-item-description">
                  {' '}
                  Nuestro algoritmo aprende de tus preferencias, historial de
                  entrenamientos y objetivos para sugerirte el equipamiento
                  perfecto y los WODs más apropiados para tu nivel.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <ul className="services-item-features">
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Perfiles personalizados por disciplina
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Match inteligente productos-objetivos
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                  <li>
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      {' '}
                      Alertas de ofertas personalizadas
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-section">
        <div className="video-container">
          <div className="video-header">
            <h2 className="section-title">Analizador WOD en Acción</h2>
            <p className="section-subtitle">
              {' '}
              Mira cómo el Analizador evalúa un workout real en segundos
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
          </div>
          <div className="video-wrapper">
            <div id="videoPlayer" className="video-player">
              <video
                src="https://videos.pexels.com/video-files/4761425/4761425-hd_720_1366_25fps.mp4"
                loop="true"
                muted="true"
                autoPlay="true"
                playsInline="true"
                className="video-media"
              ></video>
              <div className="video-overlay-info">
                <div className="video-info-badge">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Análisis en tiempo real</span>
                </div>
              </div>
            </div>
            <div className="video-demo-content">
              <div className="video-demo-card">
                <h3 className="video-demo-title">Ejemplo: &quot;Fran&quot;</h3>
                <div className="video-demo-workout">
                  <p className="video-demo-rounds">21-15-9 reps de:</p>
                  <p className="video-demo-movement">Thrusters (43 kg)</p>
                  <p className="video-demo-movement">Pull-ups</p>
                </div>
                <div className="video-demo-results">
                  <div className="video-demo-metric">
                    <span className="video-demo-label">Intensidad</span>
                    <span className="video-demo-value">Alta (9.2/10)</span>
                  </div>
                  <div className="video-demo-metric">
                    <span className="video-demo-label">Zona Metabólica</span>
                    <span className="video-demo-value">Glucolítica</span>
                  </div>
                  <div className="video-demo-metric">
                    <span className="video-demo-label">Tiempo estimado</span>
                    <span className="video-demo-value">4-8 min</span>
                  </div>
                  <div className="video-demo-metric">
                    <span className="video-demo-label">Recuperación</span>
                    <span className="video-demo-value">48-72h</span>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary video-demo-cta">
                  {' '}
                  Analiza tu WOD ahora
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gallery-section">
        <div className="gallery-header">
          <h2 className="section-title">Productos Destacados</h2>
          <p className="section-subtitle">
            {' '}
            Los mejores productos de cross-training según nuestra comunidad
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </p>
        </div>
        <div className="gallery-spotlight">
          <div id="galleryTrack" className="gallery-track">
            <div className="gallery-card-featured gallery-card">
              <div className="gallery-card-image">
                <img
                  alt="Zapatillas CrossFit Pro"
                  src="https://images.pexels.com/photos/32573999/pexels-photo-32573999.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-card-content">
                <div className="gallery-card-badge">
                  <span>Más Votado</span>
                </div>
                <h3 className="gallery-card-title">
                  Zapatillas CrossFit Pro Elite
                </h3>
                <p className="gallery-card-category">Cross-Training Shoes</p>
                <div className="gallery-card-rating">
                  <span className="gallery-card-score">9.4/10</span>
                  <span className="gallery-card-reviews">1,247 reviews</span>
                </div>
                <button className="btn btn-accent gallery-card-cta">
                  {' '}
                  Ver Comparación
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </button>
              </div>
            </div>
            <div className="gallery-card">
              <div className="gallery-card-image">
                <img
                  alt="Calleras Professional Grip"
                  src="https://images.pexels.com/photos/6676731/pexels-photo-6676731.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-card-content">
                <h3 className="gallery-card-title">
                  Calleras Professional Grip
                </h3>
                <p className="gallery-card-category">Hand Protection</p>
                <div className="gallery-card-rating">
                  <span className="gallery-card-score">9.1/10</span>
                  <span className="gallery-card-reviews">892 reviews</span>
                </div>
                <button className="btn gallery-card-cta btn-outline">
                  Ver Detalles
                </button>
              </div>
            </div>
            <div className="gallery-card">
              <div className="gallery-card-image">
                <img
                  alt="Kit Completo Funcional"
                  src="https://images.pexels.com/photos/6740822/pexels-photo-6740822.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-card-content">
                <h3 className="gallery-card-title">Kit Completo Funcional</h3>
                <p className="gallery-card-category">Full Equipment Set</p>
                <div className="gallery-card-rating">
                  <span className="gallery-card-score">9.6/10</span>
                  <span className="gallery-card-reviews">2,104 reviews</span>
                </div>
                <button className="btn gallery-card-cta btn-outline">
                  Ver Detalles
                </button>
              </div>
            </div>
            <div className="gallery-card">
              <div className="gallery-card-image">
                <img
                  alt="Wearables de Rendimiento"
                  src="https://images.pexels.com/photos/3927389/pexels-photo-3927389.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-card-content">
                <h3 className="gallery-card-title">Wearables de Rendimiento</h3>
                <p className="gallery-card-category">Tech &amp; Tracking</p>
                <div className="gallery-card-rating">
                  <span className="gallery-card-score">8.9/10</span>
                  <span className="gallery-card-reviews">678 reviews</span>
                </div>
                <button className="btn gallery-card-cta btn-outline">
                  Ver Detalles
                </button>
              </div>
            </div>
            <div className="gallery-card">
              <div className="gallery-card-image">
                <img
                  alt="Accesorios Especializados"
                  src="https://images.pexels.com/photos/8028343/pexels-photo-8028343.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-card-content">
                <h3 className="gallery-card-title">
                  Accesorios Especializados
                </h3>
                <p className="gallery-card-category">Specialized Gear</p>
                <div className="gallery-card-rating">
                  <span className="gallery-card-score">9.0/10</span>
                  <span className="gallery-card-reviews">543 reviews</span>
                </div>
                <button className="btn gallery-card-cta btn-outline">
                  Ver Detalles
                </button>
              </div>
            </div>
            <div className="gallery-card">
              <div className="gallery-card-image">
                <img
                  alt="Equipamiento Escalada Funcional"
                  src="https://images.pexels.com/photos/5383733/pexels-photo-5383733.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-card-content">
                <h3 className="gallery-card-title">Equipamiento OCR</h3>
                <p className="gallery-card-category">Obstacle Racing</p>
                <div className="gallery-card-rating">
                  <span className="gallery-card-score">8.8/10</span>
                  <span className="gallery-card-reviews">421 reviews</span>
                </div>
                <button className="btn gallery-card-cta btn-outline">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
          <div className="gallery-controls">
            <button id="galleryPrev" className="gallery-nav gallery-nav-prev">
              <svg
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 12H5m7-7l-7 7l7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <button id="galleryNext" className="gallery-nav gallery-nav-next">
              <svg
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14m-7-7l7 7l-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="stats-section">
        <div className="stats-container">
          <div className="stats-header">
            <h2 className="section-title">Impacto de la Comunidad</h2>
            <p className="section-subtitle">
              {' '}
              Números que demuestran nuestra credibilidad y el compromiso de la
              comunidad HYBRIDFORCE
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
          </div>
          <div className="stats-grid">
            <div className="stats-card">
              <div className="stats-card-icon">
                <svg
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <circle r="4" cx="9" cy="7"></circle>
                  </g>
                </svg>
              </div>
              <div className="stats-card-number">
                <span>47,500+</span>
              </div>
              <div className="stats-card-label">
                <span>Atletas Activos</span>
              </div>
              <p className="stats-card-description">
                {' '}
                Comunidad global de CrossFitters, Hyrox y OCR
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <div className="stats-card">
              <div className="stats-card-icon">
                <svg
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="stats-card-number">
                <span>128,300+</span>
              </div>
              <div className="stats-card-label">
                <span>WODs Analizados</span>
              </div>
              <p className="stats-card-description">
                {' '}
                Entrenamientos evaluados con precisión IA
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <div className="stats-card">
              <div className="stats-card-icon">
                <svg
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle r="3" cx="18" cy="18"></circle>
                    <circle r="3" cx="6" cy="6"></circle>
                    <path d="M13 6h3a2 2 0 0 1 2 2v7m-7 3H8a2 2 0 0 1-2-2V9"></path>
                  </g>
                </svg>
              </div>
              <div className="stats-card-number">
                <span>2,400+</span>
              </div>
              <div className="stats-card-label">
                <span>Productos Comparados</span>
              </div>
              <p className="stats-card-description">
                {' '}
                Zapatillas, calleras, cinturones y más
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <div className="stats-card stats-card-testimonial">
              <div className="stats-testimonial-quote">
                <svg
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 17h3l2-4V7H5v6h3m8 4h3l2-4V7h-6v6h3"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <p className="stats-testimonial-text">
                {' '}
                &quot;HYBRIDFORCE cambió mi forma de entrenar. El analizador de
                WODs me ayuda a programar mejor y evitar
                sobreentrenamiento.&quot;
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <div className="stats-testimonial-author">
                <strong>Carlos M.</strong>
                <span>Atleta Hyrox Elite</span>
              </div>
            </div>
            <div className="stats-card stats-card-testimonial">
              <div className="stats-testimonial-quote">
                <svg
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 17h3l2-4V7H5v6h3m8 4h3l2-4V7h-6v6h3"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <p className="stats-testimonial-text">
                {' '}
                &quot;Encontré las mejores zapatillas para mi pie gracias al
                comparador. Ahorré tiempo y dinero en prueba y error.&quot;
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <div className="stats-testimonial-author">
                <strong>Laura G.</strong>
                <span>CrossFit Coach</span>
              </div>
            </div>
            <div className="stats-card stats-card-testimonial">
              <div className="stats-testimonial-quote">
                <svg
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 17h3l2-4V7H5v6h3m8 4h3l2-4V7h-6v6h3"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <p className="stats-testimonial-text">
                {' '}
                &quot;La plataforma más completa para atletas híbridos.
                Herramientas profesionales con diseño increíble.&quot;
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <div className="stats-testimonial-author">
                <strong>Miguel R.</strong>
                <span>OCR Competitor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cta-section">
        <div className="cta-container">
          <div className="cta-card">
            <div className="cta-content">
              <div className="cta-icon">
                <svg
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h2 className="cta-title section-title">
                Únete a la Revolución Híbrida
              </h2>
              <p className="section-subtitle cta-subtitle">
                {' '}
                Accede a todas las herramientas premium, comparaciones
                ilimitadas y análisis de WODs sin restricciones.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <div className="cta-features">
                <div className="cta-feature-item">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Comparaciones ilimitadas</span>
                </div>
                <div className="cta-feature-item">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Análisis WOD sin límites</span>
                </div>
                <div className="cta-feature-item">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Alertas de productos exclusivas</span>
                </div>
                <div className="cta-feature-item">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Soporte prioritario</span>
                </div>
              </div>
              <form
                action="/signup"
                method="POST"
                data-form-id="e97ca1c5-1252-4e87-a27c-ea1f1a760b9f"
                className="cta-form"
              >
                <input
                  type="email"
                  id="thq_textinput_slqW"
                  name="textinput"
                  required="true"
                  placeholder="tu@email.com"
                  data-form-field-id="thq_textinput_slqW"
                  className="cta-input"
                />
                <button
                  id="thq_button_o5DZ"
                  name="button"
                  type="submit"
                  data-form-field-id="thq_button_o5DZ"
                  className="btn cta-button btn-xl btn-primary"
                >
                  {' '}
                  Comenzar Gratis
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </button>
              </form>
              <p className="cta-microcopy">
                {' '}
                Sin tarjeta de crédito. Acceso completo 14 días.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <div className="cta-visual">
              <img
                alt="Atleta entrenando"
                src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                className="cta-image"
              />
              <div className="cta-accent-shape"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-container4">
        <div className="home-container5">
          <Script
            html={`<style>
        @keyframes slideDown {from {opacity: 0;
transform: translateY(-30px);}
to {opacity: 1;
transform: translateY(0);}}@keyframes slideUp {from {opacity: 0;
transform: translateY(30px);}
to {opacity: 1;
transform: translateY(0);}}@keyframes fadeIn {from {opacity: 0;}
to {opacity: 1;}}
        </style> `}
          ></Script>
        </div>
      </div>
      <div className="home-container6">
        <div className="home-container7">
          <Script
            html={`<script defer data-name="gallery-carousel">
(function(){
  const galleryTrack = document.getElementById("galleryTrack")
  const prevBtn = document.getElementById("galleryPrev")
  const nextBtn = document.getElementById("galleryNext")

  if (galleryTrack && prevBtn && nextBtn) {
    const scrollAmount = 380

    nextBtn.addEventListener("click", () => {
      galleryTrack.scrollBy({ left: scrollAmount, behavior: "smooth" })
    })

    prevBtn.addEventListener("click", () => {
      galleryTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    })
  }
})()
</script>`}
          ></Script>
        </div>
      </div>
      <Footer></Footer>
      <a href="https://play.teleporthq.io/signup">
        <div aria-label="Sign up to TeleportHQ" className="home-container8">
          <svg
            width="24"
            height="24"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="home-icon214"
          >
            <path
              d="M9.1017 4.64355H2.17867C0.711684 4.64355 -0.477539 5.79975 -0.477539 7.22599V13.9567C-0.477539 15.3829 0.711684 16.5391 2.17867 16.5391H9.1017C10.5687 16.5391 11.7579 15.3829 11.7579 13.9567V7.22599C11.7579 5.79975 10.5687 4.64355 9.1017 4.64355Z"
              fill="#B23ADE"
            ></path>
            <path
              d="M10.9733 12.7878C14.4208 12.7878 17.2156 10.0706 17.2156 6.71886C17.2156 3.3671 14.4208 0.649963 10.9733 0.649963C7.52573 0.649963 4.73096 3.3671 4.73096 6.71886C4.73096 10.0706 7.52573 12.7878 10.9733 12.7878Z"
              fill="#FF5C5C"
            ></path>
            <path
              d="M17.7373 13.3654C19.1497 14.1588 19.1497 15.4634 17.7373 16.2493L10.0865 20.5387C8.67402 21.332 7.51855 20.6836 7.51855 19.0968V10.5141C7.51855 8.92916 8.67402 8.2807 10.0865 9.07221L17.7373 13.3654Z"
              fill="#2874DE"
            ></path>
          </svg>
          <span className="home-text46">Built in TeleportHQ</span>
        </div>
      </a>
    </div>
  )
}

export default Home
