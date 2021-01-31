import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

function MainImage(props) {
  // console.log(props);
  return (
    <div
      style={{
        backgroundImage: `url("${props.image}")`,
        height: "300px",
        backgroundSize: "100%, cover",
        backgroundPosition: "top",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
          }}
        >
          <Title style={{ color: "white" }} level={2}>
            {props.title}
          </Title>
          <p style={{ color: "white !important", fontSize: "1rem" }}>
            {props.text.length > 300
              ? `${props.text.substring(0, 200)}...`
              : props.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
