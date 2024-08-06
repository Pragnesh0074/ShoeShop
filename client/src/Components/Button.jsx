import React from "react";

function Button(props) {
  return (
    <div
      id="clickBtn"
      className="flex mt-5 w-[250px] bg-[#59f28c] h-10 items-center justify-center px-4 py-0 rounded-xl content-center"
      onClick={props.clickFun}
    >
      <div className="inline-flex flex-col items-center relative">
        <div className="relative self-stretch mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-[#111611] text-sm text-center tracking-[0] leading-[21px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
          {props.text}
        </div>
      </div>
    </div>
  );
}

export default Button;
