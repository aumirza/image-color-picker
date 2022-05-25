import { createRef, useEffect, useState } from "react"
import { Canvas, ColorPicker, PaletteBox, Uploader } from "../Components"
import { generatePalette } from "../Utils/pletteGenerator";
import defImage from '../Asset/Img/default.jpg'
import { DragAndUpload } from "../Components/DragAndUpload/DragAndUpload";

export const App = () => {

	const fileInp = createRef();

	const [selectedColor, setSelectedColor] = useState('')
	const [tempColor, setTempColor] = useState('')
	const [loadedImg, setLoadedImg] = useState(null)
	const [palette, setPalette] = useState([])
	const [colorCount, setColorCount] = useState(5)
	const [imageData, setImageData] = useState(null)

	const [catchingHover, setCatchingHover] = useState(false)


	const [screenWidth, setScreenWidth] = useState(window.screen.width)

	const getResponsiveWidth = (width) => {
		let maxWidth = screenWidth - 24 - screenWidth / 20;
		return width > maxWidth ? maxWidth : width;
	}

	const getPalette = () => {
		const palette = generatePalette(imageData, colorCount)
		setPalette(palette)
	}

	const uploadHandler = (image) => {
		const initialImg = new Image()
		initialImg.onload = () => {
			setLoadedImg(initialImg)
		}
		initialImg.src = URL.createObjectURL(image)
	}

	const pasteHandler = (e) => {
		const text = e.clipboardData.getData('text')
		const clipboardItems = e.clipboardData.items

		const image = (clipboardItems[0].kind === 'file') ? clipboardItems[0].getAsFile() : null

		if (image) {
			uploadHandler(image)
			return
		}

		const IMAGE_URL_EXP = /^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi
		if (text && text.match(IMAGE_URL_EXP)) {

			fetch(text)
				.then(res => res.blob())
				.then(blob => uploadHandler(blob))
		}

	}


	const screenResizeHandler = () => {
		setScreenWidth(window.screen.width)
	}

	const colorCountHandler = (operation) => {
		switch (operation) {
			case "+":
				setColorCount(colorCount => colorCount < 10 ? colorCount + 1 : colorCount)
				break;
			case "-":
				setColorCount(colorCount => colorCount > 2 ? colorCount - 1 : colorCount)
				break;
			default:
				break;
		}
	}


	useEffect(() => {
		if (imageData) getPalette()
	}, [imageData, colorCount])

	useEffect(() => {
		const initialImg = new Image()
		initialImg.onload = () => {
			setLoadedImg(initialImg)
		}
		initialImg.src = defImage
		window.addEventListener('resize', screenResizeHandler)
		window.addEventListener('paste', pasteHandler)

		return () => {
			window.removeEventListener('resize', screenResizeHandler)
			window.removeEventListener('paste', pasteHandler)
		}
	}, [])

	return (
		<div className="h-screen relative flex flex-col lg:flex-row justify-center items-center bg-pink-300">

			<DragAndUpload {...{ uploadHandler }} />

			<div className="absolute -translate-x-80 -translate-y-52  z-0 h-48 w-48 rounded-full bg-blue-500"></div>

			<div className="z-10 shadow-lg hover:shadow-2xl p-2 mr-6  rounded-md  bg-white bg-opacity-25 backdrop-blur-sm">

				<div className="flex justify-center shadow-sm h-96 w-96">
					{loadedImg ?
						<Canvas {...{ setSelectedColor, setTempColor, loadedImg, setImageData, setCatchingHover }} width={380} height={380} />
						: ""
					}
				</div>

				<PaletteBox {...{ colorCountHandler, palette }} />
			</div>

			<div className="flex flex-col sm:flex-row lg:flex-col p-2 z-10 ">
				<ColorPicker tempColor={catchingHover ? tempColor : selectedColor} selectedColor={selectedColor} />
				<Uploader {...{ uploadHandler }} />
			</div>



		</div>
	)
}