import { useEffect, useState } from "react";
import { getImage } from "./api";
import ReactImageMagnify from "react-image-magnify";
import { Watermark } from "@hirohe/react-watermark";
import { ButtonContainer, Conatiner, ImageContainer } from "./components";

function App() {
  const [image, setImage] = useState("");
  const [isBW, setIsBW] = useState(false);
  const [watermark, setWatermark] = useState("");
  const [waterMarkVisible, setWaterMarkVisible] = useState(false);

  const fetchImage = async () => {
    setImage("");
    const imageURL = await getImage();

    setImage(imageURL!);
  };

  const makeItBW = () => {
    setIsBW(!isBW);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const addWaterMark = () => {
    setWaterMarkVisible(true);
  };

  return (
    <Conatiner>
      {image ? (
        <ImageContainer>
          <Watermark
            multiline={false}
            opacity={0.5}
            rotate={0}
            text={watermark}
            show={waterMarkVisible}
          >
            <ReactImageMagnify
              //@ts-ignore
              style={{ filter: isBW && "grayscale(100%)" }}
              {...{
                smallImage: {
                  width: 300,
                  height: 300,
                  isFluidWidth: false,
                  src: `data:image/jpg;base64, ${image}`,
                },
                largeImage: {
                  src: `data:image/jpg;base64, ${image}`,
                  width: 800,
                  height: 800,
                },
              }}
            />
          </Watermark>

          <ButtonContainer>
            <button onClick={fetchImage}>Refresh</button>
            <button onClick={makeItBW}>B&W</button>
          </ButtonContainer>
          <div>
            <input
              value={watermark}
              onChange={(e) => setWatermark(e.target.value)}
            />
            <button onClick={addWaterMark}>Add Watermark</button>
          </div>
        </ImageContainer>
      ) : (
        <p style={{ color: "black" }}>Loading ...</p>
      )}
    </Conatiner>
  );
}

export default App;
