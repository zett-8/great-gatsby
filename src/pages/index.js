import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home"/>
      <div style={{ textAlign: 'center' }}>
        <h1>Hello World</h1>
        <p>“So we beat on, boats against the current, borne back ceaselessly into the past.”</p>
      </div>
    </Layout>
  )
}

export default IndexPage
