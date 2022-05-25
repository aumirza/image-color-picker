export const PaletteControls = ({ colorCountHandler }) => {
    return (
        <div className="">

            <div onClick={() => colorCountHandler("+")}
                className="flex mb-1 justify-center items-center h-7 w-8 rounded-sm shadow hover:shadow-md hover:cursor-pointer bg-[rgba(255,255,255,.25)]">
                <span>+</span>
            </div>

            <div onClick={() => colorCountHandler("-")}
                className="flex justify-center items-center h-7 w-8 rounded-sm shadow hover:shadow-md hover:cursor-pointer bg-[rgba(255,255,255,.25)]">
                <span>-</span>
            </div>

        </div>
    )
}
