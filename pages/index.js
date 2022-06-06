import Head from 'next/head'
import Image from 'next/image'
import Body from './components/Body'

export default function Home() {
  return (
    <Body>
      
      <section className="main-banner" style={{backgroundImage: 'url(dist/images/banner/banner.jpg)'}}>
    <div className="container">
      <div className="row">
        <div className="col-lg-7 mb-lg-0 order-2 order-lg-0 d-flex align-items-center">
          <div className="banner-two-start">
            <h1 className="font-title--lg">Learn with Expert Anytime Anywhere.</h1>
            <p>
              Our mision is to help people to find the best course online and learn with expert anytime, anywhere.
            </p>
            <form>
              <div className="banner-input">
                <div className="main-input">
                  <input type="text" placeholder="what do you want to learn today..." />
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                    <circle cx={11} cy={11} r={8} />
                    <line x1={21} y1={21} x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <div className="search-button">
                  <button className="button button-lg button--primary">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-5 order-1 order-lg-0">
          <div className="main-banner-end">
            <img src="dist/images/banner/banner-image-01.png" alt="image" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </section>
  
 
  <section className="section feature section section--bg-offwhite-one">
    <div className="container">
      <h2 className="font-title--md text-center">Why You'll Learn with Eduguard</h2>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="cardFeature">
            <div className="cardFeature__icon cardFeature__icon--bg-g">
              <svg width={32} height={28} viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2H10.4C11.8852 2 13.3096 2.5619 14.3598 3.5621C15.41 4.56229 16 5.91885 16 7.33333V26C16 24.9391 15.5575 23.9217 14.7699 23.1716C13.9822 22.4214 12.9139 22 11.8 22H2V2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30 2H21.6C20.1148 2 18.6904 2.5619 17.6402 3.5621C16.59 4.56229 16 5.91885 16 7.33333V26C16 24.9391 16.4425 23.9217 17.2302 23.1716C18.0178 22.4214 19.0861 22 20.2 22H30V2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>  
            </div>
            <h5 className="font-title--xs">250k online course</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed commodo enim Fusce sed.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="cardFeature">
            <div className="cardFeature__icon cardFeature__icon--bg-b">
              <svg width={28} height={27} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3855 12.224C21.8743 12.224 23.8915 10.2067 23.8915 7.71794C23.8915 5.23054 21.8743 3.21191 19.3855 3.21191" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.4575 17.1211C22.201 17.1717 22.939 17.2783 23.6675 17.4395C24.6775 17.6404 25.8938 18.0546 26.3257 18.9607C26.6018 19.5415 26.6018 20.218 26.3257 20.7989C25.8952 21.705 24.6775 22.1191 23.6675 22.3269" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10.5994 18.0913C15.6425 18.0913 19.9504 18.8553 19.9504 21.9071C19.9504 24.9604 15.6699 25.7503 10.5994 25.7503C5.55624 25.7503 1.24976 24.9877 1.24976 21.9345C1.24976 18.8813 5.52891 18.0913 10.5994 18.0913Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10.5993 13.7349C7.27274 13.7349 4.60767 11.0684 4.60767 7.74188C4.60767 4.41669 7.27274 1.75024 10.5993 1.75024C13.9259 1.75024 16.5923 4.41669 16.5923 7.74188C16.5923 11.0684 13.9259 13.7349 10.5993 13.7349Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg> 
            </div>
            <h5 className="font-title--xs">Expert Instructors</h5>
            <p>
              Vivamus interdum neque massa, eget mattis mi gravida eget. Donec et dictum justo. Vivamus interdum.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="cardFeature">
            <div className="cardFeature__icon cardFeature__icon--bg-r">
              <svg width={27} height={27} viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M25.2502 13.2495C25.2502 19.8774 19.8781 25.2495 13.2502 25.2495C6.62235 25.2495 1.25024 19.8774 1.25024 13.2495C1.25024 6.62162 6.62235 1.24951 13.2502 1.24951C19.8781 1.24951 25.2502 6.62162 25.2502 13.2495Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.7021 17.0667L12.8113 14.1491V7.86108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h5 className="font-title--xs">Lifetime Access</h5>
            <p>
              Vivamus cursus libero quis lobortis mattis. Suspendisse in malesuada mi. Maecenas vel euismod turpis.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*  Learning Rules Starts Here */}
  <section className="section learning-rules">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 order-2 order-lg-0">
          <div className="learning-rules-starts">
            <h2 className="font-title--md">
              Eduguard Simple <br className="d-none d-md-block" />
              Learning Steps
            </h2>
            <div className="learning-rules__wrapper">
              <div className="learning-rules-item">
                <div className="item-number"><span>01.</span></div>
                <div className="item-text">
                  <h6>Make Your Own Place.</h6>
                  <p>
                    Fusce dictum, velit eu placerat consectetur, ante nisl auctor magna, sit amet fringilla urna nibh a risus.
                  </p>
                </div>
              </div>
              <div className="learning-rules-item">
                <div className="item-number"><span>02.</span></div>
                <div className="item-text">
                  <h6>Find Best Course With Better Filtter.</h6>
                  <p>
                    Morbi id est a risus sollicitudin maximus. Fusce lorem neque, tincidunt vel rhoncus eget, convallis ullamcorper sem.
                  </p>
                </div>
              </div>
              <div className="learning-rules-item">
                <div className="item-number"><span>03.</span></div>
                <div className="item-text">
                  <h6>And Become a Master in Your Field.</h6>
                  <p>
                    Sed pulvinar dignissim neque, ac consectetur urna tincidunt vel. Sed congue nulla sed tempus ultrices.
                  </p>
                </div>
              </div>
            </div>
            <a href="#" className="button button-lg button--primary">Start Learning</a>
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-0">
          <div className="learning-rules-ends">
            <img src="dist/images/hero/hero-img-01.jpg" alt="img" className="img-fluid" />
            <div className="learning-rules-ends-circle">
              <img src="dist/images/shape/l03.png" alt="shape" className="img-fluid" />
            </div>
            <div className="earning-rules-ends-shape">
              <img src="dist/images/shape/l04.png" alt="shape" className="img-fluid shape-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="learning-rules-shape">
      <img src="dist/images/shape/dots/dots-img-16.png" alt="shape" className="img-fluid shape-01" />
      <img src="dist/images/shape/l02.png" alt="shape" className="img-fluid shape-02" />
    </div>
  </section>
  

  {/*  Main Become Instructor Starts Here */}
  <section className="section main-become-instructor">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="main-become-instructor-item me-12">
            <div className="main-image">
              <img src="dist/images/event/image01.png" alt="image" className="img-fluid" />
            </div>
            <div className="main-text">
              <h6 className="font-title--sm">Become an Instructor</h6>
              <p>
                Praesent ultricies nulla ac congue bibendum. Aliquam tempor euismod purus posuere gravida. Praesent augue sapien, vulputate eu imperdiet eget, tempor at enim.
              </p>
              <div className="text-center">
                <a href="become-instructor.html" className="green-btn">Apply as Instructor</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="main-become-instructor-item ms-12 mb-0">
            <div className="main-image">
              <img src="dist/images/event/image02.png" alt="image" className="img-fluid" />
            </div>
            <div className="main-text">
              <h6 className="font-title--sm">Use Eduguard For Business</h6>
              <p>
                Praesent ultricies nulla ac congue bibendum. Aliquam tempor euismod purus posuere gravida. Praesent augue sapien, vulputate eu imperdiet eget, tempor at enim.
              </p>
              <div className="text-center">
                <a href="#" className="green-btn">Get Eduguard For Business</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="main-become-instructor-shape">
      <img src="dist/images/shape/line03.png" alt="shape" className="img-fluid" />
    </div>
  </section>
  {/* News Letter Starts Here */}
  <section style={{backgroundColor: '#ebebf2'}}>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="newsletter-area">
            <h4>Subscribe our Newsletter</h4>
            <p className="mt-2 mb-lg-4 mb-3">
              Duis posuere maximus arcu eu tincidunt. Nam rutrum, nibh vitae tempus venenatis, ex tortor ultricies magna, et faucibus magna eros quis arcu.
            </p>
            <form>
              <div className="input-group">
                <input type="email" className="form-control border-lowBlack" placeholder="Your email" />
                <button className="button button-lg button--primary" type="button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>


    </Body>
  )
}
