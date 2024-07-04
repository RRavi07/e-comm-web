import React from 'react';
import './Css/Ad.css'
const Ad = () => {
    return (
        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="image-gradient">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/APAYTRAVEL/1_PC_Hero_3000x1200._CB556570044_.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="image-gradient">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/ACQ/PC_HO_3000x12001._CB561991535_.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="image-gradient">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img24/HPC/GW/OralCare_Fest_DesktopHero_3000x1200._CB555201074_.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev" style={{ position: "absolute", top: "-400px" }}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next" style={{ position: "absolute", top: "-400px" }}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Ad;
