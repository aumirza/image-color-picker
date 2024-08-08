export const Palette = ({ palette }) => {
    return (
        <div className="flex flex-grow mx-2 rounded">

            {
                palette.map(([r, g, b], i) => {
                    const bgColor = "rgb(" + r + "," + g + "," + b + ")"
                    return (
                        <div key={bgColor} style={{ background: bgColor }}
                            className={"bg-blue-500 flex-grow " +
                                (i === 0 ? "rounded-l" : (i === palette.length - 1 ? 'rounded-r' : ''))}
                        />
                    )
                })
            }

        </div>
    )
}
