const sleep = ms => new Promise(r => setTimeout(r, ms));

async function load() {
	await sleep(1000)
	document.getElementById('loading').style.display = 'none';
	document.getElementById('main').style.display = 'flex';

	setTimeout(() => {
		document.getElementById('main').style.opacity = '1';
	}, 200);
}

document.querySelectorAll('#colorpicker').forEach(input => {
	input.addEventListener('click', e => {
		Coloris({
			theme: 'polaroid',
			themeMode: 'dark',
			alpha: false,
			swatches: [
				'#264653',
				'#2a9d8f',
				'#e9c46a',
				'rgb(244,162,97)',
				'#e76f51',
				'#d62828',
				'navy',
				'#07b',
				'#0096c7',
				'#00b4d8',
				'rgba(0,119,182)'
			],
		});
	});
});

load()





















const seasonname = document.getElementById("seasonname");
const seasonindex = document.getElementById('seasonindex');
const imageUpload = document.getElementById('seasonbackground');
const colorpicker = document.getElementById('colorpicker');
seasonname.addEventListener("change", render);
seasonindex.addEventListener("change", render);
imageUpload.addEventListener("change", render);
colorpicker.addEventListener("change", render);

let second = false
async function render() {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	console.log(`Render | Name: '${seasonname.value}' Index: '${seasonindex.value}' Image: '${imageUpload.files[0] ? imageUpload.files[0].name : 'default'}' Color: '${colorpicker.value}'`);

	let image = new Image();
	if (imageUpload.files && imageUpload.files[0]) {
		const reader = new FileReader();
		reader.onload = function (e) {
			image.onload = function () {
				render2(ctx, image);
			};
			image.src = e.target.result;
		};
		reader.readAsDataURL(imageUpload.files[0]);
	} else {
		image.onload = function () {
			render2(ctx, image);
		};
		image.src = "./examplebackground.png"
	}

	if (second === false) {
		second = true
		await sleep(1200)
		render()
	}
}

function render2(ctx, image) {
	const canvas = ctx.canvas;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const width = canvas.width*(1796/2048)
	const height = canvas.height*(267/1024)

	ctx.fillStyle = colorpicker.value;
	ctx.fillRect((canvas.width-width)/2, canvas.height-height, width, height);
	ctx.fillStyle = "#000000"

	ctx.globalAlpha = 0.7;
	ctx.drawImage(image, (canvas.width-width)/2, canvas.height-height, width, height);
	ctx.globalAlpha = 1.0;

	let fontsize = 62;

	ctx.font = `800 ${fontsize}px "Rubik"`;
	ctx.shadowColor = 'rgba(0, 0, 0, 1)';
	ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
	ctx.fillStyle = "#FFFFFF"
	ctx.lineWidth = fontsize/6;
	ctx.shadowOffsetY = fontsize/20;
	ctx.textAlign = 'left';
	
	ctx.strokeText(`${seasonname.value.toUpperCase()}`, canvas.width / 3.4 / 3.4, canvas.height - canvas.height / 8.2);
	ctx.fillText(`${seasonname.value.toUpperCase()}`, canvas.width / 3.4 / 3.4, canvas.height - canvas.height / 8.2);

	ctx.shadowColor = 'rgba(0, 0, 0, 0)';
	ctx.strokeStyle = '#000000';
	ctx.fillStyle = "#000000";
	ctx.lineWidth = 0;
	ctx.shadowOffsetY = 0;
	ctx.textAlign = "start";
}

render()