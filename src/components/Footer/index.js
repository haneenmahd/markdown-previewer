import React from "react";

const Footer = () => {
    return(
        <footer style={{
            height: 300,
            width: "100vw",
            background: "linear-gradient(0deg, #007aaf, #fff 560px)",
            color: "#fff",
            padding: 20,
            marginTop: 10,
            clip: "rect(110px, 160px, 170px, 60px)"
        }}>
            <div style={{
                padding: 20
            }}>
                <h2>Help</h2>
            </div>
        </footer>
    );
}

export default Footer;