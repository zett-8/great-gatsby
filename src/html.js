import React from 'react'
import PropTypes from 'prop-types'

const googleFontURL = 'https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {/*default of gatsby*/}
        {/*<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>*/}

        {/*install some setting for material-ui*/}
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="preload" as="font" crossOrigin="true" href={googleFontURL} />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              const link = document.createElement('link');
              link.href = '${googleFontURL}';
              link.rel = 'stylesheet';
              document.head.appendChild(link);
            `,
          }}
        />

        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
