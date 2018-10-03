$(document).ready(function () {
	let left; let top;
	let currPos = { x: 1, y: 1 };
	let arr = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1]
	];

	renderBlocks(arr);
	renderPerson();

	$(document).keydown(function (e) {
		console.log(currPos);
		left = $(".block").position().left;
		top = $(".block").position().top;
		switch (e.key) {
			case "ArrowRight":
				$(".person").attr("src", "./img/right.jpg");

				let tryRightX = currPos.x + 1;
				let tryRightY = currPos.y;
				if (checkWalls(tryRightX, tryRightY)) {
					currPos = { x: currPos.x + 1, y: currPos.y };

					$(".block").animate({ "left": "+=50px" }, "slow")

				};
				break;
			case "ArrowLeft":
				$(".person").attr("src", "./img/left.jpg");
				let tryleftX = currPos.x - 1;
				let tryleftY = currPos.y;
				if (checkWalls(tryleftX, tryleftY)) {
					currPos = { x: currPos.x - 1, y: currPos.y };
					$(".block").animate({ "left": "-=50px" }, "slow")
				};
				break;
			case "ArrowDown":
				$(".person").attr("src", "./img/bot.jpg");
				let tryDownX = currPos.x;
				let tryDownY = currPos.y + 1;
				if (checkWalls(tryDownX, tryDownY)) {
					currPos = { y: currPos.y + 1, x: currPos.x };
					$(".block").animate({ "top": "+=50px" }, "slow")

				};
				break;
			case "ArrowUp":
				$(".person").attr("src", "./img/top.jpg");
				let tryUpX = currPos.x;
				let tryUpY = currPos.y - 1;
				if (checkWalls(tryUpX, tryUpY)) {
					currPos = { y: currPos.y - 1, x: currPos.x };
					$(".block").animate({ "top": "-=50px" }, "slow")
				};
				break;
		}
	});


	function renderBlocks(arr) {
		for (let i = 0; i < arr.length; i++) {

			for (let k = 0; k < arr[i].length; k++) {
				if (arr[i][k] === 0) {
					let x = arr.indexOf(arr[k]);
					let y = arr.indexOf(arr[i]);

					$('.board').append(`<div class="cell" data-id=${arr[i][k]} data-x=${x} data-y=${y} ></div>`);

				}
				else if (arr[i][k] === 1) {
					$('.board').append('<div class="cell border"></div>')
				}
				else {
					$('.board').append('<div class="cell mazecell"><img src="./img/brick.jpg" class="brick" /></div>')
				}
			}
		}
	}

	function renderPerson() {
		$('.cell').each(function (i, obj) {
			if ($(this).data("x") === 1 && $(this).data("y") === 1) {

				$(this).append('<div class="block"><img src="./img/right.jpg" class="person" /></div>');
			}
		});
	}
	function checkWalls(x, y) {
		if (arr[y][x] === 1 || arr[y][x] === 2) {
			return false
		}
		else {
			return true;
		}
	}

	$(".stop").click(function () {
		id = window.setInterval(() => { }, 0);
		console.log(id);
		while (id) {
			window.clearInterval(id);
			id--;
		}

	});

	$(".start").click(function () {
		onMyWay();
	});

	$('.maze').click(function () {
		createMaze(arr);
	})

	function createMaze(arr) {
		let currPos = { x: 1, y: 1 };
		let newArr = [...arr];
		for (let i = 1; i < newArr.length - 1; i++) {
			for (let k = 1; k < newArr.length - 1; k++) {

				let number = arr.indexOf(newArr[k]);
				if (number != 1 && number % 2 === 0) {
					newArr[i][number] = 2;
					let random = Math.floor(Math.random() * 7) + 1;
					newArr[i][random] = 0;
					console.log(newArr);
				}

			}
		}
		$('.board').html('');

		renderBlocks(newArr);
		renderPerson();
	}

	function onMyWay() {
		function moveRight() {
			let mvRt = window.setInterval(function () {
				if (checkWalls(currPos.x + 1, currPos.y)) {
					var e = jQuery.Event("keydown");
					e.key = "ArrowRight";
					$('.board').trigger(e);
				}
				else {
					clearInterval(mvRt);
					moveLft();
				}
			}, 1000);

		}
		function moveLft() {
			let mvLt = window.setInterval(function () {
				if (checkWalls(currPos.x - 1, currPos.y)) {
					var e = jQuery.Event("keydown");
					e.key = "ArrowLeft";
					$('.board').trigger(e);
				}
				else {
					clearInterval(mvLt);
					moveRight();
				}

			}, 1000)

		}

		moveRight();

	}


});
