import * as React from 'react';
import "./sb.css";
interface ISBar {
    children?: any
}
export default (props: ISBar) => {
    const {children} = props;
    const containerRef = React.useRef(null);
    const viewRef = React.useRef(null);
    return <div ref={containerRef} className="sb-container">
        <div ref={viewRef} className="sb-view">
            {children}
        </div>
        <Bar></Bar>
    </div>
    return null
}

const Bar = (props: any)=>{
    return <div className="sb-bar-container">
        <div className="sb-bar"></div>
    </div>
}