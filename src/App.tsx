import {
  useEffect,
  useState,
  cloneElement,
  createRef,
  Children,
  forwardRef,
  useRef,
  useCallback
} from "react";
import "./App.css";
import SBar from './components/ScrollBar';

export default function App() {
  const [text, addText] = useState('文字内容');
  const [arr, setArr] = useState([<p>123</p>]);
  return (
    <div className="App">
      {/* <ScrollBar text={text}></ScrollBar>
      <button onClick={()=>addText(text+"文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容")}>add content</button> */}
      <div>
        <SBar>
          {arr}
        </SBar>
      </div>
      <div>

        <button onClick={() => {
          const newArr = [...arr, <p>123</p>]
          setArr(newArr)
        }}>add</button>
      </div>
    </div>
  );
}

function ScrollBar(props: { text: string }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const onScroll = useCallback((e) => {
    console.log();
    console.log("scroll ref");
    // const top = e.target.scrollTop;
    console.log(e.target)
    const top = getTop(e.target.scrollTop, 500, 300, 10);
    console.log("top is", top);
    setScrollTop(top);
  }, []);

  const childRef = useRef(null);
  useEffect(function () {
    console.log(childRef.current);
    window.addEventListener("scroll", onScroll, true);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("scrolling");
    });
  }, []);
  useEffect(() => {
    console.log("top is", scrollTop);
  }, [scrollTop]);

  //const childElement = Children.only(props.children);
  return (
    <div className="bar-container">
      {/* {cloneElement(childElement, {
        ref: childRef
      })} */}
      <div className="content-wrapper" ref={childRef}>
        <div className="content" style={{ "transform": `translate(0, ${scrollTop})` }}>
          {props.text}
        </div>
      </div>
      {
        isScrolling ?
          <div className="bar">
            <div className="inner-bar" style={{ top: scrollTop }}></div>
          </div> : null
      }
    </div>
  );
}


function getTop(currentTop: number, allHeight: number, barContainerHeight: number, barHeight: number): number {
  return currentTop / allHeight * barContainerHeight
}