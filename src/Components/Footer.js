import React from 'react';
// import './Css/Footer.css';

const Footer = () => {
    return (
        <>
            <div  style={{marginTop:"100px"}}>
                <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#45526e' }}>
                    <div className="container p-4 pb-0">
                        <section>
                            <div className="row">
                                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Shopping.com</h6>
                                    <p>Your one-stop shop for all your needs. Discover a wide range of products from electronics to clothing and much more. Shop with us and enjoy great deals and discounts.</p>
                                </div>
                                <hr className="w-100 clearfix d-md-none" />
                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                                    <p><a href="/electronics" className="text-white">Electronics</a></p>
                                    <p><a href="/fashion" className="text-white">Fashion</a></p>
                                    <p><a href="/home-garden" className="text-white">Home & Garden</a></p>
                                    <p><a href="/sports" className="text-white">Sports & Outdoors</a></p>
                                </div>
                                <hr className="w-100 clearfix d-md-none" />
                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Useful Links</h6>
                                    <p><a href="/account" className="text-white">Your Account</a></p>
                                    <p><a href="/affiliate" className="text-white">Become an Affiliate</a></p>
                                    <p><a href="/shipping" className="text-white">Shipping Rates</a></p>
                                    <p><a href="/help" className="text-white">Help Center</a></p>
                                </div>
                                <hr className="w-100 clearfix d-md-none" />
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                                    <p><i className="fas fa-home mr-3"></i> 1234 Market St, San Francisco, CA 94103, US</p>
                                    <p><i className="fas fa-envelope mr-3"></i> support@shopping.com</p>
                                    <p><i className="fas fa-phone mr-3"></i> +1 800 123 4567</p>
                                    <p><i className="fas fa-print mr-3"></i> +1 800 123 4568</p>
                                </div>
                            </div>
                        </section>
                        <hr className="my-3" />
                        <section className="p-3 pt-0">
                            <div className="row d-flex align-items-center">
                                <div className="col-md-7 col-lg-8 text-center text-md-start">
                                    <div className="p-3">© 2024 Copyright: <a className="text-white" href="https://shopping.com/">Shopping.com</a></div>
                                </div>
                                <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                    <a className="btn btn-outline-light btn-floating m-1" href="/" role="button"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-outline-light btn-floating m-1" href="/" role="button"><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-outline-light btn-floating m-1" href="/" role="button"><i className="fab fa-google"></i></a>
                                    <a className="btn btn-outline-light btn-floating m-1" href="/" role="button"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </section>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Footer;
