import React, { useState, useRef, useEffect } from "react";
import CharWithRuby from "./CharWithRuby";
import { zip } from "./utils";

interface OutputProps {
  primaryText: string;
  secondaryText: string;
  displayDuplicates: boolean;
}

const Output: React.FC<OutputProps> = ({
  primaryText,
  secondaryText,
  displayDuplicates
}) => {
  const [html, setHtml] = useState("");

  const renderedRef = useRef(null);
  const htmlRef = useRef(null);

  useEffect(() => {
    setHtml(renderedRef.current.innerHTML);
  }, [primaryText, secondaryText, displayDuplicates]);

  return (
    <>
      <output>
        <div className="rendered" ref={renderedRef}>
          {zip([...primaryText], [...secondaryText]).map(
            ([primaryChar, secondaryChar], idx) => {
              return (
                <CharWithRuby
                  key={[idx.toString(), primaryChar, secondaryChar].join("")}
                  primaryChar={primaryChar}
                  secondaryChar={secondaryChar}
                  displayDuplicates={displayDuplicates}
                />
              );
            }
          )}
        </div>
      </output>

      <h3>HTML</h3>

      <output>
        <textarea
          className="html-src"
          ref={htmlRef}
          readOnly
          value={html}
          onClick={() => {
            htmlRef.current.select();
          }}
        />
      </output>
    </>
  );
};

export default Output;
