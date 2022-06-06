import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>

        <link rel="canonical" href="https://www.emailextractonline.com/" />
        <link rel="icon" type="image/png" href="/Favicon-mail.png"/>

      
          <link type="text/css" href="/dist/main.css" rel="stylesheet" />

        
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* <script src="/src/js/jquery.min.js"></script>
        <script src="/src/js/bootstrap.bundle.min.js"></script>
        <script src="/src/scss/vendors/plugin/js/isotope.pkgd.min.js"></script>
        <script src="/src/scss/vendors/plugin/js/jquery.magnific-popup.min.js"></script>
        <script src="/src/scss/vendors/plugin/js/slick.min.js"></script>
        <script src="/src/scss/vendors/plugin/js/jquery.nice-select.min.js"></script>
        <script src="/src/js/app.js"></script>
        <script src="/dist/main.js"></script> */}
    
          
          {/* <script async src="/vendor/jquery.min.js" />
          <script async src="/vendor/popper.js/popper.min.js" />
          <script async src="/vendor/bootstrap/js/bootstrap.min.js" />
          <script async src="/vendor/mega-menu/assets/js/custom.js" />
          <script async src="/vendor/aos-next/dist/aos.js" />
          <script async src="/vendor/jquery.appear.js" />
          <script async src="/vendor/jquery.countTo.js" />
          <script async src="/vendor/slick/slick.min.js" />
          <script async src="/js/theme.js" /> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument