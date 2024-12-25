import React from "react";
import Day from "./Day";

class weather extends React.Component {
  componentWillUnmount() {
    console.log("unmounting");
  }
  render() {
    console.log(this.props);
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      weathercode: code,
      time,
    } = this.props.weather;
    return (
      <>
        <h2>weather {this.props.location}</h2>
        <ul className="weather">
          {time.map((day, i) => (
            <Day
              key={day}
              max={max.at(i)}
              min={min.at(i)}
              code={code.at(i)}
              day={day}
              isToday={i === 0}
            />
          ))}
        </ul>
      </>
    );
  }
}
export default weather;
