import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class ImageGallaryComponent extends React.Component {
  render() {
    const items = this.props.items;
    return (
      <div>
        <Carousel autoPlay infiniteLoop showStatus={false} interval="5000" transitionTime="500">
          {items.map((product, index) => {
            return (
              <div key={index}>
                <img src={"http://localhost:1337" + product.url} />
              </div>
            );
          })}
          
        </Carousel>
      </div>
    );
  }
}

export default ImageGallaryComponent;
