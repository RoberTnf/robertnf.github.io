import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"
import Skill from "../components/skill"
import Experience from "../components/experience"
import WebPreview from "../components/web_preview"

const content = [
  {
    title: "About me",
    text: (
      <p>
        I love programming, science and reading. I am working at{" "}
        <a
          href="https://myrspoven.se/"
          rel="noreferrer noopener"
          target="blank"
        >
          Myrspoven
        </a>{" "}
        as Lead Data Scientist, developing Machine Learning models for
        intelligent control of buildings to reduce energy consumption and fight
        against climate change.
        {/* I am working at
        <a href="https://www.nordita.org/" rel='noreferrer noopener' target='blank'> Nordita </a>
      on the <a href="https://omdb.mathub.io" rel='noreferrer noopener' target='blank'> OMDB</a>,
      a database of organic crystals. */}
      </p>
    ),
  },
  {
    title: "Work Experience",
    text: (
      <div>
        <Experience
          dates="Feb 2020 - Present"
          content={
            <div>
              <div>
                <b>Lead Data Scientist </b>- <i>Myrspoven</i>
              </div>
              Leading a team with the objective of reducing energy consumption
              in buildings by controlling their Heating, ventilation, and air
              conditioning (HVAC) systems using Machine Learning (ML).
            </div>
          }
        />
        <Experience
          dates="Oct 2019 - Feb 2020"
          content={
            <div>
              <div>
                <b>Data Scientist </b>- <i>Myrspoven</i>
              </div>
              Developed Machine Learning algorithms to reduce energy consumption
              in buildings and fight against climate change.
            </div>
          }
        />
        <Experience
          dates="2017 - 2019"
          content={
            <div>
              <div>
                <b>Student assistant </b>
                <i>
                  - Nordic Institute for Theoretical Physics (Nordita), A. V.
                  Balatsky's group.
                </i>
              </div>
              Developed the Organic Materials Database (
              <a
                href="https://omdb.mathub.io"
                rel="noreferrer noopener"
                target="blank"
              >
                OMDB
              </a>
              ), assisted researchers in multiple Condensed Matter and Machine
              Learning projects.
            </div>
          }
        />
      </div>
    ),
  },
  {
    title: "Education",
    text: (
      <div>
        <Experience
          dates="2018 - 2019"
          content={
            <div>
              <div>
                <b>MSc thesis </b>
                <i>
                  - Nordic Institute for Theoretical Physics (Nordita), A. V.
                  Balatsky's group.
                </i>
              </div>
              <p>
                Finished with the maximum grade my Master's thesis:{" "}
                <i>Machine Learning in Matter at Different Scales.</i>
              </p>

              <p>
                Presented in the American Physical Society's Boston March
                Meeting 2019 the following:
              </p>
              <ul>
                <li>
                  <a
                    href="https://meetings.aps.org/Meeting/MAR19/Session/C41.12"
                    rel="noreferrer noopener"
                    target="blank"
                  >
                    Spin wave excitations of magnetic metalorganic materials
                  </a>
                </li>

                <li>
                  <a
                    href="https://meetings.aps.org/Meeting/MAR19/Session/G70.288"
                    rel="noreferrer noopener"
                    target="blank"
                  >
                    Machine learning predictions of nuclear stability
                  </a>
                </li>
              </ul>
            </div>
          }
        />
        <Experience
          dates="2017 - 2019"
          content={
            <div>
              <p>
                <b>Master's degree in Computational Physics</b>
                <br />
                <i>Stockholm University, Stockholm, Sweden.</i>
              </p>
            </div>
          }
        />
        <Experience
          dates="2012 - 2017"
          content={
            <div>
              <p>
                <b>Bachelor's degree in Physics</b>
                <br />
                <i>Universidad de La Laguna, Spain.</i>
              </p>
            </div>
          }
        />
      </div>
    ),
  },
  {
    title: "Skills",
    text: (
      <div>
        <Skill
          title="Machine Learning"
          text="Reinforcement learning, supervised learning."
        />
        <Skill
          title="Programming"
          text="Python with the science and machine learning stack: Numpy, Pandas, matplotlib, sklearn, tensorboard, etc."
        />
        <Skill title="Front End" text="Javascript, React, CSS, HTML." />
        <Skill title="Back End" text="Django, Flask, Laravel, PHP, SQL." />
        <Skill title="Computing" text="Linux, LaTeX." />
        <Skill title="Physics" text="Condensed Matter, Magnetism." />
      </div>
    ),
  },
  {
    title: "Portfolio",
    text: (
      <div>
        <WebPreview
          titleLink={
            <a
              href="https://omdb.mathub.io"
              rel="noreferrer noopener"
              target="blank"
            >
              OMDB
            </a>
          }
          text="The organic materials database is an open access electronic structure database for 3-dimensional organic crystals, developed and hosted at the Nordic Institute for Theoretical Physics – Nordita."
          img_name="omdb"
          technologies="PHP, Laravel, SQL, Javascript, CSS, Python"
          url="https://omdb.mathub.io"
        />
        <WebPreview
          titleLink={
            <a
              href="https://mathub.io"
              rel="noreferrer noopener"
              target="blank"
            >
              Mathub
            </a>
          }
          text="Startup's website. Entry portal of a Materials Development startup."
          img_name="mathub"
          technologies="React, Gatsby"
          url="https://mathub.io"
        />
        <WebPreview
          titleLink={
            <a
              href="http://diracmaterials.org"
              rel="noreferrer noopener"
              target="blank"
            >
              Dirac Materials
            </a>
          }
          text="A. V. Balatsky's group website. Heavily involved in the overhauling and modernization of the website."
          img_name="diracmaterials"
          technologies="WordPress, Javascript, CSS"
          url="http://diracmaterials.org"
        />
      </div>
    ),
  },
]

const IndexPage = () => (
  <Layout>
    <SEO title="CV" keywords={[`gatsby`, `application`, `react`]} />
    {content.map((el) => (
      <Section key={el.title} title={el.title} text={el.text} />
    ))}
  </Layout>
)

export default IndexPage
