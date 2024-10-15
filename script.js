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






let downloading = false

const overlayelement = document.getElementById("overlay");
const rewardselement = document.getElementById("rewards");

function overlay() {
	overlayelement.style.display = 'flex';
	rewardselement.style.display = 'none';
    checkUsingExample()
}

function rewards() {
	overlayelement.style.display = 'none';
	rewardselement.style.display = 'flex';
    checkUsingExample()
}










const canvasoverlay = document.getElementById('canvasoverlay');
const seasonname = document.getElementById("seasonname");
const seasonindex = document.getElementById('seasonindex');
const imageUpload = document.getElementById('seasonbackground');
const colorpicker = document.getElementById('colorpicker');
seasonname.addEventListener("change", renderOverlay);
seasonindex.addEventListener("change", renderOverlay);
imageUpload.addEventListener("change", renderOverlay);
colorpicker.addEventListener("change", renderOverlay);

async function renderOverlay() {
    async function render(ctx, image) {
        ctx.clearRect(0, 0, canvasoverlay.width, canvasoverlay.height);
        const width = canvasoverlay.width * (1796 / 2048);
        const height = canvasoverlay.height * (267 / 1024);

        ctx.fillStyle = colorpicker.value;
        ctx.fillRect((canvasoverlay.width - width) / 2, canvasoverlay.height - height, width, height);
        ctx.fillStyle = "#000000";

        ctx.globalAlpha = 0.7;
        ctx.drawImage(image, (canvasoverlay.width - width) / 2, canvasoverlay.height - height, width, height);
        ctx.globalAlpha = 1.0;

        let fontsize = canvasoverlay.width * 0.06;
        const seasonNameX = canvasoverlay.width / 3.4 / 3.4;
        const seasonNameY = canvasoverlay.height - canvasoverlay.height / 8.2;

        ctx.font = `800 ${fontsize}px "Rubik"`;
        ctx.shadowColor = 'rgba(0, 0, 0, 1)';
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillStyle = "#FFFFFF";
        ctx.lineWidth = fontsize / 6;
        ctx.shadowOffsetY = fontsize / 20;
        ctx.textAlign = 'left';

        ctx.strokeText(`${seasonname.value.toUpperCase()}`, seasonNameX, seasonNameY);
        ctx.fillText(`${seasonname.value.toUpperCase()}`, seasonNameX, seasonNameY);

        const seasonNameWidth = ctx.measureText(seasonname.value.toUpperCase()).width;
        const seasonNameHeight = ctx.measureText(seasonname.value.toUpperCase()).emHeightAscent;

        fontsize /= 2.2;

        ctx.font = `800 ${fontsize}px "Rubik"`;
        ctx.lineWidth = fontsize / 6;
        ctx.shadowOffsetY = fontsize / 20;

        const seasonIndexX = seasonNameX + seasonNameWidth + 20;

        ctx.strokeText(`SEASON ${seasonindex.value}`, seasonIndexX, seasonNameY - seasonNameHeight / 5);
        ctx.fillText(`SEASON ${seasonindex.value}`, seasonIndexX, seasonNameY - seasonNameHeight / 5);

        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = "#000000";
        ctx.lineWidth = 0;
        ctx.shadowOffsetY = 0;
        ctx.textAlign = "start";
    }

    const ctx = canvasoverlay.getContext('2d');

    console.log(`Render | Name: '${seasonname.value}' Index: '${seasonindex.value}' Image: '${imageUpload.files[0] ? imageUpload.files[0].name : 'default'}' Color: '${colorpicker.value}'`);

    let image = new Image();

    const loadImage = () => {
        return new Promise((resolve, reject) => {
            image.onload = () => resolve(image);
            image.onerror = reject;

            checkUsingExample();
            if (imageUpload.files && imageUpload.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    image.src = e.target.result;
                };
                reader.readAsDataURL(imageUpload.files[0]);
            } else {
                image.src = "./examplebackground.png";
            }
        });
    };

	const loadedImage = await loadImage();
	await render(ctx, loadedImage);
}

const canvasrewards = document.getElementById('canvasrewards');
const rewardindex = document.getElementById("rewardindex");
const rewarddisplay = document.getElementById('rewarddisplay');
const rewardicon = document.getElementById('rewardicon');
rewardindex.addEventListener("change", renderRewards);
rewarddisplay.addEventListener("change", renderRewards);
rewardicon.addEventListener("change", renderRewards);

