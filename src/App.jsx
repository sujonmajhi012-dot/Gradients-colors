import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [num, setNum] = useState(10);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHexColorCode = () => {
    const rgb = 256 * 256 * 256;
    const random = Math.random() * rgb;
    const int = Math.floor(random);
    const hexCode = int.toString(16);
    const colorHex = hexCode.padStart(6, "0");
    return `#${colorHex}`;
  };

  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = `${degree}deg`;

      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString},${color1},${color2})`,
          css: `background:linear-gradient(${degreeString},${color1},${color2})`,
        });
      } else {
        colors.push({
          gradient: `radial-gradient(circle,${color1},${color2})`,
          css: `background:radial-gradient(circle,${color1},${color2})`,
        });
      }
    }
    setGradients(colors);
  };

  const onCopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Gradient code copied !", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-6 sm:12">
        <div className="max-w-7xl mx-auto px-4 space-y-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:item-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">🎨 Gradient Generator</h1>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              
                <input
                  type="number"
                  value={num}
                  className="border border-slate-300 rounded-lg w-[150px] p-2 w-full"
                  placeholder="Enter Number"
                  onChange={(e) => {
                    const value = e.target.value;
                    setNum(value === "" ? "" : Number(value));
                  }}
                />
                <select
                  type={type}
                  className="border border-slate-300  rounded-lg w-full w-[150px] p-2"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="linear">linear</option>
                  <option value="radial">radial</option>
                </select>
              
              <div>
                <button
                  className="py-2 px-5 bg-gray-400 rounded text-lg sm:w-[150px] w-full"
                  onClick={generateGradient}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {gradients.map((item, index) => (
              <div
                key={index}
                className="h-[100px] sm:h-[200px] rounded-xl relative shadow-md hover:shadow-lg transition"
                style={{
                  background: item.gradient,
                }}
              >
                <button
                  onClick={() => onCopy(item.css)}
                  className="bg-black/40 hover:bg-black/70 text-white rounded absolute bottom-3 right-2 text-xs py-1.5 px-2 cursor-pointer"
                >
                  COPY
                </button>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
