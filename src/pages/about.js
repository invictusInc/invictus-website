import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"

export default function About(props) {
  const { aboutPage } = props.data

  return (
    <Layout>
      {aboutPage ? (
        aboutPage.blocks.map((block) => {
          const { id, blocktype, ...componentProps } = block
          const Component = sections[blocktype] || Fallback
          return <Component key={id} {...componentProps} />
        })
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "100px",
          }}
        >
          <h1>
            We stand as an experienced and trustworthy <br />
            technology ally, ready to help with your <br /> next venture.
          </h1>
          <div style={{ maxWidth: "700px" }}>
            <p>
              Originally composed of a group of seasoned engineers, CTOs,
              product designers, and founders, Invictus now employs ten highly
              skilled engineers. We have contributed significantly to the
              delivery of more than ten innovative items in recent years. We
              have established collaborative relationships with a diverse range
              of inventive startups and large corporations, developing solutions
              that seamlessly integrate an intuitive user interface with the
              complex facets of data, cloud, and security.
            </p>
          </div>
        </div>
      )}
    </Layout>
  )
}
export const Head = (props) => {
  const { aboutPage } = props.data
  return <SEOHead {...aboutPage} />
}
export const query = graphql`
  {
    aboutPage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
        ...AboutHeroContent
        ...AboutStatListContent
        ...HomepageProductListContent
        ...AboutLeadershipContent
        ...HomepageBenefitListContent
        ...AboutLogoListContent
        ...HomepageCtaContent
      }
    }
  }
`