// todo
async function renderRewards() {
    async function render(ctx, image) {
        ctx.clearRect(0, 0, canvasrewards.width, canvasrewards.height);

        const imageScale = 0.625
        ctx.drawImage(image, canvasrewards.width*((1-imageScale)/2), canvasrewards.height*((1-imageScale)/2)-canvasrewards.height*0.025, canvasrewards.width*imageScale, canvasrewards.height*imageScale);

        ctx.shadowColor = 'rgba(0, 0, 0, 1)';
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = 'center';

        let fontsize = canvasrewards.width * 0.15;
        do {
            ctx.font = `800 ${fontsize}px "Rubik"`;
            ctx.lineWidth = fontsize / 6;
            ctx.shadowOffsetY = fontsize / 20;
            textWidth = ctx.measureText(`${rewarddisplay.value}`).width;
            
            fontsize--;
            
        } while (textWidth > canvasrewards.width && fontsize > 0);

        ctx.font = `800 ${fontsize}px "Rubik"`;
        ctx.lineWidth = fontsize / 6;
        ctx.shadowOffsetY = fontsize / 20;
        ctx.strokeText(`${rewarddisplay.value}`, canvasrewards.width/2, canvasrewards.height*0.85);
        ctx.fillText(`${rewarddisplay.value}`, canvasrewards.width/2, canvasrewards.height*0.85);

        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = "#000000";
        ctx.lineWidth = 0;
        ctx.shadowOffsetY = 0;
        ctx.textAlign = "start";
    }

    const ctx = canvasrewards.getContext('2d');

    console.log(`Render | Index: '${rewardindex.value}' Display: '${rewarddisplay.value}' Image: '${rewardicon.files[0] ? rewardicon.files[0].name : 'default'}'`);

    let image = new Image();

    const loadImage = () => {
        return new Promise((resolve, reject) => {
            image.onload = () => resolve(image);
            image.onerror = reject;

            checkUsingExample();
            if (rewardicon.files && rewardicon.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    image.src = e.target.result;
                };
                reader.readAsDataURL(rewardicon.files[0]);
            } else {
                image.src = "./exampleicon.png";
            }
        });
    };

	const loadedImage = await loadImage();
	await render(ctx, loadedImage);
}

async function downloadOverlay() {
	if (downloading) { return }
	downloading = true

	document.getElementById('loading').style.display = 'flex';
	document.getElementById('main').style.display = 'none';

	canvasoverlay.width = 2048
	canvasoverlay.height = 1024
	await renderOverlay()

	const link = document.createElement('a');
	link.href = canvasoverlay.toDataURL('image/png');
	link.download = `bgoverlay.png`;
	link.click();

	canvasoverlay.width = 1024
	canvasoverlay.height = 512
	renderOverlay()

	document.getElementById('loading').style.display = 'none';
	document.getElementById('main').style.display = 'flex';

	downloading = false
}

async function downloadRewards() {
	if (downloading) { return }
	downloading = true

	document.getElementById('loading').style.display = 'flex';
	document.getElementById('main').style.display = 'none';

	canvasrewards.width = 1024
	canvasrewards.height = 1024
	await renderRewards()

	const link = document.createElement('a');
	link.href = canvasrewards.toDataURL('image/png');
	link.download = `reward${rewardindex.value}display.png`;
	link.click();

	canvasrewards.width = 512
	canvasrewards.height = 512
	renderRewards()

	document.getElementById('loading').style.display = 'none';
	document.getElementById('main').style.display = 'flex';

	downloading = false
}

function checkUsingExample() {
    if (overlayelement.style.display != "none") {
        if (imageUpload.files && imageUpload.files[0]) {
            document.getElementById('canvasexampleenabled').style.display = 'none';
        } else {
            document.getElementById('canvasexampleenabled').style.display = 'block';
        }
    } else if (rewardselement.style.display != "none") {
        if (rewardicon.files && rewardicon.files[0]) {
            document.getElementById('canvasexampleenabled').style.display = 'none';
        } else {
            document.getElementById('canvasexampleenabled').style.display = 'block';
        }
    }
}

document.fonts.load(`800 16px "Rubik"`).then(() => {
    renderOverlay();
    renderRewards();
});