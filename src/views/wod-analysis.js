import React from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'

import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './wod-analysis.css'

const WODAnalysis = (props) => {
  return (
    <div className="wod-analysis-container1">
      <Helmet>
        <title>WOD-Analysis - Thrifty Distant Woodpecker</title>
        <meta
          property="og:title"
          content="WOD-Analysis - Thrifty Distant Woodpecker"
        />
        <link
          rel="canonical"
          href="https://thrifty-distant-woodpecker-ne0gsv.teleporthq.app/wod-analysis"
        />
      </Helmet>
      <Navigation></Navigation>
      <section className="hero-wod">
        <div className="hero-wod-background">
          <img
            alt="Atleta realizando deadlift en gimnasio"
            src="https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
            className="hero-wod-image"
          />
          <div className="hero-wod-overlay"></div>
        </div>
        <div className="hero-wod-content">
          <div className="hero-wod-container">
            <div className="hero-wod-text">
              <h1 className="hero-title">
                <span>
                  {' '}
                  ANÁLISIS
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <br></br>
                <span>
                  {' '}
                  DE WOD
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </h1>
              <p className="hero-subtitle">
                {' '}
                Evaluación inteligente con IA para atletas híbridos. Optimiza
                cada entrenamiento, maximiza tu rendimiento.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
              <div className="hero-wod-actions">
                <button className="btn btn-accent btn-lg">
                  Analizar WOD Ahora
                </button>
                <button className="btn btn-lg btn-outline">Ver Demo</button>
              </div>
            </div>
            <div className="hero-wod-stats">
              <div className="hero-wod-stat">
                <span className="hero-wod-stat-number">98%</span>
                <span className="hero-wod-stat-label">Precisión</span>
              </div>
              <div className="hero-wod-stat">
                <span className="hero-wod-stat-number">15K+</span>
                <span className="hero-wod-stat-label">WODs Analizados</span>
              </div>
              <div className="hero-wod-stat">
                <span className="hero-wod-stat-number">2.3x</span>
                <span className="hero-wod-stat-label">Mejora Media</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="features-wod">
        <div className="features-wod-container">
          <div className="features-wod-grid">
            <div className="features-wod-card">
              <div className="features-wod-icon">
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
                    <path d="M12 18V5m3 8a4.17 4.17 0 0 1-3-4a4.17 4.17 0 0 1-3 4m8.598-6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"></path>
                    <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"></path>
                    <path d="M18 18a4 4 0 0 0 2-7.464"></path>
                    <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"></path>
                    <path d="M6 18a4 4 0 0 1-2-7.464"></path>
                    <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"></path>
                  </g>
                </svg>
              </div>
              <h2 className="section-title">Evaluación con IA</h2>
              <p className="section-content">
                {' '}
                Algoritmos avanzados de machine learning analizan cada
                componente de tu WOD: movimientos, volumen, intensidad y balance
                metabólico para ofrecerte insights precisos y accionables.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <div className="features-wod-card">
              <div className="features-wod-icon">
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
                    <circle r="10" cx="12" cy="12"></circle>
                    <circle r="6" cx="12" cy="12"></circle>
                    <circle r="2" cx="12" cy="12"></circle>
                  </g>
                </svg>
              </div>
              <h2 className="section-title">Optimización Personalizada</h2>
              <p className="section-content">
                {' '}
                Recibe recomendaciones específicas basadas en tu perfil
                atlético, objetivos y nivel de rendimiento. Ajusta cargas,
                tiempos de descanso y selección de ejercicios para maximizar
                resultados.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <div className="features-wod-card">
              <div className="features-wod-icon">
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
              <h2 className="section-title">Métricas en Tiempo Real</h2>
              <p className="section-content">
                {' '}
                Visualiza puntuaciones de dificultad, estimación de tiempo,
                demanda energética y compatibilidad con tu equipamiento. Datos
                actualizados instantáneamente para decisiones informadas.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="process-wod">
        <div className="process-wod-container">
          <h2 className="section-title process-wod-heading">
            Cómo Funciona el Análisis
          </h2>
          <p className="process-wod-intro section-content">
            {' '}
            Cuatro pasos para transformar tus entrenamientos
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </p>
          <div className="process-wod-tabs">
            <button
              data-tab="1"
              className="process-wod-tab process-wod-tab-active"
            >
              <span className="wod-analysis-process-wod-tab-number1">01</span>
              <span className="wod-analysis-process-wod-tab-title1">
                Entrada de WOD
              </span>
            </button>
            <button data-tab="2" className="process-wod-tab">
              <span className="wod-analysis-process-wod-tab-number2">02</span>
              <span className="wod-analysis-process-wod-tab-title2">
                Análisis Automático
              </span>
            </button>
            <button data-tab="3" className="process-wod-tab">
              <span className="wod-analysis-process-wod-tab-number3">03</span>
              <span className="wod-analysis-process-wod-tab-title3">
                Insights Profundos
              </span>
            </button>
            <button data-tab="4" className="process-wod-tab">
              <span className="wod-analysis-process-wod-tab-number4">04</span>
              <span className="wod-analysis-process-wod-tab-title4">
                Recomendaciones
              </span>
            </button>
          </div>
          <div className="process-wod-content">
            <div
              data-panel="1"
              className="process-wod-panel-active process-wod-panel"
            >
              <div className="process-wod-panel-grid">
                <div className="process-wod-panel-text">
                  <div className="process-wod-icon">
                    <svg
                      width="64"
                      xmlns="http://www.w3.org/2000/svg"
                      height="64"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="process-wod-panel-title">
                    Introduce tu Entrenamiento
                  </h3>
                  <p className="section-content">
                    {' '}
                    Escribe o pega tu WOD directamente en el analizador. También
                    puedes seleccionar de nuestra biblioteca de entrenamientos
                    populares de CrossFit, HYROX, y funcional.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </p>
                  <ul className="process-wod-list">
                    <li className="process-wod-list-item">
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
                      <span>Formato libre o estructurado</span>
                    </li>
                    <li className="process-wod-list-item">
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
                      <span>Biblioteca de 500+ WODs</span>
                    </li>
                    <li className="process-wod-list-item">
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
                      <span>Importación desde apps</span>
                    </li>
                  </ul>
                </div>
                <div className="process-wod-panel-visual">
                  <img
                    alt="Atletas entrenando en gimnasio"
                    src="https://images.pexels.com/photos/6388386/pexels-photo-6388386.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                  />
                </div>
              </div>
            </div>
            <div data-panel="2" className="process-wod-panel">
              <div className="process-wod-panel-grid">
                <div className="process-wod-panel-text">
                  <div className="process-wod-icon">
                    <svg
                      width="64"
                      xmlns="http://www.w3.org/2000/svg"
                      height="64"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2m-8-4v-5m3 5v-1m3 1v-3"></path>
                      </g>
                    </svg>
                  </div>
                  <h3 className="process-wod-panel-title">
                    Procesamiento Inteligente
                  </h3>
                  <p className="section-content">
                    {' '}
                    Nuestra IA identifica automáticamente movimientos,
                    estructura del entrenamiento, modalidades metabólicas y
                    requisitos de equipamiento en segundos.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </p>
                  <ul className="process-wod-list">
                    <li className="process-wod-list-item">
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
                      <span>Reconocimiento de ejercicios</span>
                    </li>
                    <li className="process-wod-list-item">
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
                      <span>Cálculo de volumen total</span>
                    </li>
                    <li className="process-wod-list-item">
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
                      <span>Análisis de intensidad</span>
                    </li>
                  </ul>
                </div>
                <div className="process-wod-panel-visual">
                  <img
                    alt="Atleta levantando barra en gimnasio"
                    src="https://images.pexels.com/photos/1092874/pexels-photo-1092874.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                  />
                </div>
              </div>
            </div>
            <div data-panel="3" className="process-wod-panel">
              <div className="process-wod-panel-grid">
                <div className="process-wod-panel-text">
                  <div className="process-wod-icon">
                    <svg
                      width="64"
                      xmlns="http://www.w3.org/2000/svg"
                      height="64"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M15 14c.2-1 .7-1.7 1.5-2.5c1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5c.7.7 1.3 1.5 1.5 2.5m0 4h6m-5 4h4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="process-wod-panel-title">
                    Evaluación Completa
                  </h3>
                  <p className="section-content">
                    {' '}
                    Obtén puntuaciones detalladas de dificultad técnica, demanda
                    cardiovascular, carga muscular, y balance entre modalidades
                    gimnásticas, metabólicas y de levantamiento.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </p>
                  <ul className="process-wod-list">
                    <li className="process-wod-list-item">
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
                      <span>Score de dificultad 1-10</span>
                    </li>
                    <li className="process-wod-list-item">
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
                      <span>Estimación de tiempo</span>
                    </li>
                    <li className="process-wod-list-item">
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
                      <span>Distribución energética</span>
                    </li>
                  </ul>
                </div>
                <div className="process-wod-panel-visual">
                  <img
                    alt="Atleta haciendo push-ups"
                    src="https://images.pexels.com/photos/6388382/pexels-photo-6388382.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                  />
                </div>
              </div>
            </div>
            <div data-panel="4" className="process-wod-panel">
              <div className="process-wod-panel-grid">
                <div className="process-wod-panel-text">
                  <div className="process-wod-icon">
                    <svg
                      width="64"
                      xmlns="http://www.w3.org/2000/svg"
                      height="64"
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
                  </div>
                  <h3 className="process-wod-panel-title">Plan de Acción</h3>
                  <p className="section-content">
                    {' '}
                    Recibe estrategias de pacing, escalamientos recomendados,
                    sugerencias de equipamiento óptimo y modificaciones
                    adaptadas a tu nivel de rendimiento actual.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </p>
                  <ul className="process-wod-list">
                    <li className="process-wod-list-item">
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
                      <span>Estrategia de ritmo</span>
                    </li>
                    <li className="process-wod-list-item">
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
                      <span>Equipo recomendado</span>
                    </li>
                    <li className="process-wod-list-item">
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
                      <span>Escalamientos personalizados</span>
                    </li>
                  </ul>
                </div>
                <div className="process-wod-panel-visual">
                  <img
                    alt="Atleta en anillas gimnásticas"
                    src="https://images.pexels.com/photos/14913358/pexels-photo-14913358.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gallery-wod">
        <div className="gallery-wod-background">
          <div className="gallery-wod-overlay"></div>
        </div>
        <div className="gallery-wod-content">
          <div className="gallery-wod-header">
            <h2 className="section-title">Equipamiento Compatible</h2>
            <p className="section-content">
              {' '}
              Material deportivo evaluado y optimizado para máximo rendimiento
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
          </div>
          <div className="gallery-wod-grid">
            <div className="gallery-wod-card-spotlight gallery-wod-card">
              <div className="gallery-wod-card-image">
                <img
                  alt="Zapatillas de cross-training"
                  src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-wod-card-content">
                <div className="gallery-wod-card-badge">
                  <span>MEJOR VALORADO</span>
                </div>
                <h3 className="gallery-wod-card-title">
                  {' '}
                  Zapatillas Cross-Training Elite
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </h3>
                <p className="gallery-wod-card-description">
                  {' '}
                  Estabilidad superior para levantamientos pesados y movilidad
                  para cardio intenso
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <div className="gallery-wod-card-rating">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="gallery-wod-card-score">9.8/10</span>
                  <span className="gallery-wod-card-reviews">
                    1,240 reviews
                  </span>
                </div>
                <div className="gallery-wod-card-features">
                  <span className="gallery-wod-card-feature">
                    WOD Compatible
                  </span>
                  <span className="gallery-wod-card-feature">
                    HYROX Certified
                  </span>
                </div>
              </div>
            </div>
            <div className="gallery-wod-card">
              <div className="gallery-wod-card-image">
                <img
                  alt="Rodilleras deportivas"
                  src="https://images.pexels.com/photos/19882424/pexels-photo-19882424.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-wod-card-content">
                <h3 className="gallery-wod-card-title">Rodilleras Pro</h3>
                <p className="gallery-wod-card-description">
                  {' '}
                  Soporte óptimo sin comprometer movilidad
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <div className="gallery-wod-card-rating">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="gallery-wod-card-score">9.3/10</span>
                </div>
              </div>
            </div>
            <div className="gallery-wod-card">
              <div className="gallery-wod-card-image">
                <img
                  alt="Calleras gimnásticas"
                  src="https://images.pexels.com/photos/29699313/pexels-photo-29699313.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-wod-card-content">
                <h3 className="gallery-wod-card-title">Calleras Gymnastic</h3>
                <p className="gallery-wod-card-description">
                  {' '}
                  Agarre seguro para pull-ups y muscle-ups
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <div className="gallery-wod-card-rating">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="gallery-wod-card-score">9.5/10</span>
                </div>
              </div>
            </div>
            <div className="gallery-wod-card">
              <div className="gallery-wod-card-image">
                <img
                  alt="Cinturón de levantamiento"
                  src="https://images.pexels.com/photos/6740822/pexels-photo-6740822.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-wod-card-content">
                <h3 className="gallery-wod-card-title">Cinturón Lifting Pro</h3>
                <p className="gallery-wod-card-description">
                  {' '}
                  Estabilización lumbar en levantamientos
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <div className="gallery-wod-card-rating">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="gallery-wod-card-score">9.6/10</span>
                </div>
              </div>
            </div>
            <div className="gallery-wod-card">
              <div className="gallery-wod-card-image">
                <img
                  alt="Grips para barra"
                  src="https://images.pexels.com/photos/22745630/pexels-photo-22745630.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-wod-card-content">
                <h3 className="gallery-wod-card-title">Grips Carbon Fiber</h3>
                <p className="gallery-wod-card-description">
                  {' '}
                  Protección manos en altos volúmenes
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <div className="gallery-wod-card-rating">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="gallery-wod-card-score">9.4/10</span>
                </div>
              </div>
            </div>
            <div className="gallery-wod-card">
              <div className="gallery-wod-card-image">
                <img
                  alt="Kit HYROX completo"
                  src="https://images.pexels.com/photos/179908/pexels-photo-179908.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                />
              </div>
              <div className="gallery-wod-card-content">
                <h3 className="gallery-wod-card-title">Kit HYROX Complete</h3>
                <p className="gallery-wod-card-description">
                  {' '}
                  Pack completo para competiciones
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
                <div className="gallery-wod-card-rating">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="gallery-wod-card-score">9.7/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="stats-wod">
        <div className="stats-wod-background">
          <div className="stats-wod-gradient"></div>
        </div>
        <div className="stats-wod-content">
          <div className="stats-wod-grid">
            <div className="stats-wod-card">
              <div className="stats-wod-icon">
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
                    <circle r="10" cx="12" cy="12"></circle>
                    <circle r="6" cx="12" cy="12"></circle>
                    <circle r="2" cx="12" cy="12"></circle>
                  </g>
                </svg>
              </div>
              <div className="stats-wod-number">
                <span>98.4%</span>
              </div>
              <div className="stats-wod-label">
                <span>Precisión de Análisis</span>
              </div>
              <p className="stats-wod-description">
                {' '}
                Validado por atletas profesionales y entrenadores certificados
                en 15,000+ entrenamientos
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <div className="stats-wod-card">
              <div className="stats-wod-icon">
                <svg
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
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
              </div>
              <div className="stats-wod-number">
                <span>+127%</span>
              </div>
              <div className="stats-wod-label">
                <span>Mejora en Rendimiento</span>
              </div>
              <p className="stats-wod-description">
                {' '}
                Incremento promedio en métricas de fuerza, resistencia y tiempo
                en atletas que usan análisis
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <div className="stats-wod-card">
              <div className="stats-wod-icon">
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
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16"></path>
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6"></path>
                  </g>
                </svg>
              </div>
              <div className="stats-wod-number">
                <span>4.9/5</span>
              </div>
              <div className="stats-wod-label">
                <span>Satisfacción de Usuario</span>
              </div>
              <p className="stats-wod-description">
                {' '}
                Más de 8,500 atletas activos confían en HYBRIDFORCE para
                optimizar sus entrenamientos
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="video-wod">
        <div className="video-wod-container">
          <video
            src="https://videos.pexels.com/video-files/5320011/5320011-hd_1080_1920_25fps.mp4"
            loop="true"
            muted="true"
            poster="https://images.pexels.com/videos/5320011/pictures/preview-0.jpeg"
            autoPlay="true"
            playsInline="true"
            className="video-wod-player"
          ></video>
          <div className="video-wod-overlay"></div>
          <div className="video-wod-content">
            <button aria-label="Reproducir video" className="video-wod-play">
              <svg
                width="64"
                xmlns="http://www.w3.org/2000/svg"
                height="64"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <h2 className="section-title">WOD Analysis en Acción</h2>
            <p className="section-content">
              {' '}
              Descubre cómo atletas profesionales utilizan nuestra plataforma
              para maximizar resultados
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
          </div>
        </div>
      </section>
      <section className="cta-wod">
        <div className="cta-wod-background">
          <img
            alt="Atleta entrenando con intensidad"
            src="https://images.pexels.com/photos/3112004/pexels-photo-3112004.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
            className="cta-wod-image"
          />
          <div className="cta-wod-overlay"></div>
        </div>
        <div className="cta-wod-content">
          <div className="cta-wod-featured">
            <h2 className="section-title">
              Lleva tu Entrenamiento al Siguiente Nivel
            </h2>
            <p className="section-content">
              {' '}
              Únete a más de 8,500 atletas híbridos que optimizan cada WOD con
              análisis inteligente. Prueba gratis durante 14 días, sin tarjeta
              de crédito.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
            <div className="cta-wod-actions">
              <button className="btn btn-accent btn-xl">
                Comenzar Análisis Gratis
              </button>
              <button className="btn btn-xl btn-outline">
                Solicitar Demo en Vivo
              </button>
            </div>
            <div className="cta-wod-benefits">
              <div className="cta-wod-benefit">
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
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
                <span>14 días gratis</span>
              </div>
              <div className="cta-wod-benefit">
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
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
                <span>Sin tarjeta requerida</span>
              </div>
              <div className="cta-wod-benefit">
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
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
                <span>Cancela cuando quieras</span>
              </div>
            </div>
          </div>
          <div className="cta-wod-secondary">
            <div className="cta-wod-card">
              <div className="cta-wod-card-icon">
                <svg
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 18V5m3 8a4.17 4.17 0 0 1-3-4a4.17 4.17 0 0 1-3 4m8.598-6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"></path>
                    <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"></path>
                    <path d="M18 18a4 4 0 0 0 2-7.464"></path>
                    <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"></path>
                    <path d="M6 18a4 4 0 0 1-2-7.464"></path>
                    <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"></path>
                  </g>
                </svg>
              </div>
              <h3 className="cta-wod-card-title">IA Avanzada</h3>
              <p className="cta-wod-card-text">
                Análisis profundo con machine learning
              </p>
            </div>
            <div className="cta-wod-card">
              <div className="cta-wod-card-icon">
                <svg
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
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
              <h3 className="cta-wod-card-title">Progreso Medible</h3>
              <p className="cta-wod-card-text">
                Tracking completo de rendimiento
              </p>
            </div>
            <div className="cta-wod-card">
              <div className="cta-wod-card-icon">
                <svg
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
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
              <h3 className="cta-wod-card-title">Personalización Total</h3>
              <p className="cta-wod-card-text">
                Adaptado a tu nivel y objetivos
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="about-wod">
        <div className="about-wod-container">
          <div className="about-wod-header">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <p className="section-content">
              {' '}
              Todo lo que necesitas saber sobre WOD Analysis
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
          </div>
          <div className="about-wod-carousel">
            <button
              aria-label="Anterior"
              className="about-wod-arrow about-wod-arrow-prev"
            >
              <svg
                width="32"
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  d="m15 18l-6-6l6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <div className="about-wod-track">
              <div className="about-wod-slide about-wod-slide-active">
                <div className="about-wod-card">
                  <h3 className="about-wod-question">
                    {' '}
                    ¿Cómo funciona la evaluación con IA?
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </h3>
                  <p className="section-content">
                    {' '}
                    Nuestra IA analiza más de 50 parámetros de tu WOD incluyendo
                    movimientos, volumen, intensidad, balance metabólico y
                    requisitos técnicos. Utiliza algoritmos de machine learning
                    entrenados con más de 100,000 entrenamientos de atletas de
                    élite y proporciona puntuaciones precisas y recomendaciones
                    personalizadas en segundos.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="about-wod-slide">
                <div className="about-wod-card">
                  <h3 className="about-wod-question">
                    {' '}
                    ¿Mis datos de entrenamiento están seguros?
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </h3>
                  <p className="section-content">
                    {' '}
                    Absolutamente. Utilizamos encriptación de nivel bancario
                    (AES-256) para todos tus datos. Nunca compartimos tu
                    información con terceros. Tus entrenamientos, métricas y
                    progreso son 100% privados. Cumplimos con GDPR y estándares
                    internacionales de privacidad. Puedes exportar o eliminar
                    tus datos en cualquier momento.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="about-wod-slide">
                <div className="about-wod-card">
                  <h3 className="about-wod-question">
                    {' '}
                    ¿El análisis es compatible con todo tipo de WODs?
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </h3>
                  <p className="section-content">
                    {' '}
                    Sí. Analizamos CrossFit, HYROX, entrenamientos funcionales,
                    OCR, y combinaciones híbridas. Reconocemos más de 500
                    movimientos diferentes: gimnásticos, levantamientos
                    olímpicos, powerlifting, cardio metabólico y ejercicios
                    funcionales. Si es un entrenamiento estructurado, podemos
                    analizarlo.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="about-wod-slide">
                <div className="about-wod-card">
                  <h3 className="about-wod-question">
                    {' '}
                    ¿Cómo se integra con mi equipamiento actual?
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </h3>
                  <p className="section-content">
                    {' '}
                    El análisis incluye recomendaciones de equipamiento óptimo
                    basadas en los movimientos de tu WOD. Evaluamos
                    compatibilidad con zapatillas, cinturones, rodilleras,
                    calleras y grips. También proporcionamos alternativas si no
                    tienes cierto equipamiento. Nuestras recomendaciones están
                    validadas por atletas profesionales.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="about-wod-slide">
                <div className="about-wod-card">
                  <h3 className="about-wod-question">
                    {' '}
                    ¿Puedo usar el análisis para programar entrenamientos?
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </h3>
                  <p className="section-content">
                    {' '}
                    Definitivamente. El análisis es ideal para coaches y atletas
                    que programan sus propios entrenamientos. Te ayudamos a
                    equilibrar volumen, intensidad y recuperación. Puedes
                    analizar sesiones individuales o ciclos completos de
                    entrenamiento. Identificamos sobrecargas, desequilibrios
                    musculares y optimizamos tu periodización.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
            <button
              aria-label="Siguiente"
              className="about-wod-arrow-next about-wod-arrow"
            >
              <svg
                width="32"
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  d="m9 18l6-6l-6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <div className="about-wod-indicators">
            <button
              aria-label="Diapositiva 1"
              data-slide="0"
              className="about-wod-indicator-active about-wod-indicator"
            ></button>
            <button
              aria-label="Diapositiva 2"
              data-slide="1"
              className="about-wod-indicator"
            ></button>
            <button
              aria-label="Diapositiva 3"
              data-slide="2"
              className="about-wod-indicator"
            ></button>
            <button
              aria-label="Diapositiva 4"
              data-slide="3"
              className="about-wod-indicator"
            ></button>
            <button
              aria-label="Diapositiva 5"
              data-slide="4"
              className="about-wod-indicator"
            ></button>
          </div>
        </div>
      </section>
      <div className="wod-analysis-container2">
        <div className="wod-analysis-container3">
          <Script
            html={`<style>
        @keyframes fadeIn {from {opacity: 0;
transform: translateY(20px);}
to {opacity: 1;
transform: translateY(0);}}@keyframes slideIn {from {opacity: 0;
transform: translateX(40px);}
to {opacity: 1;
transform: translateX(0);}}
        </style> `}
          ></Script>
        </div>
      </div>
      <div className="wod-analysis-container4">
        <div className="wod-analysis-container5">
          <Script
            html={`<script defer data-name="wod-analysis-interactions">
(function(){
  const processTabs = document.querySelectorAll(".process-wod-tab")
  const processPanels = document.querySelectorAll(".process-wod-panel")

  processTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanel = tab.getAttribute("data-tab")

      processTabs.forEach((t) => t.classList.remove("process-wod-tab-active"))
      processPanels.forEach((p) =>
        p.classList.remove("process-wod-panel-active")
      )

      tab.classList.add("process-wod-tab-active")
      document
        .querySelector(\`.process-wod-panel[data-panel="\${targetPanel}"]\`)
        .classList.add("process-wod-panel-active")
    })
  })

  const carouselSlides = document.querySelectorAll(".about-wod-slide")
  const carouselIndicators = document.querySelectorAll(".about-wod-indicator")
  const prevButton = document.querySelector(".about-wod-arrow-prev")
  const nextButton = document.querySelector(".about-wod-arrow-next")
  let currentSlide = 0

  function showSlide(index) {
    carouselSlides.forEach((slide) =>
      slide.classList.remove("about-wod-slide-active")
    )
    carouselIndicators.forEach((indicator) =>
      indicator.classList.remove("about-wod-indicator-active")
    )

    carouselSlides[index].classList.add("about-wod-slide-active")
    carouselIndicators[index].classList.add("about-wod-indicator-active")
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + carouselSlides.length) % carouselSlides.length
    showSlide(currentSlide)
  }

  nextButton.addEventListener("click", nextSlide)
  prevButton.addEventListener("click", prevSlide)

  carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index
      showSlide(currentSlide)
    })
  })

  const videoPlayer = document.querySelector(".video-wod-player")
  const videoPlayButton = document.querySelector(".video-wod-play")

  videoPlayButton.addEventListener("click", () => {
    if (videoPlayer.paused) {
      videoPlayer.play()
      videoPlayButton.style.opacity = "0"
    } else {
      videoPlayer.pause()
      videoPlayButton.style.opacity = "1"
    }
  })

  videoPlayer.addEventListener("click", () => {
    if (videoPlayer.paused) {
      videoPlayer.play()
      videoPlayButton.style.opacity = "0"
    } else {
      videoPlayer.pause()
      videoPlayButton.style.opacity = "1"
    }
  })

  const heroImage = document.querySelector(".hero-wod-image")
  let lastScrollTop = 0

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const parallaxSpeed = 0.3

      if (scrollTop < window.innerHeight) {
        heroImage.style.transform = \`translateY(\${
          scrollTop * parallaxSpeed
        }px) scale(1.1)\`
      }

      lastScrollTop = scrollTop
    },
    { passive: true }
  )
})()
</script>`}
          ></Script>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default WODAnalysis
