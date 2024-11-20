import {useState} from "react";

function ColorBar({memberCount}) {
    const startColor = "#e0e0e0";
    const endColor = "#4e00c9";
    const divs = [];
    const [round] = useState(8);

    for (let i = 0; i < memberCount; i++) {
        const ratio = i / (memberCount - 1);
        const color = interpolateColor(startColor, endColor, ratio);
        //console.log("컬러바 색상 ", color);
        let roundLeft = 0;
        let roundRight = 0;

        if(i === 0){
            roundLeft = round;
            roundRight = 0;
        }
        if(i === memberCount - 1) {
            roundLeft = 0;
            roundRight = round;
        }
        divs.push(
            <div
                key={i}
                style={{
                    backgroundColor: color,
                    width: `${100 / memberCount}%`,
                    height: "100%",
                    display: "inline-block",
                    borderTopRightRadius: `${roundRight}px`,
                    borderBottomRightRadius: `${roundRight}px`,

                    borderTopLeftRadius: `${roundLeft}px`,
                    borderBottomLeftRadius: `${roundLeft}px`,
                }}
            />
        );
    }

    return (
        <div className="color-bar">
        {/*<div style={{ display: "flex", width: "100%", height: "20px" }}>*/}
            {divs}
        </div>
    );
}

function interpolateColor(color1, color2, factor) {
    const hex = (color) => parseInt(color.slice(1), 16);
    const r1 = (hex(color1) >> 16) & 0xff;
    const g1 = (hex(color1) >> 8) & 0xff;
    const b1 = hex(color1) & 0xff;

    const r2 = (hex(color2) >> 16) & 0xff;
    const g2 = (hex(color2) >> 8) & 0xff;
    const b2 = hex(color2) & 0xff;

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default ColorBar;