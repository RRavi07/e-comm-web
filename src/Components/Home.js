import React from 'react';
import Ad from './Ad';
// import Footer from './Footer';
import CategoryList from './CategoryList';
import CategoryState from '../context/CategoryState';
// import { width } from '@fortawesome/free-solid-svg-icons/fa0';
// import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const Home = () => {
    return (<>

        <div className='home-container' style={{position:"relative",top:"55px"}}>
            <div className='content'>
                <div style={{ backgroundImage: "linear-gradient(gray, white)", height: "600px" }}>
                    <Ad style={{ height: "400px" }} />
                </div>
                <CategoryState>
                    <CategoryList />
                </CategoryState>
            </div>
        </div>
        {/* <Footer /> */}
    </>
    );
}

export default Home;
